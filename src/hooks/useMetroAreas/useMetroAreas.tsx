import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '../../api/fetch.ts';
import { MetroArea, MetroAreaSchema } from './schema.ts';

const fetchAllMetroAreas = (): Promise<MetroArea[]> => {
  // There's probably NEVER going to be more than 5 or 6 so for now querying the first 100
  // suits our use case.
  return fetchApi('/wp-json/wp/v2/metro-area?per_page=100').then((res) =>
    res.json()
  );
};

const useMetroAreas = () => {
  return useQuery({
    queryKey: ['allMetroAreas'],
    queryFn: fetchAllMetroAreas,
    // Only run query on page load or component mount
    retry: false,
    refetchOnWindowFocus: false,
    select: (data) =>
      data.filter((metroArea) => {
        const validatedMetroArea = MetroAreaSchema.safeParse(metroArea);

        if (!validatedMetroArea.success) {
          console.error(
            `Metro Area with name ${metroArea.name} is invalid`,
            validatedMetroArea.error
          );
        }

        return validatedMetroArea.success;
      })
  });
};

export default useMetroAreas;
