import { Suspense } from 'react';
import { Await, useLoaderData, Outlet, Link } from 'react-router-dom';

import { useGetTournamentStandings } from 'queries/useGetTournamentStandings';
import { useGetTournament } from 'queries/useGetTournament';

import { Heading } from 'components/Heading';
import { StandingsCard } from 'components/StandingsCard';
import { Indicator } from 'components/Indicator';
import { SEO } from 'components/SEO';
import { Card } from 'components/Card';

import { useFuse } from 'hooks/useFuse';

import { RUNNING } from 'constants/tournament';

import { formatDate } from 'helpers/formatDate';

import type { Tournament as TournamentType } from 'types/tournament';

export const TournamentOutlet = () => {
  const data = useLoaderData() as {
    tournamentId: string;
    tournament: TournamentType;
  };

  return (
    <Suspense fallback={<p>Loading Tournament...</p>}>
      <div className="flex flex-col gap-4 flex-grow">
        <Await resolve={data.tournament} errorElement={<p>Error loading your tournaments</p>}>
          {tournament => {
            return (
              <>
                <div className="flex justify-between">
                  <div className="mb-4">
                    <Link to={`/tournaments/${data.tournamentId}`}>
                      <Heading level="3" className="hover:underline cursor-pointer">
                        {tournament.name}
                      </Heading>
                    </Link>

                    <p className="text-gray-500 dark:text-gray-400">
                      {formatDate(tournament.date.start, 'MMMM d, yyyy')} -{' '}
                      {formatDate(tournament.date.end, 'MMMM d, yyyy')}
                    </p>
                  </div>
                  {tournament.tournamentStatus === RUNNING && <Indicator />}
                </div>

                <Outlet />
              </>
            );
          }}
        </Await>
      </div>
    </Suspense>
  );
};

const fuseOptions = {
  isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: ['name'],
};

const TournamentStandings = ({ tournamentId }: { tournamentId: string }) => {
  const { data: standings = [], isLoading } = useGetTournamentStandings(tournamentId);

  const { query, onSearch, searching, hits } = useFuse(standings, fuseOptions);

  if (isLoading) {
    return <p>Loading standings...</p>;
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
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="h-[600px] flex-grow">
        <StandingsCard
          standings={hits}
          tournamentId={tournamentId}
          title={searching ? `Search results for ${query}` : 'Current masters standings'}
        />
      </div>
    </>
  );
};

export const Tournament = () => {
  const { tournamentId } = useLoaderData() as { tournamentId: string };

  const { data, isLoading } = useGetTournament(tournamentId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>No tournament found</p>;
  }

  return (
    <>
      <SEO title="Tournaments" />

      <div>
        <section className="bg-white dark:bg-gray-900">
          <div className="max-w-screen-xl px-4 py-2  mx-auto text-center  lg:px-6">
            <dl className="grid max-w-screen-md gap-8 mx-auto text-gray-900 grid-cols-3 dark:text-white">
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">{data.players.masters}</dt>
                <dd className="font-light text-gray-500 dark:text-gray-400">Masters</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">{data.players.seniors}</dt>
                <dd className="font-light text-gray-500 dark:text-gray-400">Seniors</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl md:text-4xl font-extrabold">{data.players.juniors}</dt>
                <dd className="font-light text-gray-500 dark:text-gray-400">Juniors</dd>
              </div>
            </dl>
          </div>
        </section>
      </div>

      <div className="flex-grow flex flex-col gap-4">
        <TournamentStandings tournamentId={tournamentId} />
      </div>
    </>
  );
};
