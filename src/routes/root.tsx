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
import { flushSync } from 'react-dom';

type FiltersButtonProps = {
  filtersOpen: boolean;
  setFiltersOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ref: React.RefObject<HTMLButtonElement | null>;
  mobileButtonRef?: React.RefObject<HTMLButtonElement | null>;
};

function FiltersButton({
  filtersOpen,
  setFiltersOpen,
  ref,
  mobileButtonRef
}: FiltersButtonProps) {
  function handleClick() {
    // Force the UI to update first before focusing on the filters form button
    flushSync(() => {
      setFiltersOpen(() => true);
    });

    // Wait till the next tick to focus
    // On the next tick the filters are focusable
    setTimeout(() => {
      mobileButtonRef?.current?.focus();
    });
  }

  return (
    <button
      ref={ref}
      type="button"
      className={`nutrition-navigator__floating-filters-toggle-button ${filtersOpen ? 'nutrition-navigator__floating-filters-toggle-button--open' : ''}`}
      onClick={handleClick}
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
  const [filtersFormInert, setFiltersFormInert] = React.useState(
    () => !filtersOpen && window.innerWidth > 992
  );
  const desktopFiltersToggleButtonRef = React.useRef<HTMLButtonElement>(null);
  const filtersFormToggleButtonRef = React.useRef<HTMLButtonElement>(null);

  const filterProps = {
    address: data?.address || '',
    regions: data?.regions || [],
    programTypes: data?.programTypes || [],
    languages: data?.languages || [],
    venues: data?.venues || [],
    audiences: data?.audiences || [],
    organizationName: data?.organizationName || ''
  };

  React.useEffect(() => {
    setFiltersFormInert(!filtersOpen && window.innerWidth > 992);

    const abortController = new AbortController();

    window.addEventListener(
      'resize',
      () => {
        setFiltersFormInert(() => {
          return window.innerWidth > 992;
        });
      },
      {
        signal: abortController.signal
      }
    );

    return () => {
      abortController.abort();
    };
  }, [filtersOpen]);

  return (
    <div
      className={`nutrition-navigator__map ${filtersOpen ? 'nutrition-navigator__map--filters-open' : ''}`}
    >
      {isLoading ? (
        <Loading />
      ) : 'success' === status ? (
        <>
          <MapFilters
            {...filterProps}
            showFilters={filtersOpen}
            setShowFilters={setFiltersOpen}
            programs={filteredProgramsData.programs}
            desktopFiltersToggleButtonRef={desktopFiltersToggleButtonRef}
            filtersFormToggleButtonRef={filtersFormToggleButtonRef}
            filtersFormInert={filtersFormInert}
          />
          <FiltersButton
            {...{ filtersOpen, setFiltersOpen }}
            ref={desktopFiltersToggleButtonRef}
            mobileButtonRef={filtersFormToggleButtonRef}
          />
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
