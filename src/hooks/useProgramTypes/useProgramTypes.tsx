import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '../../api/fetch.ts';
import { ProgramType, ProgramTypeSchema } from './schema.ts';

const fetchAllProgramTypes = () => {
  return fetchApi('/wp-json/wp/v2/program-type?per_page=100').then((res) =>
    res.json()
  );
};

const useProgramTypes = () => {
  return useQuery<ProgramType[]>({
    queryKey: ['allProgramTypes'],
    queryFn: fetchAllProgramTypes,
    // Only run query on page load or component mount
    retry: false,
    select: (data) =>
      data.filter((programType) => {
        const validation = ProgramTypeSchema.safeParse(programType);

        if (!validation.success) {
          console.error(
            `Program Type with name ${programType.name} is invalid`,
            validation.error
          );
        }

        return validation.success;
      })
  });
};

export default useProgramTypes;
