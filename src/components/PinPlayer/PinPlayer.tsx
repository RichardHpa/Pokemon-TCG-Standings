import { useCallback } from 'react';
import { IconButton } from 'components/Button/IconButton';
import { PinIcon } from 'icons/PinIcon';

// import { usePinnedPlayers } from 'providers/PinnedPlayersProvider';
import { usePinnedPlayersContext } from 'providers/PinnedPlayersProviderV2';

import { useAnalytics } from 'hooks/useAnalytics';

import type { Division } from 'types/tournament';

export const PinPlayer = ({
    tournamentId,
    player,
    division,
}: {
    tournamentId: string;
    player: string;
    division: Division;
}) => {
    const { sendEvent } = useAnalytics();

    const { togglePlayer, isPlayerPinned } = usePinnedPlayersContext();

    const handlePinPlayer = useCallback(() => {
        if (!isPlayerPinned(tournamentId, division, player)) {
            sendEvent({
                category: 'Pin Player',
                action: 'click',
                label: `Pin Player: ${player} - ${division} - ${tournamentId}`,
            });
        }

        togglePlayer(tournamentId, division, player);
    }, [
        isPlayerPinned,
        tournamentId,
        division,
        player,
        togglePlayer,
        sendEvent,
    ]);

    return (
        <IconButton
            icon={<PinIcon />}
            alt="View Pinned Players"
            // variant={checkIsPinned ? 'solid' : 'text'}
            variant="text"
            rounded={false}
            // color={checkIsPinned ? 'primary' : 'grey'}
            color={
                isPlayerPinned(tournamentId, division, player)
                    ? 'primary'
                    : 'grey'
            }
            onClick={(event) => {
                event.stopPropagation();
                handlePinPlayer();
            }}
        />
    );
};
