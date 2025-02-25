// import { match, P } from 'ts-pattern';
//
// // Helper functions
// import { reset } from './reset/reset.ts';
// import { set } from './set/set.ts';
// import { updatePrograms } from './update-programs/update-programs.ts';
//
// // Types
// import { AllProgramsAction, AllProgramsState } from './types.ts';
//
// export const defaultState: AllProgramsState = {
//   programs: [],
//   filteredPrograms: []
// };
//
// export const reducer = (
//   state: AllProgramsState,
//   action: AllProgramsAction
// ): AllProgramsState => {
//   return (
//     // Since we'll never the EXACT value of the state when any action is dispatched we use
//     // the P._ helper function to match any value of the state.
//     match<[AllProgramsState, AllProgramsAction], AllProgramsState>([
//       state,
//       action
//     ])
//       .with([P._, { type: 'SET' }], set)
//       .with([P._, { type: 'RESET' }], reset)
//       .with([P._, { type: 'UPDATE_PROGRAMS' }], updatePrograms)
//       // Wildcard matching:
//       // Any dispatch that doesn't match ANY of the above will simply return the current state.
//       .with(P._, () => state)
//       .exhaustive()
//   );
// };
