import { Standing } from 'types/standing';
import { Division } from 'types/tournament';

export interface StandingsListProps {
  standings?: Standing[];
  tournamentId: string;
  division: Division;
  hideArchetypes?: boolean;
  fixedContainerHeight?: boolean;
}
