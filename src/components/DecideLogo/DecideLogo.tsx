import { useMemo } from 'react';

import InternationalsLogo from 'images/tcgIC.png';
import RegionalLogo from 'images/tcgRegional.png';
import CupLogo from 'images/tcgCup.png';
import ChallengeLogo from 'images/tcgChallenge.png';
import PlayPokemonLogo from 'images/playPokemon.png';

import RegionalLogo2024 from 'images/tcgRegionals2024.png';
import InternationalsLogo2024 from 'images/tcgInternationals2024.png';

import type { FC } from 'react';
import type { DecideLogoProps } from './types';

const tournamentLogoMap = {
    '2025': {
        Internationals: InternationalsLogo2024,
        Regionals: RegionalLogo2024,
    },
    'pre-2025': {
        Internationals: InternationalsLogo,
        Regionals: RegionalLogo,
    },
    Cup: CupLogo,
    Challenge: ChallengeLogo,
    PlayPokemon: PlayPokemonLogo,
};

const ifStringContains = (str: string, substr: string) =>
    str.toLowerCase().includes(substr.toLowerCase());

export const DecideLogo: FC<DecideLogoProps> = ({ tournamentName }) => {
    const logo = useMemo(() => {
        if (ifStringContains(tournamentName, '2025')) {
            if (ifStringContains(tournamentName, 'International')) {
                return tournamentLogoMap['2025'].Internationals;
            }
            if (ifStringContains(tournamentName, 'Regional')) {
                return tournamentLogoMap['2025'].Regionals;
            }
        }

        if (ifStringContains(tournamentName, 'International')) {
            return tournamentLogoMap['pre-2025'].Internationals;
        }
        if (ifStringContains(tournamentName, 'Regional')) {
            return tournamentLogoMap['pre-2025'].Regionals;
        }
        if (ifStringContains(tournamentName, 'Cup')) {
            return tournamentLogoMap.Cup;
        }
        if (ifStringContains(tournamentName, 'Challenge')) {
            return tournamentLogoMap.Challenge;
        }

        return tournamentLogoMap.PlayPokemon;
    }, [tournamentName]);
    if (!logo) return null;
    return <img src={logo} alt={tournamentName} className="w-16 h-fit" />;
};
