const add = () => {
  return 1 + 2;
};

describe('testing', () => {
  test('should add two numbers', () => {
    const result = add();
    expect(result).toBe(3);
  });
});
