import { useRef, useCallback } from 'react';
import { WindowScroller } from 'react-virtualized';
import { FixedSizeList } from 'react-window';

import { InnerElement } from './InnerElement';
import { StandingRow } from './StandingRow';

import type { Standing } from 'types/standing';
import type { Division, TournamentStatus } from 'types/tournament';

export const WindowScrollVirtualizedList = ({
    data,
    tournamentId,
    division,
    tournamentStatus,
    hideArchetypes = false,
}: {
    data: Standing[];
    tournamentId: string;
    division: Division;
    tournamentStatus?: TournamentStatus;
    hideArchetypes?: boolean;
}) => {
    const list = useRef<FixedSizeList>(null);

    // @ts-expect-error - scrollTop is not a valid prop
    const onScroll = useCallback(({ scrollTop }) => {
        list.current?.scrollTo(scrollTop);
    }, []);

    return (
        <>
            <WindowScroller onScroll={onScroll}>
                {/* @ts-expect-error - TODO: need to figure out what the types here are */}
                {({ registerChild }) => <div ref={registerChild} />}
            </WindowScroller>

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
                            hideArchetypes={hideArchetypes}
                            tournamentStatus={tournamentStatus}
                        />
                    );
                }}
            </FixedSizeList>
        </>
    );
};
