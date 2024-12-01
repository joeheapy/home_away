import ChartsContainer from '@/components/admin/chartContainer';
import StatsContainer from '@/components/admin/statsContainer';
import {
  ChartsLoadingContainer,
  StatsLoadingContainer,
} from '@/components/admin/loading';
import { Suspense } from 'react';

function AdminPage() {
  return (
    <>
      <Suspense fallback={<StatsLoadingContainer />}>
        <StatsContainer />
      </Suspense>
      <Suspense fallback={<ChartsLoadingContainer />}>
        <ChartsContainer />
      </Suspense>
    </>
  );
}

export default AdminPage;

