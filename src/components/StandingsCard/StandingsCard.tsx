import { useRef, useEffect, useState, useCallback } from 'react';
import { StandingsList } from 'components/StandingsList';
import { ContentCard } from 'components/ContentCard';
import { Button } from 'components/Button';

import { useGetTournament } from 'queries/useGetTournament';

import type { FC } from 'react';
import type { Standing } from 'types/standing';
import type { Division } from 'types/tournament';
import type { FixedSizeList } from 'react-window';

interface StandingsCardProps {
    standings?: Standing[];
    tournamentId: string;
    title: string;
    scrollToPlayerIndex?: number;
    allowReset?: boolean;
    division: Division;
    hideArchetypes?: boolean;
    fixedContainerHeight?: boolean;
}

export const StandingsCard: FC<StandingsCardProps> = ({
    standings,
    tournamentId,
    title,
    scrollToPlayerIndex,
    allowReset = false,
    division,
    hideArchetypes = false,
    fixedContainerHeight = false,
}) => {
    const listRef = useRef<FixedSizeList>(null);
    const [initialDelay, setInitialDelay] = useState(false);

    const { data: tournament } = useGetTournament({
        tournamentId,
        select: (data) => data.tournament,
    });

    useEffect(() => {
        // this is to demonstrate a case where the rendering
        // of the variable size list is delayed for whatever
        // reason. E.g. the surrounding container dimensions
        // need to be determined first before the list can scroll in the use effect below
        setTimeout(() => setInitialDelay(true), 100);
    }, []);

    useEffect(() => {
        if (scrollToPlayerIndex && listRef.current) {
            listRef.current.scrollToItem(scrollToPlayerIndex, 'start');
        }
    }, [initialDelay, scrollToPlayerIndex]);

    const resetScroll = useCallback(() => {
        if (scrollToPlayerIndex && listRef.current) {
            listRef.current.scrollToItem(scrollToPlayerIndex, 'start');
        }
    }, [scrollToPlayerIndex]);

    return (
        <ContentCard
            title={title}
            action={
                allowReset && (
                    <Button size="xs" color="secondary" onClick={resetScroll}>
                        reset
                    </Button>
                )
            }
        >
            <StandingsList
                standings={standings}
                tournamentId={tournamentId}
                tournamentStatus={tournament?.tournamentStatus}
                ref={listRef}
                division={division}
                hideArchetypes={hideArchetypes}
                fixedContainerHeight={fixedContainerHeight}
            />
        </ContentCard>
    );
};
