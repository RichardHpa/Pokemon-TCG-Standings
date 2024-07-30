import { useMemo } from 'react';
import { Button } from 'components/Button';

import { IconButton } from 'components/Button/IconButton';
import { PinIcon } from 'icons/PinIcon';

import { useLikes } from 'providers/PinnedPlayersProvider/PinnedPlayersProvider';

import { useAnalytics } from 'hooks/useAnalytics';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { usePinnedPlayers } from 'pages/Home/components/PinnedPlayers/PinnedPlayers';

import { pinnedPlayersKey } from 'constants/siteKeys';
import { Division } from 'types/tournament';

const usePinPlayer = (tournamentId: string, player: string, division: Division) => {
  const [pinnedPlayers, setPinnedPlayers] = useLocalStorage(pinnedPlayersKey, JSON.stringify({}));

  const isPinned = useMemo(() => {
    const parsedPinPlayers = JSON.parse(pinnedPlayers);
    return parsedPinPlayers[tournamentId]?.[division]?.includes(player);
  }, [division, pinnedPlayers, player, tournamentId]);

  const togglePin = () => {
    const parsedPinPlayers = JSON.parse(pinnedPlayers);

    if (!parsedPinPlayers[tournamentId]) {
      parsedPinPlayers[tournamentId] = {
        [division]: [player],
      };
    } else if (!parsedPinPlayers[tournamentId][division]) {
      parsedPinPlayers[tournamentId][division] = [player];
    } else if (parsedPinPlayers[tournamentId][division].includes(player)) {
      parsedPinPlayers[tournamentId][division] = parsedPinPlayers[tournamentId][division].filter(
        (p: string) => p !== player
      );
    } else {
      parsedPinPlayers[tournamentId][division].push(player);
    }

    if (parsedPinPlayers[tournamentId][division].length === 0) {
      delete parsedPinPlayers[tournamentId][division];
    }

    if (Object.keys(parsedPinPlayers[tournamentId]).length === 0) {
      delete parsedPinPlayers[tournamentId];
    }

    setPinnedPlayers(JSON.stringify(parsedPinPlayers));
  };

  return { isPinned, togglePin };
};

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

  const { toggleLike, isLiked } = useLikes();
  const isPinned = isLiked(player);

  return (
    <Button
      variant="outlined"
      color="secondary"
      size="sm"
      onClick={event => {
        event.stopPropagation();
        if (!isPinned) {
          sendEvent({
            category: 'Pin Player',
            action: 'click',
            label: `Pin Player: ${player} - ${division} - ${tournamentId}`,
          });
        }
        toggleLike(player);
      }}
    >
      {isPinned ? 'Unpin' : 'Pin'}
    </Button>
  );
};
