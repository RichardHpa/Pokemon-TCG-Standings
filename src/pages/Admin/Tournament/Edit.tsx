import { useQuery } from '@tanstack/react-query';
import { useLoaderData } from 'react-router-dom';

import { getTournament } from 'graphql/queries';

import { Heading } from 'components/Heading';
import { Card } from 'components/Card';
import { Button } from 'components/Button';

import { TournamentForm } from 'forms/TournamentForm';

import { client } from 'helpers/setupAmplify';

const getTournamentData = async (tournamentId: string) => {
  const result = await client.graphql({
    query: getTournament,
    variables: {
      id: tournamentId,
    },
  });

  return result.data.getTournament;
};

export const EditTournament = () => {
  const { tournamentId } = useLoaderData() as {
    tournamentId: string;
  };

  const { data: tournament, isLoading } = useQuery({
    queryKey: ['tournament', tournamentId],
    queryFn: () => getTournamentData(tournamentId),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!tournament) {
    return <div>Tournament not found</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <Heading level="2">{tournament.name}</Heading>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <div className="flex flex-col gap-4">
            <Card>
              <Heading level="5">Tournament information</Heading>
              <TournamentForm values={tournament} />
            </Card>
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-4">
            <Card>
              <div className="flex flex-col gap-2 items-start">
                <Heading level="5">Delete tournament</Heading>
                <p>Are you sure you want to delete this tournament?</p>
                <Button color="error">Delete</Button>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <pre>{JSON.stringify(tournament, null, 2)}</pre>
    </div>
  );
};
