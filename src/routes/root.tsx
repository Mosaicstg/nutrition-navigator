// TODO::
// - Replace all instances of Zod with valibot. This will dreastically reduce the bundle size.
// - Refactor/clean-up types, functions and imports
// - Add better Error handling
// - Update tests to reflect new hooks and functions

import { useLoaderData } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import * as v from 'valibot';

// Components
import Loading from '~/components/Loading';
import LocationsResults from '~/components/LocationsResults';
import Map from '~/components/Map';
import MapFilters, { LoaderData } from '~/components/MapFilters';

// Hooks
import {
  allProgramsKeys,
  fetchAllPrograms
} from '~/hooks/useAllPrograms/useAllPrograms.tsx';
import { ProgramSchema } from '~/hooks/useAllPrograms/schema';

// CSS
import 'leaflet/dist/leaflet.css';
import { RootLoader } from './loader';

const useFilteredPrograms = (
  filters: {
    address: string;
    regions: Array<string>;
    programTypes: Array<string>;
    languages: Array<string>;
    venues: Array<string>;
    audiences: Array<string>;
    organizationName: string;
  } = {
    address: '',
    regions: [],
    programTypes: [],
    languages: [],
    venues: [],
    audiences: [],
    organizationName: ''
  }
) => {
  return useQuery({
    queryKey: allProgramsKeys.all,
    queryFn: fetchAllPrograms,
    retry: false,
    refetchOnWindowFocus: false,
    select: (data) => {
      const validatedPrograms = data.filter((program) => {
        const validation = v.safeParse(ProgramSchema, program);

        if (!validation.success) {
          console.error(
            `Program with name: "${program.name}" is invalid`,
            validation.issues
          );
        }

        return validation.success;
      });

      const validatedFilteredPrograms = validatedPrograms
        // Filter Programs by Regions
        .filter((program) => {
          const { regions: programRegions } = program;
          const { regions: filtersRegions } = filters;

          return (
            filtersRegions.length === 0 ||
            programRegions.filter((region) => filtersRegions.includes(region))
              .length
          );
        })
        // Filter Programs by Program Type
        .filter((program) => {
          const { 'program-types': programTypes } = program;
          const { programTypes: filtersProgramTypes } = filters;

          return (
            // If no user selected program types, show all Programs
            filtersProgramTypes.length === 0 ||
            programTypes.filter((programType) =>
              filtersProgramTypes.includes(programType)
            ).length
          );
        })
        // Filter Programs by Venues
        .filter((program) => {
          const { venues: programVenues } = program;
          const { venues: filtersVenues } = filters;

          return (
            // If no venues are set then all for all Programs
            filtersVenues.length === 0 ||
            programVenues.filter((programVenue) =>
              filtersVenues.includes(programVenue)
            ).length
          );
        })
        // Filter Programs by Languages
        .filter((program) => {
          const { languages: programLanguages } = program;
          const { languages: filtersLanguages } = filters;

          return (
            filtersLanguages.length === 0 ||
            programLanguages.filter((programLanguage) =>
              filtersLanguages.includes(programLanguage)
            ).length
          );
        })
        // Filter Programs by Audiences
        .filter((program) => {
          const { audiences: programAudiences } = program;
          const { audiences: filtersAudiences } = filters;

          return (
            // If no audiences are set then all for all Programs
            filtersAudiences.length === 0 ||
            programAudiences.filter((programAudience) =>
              filtersAudiences.includes(programAudience)
            ).length
          );
        })
        // Filters Programs by Org Name
        .filter((program) => {
          const { 'organization-name': programOrgName } = program;
          const { organizationName: filtersOrgName } = filters;

          return (
            filtersOrgName.length === 0 ||
            programOrgName.toLowerCase().includes(filtersOrgName.toLowerCase())
          );
        })
        // Filters Programs by Zip Code/Address
        .filter((program) => {
          const { 'zip-code': zipCode } = program;
          const { address } = filters;

          return address.length === 0 || zipCode === address;
        });

      return {
        programs: validatedPrograms,
        filteredPrograms: validatedFilteredPrograms
      };
    }
  });
};

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
