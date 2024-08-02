import { Button } from 'components/Button';

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
    <Button
      variant="outlined"
      color="secondary"
      size="sm"
      onClick={event => {
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
    >
      {checkIsPinned ? 'Unpin' : 'Pin'}
    </Button>
  );
};
