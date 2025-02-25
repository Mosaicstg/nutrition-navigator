import { type QueryClient } from '@tanstack/react-query';
import { type LoaderFunctionArgs } from 'react-router';
import { allProgramsKeys } from '~/hooks/useAllPrograms/useAllPrograms';

export const loader =
  (queryClient: QueryClient) =>
  ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);

    const address = searchParams.get('address') || '';
    const regions = searchParams.getAll('region[]') || [];
    const programTypes = searchParams.getAll('program-type[]') || [];
    const languages = searchParams.getAll('languages[]') || [];
    const audiences = searchParams.getAll('audience[]') || [];
    const venues = searchParams.getAll('venue[]') || [];
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
