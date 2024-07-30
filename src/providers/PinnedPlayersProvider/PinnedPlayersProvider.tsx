import { useContext, useState, createContext, useEffect, useMemo, useCallback } from 'react';
import { pinnedPlayersKey } from 'constants/siteKeys';

export const LikedContext = createContext({});

const getPinnedPlayers = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const pinnedPlayers = window.localStorage.getItem(pinnedPlayersKey);
    if (pinnedPlayers) {
      return JSON.parse(pinnedPlayers);
    }
  }

  return [];
};

export const PinnedPlayersProvider = (props: any) => {
  const [likes, setLikes] = useState<any>(() => {
    return getPinnedPlayers();
  });

  const handleLike = useCallback(
    (id: any) => {
      const newLikes = [...likes, id];
      setLikes(newLikes);
      localStorage.setItem(pinnedPlayersKey, JSON.stringify(newLikes));
    },
    [likes]
  );

  const removeLike = useCallback(
    (id: any) => {
      const newLikes = likes.filter((like: any) => like !== id);
      setLikes(newLikes);
      localStorage.setItem(pinnedPlayersKey, JSON.stringify(newLikes));
    },
    [likes]
  );

  const toggleLike = useCallback(
    (id: any) => {
      if (likes.includes(id)) {
        removeLike(id);
      } else {
        handleLike(id);
      }
    },
    [likes, handleLike, removeLike]
  );

  const isLiked = useCallback(
    (id: any) => {
      return likes.includes(id);
    },
    [likes]
  );

  const value = useMemo(() => {
    return {
      likes,
      handleLike,
      removeLike,
      isLiked,
      toggleLike,
    };
  }, [likes]);

  return <LikedContext.Provider value={value}>{props.children}</LikedContext.Provider>;
};

export const useLikes = () => {
  const context = useContext(LikedContext);
  return context;
};
