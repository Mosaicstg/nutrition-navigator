import { type QueryClient } from '@tanstack/react-query';
import { type LoaderFunctionArgs } from 'react-router';
import { fetchApi } from '~/api/fetch';
import { type Program } from './schema';

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

export const loader =
  (queryClient: QueryClient) =>
  ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);

    const address = searchParams.get('address') || '';
    const regions = searchParams.getAll('regions[]') || [];
    const programTypes = searchParams.getAll('program-types[]') || [];
    const languages = searchParams.getAll('languages[]') || [];
    const audiences = searchParams.getAll('audiences[]') || [];
    const venues = searchParams.getAll('venues[]') || [];
    const organizationName = searchParams.get('organization-name') || '';

    // Invalidate the query cache if the user has initiated a new search
    if (queryClient.getQueryData(allProgramsKeys.all)) {
      queryClient.invalidateQueries();
    }

    return {
      address,
      regions,
      programTypes,
      languages,
      venues,
      audiences,
      organizationName
    };
  };

export type RootLoader = typeof loader;
