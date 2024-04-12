import { useRef, useEffect, useState, useCallback } from 'react';

import { StandingsList } from 'components/StandingsList';
import { ContentCard } from 'components/ContentCard';

import type { FC } from 'react';
import type { Standing } from 'types/standing';

interface StandingsCardProps {
  standings?: Standing[];
  tournamentId: string;
  title: string;
  scrollToPlayerIndex?: number;
  allowReset?: boolean;
}

export const StandingsCard: FC<StandingsCardProps> = ({
  standings,
  tournamentId,
  title,
  scrollToPlayerIndex,
  allowReset = false,
}) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [initialDelay, setInitialDelay] = useState(false);

  useEffect(() => {
    // this is to demonstrate a case where the rendering
    // of the variable size list is delayed for whatever
    // reason. E.g. the surrounding container dimensions
    // need to be determined first before the list can scroll in the use effect below
    setTimeout(() => setInitialDelay(true), 100);
  }, []);

  useEffect(() => {
    if (scrollToPlayerIndex && listRef.current) {
      // @ts-expect-error
      listRef.current.scrollToItem(scrollToPlayerIndex, 'start');
    }
  }, [initialDelay, scrollToPlayerIndex]);

  const resetScroll = useCallback(() => {
    if (scrollToPlayerIndex && listRef.current) {
      // @ts-expect-error
      listRef.current.scrollToItem(scrollToPlayerIndex, 'start');
    }
  }, [scrollToPlayerIndex]);

  return (
    <ContentCard
      title={title}
      action={
        allowReset && (
          <button
            type="button"
            onClick={resetScroll}
            className="px-3 py-2 text-xs font-medium text-center text-gray-900 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-lg hover:bg-gray-100 hover:text-blue-700 dark:hover:text-white dark:hover:bg-gray-600"
          >
            reset
          </button>
        )
      }
    >
      <StandingsList standings={standings} tournamentId={tournamentId} ref={listRef} />
    </ContentCard>
  );
};
