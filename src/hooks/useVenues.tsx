import { useQuery } from 'react-query';

const fetchAllVenues = () => {
  return fetch('/wp-json/wp/v2/venue?per_page=100').then((res) => res.json());
};

const useVenues = () => {
  return useQuery('allVenues', fetchAllVenues);
};

export default useVenues;
