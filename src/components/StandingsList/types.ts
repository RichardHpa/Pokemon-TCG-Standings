import type { Standing } from 'types/standing';
import type { Division, Tournament } from 'types/tournament';

export interface StandingsListProps {
  standings?: Standing[];
  tournamentId: string;
  tournamentStatus?: Tournament['tournamentStatus'];
  division: Division;
  hideArchetypes?: boolean;
  fixedContainerHeight?: boolean;
}
