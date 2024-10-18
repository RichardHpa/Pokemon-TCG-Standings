import InternationalsLogo from 'images/tcgIC.png';
import RegionalLogo from 'images/tcgRegional.png';
import CupLogo from 'images/tcgCup.png';
import ChallengeLogo from 'images/tcgChallenge.png';
import PlayPokemonLogo from 'images/playPokemon.png';

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
    };
}

export const tournaments: LocalTournamentsMap = {
    '0000134': {
        name: 'Lille Pokémon TCG Regional Championship 2025',
        logo: RegionalLogo2024,
        streams: {
            day1: 'https://www.youtube.com/live/LVKNtCr6ZOU?si=lUbzSx9WRKsazNeK',
            day2: 'https://www.youtube.com/live/K185AJ27dWU?si=7fU_p7imqoLzwUEQ',
        },
    },
    '0000133': {
        logo: RegionalLogo2024,
        streams: {
            day1: 'https://www.youtube.com/live/UdbzjjmkFw0?si=d-3eo9st82gJQwQf',
            day2: 'https://www.youtube.com/live/R6-IhpuPWYc?si=VNTap78UDPA9a3be',
        },
    },
    '0000132': {
        name: '2025 Lima TCG Special Event',
        logo: PlayPokemonLogo,
        tournamentStatus: 'finished',
        streams: {
            day1: 'https://www.youtube.com/live/DcP6AETngCo?si=ykulvSVR7MBIFdSt',
        },
        notes: (
            <>
                The data for the 2025 Lima TCG Special Event was removed
                immediately after the event ended and we currently have no way
                to retrieve it. That is why there is barely and information
                about the event. Hopefully the event organizers will provide the
                data in the future.
                <br />
                Currently we only have information about most of the top 8
                players. Once we have more information we will update it with
                the rest of the players.
            </>
        ),
    },
    '0000131': {
        logo: RegionalLogo2024,
    },
    '0000130': {
        name: 'Dortmund Pokémon TCG Regional Championship 2025',
        logo: RegionalLogo2024,
        streams: {
            day1: 'https://www.youtube.com/watch?v=eS6NkXesdcY',
            day2: 'https://www.youtube.com/watch?v=VzoYFKfrsGk',
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
    '0000126': {
        logo: PlayPokemonLogo,
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
    '0000090': {
        logo: PlayPokemonLogo,
    },
    '0000089': {
        logo: CupLogo,
    },
    '0000088': {
        logo: RegionalLogo,
    },
    '0000087': {
        logo: Worlds2023Logo,
    },
    '0000086': {
        logo: Worlds2023Logo,
    },
    '0000085': {},
    '0000084': {
        logo: PlayPokemonLogo,
    },
    '0000083': {
        logo: PlayPokemonLogo,
    },
    '0000082': {
        logo: PlayPokemonLogo,
    },
    '0000081': {
        logo: CupLogo,
    },
    '0000080': {
        logo: CupLogo,
    },
    '0000079': {
        logo: RegionalLogo,
    },
    '0000078': {
        logo: InternationalsLogo,
    },
    '0000077': {
        logo: RegionalLogo,
    },
    '0000076': {
        logo: RegionalLogo,
    },
    '0000075': {
        logo: PlayPokemonLogo,
    },
    '0000074': {
        logo: RegionalLogo,
    },
    '0000073': {
        logo: RegionalLogo,
    },
    '0000072': {
        logo: CupLogo,
    },

    '0000071': {
        logo: RegionalLogo,
    },
    '0000070': {
        logo: RegionalLogo,
    },
    '0000069': {
        logo: RegionalLogo,
    },
    '0000068': {
        logo: RegionalLogo,
    },
    '0000067': {
        logo: RegionalLogo,
    },
    '0000066': {
        logo: PlayPokemonLogo,
    },
    '0000065': {
        logo: RegionalLogo,
    },
    '0000064': {},
    '0000063': {
        logo: InternationalsLogo,
    },
    '0000062': {
        logo: InternationalsLogo,
    },
    '0000061': {
        logo: RegionalLogo,
    },
    '0000060': {
        logo: RegionalLogo,
    },
    '0000059': {
        logo: InternationalsLogo,
    },
    '0000058': {
        logo: RegionalLogo,
    },
    '0000057': {
        logo: RegionalLogo,
    },
    '0000056': {
        logo: RegionalLogo,
    },
    '0000055': {
        logo: InternationalsLogo,
    },
    '0000054': {
        logo: RegionalLogo,
    },
    // Dont know why this is out of order - Peoria
    '0000053': {
        logo: RegionalLogo,
    },
    '0000052': {
        logo: RegionalLogo,
    },
    '0000051': {
        logo: RegionalLogo,
    },
    '0000050': {
        logo: CupLogo,
    },
    '0000049': {
        logo: InternationalsLogo,
    },
    '0000048': {
        logo: RegionalLogo,
    },
    '0000047': {
        logo: RegionalLogo,
    },
    '0000046': {
        logo: RegionalLogo,
    },
    '0000045': {
        logo: PlayPokemonLogo,
    },
    '0000044': {
        logo: RegionalLogo,
    },
    '0000043': {
        logo: RegionalLogo,
    },
    '0000042': {
        logo: RegionalLogo,
    },
    '0000041': {
        logo: RegionalLogo,
    },
    '0000040': {
        logo: RegionalLogo,
    },
    '0000039': {
        logo: InternationalsLogo,
    },
    '0000038': {
        logo: RegionalLogo,
    },
    '0000037': {
        logo: RegionalLogo,
    },
    '0000036': {
        logo: RegionalLogo,
    },
    '0000035': {
        logo: RegionalLogo,
    },
    '0000034': {
        logo: RegionalLogo,
    },
    '0000033': {
        logo: RegionalLogo,
    },
    '0000032': {
        logo: RegionalLogo,
    },
    '0000031': {
        logo: InternationalsLogo,
    },
    '0000030': {
        logo: RegionalLogo,
    },
    '0000029': {
        logo: RegionalLogo,
    },
    '0000028': {
        logo: RegionalLogo,
    },
    '0000027': {
        logo: RegionalLogo,
    },
    '0000026': {
        logo: RegionalLogo,
    },
    '0000025': {
        logo: RegionalLogo,
    },
    '0000024': {
        logo: PlayPokemonLogo,
    },
    '0000023': {
        logo: WorldsLogo,
    },
    '0000022': {
        logo: WorldsLogo,
    },
    '0000021': {},
    '0000020': {},
    '0000019': {},
    '0000018': {
        logo: InternationalsLogo,
    },
    '0000017': {
        logo: RegionalLogo,
    },
    '0000016': {
        logo: RegionalLogo,
    },
    '0000015': {
        logo: PlayPokemonLogo,
    },
    '0000014': {
        logo: RegionalLogo,
    },
    '0000013': {
        logo: RegionalLogo,
    },
    '0000012': {
        logo: RegionalLogo,
    },
    '0000011': {
        logo: RegionalLogo,
    },
    '0000010': {
        logo: RegionalLogo,
    },
    '0000009': {
        logo: RegionalLogo,
    },
    '0000008': {
        logo: RegionalLogo,
    },
    '0000007': {
        logo: PlayPokemonLogo,
    },
    '0000006': {
        logo: RegionalLogo,
    },
    '0000005': {
        logo: InternationalsLogo,
    },
    '0000004': {
        logo: RegionalLogo,
    },
    '0000003': {
        logo: RegionalLogo,
    },
    '0000002': {
        logo: RegionalLogo,
    },
    '0000001': {
        logo: RegionalLogo,
    },
};
