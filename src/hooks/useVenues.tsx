import { useQuery } from 'react-query';
import { fetchApi } from '../api/fetch.ts';

const fetchAllVenues = () => {
  return fetchApi('/wp-json/wp/v2/venue?per_page=100').then((res) =>
    res.json()
  );
};

const useVenues = () => {
  return useQuery('allVenues', fetchAllVenues, {
    // Only run query on page load or component mount
    retry: false
  });
};

export default useVenues;
