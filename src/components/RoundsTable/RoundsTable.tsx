import { getCountryFlag } from 'helpers/getCountryFlag';
import { getCountryCode } from 'utils/getCountryCode';
import { removeCountryFromName } from 'utils/removeCountryFromName';
import { ArchetypeSprites } from 'components/ArchetypeSprites';

import type { RoundsTableProps } from './types';
import type { FC } from 'react';

import { colorMap } from 'utils/ColorMap';

import type { Round } from 'types/standing';

export const RoundRow = ({
    round,
    roundNum,
}: {
    round: Round;
    roundNum: number | string;
}) => {
    return (
        <li className="pl-3 pr-6 py-4">
            <div className="flex justify-between align-top">
                <div className="text-left">
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        Round {roundNum} - Table {round.table}
                    </p>
                    <p>
                        {removeCountryFromName(round.name)}{' '}
                        {getCountryFlag(getCountryCode(round.name))}
                    </p>
                </div>
                <div className="flex gap-2 items-center">
                    {round.decklist && (
                        <ArchetypeSprites
                            size="small"
                            decklist={round.decklist}
                        />
                    )}
                    <p className={`${colorMap[round.result]} font-bold`}>
                        {round.result}
                    </p>
                </div>
            </div>
        </li>
    );
};

export const RoundsTable: FC<RoundsTableProps> = ({ rounds }) => {
    return (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {Object.keys(rounds)
                .reverse()
                .map((round) => {
                    return (
                        <RoundRow
                            key={round}
                            roundNum={round}
                            round={rounds[round]}
                        />
                    );
                })}
        </ul>
    );
};
