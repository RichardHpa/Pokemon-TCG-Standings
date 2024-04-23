import { useMemo } from 'react';
import { Button } from 'components/Button';
import { useLocalStorage } from 'hooks/useLocalStorage';

import { pinnedPlayersKey } from 'constants/siteKeys';

const usePinPlayer = (tournamentId: string, player: string) => {
  const [pinnedPlayers, setPinnedPlayers] = useLocalStorage(pinnedPlayersKey, JSON.stringify({}));

  const isPinned = useMemo(() => {
    const parsedPinPlayers = JSON.parse(pinnedPlayers);

    return parsedPinPlayers[tournamentId]?.includes(player);
  }, [pinnedPlayers, tournamentId, player]);

  const togglePin = () => {
    const parsedPinPlayers = JSON.parse(pinnedPlayers);

    if (!parsedPinPlayers[tournamentId]) {
      parsedPinPlayers[tournamentId] = [player];
    } else if (parsedPinPlayers[tournamentId].includes(player)) {
      parsedPinPlayers[tournamentId] = parsedPinPlayers[tournamentId].filter(
        (p: string) => p !== player
      );
    } else {
      parsedPinPlayers[tournamentId].push(player);
    }

    setPinnedPlayers(JSON.stringify(parsedPinPlayers));
  };

  return { isPinned, togglePin };
};

export const PinPlayer = ({ tournamentId, player }: { tournamentId: string; player: string }) => {
  const { togglePin, isPinned } = usePinPlayer(tournamentId, player);

  return (
    <Button
      variant="outlined"
      color="secondary"
      size="sm"
      onClick={event => {
        event.stopPropagation();
        togglePin();
      }}
    >
      {isPinned ? 'Unpin' : 'Pin'}
    </Button>
  );
};
