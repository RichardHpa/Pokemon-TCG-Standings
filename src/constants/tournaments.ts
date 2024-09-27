import InternationalsLogo from 'images/tcgIC.png';
import RegionalLogo from 'images/tcgRegional.png';
import CupLogo from 'images/tcgCup.png';

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
    '0000122': {
        logo: CupLogo,
    },
};
