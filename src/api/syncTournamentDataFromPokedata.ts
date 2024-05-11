import axios from 'axios';

import { listTournaments } from 'graphql/queries';
import { createTournament } from 'graphql/mutations';

import { client } from 'helpers/setupAmplify';

const getTournamentsList = async () => {
  console.log('Getting tournaments list');
  const result = await client.graphql({
    query: listTournaments,
    variables: {
      limit: 1000,
    },
  });
  console.log('GET call succeeded: ', result);
  return result.data.listTournaments.items;
};

interface SyncTournamentDataFromPokedataResponse {
  successfulPromises: any[];
  failedPromises: any[];
}

export const syncTournamentDataFromPokedata =
  async (): Promise<SyncTournamentDataFromPokedataResponse> => {
    const successfulPromises: any[] = [];
    const failedPromises: any[] = [];
    const allExistingTournaments = await getTournamentsList();
    console.log('All existing tournaments: ', allExistingTournaments);

    const pokeDataTournaments = await axios
      .get('https://www.pokedata.ovh/apiv2/tournaments/tcg')
      .then(response => {
        console.log('GET call succeeded: ', response);
        return response.data.tcg.data;
      })
      .catch(error => {
        console.error('GET call failed: ', error);
        throw new Error('Failed to fetch data from pokedata.ovh');
      });
    console.log('GET call succeeded: ', pokeDataTournaments);

    let newTournaments = pokeDataTournaments.filter((newTournament: any) => {
      return !allExistingTournaments.some((existingTournament: any) => {
        return newTournament.id === existingTournament.pokeDataId;
      });
    });

    // for testing purposes get the first 10 tournaments
    newTournaments = newTournaments.slice(0, 10);

    console.log('New tournaments: ', newTournaments);

    const promises = newTournaments.map(async (newTournament: any) => {
      newTournament['pokeDataId'] = newTournament.id;
      newTournament['pokeDataLastUpdated'] = newTournament.lastUpdated;
      newTournament['type'] = 'Tournament';
      delete newTournament['lastUpdated'];
      delete newTournament.id;

      const result = await client.graphql({
        query: createTournament,
        variables: {
          input: newTournament,
        },
        authMode: 'userPool',
      });
      return result;
    });

    await Promise.allSettled(promises).then(results => {
      results.forEach(result => {
        if (result.status === 'fulfilled') {
          successfulPromises.push(result.value);
        } else {
          failedPromises.push(result.reason);
        }
      });
    });

    return {
      successfulPromises,
      failedPromises,
    };
  };
