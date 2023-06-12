import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '../api/fetch.ts';

interface Audience {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
  link: string;
}

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
    select: (data) => data
  });
};

export default useAudiences;
