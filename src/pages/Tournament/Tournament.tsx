import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { useGetTournament } from 'queries/useGetTournament';

import { LoadingPokeball } from 'components/LoadingPokeball';
import { StandingsCard } from 'components/StandingsCard';
import { Notice } from 'components/Notice';

import { SEO } from 'components/SEO';
import { Card } from 'components/Card';

import { useFuse } from 'hooks/useFuse';

import type {
    Tournament as TournamentType,
    TournamentApiResponse,
} from 'types/tournament';

const fuseOptions = {
    shouldSort: true,
    threshold: 0.1,
    location: 0,
    distance: 100,
    keys: ['name'],
};

const TournamentStandings = ({
    tournament,
}: {
    tournament: TournamentType;
}) => {
    const { id: tournamentId, tournamentStatus } = tournament;

    const { data: standings = [], isPending } = useGetTournament({
        tournamentId,
        select: useCallback((data: TournamentApiResponse) => {
            const divisions = data.tournament_data;
            const mastersDivision = divisions.find(
                (foundDivision) => foundDivision.division === 'masters'
            );
            return mastersDivision?.data || [];
        }, []),
    });

    // @ts-expect-error -- TODO: Fix this
    const { query, onSearch, searching, hits } = useFuse(
        standings,
        fuseOptions
    );

    if (isPending) {
        return (
            <div className="flex flex-col justify-center items-center">
                <LoadingPokeball size="100" alt="Loading standings...</p>" />
            </div>
        );
    }

    if (tournamentStatus === 'check-in' || tournamentStatus === 'not-started') {
        return (
            <Notice status="info">This tournament hasn't started yet</Notice>
        );
    }

    return (
        <>
            <Card>
                <div className="flex justify-between">
                    <div className="w-full sm:w-auto sm:flex">
                        <div className="relative w-full sm:w-48 md:w-64 lg:w-96 sm:mr-3 mb-3 sm:mb-0">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg
                                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search player"
                                onChange={(e) =>
                                    onSearch(e.target.value.trim())
                                }
                            />
                        </div>
                    </div>
                </div>
            </Card>

            <div className="flex-grow">
                <StandingsCard
                    standings={hits}
                    tournamentId={tournamentId}
                    title={
                        searching
                            ? `Search results for ${query}`
                            : 'Current masters standings'
                    }
                    division="masters"
                />
            </div>
        </>
    );
};

export const Tournament = () => {
    const { tournamentId } = useParams() as { tournamentId: string };

    const { data, isPending, isError } = useGetTournament({
        tournamentId: tournamentId,
        select: (data) => data.tournament,
    });

    if (isPending) {
        return (
            <div className="flex flex-col justify-center items-center">
                <LoadingPokeball size="100" alt="Loading standings...</p>" />
            </div>
        );
    }

    if (isError) {
        return <p>No tournament found</p>;
    }

    return (
        <>
            <SEO title={`${data.name}`} />

            <div className="flex-grow flex flex-col gap-4">
                <TournamentStandings tournament={data} />
            </div>
        </>
    );
};
