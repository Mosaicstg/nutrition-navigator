import { describe, it, expect } from 'vitest';
import { reset } from '../reset.ts';
import { defaultState } from '../../reducer.ts';

describe('AllProgramsState reset function', () => {
  it('returns a reset state', () => {
    const testState = {
      programs: [],
      filteredPrograms: [],
      filters: {
        'program-types': [],
        venues: [],
        audiences: [],
        'organization-name': '',
        address: ''
      }
    };

    const state = reset([testState, { type: 'RESET' }]);

    expect(state).toStrictEqual(testState);
  });

  it('returns state with the same programs and filteredPrograms', () => {
    const defaultPrograms = ['hello world', 'hello again'];
    const filteredPrograms = ['hello world'];

    const testState = {
      programs: defaultPrograms,
      filteredPrograms: filteredPrograms,
      filters: defaultState.filters
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const resetState = reset([testState, { type: 'RESET' }]);

    expect(resetState.filteredPrograms).toStrictEqual(resetState.programs);
  });

  it('returns state with default filters', () => {
    const defaultPrograms = ['hello world', 'hello again'];
    const filteredPrograms = ['hello world'];

    const testState = {
      programs: defaultPrograms,
      filteredPrograms: filteredPrograms,
      filters: defaultState.filters
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const resetState = reset([testState, { type: 'RESET' }]);

    expect(resetState.filters).toStrictEqual(defaultState.filters);
  });
});
