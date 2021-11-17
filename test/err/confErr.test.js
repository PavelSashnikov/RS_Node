jest.mock('../../src/err/confErr');
const { ValidationError } = require('../../src/err/confErr');

describe('Config err (validation)', () => {
  beforeAll(() => {
    ValidationError.mockImplementation(() => ValidationError);
  });

  afterEach(() => {
    ValidationError.mockClear();
  });
  test('can call the constructor', () => {
    const instance = new ValidationError('');
    expect(instance).toHaveBeenCalledTimes(1);
  });
});
