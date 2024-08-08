import InternationalsLogo from 'images/tcgIC.png';
import RegionalLogo from 'images/tcgRegional.png';
import CupLogo from 'images/tcgCup.png';

interface LocalTournamentsMap {
  [key: string]: {
    logo: string;
  };
}

export const tournaments: LocalTournamentsMap = {
  '0000127': {
    logo: InternationalsLogo,
  },
  '0000125': {
    logo: RegionalLogo,
  },
  '0000124': {
    logo: RegionalLogo,
  },
  '0000122': {
    logo: CupLogo,
  },
};
