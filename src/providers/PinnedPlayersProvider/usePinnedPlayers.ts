import { useContext } from 'react';
import { LikedContext } from './PinnedPlayersProvider';

export const usePinnedPlayers = () => {
  const context = useContext(LikedContext);
  return context;
};
