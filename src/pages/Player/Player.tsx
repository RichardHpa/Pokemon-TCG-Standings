import { useParams, Navigate } from 'react-router-dom';
import { useMemo, useState, useCallback } from 'react';
import clsx from 'clsx';

import { RoundsTable } from 'components/RoundsTable';
import { ContentCard } from 'components/ContentCard';
import { SimilarPointsList } from 'components/SimilarPointsList';
import { StandingsCard } from 'components/StandingsCard';
import { SEO } from 'components/SEO';
import { LoadingPokeball } from 'components/LoadingPokeball';
import { Notice } from 'components/Notice';

import { calculatePoints } from 'utils/calculatePoints';
import { createPlayerName } from 'utils/createPlayerName';

import { useGetDivision } from 'hooks/useGetDivision';
import { useGetPlayerInfo } from 'hooks/useGetPlayer';

import type { FC } from 'react';
import type { Division } from 'types/tournament';
import type { Standing } from 'types/standing';

interface PlayerInfoProps {
    tournamentId: string;
    playerName: string;
    division: Division;
}

interface PlayerInfoInnerProps {
    player: Standing;
    standingsData: Standing[];
    tournamentId: string;
    division: Division;
}

const PlayerInfoInner: FC<PlayerInfoInnerProps> = ({
    player,
    standingsData,
    tournamentId,
    division,
}) => {
    const totalPoints = useMemo(() => {
        return calculatePoints(player.record);
    }, [player]);

    return (
        <>
            <div>
                <p className="text-gray-500 dark:text-gray-400 mb-2">
                    {player.record.wins}-{player.record.losses}-
                    {player.record.ties} ({totalPoints})
                </p>
                <p className="font-medium">
                    Current Standing{' '}
                    <span className="block text-sm text-gray-500 dark:text-gray-400">
                        {player.placing}
                    </span>
                </p>
                <p className="font-medium">
                    Resistance{' '}
                    <span className="block text-sm text-gray-500 dark:text-gray-400">
                        {player.resistances.opp}
                    </span>
                </p>
            </div>
            {player.rounds['1'].name === 'none' ? (
                <p>
                    More information will be available one round 1 pairings are
                    up
                </p>
            ) : (
                <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ContentCard title="Rounds">
                        <RoundsTable rounds={player.rounds} />
                    </ContentCard>

                    <ContentCard title="Similar points">
                        <SimilarPointsList
                            player={player}
                            data={standingsData}
                            totalPoints={totalPoints}
                        />
                    </ContentCard>

                    <div className="h-screen md:h-auto min-h-screen sm:min-h-[600px] col-span-1 sm:col-span-2 lg:col-span-1">
                        <StandingsCard
                            tournamentId={tournamentId}
                            standings={standingsData}
                            title="Current standings"
                            scrollToPlayerIndex={player.placing - 1}
                            allowReset
                            division={division}
                            hideArchetypes
                            fixedContainerHeight
                        />
                    </div>
                </div>
            )}
        </>
    );
};

interface MultiplePlayersProps {
    playerName: string;
    players: Standing[];
    standings: Standing[];
    tournamentId: string;
    division: Division;
}

const MultiplePlayers: FC<MultiplePlayersProps> = ({
    playerName,
    players,
    standings,
    tournamentId,
    division,
}) => {
    const [indexPlayerOpen, setIndexPlayerOpen] = useState<number | null>(null);

    const name = useMemo(() => {
        return createPlayerName(playerName);
    }, [playerName]);

    const toggleOpenPlayer = useCallback((index: number) => {
        setIndexPlayerOpen((prev) => (prev === index ? null : index));
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <SEO title={`${playerName}`} />

            <Notice status="warning">
                We have found multiple players with the name{' '}
                {createPlayerName(playerName)}. Since RK9 Labs doesn't provide a
                unique identifier for players (We need to keep submitting
                support tickets and hope they will one day), we are unable to
                determine which player you are looking for. This means that the
                players information may be incorrect.
            </Notice>

            <div>
                {players.map((player, index) => {
                    return (
                        <>
                            <h2>
                                <button
                                    type="button"
                                    className={clsx(
                                        'flex items-center justify-between w-full p-5 font-medium rtl:text-right border border-gray-200 dark:border-gray-700 gap-3 hover:bg-gray-100 dark:hover:bg-gray-800',
                                        index === 0 && 'rounded-t-xl',
                                        index === players.length - 1 &&
                                            'rounded-b-xl',
                                        indexPlayerOpen === index
                                            ? 'text-gray-900 bg-gray-100 dark:text-white dark:bg-gray-800 !rounded-b-none'
                                            : 'text-gray-500 dark:text-gray-400'
                                    )}
                                    aria-expanded="false"
                                    onClick={() => toggleOpenPlayer(index)}
                                >
                                    <span>
                                        {player.placing} - {name}
                                    </span>
                                    <svg
                                        data-accordion-icon
                                        className={clsx(
                                            'w-3 h-3 rotate-180 shrink-0',
                                            indexPlayerOpen === index &&
                                                'rotate-0'
                                        )}
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 10 6"
                                    >
                                        <path
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M9 5 5 1 1 5"
                                        />
                                    </svg>
                                </button>
                            </h2>
                            <div
                                className={clsx(
                                    indexPlayerOpen !== index && 'hidden'
                                )}
                            >
                                <div
                                    className={clsx(
                                        'p-5 border border-t-0 border-gray-200 dark:border-gray-700',
                                        index === players.length - 1 &&
                                            'rounded-b-xl'
                                    )}
                                >
                                    <PlayerInfoInner
                                        player={player}
                                        standingsData={standings}
                                        tournamentId={tournamentId}
                                        division={division}
                                    />
                                </div>
                            </div>
                        </>
                    );
                })}
            </div>
        </div>
    );
};

const PlayerInfo: FC<PlayerInfoProps> = ({
    tournamentId,
    playerName,
    division,
}) => {
    const { data, isLoading, isError } = useGetPlayerInfo({
        tournamentId,
        division,
        playerName,
    });

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

    const players = data.players;
    const standings = data.standings;
    if (players.length > 1) {
        return (
            <MultiplePlayers
                playerName={playerName}
                players={players}
                standings={standings}
                tournamentId={tournamentId}
                division={division}
            />
        );
    }

    const player = players[0];

    const hasData = player.rounds || player.record || player.resistances;

    if (!hasData && player.decklist) {
        return <Navigate replace to={`decklist`} />;
    }
    if (!hasData) {
        return (
            <Notice status="warning">
                We don't have much information about this player yet. Please
                check back later.
            </Notice>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <SEO title={`${player.name}`} />

            <PlayerInfoInner
                player={player}
                standingsData={standings}
                tournamentId={tournamentId}
                division={division}
            />
        </div>
    );
};

export const Player = () => {
    const { tournamentId, playerName, division } = useParams() as {
        tournamentId: string;
        playerName: string;
        division: Division;
    };

    const { data, isLoading, isError } = useGetDivision({
        tournamentId,
        division,
    });

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center">
                <LoadingPokeball size="100" alt="Loading player info...</p>" />
            </div>
        );
    }

    if (isError || !data) {
        return <Notice status="error">Error loading player info</Notice>;
    }

    return (
        <PlayerInfo
            tournamentId={tournamentId}
            playerName={playerName}
            division={division}
        />
    );
};
