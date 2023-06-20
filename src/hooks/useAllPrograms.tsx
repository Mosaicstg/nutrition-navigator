import React from 'react';
import { fetchApi } from '../api/fetch.ts';
import { match, P } from 'ts-pattern';

// Types
import { AllProgramsAction, AllProgramsState } from '../types.ts';
import { Program, ProgramSchema } from '../schema.ts';

type MatchAction<T> = Extract<AllProgramsAction, { type: T }>;

const setAllProgramsState = ([state, action]: [
  AllProgramsState,
  MatchAction<'SET'>
]): AllProgramsState => {
  const programs = action.data;

  const validatedPrograms = programs.filter((program) => {
    const validation = ProgramSchema.safeParse(program);

    if (!validation.success) {
      console.error(
        `Program with name: "${program.name}" is invalid`,
        validation.error
      );
    }

    return validation.success;
  });

  return {
    ...state,
    programs: validatedPrograms,
    filteredPrograms: programs
  };
};

const resetAllProgramsState = ([state]: [
  AllProgramsState,
  MatchAction<'RESET'>
]): AllProgramsState => {
  const { programs } = state;

  return {
    ...state,
    filteredPrograms: programs,
    filters: defaultState.filters
  };
};

const updateFiltersAllProgramsState = ([state, action]: [
  AllProgramsState,
  MatchAction<'UPDATE_FILTERS'>
]): AllProgramsState => {
  const filters = action.data;

  return {
    ...state,
    filters
  };
};

const updateProgramsAllProgramsState = ([state]: [
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
    });

  return {
    ...state,
    filteredPrograms
  };
};

const reducer = (
  state: AllProgramsState,
  action: AllProgramsAction
): AllProgramsState => {
  return (
    // Since we'll never the EXACT value of the state when any action is dispatched we use
    // the P._ helper function to match any value of the state.
    match<[AllProgramsState, AllProgramsAction], AllProgramsState>([
      state,
      action
    ])
      .with([P._, { type: 'SET' }], setAllProgramsState)
      .with([P._, { type: 'RESET' }], resetAllProgramsState)
      .with([P._, { type: 'UPDATE_FILTERS' }], updateFiltersAllProgramsState)
      .with([P._, { type: 'UPDATE_PROGRAMS' }], updateProgramsAllProgramsState)
      // Wildcard matching:
      // Any dispatch that doesn't match ANY of the above will simply return the current state.
      .with(P._, () => state)
      .exhaustive()
  );
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
