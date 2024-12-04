import InternationalsLogo from 'images/tcgIC.png';
import RegionalLogo from 'images/tcgRegional.png';
import CupLogo from 'images/tcgCup.png';
import ChallengeLogo from 'images/tcgChallenge.png';
import PlayPokemonLogo from 'images/playPokemon.png';

import InternationalLogo2024 from 'images/tcgInternationals2024.png';
import RegionalLogo2024 from 'images/tcgRegionals2024.png';
import WorldsLogo from 'images/tcgWorlds.png';
import Worlds2024Logo from 'images/wc24-key-art-2x.webp';
import Worlds2023Logo from 'images/tcgWorlds2023.png';

import type { TournamentStatus } from 'types/tournament';
import type { ReactNode } from 'react';

interface StreamsMap {
    day1?: string;
    day2?: string;
    day3?: string;
}
interface LocalTournamentsMap {
    [key: string]: {
        name?: string;
        logo?: string;
        tournamentStatus?: TournamentStatus;
        streams?: StreamsMap;
        notes?: ReactNode;

        hasLocalData: boolean;
    };
}

export const tournaments: LocalTournamentsMap = {
    '0000141': {
        name: 'Stuttgart Pokémon TCG Regional Championship 2025',
        hasLocalData: true,
        logo: RegionalLogo2024,
        streams: {
            day1: 'https://www.youtube.com/live/G_yBcTFtCyg?si=bJInheZnCRXk3x2e',
            day2: 'https://www.youtube.com/live/5NNrLxeklts?si=2ntGxql64Ndwphnk',
        },
    },
    '0000140': {
        name: 'Sacramento Pokémon TCG Regional Championship 2025',
        hasLocalData: true,
        logo: RegionalLogo2024,
        streams: {
            day1: 'https://www.youtube.com/live/Mju3aEWWFT4?si=V-BwWhSSvO7ulQse',
            day2: 'https://www.youtube.com/live/KO-kiJf2o-k?si=VnunkYKgJfqUdGUU',
        },
    },
    '0000139': {
        name: 'Latin America Pokémon International Championships 2025',
        hasLocalData: true,
        logo: InternationalLogo2024,
        streams: {
            day1: 'https://www.youtube.com/watch?v=PCz8aE2zBXg',
            day2: 'https://www.youtube.com/watch?v=oxkvV_o-ync',
            day3: 'https://www.youtube.com/watch?v=yL16pc0kkoQ',
        },
    },
    '0000138': {
        name: '2025 Buenos Aires TCG Special Event',
        hasLocalData: true,
        logo: PlayPokemonLogo,
        notes: (
            <>
                The data for the 2025 Buenos Aires TCG Special Event was removed
                immediately after the event ended and we currently have no way
                to retrieve it. There may me some missing data for this event.
            </>
        ),
    },
    '0000137': {
        name: 'Gdansk Pokémon TCG Cup',
        hasLocalData: true,
        logo: CupLogo,
    },
    '0000136': {
        name: 'Gdansk Pokémon TCG Regional Championship 2025',
        hasLocalData: true,
        logo: RegionalLogo2024,
        streams: {
            day1: 'https://www.youtube.com/watch?v=BYFKHN53OEE',
            day2: 'https://www.youtube.com/watch?v=VPYnXfbjbSo',
        },
    },
    '0000135': {
        name: 'Lille Pokémon TCG Cup',
        hasLocalData: true,
        logo: CupLogo,
    },
    '0000134': {
        name: 'Lille Pokémon TCG Regional Championship 2025',
        hasLocalData: true,
        logo: RegionalLogo2024,
        streams: {
            day1: 'https://www.youtube.com/live/LVKNtCr6ZOU?si=lUbzSx9WRKsazNeK',
            day2: 'https://www.youtube.com/live/K185AJ27dWU?si=7fU_p7imqoLzwUEQ',
        },
    },
    '0000133': {
        hasLocalData: true,
        logo: RegionalLogo2024,
        streams: {
            day1: 'https://www.youtube.com/live/UdbzjjmkFw0?si=d-3eo9st82gJQwQf',
            day2: 'https://www.youtube.com/live/R6-IhpuPWYc?si=VNTap78UDPA9a3be',
        },
    },
    '0000132': {
        name: '2025 Lima TCG Special Event',
        hasLocalData: true,
        logo: PlayPokemonLogo,
        tournamentStatus: 'finished',
        streams: {
            day1: 'https://www.youtube.com/live/DcP6AETngCo?si=ykulvSVR7MBIFdSt',
        },
        notes: (
            <>
                The data for the 2025 Lima TCG Special Event was removed
                immediately after the event ended and we currently have no way
                to retrieve it. There may me some missing data for this event.
            </>
        ),
    },
    '0000131': {
        hasLocalData: true,
        logo: RegionalLogo2024,
    },
    '0000130': {
        name: 'Dortmund Pokémon TCG Regional Championship 2025',
        hasLocalData: true,
        logo: RegionalLogo2024,
        streams: {
            day1: 'https://www.youtube.com/watch?v=eS6NkXesdcY',
            day2: 'https://www.youtube.com/watch?v=VzoYFKfrsGk',
        },
    },
    '0000129': {
        hasLocalData: true,
        logo: RegionalLogo2024,
        streams: {
            day1: 'https://www.youtube.com/watch?v=foyiQqsBV3k',
            day2: 'https://www.youtube.com/watch?v=-Sxb45T3Gfk',
        },
    },
    '0000128': {
        hasLocalData: true,
        logo: Worlds2024Logo,
        streams: {
            day1: 'https://www.youtube.com/watch?v=rgE9nxOKots',
            day2: 'https://www.youtube.com/watch?v=1dvNxsjIzlY',
            day3: 'https://www.youtube.com/watch?v=M-tQC1AFomU&t=6752s',
        },
    },
    '0000127': {
        hasLocalData: true,
        logo: InternationalsLogo,
    },
    '0000126': {
        hasLocalData: true,
        logo: PlayPokemonLogo,
    },
    '0000125': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000124': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000123': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000122': {
        hasLocalData: true,
        logo: CupLogo,
    },
    '0000121': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000120': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000119': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000118': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000117': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000116': {
        hasLocalData: true,
        logo: InternationalsLogo,
    },
    '0000115': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000114': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000113': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000112': {
        hasLocalData: true,
        logo: CupLogo,
    },
    '0000111': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000110': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000109': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000108': {
        hasLocalData: true,
        logo: CupLogo,
    },
    '0000107': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000106': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000105': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000104': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000103': {
        hasLocalData: true,
        logo: CupLogo,
    },
    '0000102': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000101': {
        hasLocalData: true,
        logo: CupLogo,
    },
    '0000100': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000099': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000098': {
        hasLocalData: true,
        logo: CupLogo,
    },
    '0000097': {
        hasLocalData: true,
        logo: ChallengeLogo,
    },
    '0000096': {
        hasLocalData: true,
        logo: InternationalsLogo,
    },
    '0000095': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000094': {
        hasLocalData: true,
        logo: CupLogo,
    },
    '0000093': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000092': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000091': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000090': {
        hasLocalData: true,
        logo: PlayPokemonLogo,
    },
    '0000089': {
        hasLocalData: true,
        logo: CupLogo,
    },
    '0000088': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000087': {
        hasLocalData: true,
        logo: Worlds2023Logo,
    },
    '0000086': {
        hasLocalData: true,
        logo: Worlds2023Logo,
    },
    '0000085': { hasLocalData: true },
    '0000084': {
        hasLocalData: true,
        logo: PlayPokemonLogo,
    },
    '0000083': {
        hasLocalData: true,
        logo: PlayPokemonLogo,
    },
    '0000082': {
        hasLocalData: true,
        logo: PlayPokemonLogo,
    },
    '0000081': {
        hasLocalData: true,
        logo: CupLogo,
    },
    '0000080': {
        hasLocalData: true,
        logo: CupLogo,
    },
    '0000079': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000078': {
        hasLocalData: true,
        logo: InternationalsLogo,
    },
    '0000077': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000076': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000075': {
        hasLocalData: true,
        logo: PlayPokemonLogo,
    },
    '0000074': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000073': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000072': {
        hasLocalData: true,
        logo: CupLogo,
    },

    '0000071': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000070': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000069': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000068': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000067': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000066': {
        hasLocalData: true,
        logo: PlayPokemonLogo,
    },
    '0000065': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000064': { hasLocalData: true },
    '0000063': {
        hasLocalData: true,
        logo: InternationalsLogo,
    },
    '0000062': {
        hasLocalData: true,
        logo: InternationalsLogo,
    },
    '0000061': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000060': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000059': {
        hasLocalData: true,
        logo: InternationalsLogo,
    },
    '0000058': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000057': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000056': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000055': {
        hasLocalData: true,
        logo: InternationalsLogo,
    },
    '0000054': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    // Dont know why this is out of order - Peoria
    '0000053': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000052': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000051': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000050': {
        hasLocalData: true,
        logo: CupLogo,
    },
    '0000049': {
        hasLocalData: true,
        logo: InternationalsLogo,
    },
    '0000048': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000047': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000046': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000045': {
        hasLocalData: true,
        logo: PlayPokemonLogo,
    },
    '0000044': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000043': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000042': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000041': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000040': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000039': {
        hasLocalData: true,
        logo: InternationalsLogo,
    },
    '0000038': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000037': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000036': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000035': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000034': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000033': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000032': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000031': {
        hasLocalData: true,
        logo: InternationalsLogo,
    },
    '0000030': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000029': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000028': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000027': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000026': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000025': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000024': {
        hasLocalData: true,
        logo: PlayPokemonLogo,
    },
    '0000023': {
        hasLocalData: true,
        logo: WorldsLogo,
    },
    '0000022': {
        hasLocalData: true,
        logo: WorldsLogo,
    },
    '0000021': { hasLocalData: true },
    '0000020': { hasLocalData: true },
    '0000019': { hasLocalData: true },
    '0000018': {
        hasLocalData: true,
        logo: InternationalsLogo,
    },
    '0000017': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000016': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000015': {
        hasLocalData: true,
        logo: PlayPokemonLogo,
    },
    '0000014': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000013': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000012': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000011': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000010': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000009': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000008': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000007': {
        hasLocalData: true,
        logo: PlayPokemonLogo,
    },
    '0000006': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000005': {
        hasLocalData: true,
        logo: InternationalsLogo,
    },
    '0000004': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000003': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000002': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
    '0000001': {
        hasLocalData: true,
        logo: RegionalLogo,
    },
};
