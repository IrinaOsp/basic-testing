import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    await expect(resolveValue(42)).resolves.toBe(42);
    await expect(resolveValue('test')).resolves.toBe('test');
    await expect(resolveValue(null)).resolves.toBe(null);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(() => throwError('test')).toThrowError('test');
  });

  test('should throw error with default message if message is not provided', () => {
    expect(() => throwError()).toThrowError('Oops!');
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(rejectCustomError()).rejects.toThrowError(MyAwesomeError);
  });
});
