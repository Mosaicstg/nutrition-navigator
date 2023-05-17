import { useQuery } from 'react-query';

const fetchAllProgramTypes = () => {
  return fetch('/wp-json/wp/v2/program-type?per_page=100').then((res) =>
    res.json()
  );
};

const useProgramTypes = () => {
  return useQuery('allProgramTypes', fetchAllProgramTypes);
};

export default useProgramTypes;
