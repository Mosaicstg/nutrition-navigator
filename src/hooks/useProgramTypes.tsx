import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '../api/fetch.ts';

const fetchAllProgramTypes = () => {
  return fetchApi('/wp-json/wp/v2/program-type?per_page=100').then((res) =>
    res.json()
  );
};

const useProgramTypes = () => {
  return useQuery({
    queryKey: ['allProgramTypes'],
    queryFn: fetchAllProgramTypes,
    // Only run query on page load or component mount
    retry: false,
    select: (data) => data
  });
};

export default useProgramTypes;
