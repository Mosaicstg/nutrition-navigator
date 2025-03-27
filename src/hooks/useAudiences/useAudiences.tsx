import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '~/api/fetch.ts';
import { Audience, AudienceSchema } from './schema.ts';
import { safeParse } from 'valibot';

const fetchAllAudiences = (): Promise<Audience[]> => {
  return fetchApi('/wp-json/wp/v2/audience?per_page=100').then((res) =>
    res.json()
  );
};

const useAudiences = () => {
  return useQuery({
    queryKey: ['allAudiences'],
    queryFn: fetchAllAudiences,
    // Only run query on page load or component mount
    retry: false,
    refetchOnWindowFocus: false,
    select: (data) =>
      data.filter((audience) => {
        const validation = safeParse(AudienceSchema, audience);

        if (!validation.success) {
          console.error(
            `Audience with the name ${audience.name} is invalid`,
            validation.issues
          );
        }

        return validation.success;
      })
  });
};

export { useAudiences };
