import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: -3, b: 2, action: Action.Add, expected: -1 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 0, b: 2, action: Action.Subtract, expected: -2 },
  { a: 0, b: 2, action: Action.Multiply, expected: 0 },
  { a: -10, b: 2, action: Action.Multiply, expected: -20 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 30, b: 0, action: Action.Divide, expected: Infinity },
  { a: 0, b: 2, action: Action.Divide, expected: 0 },
  { a: 6, b: 2, action: Action.Exponentiate, expected: 36 },
  { a: 6, b: 0, action: Action.Exponentiate, expected: 1 },
  { a: 0, b: 2, action: Action.Exponentiate, expected: 0 },
  { a: -6, b: 2, action: Action.Exponentiate, expected: 36 },
  { a: -6, b: -1, action: Action.Exponentiate, expected: -1 / 6 },
  { a: 6, b: -1, action: Action.Exponentiate, expected: 1 / 6 },
  { a: 3, b: 2, action: Action.Exponentiate, expected: 9 },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should $action two numbers',
    ({ a, b, action, expected }) => {
      expect(simpleCalculator({ a, b, action })).toEqual(expected);
    },
  );
});
