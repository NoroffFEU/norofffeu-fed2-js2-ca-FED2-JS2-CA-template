import { sum } from '../views/home';  

test('sum of 1 + 2 equals 3', () => {
  expect(sum(1, 2)).toBe(3);  // ใช้ expect().toBe() 
});