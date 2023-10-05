import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '../../api/fetch.ts';
import { Region, RegionSchema } from './schema.ts';

const fetchAllRegions = (): Promise<Region[]> => {
  // There's probably NEVER going to be more than 5 or 6 so for now querying the first 100
  // suits our use case.
  return fetchApi('/wp-json/wp/v2/region?per_page=100').then((res) =>
    res.json()
  );
};

const useRegions = () => {
  return useQuery({
    queryKey: ['allRegions'],
    queryFn: fetchAllRegions,
    // Only run query on page load or component mount
    retry: false,
    refetchOnWindowFocus: false,
    select: (data) =>
      data.filter((region) => {
        const validatedRegion = RegionSchema.safeParse(region);

        if (!validatedRegion.success) {
          console.error(
            `Region with name ${region.name} is invalid`,
            validatedRegion.error
          );
        }

        return validatedRegion.success;
      })
  });
};

export default useRegions;
