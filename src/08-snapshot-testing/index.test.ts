import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const list = generateLinkedList([1, '2', { 3: 4 }]);
    expect(list).toStrictEqual({
      next: {
        next: {
          next: {
            next: null,
            value: null,
          },
          value: { 3: 4 },
        },
        value: '2',
      },
      value: 1,
    });
  });

  test('should generate linked list from values 2', () => {
    const list = generateLinkedList([1, '2', { 3: 4 }]);
    expect(list).toMatchSnapshot();
  });
});
