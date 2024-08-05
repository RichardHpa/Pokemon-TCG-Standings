import { useState, useCallback } from 'react';
import { ArrowRightIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import WorldsLogo from 'images/wc24-key-art-2x.webp';
import { RunningPersonIcon } from 'icons/RunningPerson';

import { Heading } from 'components/Heading';
import { LoadingPokeball } from 'components/LoadingPokeball';
import { Card } from 'components/Card';
import { PlayerRecord } from 'components/PlayerRecord';
import { RoundsTable, RoundRow } from 'components/RoundsTable';
import { IconButton } from 'components/Button/IconButton';

import { uppercaseFirstLetter } from 'utils/uppercaseFirstLetter';
import { removeCountryFromName } from 'utils/removeCountryFromName';

import { useGetPlayersByCountry } from 'hooks/useGetPlayersByCountry';

import type { Division } from 'types/tournament';

const PlayerInfo = ({
  player,
  tournamentId,
  division,
}: {
  player: any;
  tournamentId: string;
  division: Division;
}) => {
  const [showAllRounds, setShowAllRounds] = useState(false);

  const allRounds = Object.keys(player.rounds);
  const maxRound = allRounds[allRounds.length - 1];
  const currentRound = player.rounds[maxRound];

  const handleShowAllRounds = useCallback(() => {
    setShowAllRounds(prev => !prev);
  }, []);

  console.log(player);
  return (
    <Card key={player.name} growHeight={false}>
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
          <div className="w-full">
            {showAllRounds ? (
              <RoundsTable rounds={player.rounds} />
            ) : (
              <>
                <p className="mb-1 text-xs italic text-gray-500 truncate dark:text-gray-400">
                  Latest Round:
                </p>
                <ul className="border-y-2 border-gray-200 dark:border-gray-700">
                  <RoundRow round={currentRound} roundNum={maxRound} />
                </ul>
              </>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <IconButton
            icon={showAllRounds ? <ChevronUpIcon /> : <ChevronDownIcon />}
            alt="View more rounds"
            variant="text"
            color="grey"
            rounded={false}
            onClick={handleShowAllRounds}
          />
        </div>
      </div>
    </Card>
  );
};
const tournamentId = '0000109';
export const Worlds2024 = () => {
  const { data, isLoading } = useGetPlayersByCountry({ tournamentId, country: 'NZ' });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 text-center">
        <img className="h-auto max-w-xs rounded-lg mx-auto" src={WorldsLogo} alt="worlds 2024" />
        <Heading>Pokemon Worlds 2024</Heading>

        <p>
          Follow our New Zealand players as they compete in the Pokemon World Championships 2024 in
          Honolulu Hawaii.
        </p>
      </div>

      {isLoading && (
        <div className="flex flex-col justify-center items-center">
          <LoadingPokeball size="100" alt="Loading worlds 2024 data..." showAlt />
        </div>
      )}

      {!isLoading && data && (
        <div className="flex flex-col gap-8">
          {data.divisions.map((division: any) => {
            console.log(division.data[0].rounds);
            const maxRoundNum = Object.keys(division.data[0].rounds);
            const currentRound = maxRoundNum[maxRoundNum.length - 1];
            return (
              <div key={division.division} className="">
                <div className="mb-8">
                  <Heading level="2" className="">
                    {uppercaseFirstLetter(division.division)}
                  </Heading>

                  <p>Currently in round {currentRound}</p>
                </div>

                <div className="grid grid-cols-4 gap-4 items-baseline">
                  {division.data.map((player: any) => {
                    return (
                      <PlayerInfo
                        key={player.name}
                        player={player}
                        division={division.division}
                        tournamentId={tournamentId}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
