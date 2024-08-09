import { useMemo } from 'react';
import { LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { getCountryData } from 'countries-list';

import { RunningPersonIcon } from 'icons/RunningPerson';
import { createPlayerUrl } from 'utils/createPlayerUrl';
import { usePinnedPlayers } from 'providers/PinnedPlayersProvider';
import { useGetPinnedPlayers } from 'hooks/useGetPinnedPlayers';

import { Heading } from 'components/Heading';
import { LoadingPokeball } from 'components/LoadingPokeball';
import { Card } from 'components/Card';
import { PlayerRecord } from 'components/PlayerRecord';
import { RoundRow } from 'components/RoundsTable';
import { IconButton } from 'components/Button/IconButton';
import { NOT_STARTED } from 'constants/tournament';
import { PinPlayer } from 'components/PinPlayer';

import { CountryList } from './components/CountryList';

import { uppercaseFirstLetter } from 'utils/uppercaseFirstLetter';
import { removeCountryFromName } from 'utils/removeCountryFromName';

import { useGetPlayersByCountry, divisionOrder } from 'hooks/useGetPlayersByCountry';
import { initialWorldsPlayers, countryList } from 'mocks/tempData/0000128';

import type { Division } from 'types/tournament';
import type { IWorldsPlayers } from 'mocks/tempData/0000128';
import type { TCountryCode } from 'countries-list';

// const tournamentId = '0000128';
const fixedTournamentId = '0000109'; // melbourne 2023

const PlayerInfo = ({
  player,
  tournamentId,
  division,
}: {
  player: any;
  tournamentId: string;
  division: Division;
}) => {
  const allRounds = Object.keys(player.rounds);
  const maxRound = allRounds[allRounds.length - 1];
  const currentRound = player.rounds[maxRound];

  return (
    <Card key={player.name}>
      <div className="flex flex-col gap-2">
        <div
          className={clsx('flex items-center', {
            'justify-between': player.drop > 0,
            'justify-end': player.drop === -1,
          })}
        >
          {player.drop > 0 && (
            <div className="text-red-500">
              <RunningPersonIcon className="shrink-0 h-5 w-5" />
            </div>
          )}
          <div className="flex gap-1 items-center">
            <PinPlayer
              tournamentId={tournamentId}
              player={createPlayerUrl(player.name)}
              division={division}
            />
            <Link to={`/tournaments/${tournamentId}/${division}/${player.name}`}>
              <IconButton
                icon={<ArrowRightIcon />}
                alt="View more info"
                variant="text"
                color="grey"
                rounded={false}
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="relative inline-flex items-center justify-center w-16 h-16 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="text-xl text-gray-600 dark:text-gray-300">{player.placing}</span>
          </div>
          <div className="text-center w-full">
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white items-center truncate">
              {removeCountryFromName(player.name)}
            </h5>
            <PlayerRecord record={player.record} />
          </div>
          {allRounds && allRounds.length > 0 && (
            <div className="w-full">
              <p className="mb-1 text-xs italic text-gray-500 truncate dark:text-gray-400">
                Latest Result:
              </p>
              <ul className="border-y-2 border-gray-200 dark:border-gray-700">
                <RoundRow round={currentRound} roundNum={maxRound} />
              </ul>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

type GroupedPlayers = {
  [key in Division]?: IWorldsPlayers[];
};

const useGetEarlyPlayersByCountry = (country: string) => {
  const players = initialWorldsPlayers.filter(player => player.Country === country);

  const groupedPlayers: GroupedPlayers = players.reduce((acc: GroupedPlayers, player) => {
    const ageDivision = player.AgeDivision as Division;
    if (!acc[ageDivision]) {
      acc[ageDivision] = [];
    }
    acc[ageDivision].push(player);
    return acc;
  }, {});

  const keys = Object.keys(groupedPlayers) as Division[];
  const formattedData = keys.map(division => {
    return {
      division,
      data: groupedPlayers[division],
    };
  });

  const orderedData = formattedData.sort(
    (a, b) => divisionOrder.indexOf(a.division) - divisionOrder.indexOf(b.division)
  );

  return orderedData;
};

const InitialPlayers = ({ country }: { country: string }) => {
  const players = useGetEarlyPlayersByCountry(country);

  return (
    <>
      {players.map(division => {
        if (!division.data) return null;
        if (division.data.length === 0) return null;
        return (
          <div key={division.division}>
            <div className="mb-8 text-center">
              <Heading level="2">{uppercaseFirstLetter(division.division)}</Heading>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-baseline">
              {division.data.map((player: any) => {
                return (
                  <Card key={`${player.FirstName} ${player.LastName}`}>
                    <div className="flex flex-col gap-2">
                      <div className="text-center w-full">
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white items-center truncate">
                          {player.FirstName} {player.LastName}
                        </h5>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

const PinnedWorldsPlayers = () => {
  const { parsedPlayers } = usePinnedPlayers();
  const { filteredPlayers, isLoading } = useGetPinnedPlayers(parsedPlayers);

  const worldsPlayers = useMemo(() => {
    if (isLoading) return [];
    const tournament = filteredPlayers.find(t => t.tournamentId === fixedTournamentId);
    const players = tournament?.players;
    if (!players) return [];

    return Object.entries(players).reduce((acc, [division, players]) => {
      // @ts-expect-error
      return acc.concat(players.map(player => ({ division, player })));
    }, []);
  }, [isLoading, filteredPlayers]);

  console.log(worldsPlayers);

  if (!worldsPlayers) return null;
  if (worldsPlayers.length === 0) return null;
  return (
    <>
      <hr />
      <div className="flex flex-col gap2">
        <div className="text-center">
          <Heading level="5">Players your following</Heading>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-baseline">
          {worldsPlayers.map((player: any) => {
            return (
              <PlayerInfo
                key={player.player.name}
                player={player.player}
                division={player.division}
                tournamentId={fixedTournamentId}
              />
            );
          })}
        </div>
      </div>
      <hr />
    </>
  );
};

export const worldsLoader = ({ params }: LoaderFunctionArgs) => {
  const { country } = params as { country: string };

  if (!country) {
    throw new Error('Country not found');
  }
  const upper = country.toUpperCase() as TCountryCode;

  if (!countryList.includes(upper)) {
    throw new Error('Country not found');
  }

  return {
    country: upper,
  };
};

export const WorldsPlayers2024 = () => {
  const { country } = useLoaderData() as { country: string };

  const { data, isLoading } = useGetPlayersByCountry({
    tournamentId: fixedTournamentId,
    country: country.toUpperCase(),
  });

  const countryData = useMemo(() => {
    return getCountryData(country.toUpperCase() as TCountryCode);
  }, [country]);

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <p>
          Follow {countryData.name} players as they compete in the Pokemon World Championships 2024
          in Honolulu Hawaii.
        </p>
      </div>

      {isLoading && (
        <div className="flex flex-col justify-center items-center">
          <LoadingPokeball size="100" alt="Loading worlds 2024 data..." showAlt />
        </div>
      )}

      {!isLoading && data && (
        <div className="flex flex-col gap-8">
          {data.tournament.tournamentStatus === NOT_STARTED ? (
            <InitialPlayers country={country} />
          ) : (
            <div className="flex flex-col gap-8">
              <PinnedWorldsPlayers />

              {data.divisions.map((division: any) => {
                const maxRoundNum = Object.keys(division.data[0].rounds);
                const currentRound = maxRoundNum[maxRoundNum.length - 1];
                return (
                  <div key={division.division}>
                    <div className="mb-8 text-center">
                      <Heading level="2">{uppercaseFirstLetter(division.division)}</Heading>

                      <p>Currently in round {currentRound}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-baseline">
                      {division.data.map((player: any) => {
                        return (
                          <PlayerInfo
                            key={player.name}
                            player={player}
                            division={division.division}
                            tournamentId={fixedTournamentId}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <hr />
          <CountryList />
        </div>
      )}
    </div>
  );
};