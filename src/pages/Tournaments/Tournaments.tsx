import { Heading } from 'components/Heading';
import { SEO } from 'components/SEO';
import { TournamentsCard } from 'components/TournamentsCard';
import { useGetTournamentByStatus } from 'hooks/useGetTournamentByStatus';

export const Tournaments = () => {
  const { data, isError, isLoading } = useGetTournamentByStatus();

  // console.log(data);
  // console.log(runningTournaments, finishedTournaments, upComingTournaments);
  // console.log('runningTournaments', runningTournaments);
  // console.log('finishedTournaments', finishedTournaments);
  // console.log('upComingTournaments', upComingTournaments);
  return (
    <div className="flex flex-col gap-4">
      <SEO title="TCG tournaments" />
      <Heading level="3">Latest Pokemon TCG Tournaments</Heading>

      {isError && <p>Error loading the tournaments</p>}
      {isLoading && <p>Loading tournament info...</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      {/* {runningTournaments && runningTournaments.length > 0 && (
        <TournamentsCard
          title="Tournaments currently in progress"
          tournaments={runningTournaments}
        />
      )} */}

      {/* {upComingTournaments && upComingTournaments.length > 0 && (
        <TournamentsCard title="Upcoming Tournaments" tournaments={upComingTournaments} />
      )} */}

      {/* {finishedTournaments && finishedTournaments.length > 0 && (
        <TournamentsCard title="Latest Tournaments" tournaments={finishedTournaments} />
      )} */}
    </div>
  );
};
