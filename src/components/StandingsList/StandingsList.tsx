import { forwardRef, useRef, useImperativeHandle } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

import { StandingRow } from './StandingRow';

import type { ListChildComponentProps } from 'react-window';
import type { Size } from 'react-virtualized-auto-sizer';
import type { StandingsListProps } from './types';

const innerElementType = forwardRef(({ ...rest }: ListChildComponentProps, ref) => {
  // @ts-expect-error
  return <ul ref={ref} {...rest} className="divide-y divide-gray-200 dark:divide-gray-700" />;
});

// pass forward ref to component
export const StandingsList = forwardRef(
  (
    {
      standings,
      tournamentId,
      division,
      hideArchetypes = false,
      fixedContainerHeight = false,
    }: StandingsListProps,
    ref
  ) => {
    const listRef = useRef(null);

    useImperativeHandle(ref, () => listRef.current);

    if (!standings) {
      return null;
    }

    if (fixedContainerHeight) {
      return (
        <div className="h-full">
          <AutoSizer>
            {/* @ts-ignore */}
            {({ height, width }: Size) => {
              return (
                <List
                  ref={listRef}
                  innerElementType={innerElementType}
                  itemData={standings}
                  itemCount={standings.length}
                  itemSize={77}
                  height={height}
                  width={width}
                >
                  {({ data, index, style }) => {
                    return (
                      <StandingRow
                        tournamentId={tournamentId}
                        division={division}
                        player={data[index]}
                        style={style}
                        hideArchetypes={hideArchetypes}
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
      <List
        ref={listRef}
        innerElementType={innerElementType}
        itemData={standings}
        itemCount={standings.length}
        itemSize={77}
        height={77 * standings.length}
        width="100%"
      >
        {({ data, index, style }) => {
          return (
            <StandingRow
              tournamentId={tournamentId}
              division={division}
              player={data[index]}
              style={style}
              hideArchetypes={hideArchetypes}
            />
          );
        }}
      </List>
    );
  }
);
