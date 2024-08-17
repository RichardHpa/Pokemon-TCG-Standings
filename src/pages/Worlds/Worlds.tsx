import { useState, useCallback } from 'react';
import { useGetTournament } from 'queries/useGetTournament';
import { useGetTournamentStandings } from 'queries/useGetTournamentStandings';

import { LoadingPokeball } from 'components/LoadingPokeball';
import { Tabs, Tab } from 'components/Tabs';
import { CountryList } from './components/CountryList';
import { StandingsList } from 'components/StandingsList';
import { Notice } from 'components/Notice';

import { RUNNING, FINISHED } from 'constants/tournament';

import { fixedTournamentId } from './WorldsPlayers2024';

import type { Division } from 'types/tournament';

const showStandings = [RUNNING, FINISHED];

const WorldsStandings = ({ division }: { division: Division }) => {
  const { data: standings, isLoading } = useGetTournamentStandings({
    tournamentId: fixedTournamentId,
    division,
  });

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <LoadingPokeball size="100" alt="Loading standings data..." showAlt />
      </div>
    );
  }

  if (!standings) {
    return <Notice status="info">This tournament hasn't started yet</Notice>;
  }

  if (standings && standings[0].rounds['1'].name === 'none') {
    <Notice status="info">Standings will be available once round 1 has started</Notice>;
  }

  return (
    <StandingsList standings={standings} tournamentId={fixedTournamentId} division={division} />
  );
};

export const Worlds = () => {
  const [division, setDivision] = useState<Division>('masters');
  const { data: tournament, isLoading } = useGetTournament(fixedTournamentId);

  const changeDivision = useCallback((newDivision: Division) => {
    setDivision(newDivision);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-center">
        Follow TCG players from around the world as they complete to be the 2024 Pokemon World
        Champions.
      </p>

      {isLoading ? (
        <div className="flex flex-col justify-center items-center">
          <LoadingPokeball size="100" alt="Loading worlds 2024 data..." showAlt />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {tournament ? (
            <>
              <CountryList />

              {showStandings.includes(tournament.tournamentStatus) ? (
                <>
                  <Tabs>
                    <Tab active={division === 'masters'} onClick={() => changeDivision('masters')}>
                      Masters
                    </Tab>
                    <Tab active={division === 'seniors'} onClick={() => changeDivision('seniors')}>
                      Seniors
                    </Tab>
                    <Tab active={division === 'juniors'} onClick={() => changeDivision('juniors')}>
                      Juniors
                    </Tab>
                  </Tabs>
                  <div className="rounded-xl dark:text-gray-400 border border-gray-100 dark:border-gray-700  bg-white dark:bg-gray-900 h-full flex flex-col overflow-hidden">
                    <WorldsStandings division={division} />
                  </div>
                </>
              ) : (
                <p className="mb-1 italic text-gray-500 dark:text-gray-400 text-center">
                  Current Standings will be shown once the tournament starts.
                </p>
              )}
            </>
          ) : (
            <Notice status="warning">
              There seems to be an error retrieving the data for this tournament. This often happens
              when to many people are trying to access the data at the same time. Please try again
              in a few minutes.
              <br />
              If the problem persists, I will look into hosting my own api to prevent this from
              happening in the future, though this will take some time and money.
            </Notice>
          )}
        </div>
      )}
    </div>
  );
};
