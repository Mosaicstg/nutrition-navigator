import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '~/api/fetch.ts';
import { Region, RegionSchema } from './schema.ts';
import * as v from 'valibot';

const fetchAllRegions = (): Promise<Region[]> => {
  // There's probably NEVER going to be more than 5 or 6 so for now querying the first 100
  // suits our use case.
  return fetchApi('/wp-json/wp/v2/region?per_page=100').then((res) =>
    res.json()
  );
};

export const allRegionsQueryKeys = {
  all: ['allRegions']
};

const useRegions = () => {
  return useQuery({
    queryKey: allRegionsQueryKeys.all,
    queryFn: fetchAllRegions,
    // Only run query on page load or component mount
    retry: false,
    refetchOnWindowFocus: false,
    select: (data) =>
      data.filter((region) => {
        const validatedRegion = v.safeParse(RegionSchema, region);

        if (!validatedRegion.success) {
          console.error(
            `Region with name ${region.name} is invalid`,
            validatedRegion.issues
          );
        }

        return validatedRegion.success;
      })
  });
};

export { useRegions };
