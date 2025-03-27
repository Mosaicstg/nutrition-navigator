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

export const loader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const searchParams = new URLSearchParams(url.search);

  const address = searchParams.get('address') || '';
  const regions = searchParams.getAll('regions[]') || [];
  const programTypes = searchParams.getAll('program-types[]') || [];
  const languages = searchParams.getAll('languages[]') || [];
  const audiences = searchParams.getAll('audiences[]') || [];
  const venues = searchParams.getAll('venues[]') || [];
  const organizationName = searchParams.get('organization-name') || '';

  // NOTE: On production, specifically on the homepage, the homepage get REDIRECTED and the search query params get modified
  // - `?regions[]=philadeplhia` -> `?regions[0]=philadelphia`
  // - `?regions[]=philadeplhia&regions[]=dc` -> `?regions[0]=philadelphia&regions[1]=dc`
  // As of result we have to double check the query params and update the search params accordingly
  for (const [key, value] of searchParams.entries()) {
    if (-1 !== key.indexOf('regions[') && !regions.includes(value)) {
      regions.push(value);
    }

    if (-1 !== key.indexOf('program-types[') && !programTypes.includes(value)) {
      programTypes.push(value);
    }

    if (-1 !== key.indexOf('languages[') && !languages.includes(value)) {
      languages.push(value);
    }

    if (-1 !== key.indexOf('audiences[') && !audiences.includes(value)) {
      audiences.push(value);
    }

    if (-1 !== key.indexOf('venues[') && !venues.includes(value)) {
      venues.push(value);
    }
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
