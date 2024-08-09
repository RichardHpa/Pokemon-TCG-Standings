import InternationalsLogo from 'images/tcgIC.png';
import RegionalLogo from 'images/tcgRegional.png';
import CupLogo from 'images/tcgCup.png';

import Worlds2024Logo from 'images/wc24-key-art-2x.webp';

interface LocalTournamentsMap {
  [key: string]: {
    logo: string;
  };
}

export const tournaments: LocalTournamentsMap = {
  '0000128': {
    logo: Worlds2024Logo,
  },
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
