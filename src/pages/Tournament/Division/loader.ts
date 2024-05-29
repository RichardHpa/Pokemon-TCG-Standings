import type { LoaderFunctionArgs } from 'react-router-dom';
import type { QueryClient } from '@tanstack/react-query';

const validDivisions = ['masters', 'seniors', 'juniors'];

export const divisionLoader =
  (client: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    if (!params.tournamentId) {
      throw new Error('No tournamentId provided');
    }

    if (!params.division) {
      throw new Error('No division provided');
    }

    if (!validDivisions.includes(params.division)) {
      throw new Error('Invalid division provided');
    }

    return {
      division: params.division,
      tournamentId: params.tournamentId,
    };
  };
