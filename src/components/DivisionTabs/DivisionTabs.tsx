import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { Tabs, NavTab } from 'components/Tabs';

import type { FC } from 'react';
import type { Division, DivisionMap } from 'types/tournament';

interface DivisionTabsProps {
    tournamentId: string;
    divisionsObject: DivisionMap<number | string>;
}

const getSortedDivisions = (
    divisions: DivisionMap<number | string>
): Division[] => {
    // Define the sort order
    const sortOrder = ['masters', 'seniors', 'juniors', 'juniorsseniors'];

    // Filter out divisions with a value of 0 and keep only the non-zero divisions
    const filteredDivisions = Object.entries(divisions)
        .filter(([_key, value]) => value !== 0 && value !== '0')
        .map(([key]) => key) as Division[];

    // Sort the filtered divisions based on the predefined order
    const sortedDivisions = filteredDivisions.sort(
        (a, b) => sortOrder.indexOf(a) - sortOrder.indexOf(b)
    );

    return sortedDivisions;
};

export const DivisionTabs: FC<DivisionTabsProps> = ({
    divisionsObject,
    tournamentId,
}) => {
    const location = useLocation();
    const isBasePath = location.pathname === `/tournaments/${tournamentId}`;
    const divisions = useMemo(() => {
        return getSortedDivisions(divisionsObject);
    }, [divisionsObject]);

    return (
        <Tabs>
            {divisions.map((division) => (
                <NavTab
                    to={division}
                    key={division}
                    active={isBasePath && division === divisions[0]}
                >
                    {division.charAt(0).toUpperCase() + division.slice(1)}{' '}
                    <span className="inline-flex items-center justify-center px-2 h-4 ms-2 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full">
                        {divisionsObject[division]}
                    </span>
                </NavTab>
            ))}
        </Tabs>
    );
};
