import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLoaderData, useNavigate } from 'react-router-dom';

import { getTournament } from 'graphql/queries';
import { updateTournament, deleteTournament } from 'graphql/mutations';

import { resyncTournamentData, formatDataForBE } from 'api/syncTournamentDataFromPokedata';

import { Heading } from 'components/Heading';
import { Card } from 'components/Card';
import { Button } from 'components/Button';

import { TournamentForm } from 'forms/TournamentForm';

import { client } from 'helpers/setupAmplify';
import type { Tournament, UpdateTournamentInput } from 'API';

const getTournamentData = async (tournamentId: string) => {
  const result = await client.graphql({
    query: getTournament,
    variables: {
      id: tournamentId,
    },
  });

  return result.data.getTournament;
};

const updateTournamentData = async (tournament: UpdateTournamentInput) => {
  const result = await client.graphql({
    query: updateTournament,
    variables: {
      input: tournament,
    },
    authMode: 'userPool',
  });
  return result.data.updateTournament;
};

const deleteTournamentData = async (tournamentId: string) => {
  const result = await client.graphql({
    query: deleteTournament,
    variables: {
      input: {
        id: tournamentId,
      },
    },
    authMode: 'userPool',
  });
  return result.data.deleteTournament;
};

export const EditTournament = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { tournamentId } = useLoaderData() as {
    tournamentId: string;
  };

  const { data: tournament, isLoading } = useQuery({
    queryKey: ['tournament', tournamentId],
    queryFn: () => getTournamentData(tournamentId),
  });

  const { mutate: mutationUpdate } = useMutation({
    mutationFn: updateTournamentData,
    onSuccess: data => {
      queryClient.setQueryData(['tournament', tournamentId], data);
      queryClient.setQueryData(['tournaments'], (old: Tournament[]) => {
        if (!old) {
          return;
        }
        const updatedTournaments = old.map(tournament => {
          if (tournament.id === data.id) {
            return data;
          }
          return tournament;
        });
        return updatedTournaments;
      });
    },
    onError: error => {
      console.log('error updating todo:', error);
    },
  });

  const { mutate: mutationDelete } = useMutation({
    mutationFn: deleteTournamentData,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tournaments'],
      });

      navigate('/dashboard/division/masters');
    },
    onError: error => {
      console.log('error deleting todo:', error);
    },
  });

  const handleOnUpdate = useCallback(
    async (values: Tournament) => {
      const { createdAt, updatedAt, ...rest } = values;
      const mutationValue = rest;
      mutationUpdate(mutationValue);
    },
    [mutationUpdate]
  );

  const handleResyncTournament = useCallback(async () => {
    if (!tournament) {
      return;
    }
    const pokeDataTournament = await resyncTournamentData(tournament);
    const formattedTournament = formatDataForBE(pokeDataTournament);
    formattedTournament.id = tournament.id;
    mutationUpdate(formattedTournament);
  }, [mutationUpdate, tournament]);

  const handleDelete = useCallback(async () => {
    mutationDelete(tournamentId);
  }, [mutationDelete, tournamentId]);

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
              <TournamentForm tournamentValues={tournament} onSubmit={handleOnUpdate} />
            </Card>
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-4">
            <Card>
              <div className="flex flex-col gap-2 items-start">
                <Heading level="5">Resync Tournament</Heading>
                <p>
                  Resyncing the tournament will replace any changed information about this
                  tournament
                </p>
                <Button color="primary" variant="outlined" onClick={handleResyncTournament}>
                  Resync
                </Button>
              </div>
            </Card>

            <Card>
              <div className="flex flex-col gap-2 items-start">
                <Heading level="5">Delete tournament</Heading>
                <p>Are you sure you want to delete this tournament?</p>
                <Button color="error" onClick={handleDelete}>
                  Delete
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
