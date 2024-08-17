import axios from 'utils/axios';
import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import { useQuery } from '@tanstack/react-query';
import { createTournament } from 'graphql/mutations';
import { listTournaments } from 'graphql/queries';

import amplifyconfig from '../amplifyconfiguration.json';

import { useCallback } from 'react';

import { Button } from 'components/Button';

const syncTournament = async () => {
  console.log('Syncing tournament');
  const response = await axios.get('https://www.pokedata.ovh/apiv2/tournaments/tcg');
  console.log('GET call succeeded: ', response);
  const testTournament = response.data.tcg.data[0];
  testTournament['pokeDataId'] = testTournament.id;
  testTournament['pokeDataLastUpdated'] = testTournament.lastUpdated;
  delete testTournament['lastUpdated'];
  delete testTournament.id;

  const result = await client.graphql({
    query: createTournament,
    variables: {
      input: testTournament,
    },
  });
  console.log('POST call succeeded: ', result);
  return result;
};

const getTournamentsList = async () => {
  console.log('Getting tournaments list');
  const result = await client.graphql({ query: listTournaments });
  console.log('GET call succeeded: ', result);
  return result.data.listTournaments.items;
};

Amplify.configure(amplifyconfig);
export const client = generateClient();

export const Demo = () => {
  const { data: tournaments, isLoading } = useQuery({
    queryKey: ['tournaments'],
    queryFn: getTournamentsList,
  });

  const handleSync = useCallback(async () => {
    const result = await syncTournament();
    console.log('Synced tournament: ', result);
  }, []);

  return (
    <div>
      <Button onClick={handleSync}>Sync Tournament</Button>
      {isLoading && <div>Loading...</div>}
      {tournaments && (
        <div>
          {tournaments.map((tournament: any) => (
            <div key={tournament.id}>{tournament.name}</div>
          ))}
        </div>
      )}
    </div>
  );
};
