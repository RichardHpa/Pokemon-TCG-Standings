import { useRef, useCallback, forwardRef } from 'react';
import { WindowScroller } from 'react-virtualized';
import { FixedSizeList } from 'react-window';

import { StandingRow } from 'components/StandingsList/StandingRow';

import { useGetTournament } from 'queries/useGetTournament';

import type { ListChildComponentProps } from 'react-window';
import type { Standing } from 'types/standing';

const innerElementType = forwardRef(
    ({ ...rest }: ListChildComponentProps, ref) => {
        return (
            <ul
                // @ts-expect-error -- TODO: Fix this
                ref={ref}
                {...rest}
                className="divide-y divide-gray-200 dark:divide-gray-700"
            />
        );
    }
);

const Table = ({
    data: apiData,
}: {
    data: Standing[];
    containerRef: unknown;
}) => {
    const list = useRef<FixedSizeList>(null);

    // @ts-expect-error - scrollTop is not a valid prop
    const onScroll = useCallback(({ scrollTop }) => {
        list.current?.scrollTo(scrollTop);
    }, []);

    return (
        <>
            <WindowScroller onScroll={onScroll}>{() => <div />}</WindowScroller>

            <FixedSizeList
                ref={list}
                itemCount={apiData.length}
                itemSize={77}
                width="100%"
                height={window.innerHeight}
                style={{ height: '100% !important' }}
                innerElementType={innerElementType}
            >
                {({ index, style }) => {
                    return (
                        <StandingRow
                            tournamentId="0000127"
                            division="masters"
                            player={apiData[index]}
                            style={style}
                        />
                    );
                }}
            </FixedSizeList>
        </>
    );
};

export const Test = () => {
    const { data, isLoading, isError } = useGetTournament({
        tournamentId: '0000127',
        select: (data) => {
            const mastersDivision = data.tournament_data.find(
                (division) => division.division === 'masters'
            );
            return mastersDivision?.data || [];
        },
    });

    const containerRef = useRef(null);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError || !data) {
        return <p>Error...</p>;
    }

    return (
        <div className="container mx-auto px-4 flex flex-col flex-grow gap-4">
            <div className="p-4 bg-orange-500">Header</div>
            <div ref={containerRef} className="">
                <Table containerRef={containerRef} data={data} />
            </div>
            <div className="p-4 bg-yellow-500">Footer</div>
        </div>
    );
};
