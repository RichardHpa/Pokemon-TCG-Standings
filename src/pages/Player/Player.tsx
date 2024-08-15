import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Heading } from 'components/Heading';
import { RoundsTable } from 'components/RoundsTable';
import { ContentCard } from 'components/ContentCard';
import { SimilarPointsList } from 'components/SimilarPointsList';
import { StandingsCard } from 'components/StandingsCard';
import { SEO } from 'components/SEO';
import { ArchetypeSprites } from 'components/ArchetypeSprites';
import { LoadingPokeball } from 'components/LoadingPokeball';

import { calculatePoints } from 'utils/calculatePoints';

import { getPokedataStandings } from 'api/getPokedataStandings';

import { useGetPlayerInfo } from 'hooks/useGetPlayer';
import { useResponsive } from 'hooks/useResponsive';
import { useGetTournamentStandings } from 'queries/useGetTournamentStandings';

import type { FC } from 'react';
import { Division } from 'types/tournament';

interface PlayerInfoProps {
  tournamentId: string;
  playerName: string;
  division: Division;
}

const PlayerInfo: FC<PlayerInfoProps> = ({ tournamentId, playerName, division }) => {
  const { data, isLoading, isError } = useGetPlayerInfo({ tournamentId, division, playerName });
  const values = useResponsive();

  const {
    data: standingsData,
    isLoading: isStandingsLoading,
    isError: isStandingsError,
  } = useGetTournamentStandings({ tournamentId, division });

  const totalPoints = useMemo(() => {
    if (!data) return 0;
    const player = data[0];
    return calculatePoints(player.record);
  }, [data]);

  if (isLoading || isStandingsLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <LoadingPokeball size="100" alt="Loading player info...</p>" />
      </div>
    );
  }

  if (isError || isStandingsError || !data || !standingsData) {
    return <p>No player found</p>;
  }

  if (data.length === 0) {
    return <p>No player found</p>;
  }

  if (data.length > 1) {
    return <p>Multiple players found</p>;
  }

  const player = data[0];

  return (
    <div className="flex flex-col gap-4">
      <SEO title={`${player.name}`} />

      <div>
        <div className="flex justify-between">
          <Heading level="4">
            {player.name} {player.placing > data.length && ` - (DQ)`}
          </Heading>

          {player.decklist && <ArchetypeSprites decklist={player.decklist} />}
        </div>

        <p className="text-gray-500 dark:text-gray-400 mb-2">
          {player.record.wins}-{player.record.losses}-{player.record.ties} ({totalPoints})
        </p>
        <p className="font-medium">
          Current Standing{' '}
          <span className="block text-sm text-gray-500 dark:text-gray-400">{player.placing}</span>
        </p>
        <p className="font-medium">
          Resistance{' '}
          <span className="block text-sm text-gray-500 dark:text-gray-400">
            {player.resistances.opp}
          </span>
        </p>
      </div>
      {player.rounds['1'].name === 'none' ? (
        <p>More information will be available one round 1 pairings are up</p>
      ) : (
        <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <ContentCard title="Rounds">
            <RoundsTable rounds={player.rounds} />
          </ContentCard>

          <ContentCard title="Similar points">
            <SimilarPointsList player={player} data={standingsData} totalPoints={totalPoints} />
          </ContentCard>

          <div className="min-h-screen sm:min-h-[600px] col-span-1 sm:col-span-2 lg:col-span-1">
            <StandingsCard
              tournamentId={tournamentId}
              standings={standingsData}
              title="Current standings"
              scrollToPlayerIndex={player.placing - 1}
              allowReset
              division={division}
              hideArchetypes
              fixedContainerHeight={!values.lg ? false : true}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const Player = () => {
  const { tournamentId, playerName, division } = useParams() as {
    tournamentId: string;
    playerName: string;
    division: Division;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['tournament', tournamentId, division, 'standings'],
    queryFn: () => getPokedataStandings({ tournamentId, division }),
  });

  if (isLoading) {
    return <p>Loading player info...</p>;
  }

  if (isError || !data) {
    return <p>Error loading the player</p>;
  }

  return <PlayerInfo tournamentId={tournamentId} playerName={playerName} division={division} />;
};
