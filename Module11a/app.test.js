import { sum, mult } from './app';

test('sum function adds two numbers', () => {
  const result = sum(3, 2);
  expect(result).toBe(5);
});

test('mult function multiplies two numbers', () => {
  const result = mult(3, 2);
  expect(result).toBe(6);
});
