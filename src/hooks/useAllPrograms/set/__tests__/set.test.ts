import {
  describe,
  it,
  afterEach,
  expect,
  vi,
  beforeEach,
  SpyInstance
} from 'vitest';
import { set } from '../set.ts';
import { Program } from '../../types.ts';
import { defaultState } from '../../reducer.ts';

let consoleSpy: SpyInstance;

describe('Set function for AllPrograms State', () => {
  beforeEach(() => {
    // Hide console error logs for test
    vi.spyOn(console, 'error').mockImplementation(() => {
      return undefined;
    });

    // SpyOn `console.error`
    consoleSpy = vi.spyOn(console, 'error');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should throw an error', () => {
    // Should throw an error when data is missing

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => set([])).toThrowError();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => set([{}, {}])).toThrowError();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    expect(() => set([{}, { type: 'SET' }])).toThrowError();
  });

  it('returns a state with empty programs', () => {
    const programs = ['hello world', 'hello world'];
    const testState = {
      programs: programs,
      filteredPrograms: [],
      filters: {
        'program-types': [],
        venues: [],
        audiences: [],
        'organization-name': '',
        address: ''
      }
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const setState = set([testState, { type: 'SET', data: programs }]);

    expect(setState.programs.length).toBe(0);
    // Since data isn't of type Programs
    expect(consoleSpy).toHaveBeenCalledTimes(programs.length);
  });

  it('returns with state that has some programs from data passed in', () => {
    const testProgramObject: Program = {
      id: 0,
      'program-name': 'Test Program Name',
      url: '',
      'organization-url': '',
      'organization-name': '',
      latitude: -40.00323,
      longitude: 40.00323,
      'program-types': [],
      audiences: [],
      venues: []
    };

    const programs = [testProgramObject, {}, testProgramObject];

    const testState = defaultState;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    testState.programs = programs;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const setState = set([testState, { type: 'SET', data: programs }]);

    // Ensure both programs and filteredPrograms are equal
    expect(setState.filteredPrograms).toStrictEqual(setState.programs);

    // Ensure empty object was removed
    expect(setState.filteredPrograms.length).toBe(programs.length - 1);
  });
});
