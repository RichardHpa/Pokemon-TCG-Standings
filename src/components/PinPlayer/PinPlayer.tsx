import { IconButton } from 'components/Button/IconButton';
import { PinIcon } from 'icons/PinIcon';

import { usePinnedPlayers } from 'providers/PinnedPlayersProvider';

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

    const { togglePinPlayer, inPinned } = usePinnedPlayers();
    const checkIsPinned = inPinned(player, tournamentId, division);

    return (
        <IconButton
            icon={<PinIcon />}
            alt="View Pinned Players"
            variant={checkIsPinned ? 'solid' : 'text'}
            rounded={false}
            color={checkIsPinned ? 'primary' : 'grey'}
            onClick={(event) => {
                event.stopPropagation();
                if (!checkIsPinned) {
                    sendEvent({
                        category: 'Pin Player',
                        action: 'click',
                        label: `Pin Player: ${player} - ${division} - ${tournamentId}`,
                    });
                }
                togglePinPlayer(player, tournamentId, division);
            }}
        />
    );
};
