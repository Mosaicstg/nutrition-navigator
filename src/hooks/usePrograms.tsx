import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '../api/fetch.ts';
import { Filters } from '../types.ts';

interface Program {
  'program-name': string;
  url: string;
  latitude: number;
  longitude: number;
  'organization-name': string;
  'organization-url': string;
  'program-types': string[];
  audiences: string[];
  venues: string[];
  description?: string;
  address?: string;
  name?: string;
  'contact-phone'?: string;
  'contact-email'?: string;
  'dates-times-offered'?: string;
}

const fetchAllPrograms = () => {
  return fetchApi('/wp-json/nutrition-navigator/v1/programs').then((res) =>
    res.json()
  );
};

const usePrograms = (filters: Filters) => {
  return useQuery<Program[]>({
    queryKey: ['allPrograms'],
    queryFn: fetchAllPrograms,
    // Only run query on page load or component mount
    retry: false,
    select: (data) => {
      return data.filter((program) => {
        const {
          'program-types': programTypes,
          venues,
          audiences,
          'organization-name': organizationName
        } = program;

        const {
          'organization-name': filterOrganizationName,
          venues: filterVenues,
          audiences: filtersAudiences,
          'program-types': filtersProgramTypes
        } = filters;

        const hasProgramTypes = programTypes.filter((programType) =>
          filtersProgramTypes.includes(programType)
        ).length;

        const hasVenues = venues.filter((venue) =>
          filterVenues.includes(venue)
        ).length;

        const hasAudiences = audiences.filter((audience) =>
          filtersAudiences.includes(audience)
        ).length;

        const hasOrgName = organizationName.includes(filterOrganizationName);

        return hasProgramTypes || hasVenues || hasAudiences || hasOrgName;
      });
    }
  });
};

export default usePrograms;
