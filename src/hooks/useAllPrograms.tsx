import React from 'react';
import { fetchApi } from '../api/fetch.ts';

// Types
import { AllProgramsAction, AllProgramsState, Program } from '../types.ts';

const reducer = (
  state: AllProgramsState,
  action: AllProgramsAction
): AllProgramsState => {
  switch (action.type) {
    case 'SET': {
      const programs = action.data;

      return {
        ...state,
        programs,
        filteredPrograms: programs
      };
    }
    case 'UPDATE_FILTERS': {
      const filters = action.data;

      return {
        ...state,
        filters
      };
    }
    case 'UPDATE_PROGRAMS': {
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
        });

      return {
        ...state,
        filteredPrograms
      };
    }
    case 'RESET': {
      const { programs } = state;

      return {
        ...state,
        filteredPrograms: programs,
        filters: defaultState.filters
      };
    }
    default:
      throw new Error("Whoops, you shouldn't have reach here");
  }
};

const defaultState: AllProgramsState = {
  filters: {
    'program-types': [],
    venues: [],
    audiences: [],
    'organization-name': '',
    address: ''
  },
  programs: [],
  filteredPrograms: []
};

const fetchAllPrograms = () => {
  return fetchApi('/wp-json/nutrition-navigator/v1/programs').then((res) =>
    res.json()
  );
};

const useAllPrograms = () => {
  const [state, dispatch] = React.useReducer(reducer, defaultState);

  React.useEffect(() => {
    fetchAllPrograms()
      .then((res: Program[]) => {
        // Set start state of programs
        dispatch({ type: 'SET', data: res });
      })
      .catch((err) => {
        console.error(err);
      });
  }, [dispatch]);

  return { state, dispatch };
};

export default useAllPrograms;
