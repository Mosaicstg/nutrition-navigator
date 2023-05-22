import { useQuery } from 'react-query';
import { fetchApi } from '../api/fetch.ts';

const fetchAllAudiences = () => {
  return fetchApi('/wp-json/wp/v2/audience?per_page=100').then((res) =>
    res.json()
  );
};

const useAudiences = () => {
  return useQuery('allAudiences', fetchAllAudiences, {
    // Only run query on page load or component mount
    retry: false
  });
};

export default useAudiences;
