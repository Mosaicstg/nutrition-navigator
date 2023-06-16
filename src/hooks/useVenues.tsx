import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '../api/fetch.ts';

type Venue = {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
  link: string;
};

const fetchAllVenues = () => {
  return fetchApi('/wp-json/wp/v2/venue?per_page=100').then((res) =>
    res.json()
  );
};

const useVenues = () => {
  return useQuery<Venue[]>({
    queryKey: ['allVenues'],
    queryFn: fetchAllVenues,
    // Only run query on page load or component mount
    retry: false
  });
};

export default useVenues;
