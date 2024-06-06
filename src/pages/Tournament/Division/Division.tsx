import { useEffect } from 'react';
import { useLoaderData } from 'react-router-dom';

import { Card } from 'components/Card';
import { StandingsCard } from 'components/StandingsCard';

import { useFuse } from 'hooks/useFuse';

import { useGetTournamentStandings } from 'queries/useGetTournamentStandings';

import type { Division as DivisionType } from 'types/tournament';

const fuseOptions = {
  isCaseSensitive: false,
  includeMatches: false,
  keys: ['name'],
};

export const Division = () => {
  const { division, tournamentId } = useLoaderData() as {
    division: DivisionType;
    tournamentId: string;
  };

  const {
    data: standings = [],
    isLoading,
    isError,
  } = useGetTournamentStandings({ tournamentId, division });

  const { query, onSearch, searching, hits, reset, rawQuery } = useFuse(standings, fuseOptions);

  // reset search when division changes. There must be a way to do this within useFuse
  useEffect(() => {
    reset();
  }, [division, reset]);

  if (isLoading) {
    return <p>Loading standings...</p>;
  }

  if (isError) {
    return <p>There was an error loading the standings</p>;
  }

  if (!standings) {
    return <p>This tournament hasn't started yet</p>;
  }

  if (standings && standings[0].rounds['1'].name === 'none') {
    return <p>Standings will be available once round 1 has started</p>;
  }

  return (
    <>
      <Card>
        <div className="flex justify-between">
          <div className="w-full sm:w-auto sm:flex">
            <div className="relative w-full sm:w-48 md:w-64 lg:w-96 sm:mr-3 mb-3 sm:mb-0">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search player"
                onChange={e => onSearch(e.target.value.trim())}
                value={rawQuery}
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="flex-grow">
        <StandingsCard
          standings={hits}
          division={division}
          tournamentId={tournamentId}
          title={searching ? `Search results for ${query}` : `Current ${division} standings`}
        />
      </div>
    </>
  );
};
