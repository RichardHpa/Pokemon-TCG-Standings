import InternationalsLogo from 'images/tcgIC.png';
import RegionalLogo from 'images/tcgRegional.png';
import CupLogo from 'images/tcgCup.png';
import ChallengeLogo from 'images/tcgChallenge.png';

import RegionalLogo2024 from 'images/tcgRegionals2024.png';

import Worlds2024Logo from 'images/wc24-key-art-2x.webp';

interface StreamsMap {
    day1?: string;
    day2?: string;
    day3?: string;
}
interface LocalTournamentsMap {
    [key: string]: {
        logo: string;
        streams?: StreamsMap;
    };
}

export const tournaments: LocalTournamentsMap = {
    '0000131': {
        logo: RegionalLogo2024,
    },
    '0000130': {
        logo: RegionalLogo2024,
        streams: {
            day1: 'https://www.youtube.com/watch?v=eS6NkXesdcY',
            day2: 'https://www.youtube.com/watch?v=8Q6k7Ov6Q2w',
        },
    },
    '0000129': {
        logo: RegionalLogo2024,
        streams: {
            day1: 'https://www.youtube.com/watch?v=foyiQqsBV3k',
            day2: 'https://www.youtube.com/watch?v=-Sxb45T3Gfk',
        },
    },
    '0000128': {
        logo: Worlds2024Logo,
        streams: {
            day1: 'https://www.youtube.com/watch?v=rgE9nxOKots',
            day2: 'https://www.youtube.com/watch?v=1dvNxsjIzlY',
            day3: 'https://www.youtube.com/watch?v=M-tQC1AFomU&t=6752s',
        },
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
    '0000123': {
        logo: RegionalLogo,
    },
    '0000122': {
        logo: CupLogo,
    },
    '0000121': {
        logo: RegionalLogo,
    },
    '0000120': {
        logo: RegionalLogo,
    },
    '0000119': {
        logo: RegionalLogo,
    },
    '0000118': {
        logo: RegionalLogo,
    },
    '0000117': {
        logo: RegionalLogo,
    },
    '0000116': {
        logo: InternationalsLogo,
    },
    '0000115': {
        logo: RegionalLogo,
    },
    '0000114': {
        logo: RegionalLogo,
    },
    '0000113': {
        logo: RegionalLogo,
    },
    '0000112': {
        logo: CupLogo,
    },
    '0000111': {
        logo: RegionalLogo,
    },
    '0000110': {
        logo: RegionalLogo,
    },
    '0000109': {
        logo: RegionalLogo,
    },
    '0000108': {
        logo: CupLogo,
    },
    '0000107': {
        logo: RegionalLogo,
    },
    '0000106': {
        logo: RegionalLogo,
    },
    '0000105': {
        logo: RegionalLogo,
    },
    '0000104': {
        logo: RegionalLogo,
    },
    '0000103': {
        logo: CupLogo,
    },
    '0000102': {
        logo: RegionalLogo,
    },
    '0000101': {
        logo: CupLogo,
    },
    '0000100': {
        logo: RegionalLogo,
    },
    '0000099': {
        logo: RegionalLogo,
    },
    '0000098': {
        logo: CupLogo,
    },
    '0000097': {
        logo: ChallengeLogo,
    },
    '0000096': {
        logo: InternationalsLogo,
    },
    '0000095': {
        logo: RegionalLogo,
    },
    '0000094': {
        logo: CupLogo,
    },
    '0000093': {
        logo: RegionalLogo,
    },
    '0000092': {
        logo: RegionalLogo,
    },
    '0000091': {
        logo: RegionalLogo,
    },
    '0000089': {
        logo: CupLogo,
    },
    '0000088': {
        logo: RegionalLogo,
    },

    // DOnt know why this is out of order
    '0000053': {
        logo: RegionalLogo,
    },
};
