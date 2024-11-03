import CategoriesList from '@/components/home/CategoriesList';
import PropertiesContainer from '@/components/home/PropertiesContainer';
import LoadingCards from '@/components/card/LoadingCards';
import { Suspense } from 'react';

// searchParams are used to pass the search and category from the url to the component
function HomePage({searchParams}: {searchParams: {category?: string, search?: string};
}) {
  return (
    <section>
      <CategoriesList 
        category={searchParams.category} 
        search={searchParams.search}
      />
      <Suspense fallback={<LoadingCards />}>
        <PropertiesContainer 
          category={searchParams.category} 
          search={searchParams.search}
        />
      </Suspense>
    </section>
  );
}
export default HomePage;