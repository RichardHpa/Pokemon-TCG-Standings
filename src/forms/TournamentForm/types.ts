export interface TournamentFormValues {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  maxParticipants: number;
  rules: string;
  prize: string;
}

export interface TournamentFormProps {
  values: any;
  // onChange: (values: TournamentFormValues) => void;
}
