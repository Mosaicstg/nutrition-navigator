import { useQuery } from 'react-query';

const fetchAllAudiences = () => {
  return fetch('/wp-json/wp/v2/audience?per_page=100').then((res) =>
    res.json()
  );
};

const useAudiences = () => {
  return useQuery('allAudiences', fetchAllAudiences);
};

export default useAudiences;
