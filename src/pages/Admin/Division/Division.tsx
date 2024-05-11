import { useCallback, useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { PencilIcon, ArrowRightIcon } from '@heroicons/react/20/solid';

import { createTournament } from 'graphql/mutations';
import { useQueryClient } from '@tanstack/react-query';

import { Heading } from 'components/Heading';
import { Button } from 'components/Button';
import { List } from 'components/List';
import { ListItem } from 'components/ListItem';

import { client } from 'helpers/setupAmplify';

import { getGetTournamentsKey } from 'queries/useGetTournaments';

import { listTournaments, tournamentsByPokeDataId } from 'graphql/queries';

import { capitalizeFirstLetter } from 'helpers/capitalizeFirstLetter';
import { syncTournamentDataFromPokedata } from 'api/syncTournamentDataFromPokedata';

import type { LoaderFunctionArgs } from 'react-router-dom';

const validDivisions = ['masters', 'seniors', 'juniors'];

export const divisionLoader = async ({ params }: LoaderFunctionArgs) => {
  if (!params.division) {
    throw new Error('No division provided');
  }

  if (!validDivisions.includes(params.division)) {
    throw new Error('Invalid division provided');
  }

  return {
    division: params.division,
  };
};

const getTournamentsList = async () => {
  console.log('Getting tournaments list');
  const result = await client.graphql({
    query: tournamentsByPokeDataId,
    variables: {
      type: 'Tournament',
      limit: 1000,
    },
  });
  console.log('GET call succeeded: ', result);
  return result.data.tournamentsByPokeDataId.items;
};

export const Division = () => {
  const queryClient = useQueryClient();
  const [syncing, setSyncing] = useState(false);
  const { division } = useLoaderData() as {
    division: string;
  };

  const { data: tournaments, isLoading } = useQuery({
    queryKey: ['tournaments'],
    queryFn: getTournamentsList,
  });

  const handleSync = useCallback(async () => {
    setSyncing(true);

    const response = await syncTournamentDataFromPokedata();
    console.log('Synced tournaments: ', response.successfulPromises);
    console.log('Failed to sync tournaments: ', response.failedPromises);
    setSyncing(false);

    queryClient.invalidateQueries({
      queryKey: getGetTournamentsKey(),
    });
  }, [queryClient]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <Heading level="2">{capitalizeFirstLetter(division)}</Heading>
        <Button onClick={handleSync} disabled={syncing}>
          Sync with PokeData.ovh
        </Button>
      </div>

      {isLoading && <div>Loading...</div>}
      {tournaments && (
        <List>
          {tournaments.map((tournament: any) => (
            <ListItem
              key={tournament.id}
              actions={
                <>
                  <Link to={`${tournament.id}/edit`}>
                    <button
                      type="button"
                      className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                    >
                      <PencilIcon className="w-4 h-4" aria-hidden="true" />

                      <span className="sr-only">Edit {tournament.name}</span>
                    </button>
                  </Link>
                  <Link to={tournament.id}>
                    <button
                      type="button"
                      className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-5 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
                    >
                      <ArrowRightIcon className="w-4 h-4" aria-hidden="true" />

                      <span className="sr-only">View {tournament.name}</span>
                    </button>
                  </Link>
                </>
              }
            >
              {tournament.name}
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};
