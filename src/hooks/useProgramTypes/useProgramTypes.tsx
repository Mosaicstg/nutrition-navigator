import { useQuery } from '@tanstack/react-query';
import { fetchApi } from '~/api/fetch.ts';
import { ProgramType, ProgramTypeSchema } from './schema.ts';
import * as v from 'valibot';

const fetchAllProgramTypes = (): Promise<ProgramType[]> => {
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
    refetchOnWindowFocus: false,
    select: (data) =>
      data.filter((programType) => {
        const validation = v.safeParse(ProgramTypeSchema, programType);

        if (!validation.success) {
          console.error(
            `Program Type with name ${programType.name} is invalid`,
            validation.issues
          );
        }

        return validation.success;
      })
  });
};

export { useProgramTypes };
