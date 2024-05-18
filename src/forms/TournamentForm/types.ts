import { Tournament } from 'API';

export interface TournamentFormProps {
  tournamentValues: any;
  onSubmit: (values: Tournament) => Promise<any>;
}
