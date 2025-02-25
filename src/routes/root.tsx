// TODO::
// - Replace all instances of Zod with valibot. This will dreastically reduce the bundle size.
// - Refactor/clean-up types, functions and imports
// - Add better Error handling
// - Update tests to reflect new hooks and functions

import { useLoaderData } from 'react-router';
import { type RootLoader } from './loader';

// Components
import Loading from '~/components/Loading';
import LocationsResults from '~/components/LocationsResults';
import Map from '~/components/Map';
import MapFilters, { type LoaderData } from '~/components/MapFilters';

// Hooks
import { useFilteredPrograms } from './use-filtered-programs';

// CSS
import 'leaflet/dist/leaflet.css';

export function Root() {
  const data = useLoaderData<LoaderData<ReturnType<RootLoader>>>();
  const {
    data: filteredProgramsData,
    status,
    isLoading
  } = useFilteredPrograms(data);

  const filterProps = {
    address: data?.address || '',
    regions: data?.regions || [],
    programTypes: data?.programTypes || [],
    languages: data?.languages || [],
    venues: data?.venues || [],
    audiences: data?.audiences || [],
    organizationName: data?.organizationName || ''
  };

  return (
    <div className={'nutrition-navigator__map'}>
      <MapFilters {...filterProps} />
      {isLoading ? (
        <Loading />
      ) : 'success' === status ? (
        <>
          <LocationsResults locations={filteredProgramsData.filteredPrograms} />
          <Map
            filteredLocations={filteredProgramsData.filteredPrograms}
            programs={filteredProgramsData.programs}
          />
        </>
      ) : (
        <p>Something went wrong</p>
      )}
    </div>
  );
}
