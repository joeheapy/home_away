import ChartsContainer from '@/components/admin/chartContainer';
import StatsContainer from '@/components/admin/statsContainer';
import {
  ChartLoadingContainer,
  StatsLoadingContainer,
} from '@/components/admin/loading';
import { Suspense } from 'react';

function AdminPage() {
  return (
    <>
      <Suspense fallback={<StatsLoadingContainer />}>
        <StatsContainer />
      </Suspense>
      <Suspense fallback={<ChartLoadingContainer />}>
        <ChartsContainer />
      </Suspense>
    </>
  );
}

export default AdminPage;

