import { useLoaderData } from 'react-router';
import type { RootLoader } from './loader';

// Components
import Loading from '~/components/Loading';
import LocationsResults from '~/components/LocationsResults';
import Map from '~/components/Map';
import { MapFilters } from '~/components/MapFilters';

// Hooks
import { useFilteredPrograms } from './use-filtered-programs';

// CSS
import 'leaflet/dist/leaflet.css';
import '~/index.scss';
import React from 'react';

type FiltersButtonProps = {
  filtersOpen: boolean;
  setFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function FiltersButton(props: FiltersButtonProps) {
  const { filtersOpen, setFiltersOpen } = props;
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!buttonRef.current) return;

    if (!filtersOpen && window.innerWidth > 758) {
      // Focus the button ON DESKTOP when the user closes the
      // filters sidebar form
      buttonRef.current.focus();
    }
  }, [filtersOpen, buttonRef]);

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`nutrition-navigator__floating-filters-toggle-button ${filtersOpen ? 'nutrition-navigator__floating-filters-toggle-button--open' : ''}`}
      onClick={() => setFiltersOpen((open) => !open)}
      disabled={filtersOpen}
      tabIndex={0}
    >
      Filters
    </button>
  );
}

export function Root() {
  const data = useLoaderData<RootLoader>();
  const {
    data: filteredProgramsData,
    status,
    isLoading
  } = useFilteredPrograms(data);
  const [filtersOpen, setFiltersOpen] = React.useState(false);

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
    <div
      className={`nutrition-navigator__map ${filtersOpen ? 'nutrition-navigator__map--filters-open' : ''}`}
    >
      {isLoading ? (
        <Loading />
      ) : 'success' === status ? (
        <>
          {/**
           * TODO: send down filtersOpen down to new button and update UI on the top level button level
           */}
          <MapFilters
            {...filterProps}
            showFilters={filtersOpen}
            setShowFilters={setFiltersOpen}
            programs={filteredProgramsData.programs}
          />
          <FiltersButton {...{ filtersOpen, setFiltersOpen }} />
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
