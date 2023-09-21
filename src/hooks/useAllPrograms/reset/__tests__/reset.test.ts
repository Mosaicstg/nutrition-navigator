import { describe, it, expect } from 'vitest';
import { reset } from '../reset.ts';
import { AllProgramsState } from '../../types.ts';

describe('AllProgramsState reset function', () => {
  it('returns a reset state', () => {
    const testState: AllProgramsState = {
      programs: [],
      filteredPrograms: []
    };

    const state = reset([testState, { type: 'RESET' }]);

    expect(state).toStrictEqual(testState);
  });

  it('returns state with the same programs and filteredPrograms', () => {
    const defaultPrograms = ['hello world', 'hello again'];
    const filteredPrograms = ['hello world'];

    const testState = {
      programs: defaultPrograms,
      filteredPrograms: filteredPrograms
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const resetState = reset([testState, { type: 'RESET' }]);

    expect(resetState.filteredPrograms).toStrictEqual(resetState.programs);
  });
});
