import { useQuery } from '@tanstack/react-query';

import { getPokedataStandings } from 'api/getPokedataStandings';
import { StandingsTable } from 'components/StandingsTable';

import { Card } from 'components/Card';

const tournamentId = '0000115';

export const Standings = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['tournamentId', tournamentId],
    queryFn: () => getPokedataStandings(tournamentId),
  });

  if (isLoading) return <>Loading...</>;

  return (
    <Card>
      <StandingsTable standings={data} />
    </Card>
  );
};
