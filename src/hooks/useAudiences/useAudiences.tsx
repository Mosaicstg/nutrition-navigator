import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '../../api/fetch.ts';
import { Audience, AudienceSchema } from './schema.ts';

const fetchAllAudiences = () => {
  return fetchApi('/wp-json/wp/v2/audience?per_page=100').then((res) =>
    res.json()
  );
};

const useAudiences = () => {
  return useQuery<Audience[]>({
    queryKey: ['allAudiences'],
    queryFn: fetchAllAudiences,
    // Only run query on page load or component mount
    retry: false,
    refetchOnWindowFocus: false,
    select: (data) =>
      data.filter((audience) => {
        const validation = AudienceSchema.safeParse(audience);

        if (!validation.success) {
          console.error(
            `Audience with the name ${audience.name} is invalid`,
            validation.error
          );
        }

        return validation.success;
      })
  });
};

export default useAudiences;
