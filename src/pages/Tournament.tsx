import { Suspense } from 'react';
import { Await, useLoaderData, Outlet, Link } from 'react-router-dom';

import { useGetTournamentStandings } from 'queries/useGetTournamentStandings';
import { useGetTournament } from 'queries/useGetTournament';

import { Heading } from 'components/Heading';
import { StandingsCard } from 'components/StandingsCard';

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

                <Outlet />
              </>
            );
          }}
        </Await>
      </div>
    </Suspense>
  );
};

const TournamentStandings = ({ tournamentId }: { tournamentId: string }) => {
  const { data: standings, isLoading } = useGetTournamentStandings(tournamentId);

  if (isLoading) {
    return <p>Loading standings...</p>;
  }

  return (
    <div className="h-[600px] flex-grow">
      <StandingsCard
        standings={standings}
        tournamentId={tournamentId}
        title="Current masters standings"
      />
    </div>
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
      <div>
        <section className="bg-white dark:bg-gray-900">
          <div className="max-w-screen-xl px-4 py-2 sm:py-8 mx-auto text-center lg:py-16 lg:px-6">
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

      <div className="flex-grow flex flex-col">
        <TournamentStandings tournamentId={tournamentId} />
      </div>
    </>
  );
};
