import type { QueryClient } from '@tanstack/react-query';
import type { LoaderFunctionArgs } from 'react-router-dom';

export { Tournament } from './Tournament';
export { EditTournament } from './Edit';

export const tournamentLoader =
  (client: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    if (!params.tournamentId) {
      throw new Error('No tournamentId provided');
    }

    return {
      tournamentId: params.tournamentId,
    };
  };
