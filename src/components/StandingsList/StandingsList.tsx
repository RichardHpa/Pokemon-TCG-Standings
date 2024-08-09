import { forwardRef, useRef, useImperativeHandle } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

import { StandingRow } from './StandingRow';
import { InnerElement } from './InnerElement';
import { WindowScrollVirtualizedList } from './WindowScrollVirtualizedList';

import type { Size } from 'react-virtualized-auto-sizer';
import type { StandingsListProps } from './types';
import type { FixedSizeList } from 'react-window';

// pass forward ref to component
export const StandingsList = forwardRef(
  (
    {
      standings,
      tournamentId,
      division,
      hideArchetypes = false,
      fixedContainerHeight = false,
      tournamentStatus,
    }: StandingsListProps,
    ref
  ) => {
    const listRef = useRef<FixedSizeList>(null);

    useImperativeHandle(ref, () => listRef.current);

    if (!standings) {
      return null;
    }

    if (fixedContainerHeight) {
      return (
        <div className="h-full">
          <AutoSizer>
            {({ height, width }: Size) => {
              return (
                <List
                  ref={listRef}
                  itemCount={standings.length}
                  itemSize={77}
                  width={width}
                  height={height}
                  innerElementType={InnerElement}
                >
                  {({ index, style }) => {
                    return (
                      <StandingRow
                        tournamentId={tournamentId}
                        division={division}
                        player={standings[index]}
                        style={style}
                        hideArchetypes={hideArchetypes}
                        tournamentStatus={tournamentStatus}
                      />
                    );
                  }}
                </List>
              );
            }}
          </AutoSizer>
        </div>
      );
    }

    return (
      <WindowScrollVirtualizedList
        data={standings}
        division={division}
        tournamentId={tournamentId}
        hideArchetypes={hideArchetypes}
        tournamentStatus={tournamentStatus}
      />
    );
  }
);
