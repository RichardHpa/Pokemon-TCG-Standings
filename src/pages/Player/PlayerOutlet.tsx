import { useCallback } from 'react';
import { Outlet, useParams, useNavigate, Link } from 'react-router-dom';
import { ListBulletIcon } from '@heroicons/react/24/solid';

import { RUNNING } from 'constants/tournament';

import { LoadingPokeball } from 'components/LoadingPokeball';
import { Notice } from 'components/Notice';
import { SEO } from 'components/SEO';
import { Heading } from 'components/Heading';
import { IconButton } from 'components/Button/IconButton';
import { ArchetypeSprites } from 'components/ArchetypeSprites';
import { PinPlayer } from 'components/PinPlayer';

import { getCountryFlag } from 'helpers/getCountryFlag';
import { createPlayerName } from 'utils/createPlayerName';
import { removeCountryFromName } from 'utils/removeCountryFromName';
import { getCountryCode } from 'utils/getCountryCode';
import { createPlayerUrl } from 'utils/createPlayerUrl';

import { useGetTournament } from 'queries/useGetTournament';

import type { Division, TournamentApiResponse } from 'types/tournament';

export const PlayerOutlet = () => {
    const navigate = useNavigate();
    const { tournamentId, playerName, division } = useParams() as {
        tournamentId: string;
        playerName: string;
        division: Division;
    };

    const { data, isPending, isError } = useGetTournament({
        tournamentId,
        select: useCallback(
            (data: TournamentApiResponse) => {
                const divisions = data.tournament_data;
                const divisionToReturn = divisions.find(
                    (returnedDivision) => returnedDivision.division === division
                )!;

                const name = createPlayerName(playerName);

                const players = divisionToReturn.data.filter(
                    (player) => player.name === name
                );
                if (players.length === 0) {
                    throw new Error('Player not found');
                }

                return {
                    players,
                    standings: divisionToReturn.data,
                    tournament: data.tournament,
                };
            },
            [division, playerName]
        ),
    });

    const handleViewDecklist = useCallback(() => {
        navigate('./decklist');
    }, [navigate]);

    if (isPending) {
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

                {(player.decklist ||
                    data.tournament.tournamentStatus === RUNNING) && (
                    <div className="flex gap-2 items-center justify-center">
                        {data.tournament.tournamentStatus === RUNNING && (
                            <PinPlayer
                                tournamentId={tournamentId}
                                player={player.name}
                                division={division}
                            />
                        )}
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
                )}
            </div>

            <div>
                <Outlet />
            </div>
        </div>
    );
};
