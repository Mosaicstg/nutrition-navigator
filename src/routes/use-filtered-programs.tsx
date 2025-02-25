import { useQuery } from '@tanstack/react-query';
import * as v from 'valibot';
import { fetchApi } from '~/api/fetch';
import { Program, ProgramSchema } from './schema';

export const fetchAllPrograms = (): Promise<Program[]> => {
  return fetchApi('/wp-json/nutrition-navigator/v1/programs').then((res) =>
    res.json()
  );
};

export const allProgramsKeys = {
  all: ['allPrograms'] as const,
  filtered: (filters: {
    address: string;
    regions: Array<string>;
    programTypes: Array<string>;
    languages: Array<string>;
    venues: Array<string>;
    audiences: Array<string>;
    organizationName: string;
  }) => [...allProgramsKeys.all, { filters }] as const
};

export const MapFiltersSchema = v.object({
  'program-types': v.array(v.string()),
  venues: v.array(v.string()),
  audiences: v.array(v.string()),
  'organization-name': v.string(),
  address: v.string(),
  regions: v.array(v.string()),
  languages: v.array(v.string())
});

export type MapFilters = v.InferOutput<typeof MapFiltersSchema>;

export const useFilteredPrograms = (
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
