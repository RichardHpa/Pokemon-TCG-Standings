// ideally this will be coming from an api

interface Tournament {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
}

export const tournaments: Tournament[] = [
  {
    id: '0000116',
    name: 'Europe Pokémon TCG International Championship',
    startDate: '2024-04-05',
    endDate: '2024-04-07',
  },
  {
    id: '0000115',
    name: 'Vancouver Pokémon TCG Regional Championship',
    startDate: '2024-03-22',
    endDate: '2024-03-24',
  },
  {
    id: '0000114',
    name: 'Goiânia Pokémon TCG Regional Championship',
    startDate: '2024-03-09',
    endDate: '2024-03-10',
  },
  {
    id: '0000113',
    name: 'Utrecht Pokémon TCG Special Event',
    startDate: '2024-03-02',
    endDate: '2024-03-03',
  },
  {
    id: '0000111',
    name: 'Dortmund Pokémon TCG Regional Championship',
    startDate: '2024-02-10',
    endDate: '2024-02-11',
  },
  {
    id: '0000109',
    name: 'Melbourne Pokémon TCG Regional Championship',
    startDate: '2024-02-03',
    endDate: '2024-02-04',
  },
  {
    id: '0000110',
    name: 'Knoxville Pokémon TCG Regional Championship',
    startDate: '2024-02-02',
    endDate: '2024-02-04',
  },
];
