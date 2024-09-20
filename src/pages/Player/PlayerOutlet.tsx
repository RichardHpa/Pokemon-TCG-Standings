import { useCallback } from 'react';
import { Outlet, useParams, useNavigate, Link } from 'react-router-dom';
import { ListBulletIcon } from '@heroicons/react/24/solid';

import { LoadingPokeball } from 'components/LoadingPokeball';
import { Notice } from 'components/Notice';
import { SEO } from 'components/SEO';
import { Heading } from 'components/Heading';
import { IconButton } from 'components/Button/IconButton';
import { ArchetypeSprites } from 'components/ArchetypeSprites';

import { getCountryFlag } from 'helpers/getCountryFlag';
import { createPlayerName } from 'utils/createPlayerName';
import { removeCountryFromName } from 'utils/removeCountryFromName';
import { getCountryCode } from 'utils/getCountryCode';
import { createPlayerUrl } from 'utils/createPlayerUrl';

import { useGetPlayerInfo } from 'hooks/useGetPlayer';

import type { Division } from 'types/tournament';

export const PlayerOutlet = () => {
    const navigate = useNavigate();
    const { tournamentId, playerName, division } = useParams() as {
        tournamentId: string;
        playerName: string;
        division: Division;
    };

    const { data, isLoading, isError } = useGetPlayerInfo({
        tournamentId,
        division,
        playerName,
    });
    console.log(data);
    const handleViewDecklist = useCallback(() => {
        navigate('./decklist');
    }, [navigate]);

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center">
                <LoadingPokeball size="100" alt="Loading player info...</p>" />
            </div>
        );
    }

    if (isError || !data || !data.players || data.players.length === 0) {
        return (
            <Notice status="error">
                No player found with the name {createPlayerName(playerName)}
            </Notice>
        );
    }

    if (data.players.length > 1) {
        return <div>render multiple players</div>;
    }

    const player = data.players[0];
    const standings = data.standings;

    return (
        <div className="flex flex-col gap-4">
            <SEO title={`${player.name}`} />

            <div className="flex justify-between">
                <Link
                    to={`/tournaments/${tournamentId}/${division}/${createPlayerUrl(player.name)}`}
                >
                    <Heading level="3" className="hover:underline">
                        {getCountryFlag(getCountryCode(player.name))}{' '}
                        {removeCountryFromName(player.name)}{' '}
                        {player.placing > standings.length && ` - (DQ)`}
                    </Heading>
                </Link>

                {player.decklist && (
                    <div className="flex gap-2 items-center justify-center">
                        <IconButton
                            icon={<ListBulletIcon />}
                            alt="deck list"
                            rounded={false}
                            color="grey"
                            onClick={handleViewDecklist}
                        />
                        <ArchetypeSprites decklist={player.decklist} />
                    </div>
                )}
            </div>

            <div>
                <Outlet />
            </div>
        </div>
    );
};
