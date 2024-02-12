import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toEqual(3);
    expect(simpleCalculator({ a: 0, b: -20, action: Action.Add })).toEqual(-20);
    expect(simpleCalculator({ a: Infinity, b: 5, action: Action.Add })).toEqual(
      Infinity,
    );
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Subtract })).toEqual(
      1,
    );
    expect(simpleCalculator({ a: -3, b: 2, action: Action.Subtract })).toEqual(
      -5,
    );
    expect(
      simpleCalculator({ a: Infinity, b: 2, action: Action.Subtract }),
    ).toEqual(Infinity);
    expect(simpleCalculator({ a: 60, b: 0, action: Action.Subtract })).toEqual(
      60,
    );
    expect(
      simpleCalculator({ a: NaN, b: 10, action: Action.Subtract }),
    ).toBeNaN();
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Multiply })).toEqual(
      6,
    );
    expect(simpleCalculator({ a: -3, b: 2, action: Action.Multiply })).toEqual(
      -6,
    );
    expect(
      simpleCalculator({ a: Infinity, b: 2, action: Action.Multiply }),
    ).toEqual(Infinity);
    expect(simpleCalculator({ a: 0, b: 2, action: Action.Multiply })).toEqual(
      0,
    );
    expect(
      simpleCalculator({ a: NaN, b: 10, action: Action.Multiply }),
    ).toBeNaN();
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 6, b: 2, action: Action.Divide })).toEqual(3);
    expect(simpleCalculator({ a: 0, b: 2, action: Action.Divide })).toEqual(0);
    expect(simpleCalculator({ a: -30, b: 2, action: Action.Divide })).toEqual(
      -15,
    );
    expect(simpleCalculator({ a: -3, b: 2, action: Action.Divide })).toEqual(
      -1.5,
    );
    expect(
      simpleCalculator({ a: Infinity, b: 2, action: Action.Divide }),
    ).toEqual(Infinity);
    expect(simpleCalculator({ a: 100, b: 0, action: Action.Divide })).toEqual(
      Infinity,
    );
    expect(
      simpleCalculator({ a: NaN, b: 10, action: Action.Divide }),
    ).toBeNaN();
  });

  test('should exponentiate two numbers', () => {
    expect(
      simpleCalculator({ a: 3, b: 2, action: Action.Exponentiate }),
    ).toEqual(9);
    expect(
      simpleCalculator({ a: -3, b: 3, action: Action.Exponentiate }),
    ).toEqual(-27);
    expect(
      simpleCalculator({ a: 3, b: 0, action: Action.Exponentiate }),
    ).toEqual(1);
    expect(
      simpleCalculator({ a: 2, b: 0.5, action: Action.Exponentiate }),
    ).toEqual(1.4142135623730951);
    expect(
      simpleCalculator({ a: Infinity, b: 2, action: Action.Exponentiate }),
    ).toEqual(Infinity);
    expect(
      simpleCalculator({ a: 0, b: 2, action: Action.Exponentiate }),
    ).toEqual(0);
    expect(
      simpleCalculator({ a: NaN, b: 10, action: Action.Exponentiate }),
    ).toBeNaN();
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: 'invalid' })).toEqual(null);
  });

  test('should return null for invalid arguments', () => {
    expect(
      simpleCalculator({ a: 'invalid', b: [], action: Action.Add }),
    ).toBeNull();
    expect(
      simpleCalculator({ a: '6', b: 2, action: Action.Multiply }),
    ).toBeNull();
    expect(simpleCalculator({ a: 1, b: {}, action: Action.Divide })).toBeNull();
  });
});
