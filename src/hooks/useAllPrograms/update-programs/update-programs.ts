import { AllProgramsState, MatchAction } from '../types.ts';

export const updatePrograms = ([state]: [
  AllProgramsState,
  MatchAction<'UPDATE_PROGRAMS'>
]): AllProgramsState => {
  const { filters, programs } = state;

  const filteredPrograms = programs
    // Filter Programs by Program Type
    .filter((program) => {
      const { 'program-types': programTypes } = program;
      const { 'program-types': filtersProgramTypes } = filters;

      return (
        // If no user selected program types, show all Programs
        filtersProgramTypes.length === 0 ||
        programTypes.filter((programType) =>
          filtersProgramTypes.includes(programType)
        )
      );
    })
    // Filter Programs by Venues
    .filter((program) => {
      const { venues: programVenues } = program;
      const { venues: filtersVenues } = filters;

      return (
        // If no venues are set then all for all Programs
        filtersVenues.length === 0 ||
        programVenues.filter((programVenue) =>
          filtersVenues.includes(programVenue)
        ).length
      );
    })
    // Filter Programs by Audiences
    .filter((program) => {
      const { audiences: programAudiences } = program;
      const { audiences: filtersAudiences } = filters;

      return (
        // If no audiences are set then all for all Programs
        filtersAudiences.length === 0 ||
        programAudiences.filter((programAudience) =>
          filtersAudiences.includes(programAudience)
        ).length
      );
    })
    // Filters Programs by Org Name
    .filter((program) => {
      const { 'organization-name': programOrgName } = program;
      const { 'organization-name': filtersOrgName } = filters;

      return (
        filtersOrgName.length === 0 ||
        programOrgName.toLowerCase().includes(filtersOrgName.toLowerCase())
      );
    })
    // Filters Programs by Zip Code/Address
    .filter((program) => {
      const { 'zip-code': zipCode } = program;
      const { address } = filters;

      return address.length === 0 || zipCode === address;
    });

  return {
    ...state,
    filteredPrograms
  };
};
