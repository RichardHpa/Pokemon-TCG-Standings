import { Standing } from 'types/standing';
import { Division, Tournament } from 'types/tournament';

export interface StandingsListProps {
  standings?: Standing[];
  tournamentId: string;
  tournamentStatus?: Tournament['tournamentStatus'];
  division: Division;
  hideArchetypes?: boolean;
  fixedContainerHeight?: boolean;
}
