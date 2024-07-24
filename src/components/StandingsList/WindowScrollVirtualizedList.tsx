import { useRef, useCallback } from 'react';
import { WindowScroller } from 'react-virtualized';
import { FixedSizeList } from 'react-window';

import { InnerElement } from './InnerElement';
import { StandingRow } from './StandingRow';

import type { Standing } from 'types/standing';

export const WindowScrollVirtualizedList = ({
  data,
  tournamentId,
  division,
}: {
  data: Standing[];
  tournamentId: string;
  division: any;
}) => {
  const list = useRef<any>(null);

  // @ts-expect-error
  const onScroll = useCallback(({ scrollTop }) => {
    list.current?.scrollTo(scrollTop);
  }, []);

  return (
    <>
      <WindowScroller onScroll={onScroll}>{() => <div />}</WindowScroller>

      <FixedSizeList
        ref={list}
        itemCount={data.length}
        itemSize={77}
        width="100%"
        height={window.innerHeight}
        style={{ height: '100% !important' }}
        innerElementType={InnerElement}
      >
        {({ index, style }) => {
          return (
            <StandingRow
              tournamentId={tournamentId}
              division={division}
              player={data[index]}
              style={style}
            />
          );
        }}
      </FixedSizeList>
    </>
  );
};
