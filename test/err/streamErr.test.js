jest.mock('../../src/err/streamErr');
const { StreamError } = require('../../src/err/streamErr');

describe('Config err (validation)', () => {
  beforeAll(() => {
    StreamError.mockImplementation(() => StreamError);
  });

  afterEach(() => {
    StreamError.mockClear();
  });
  test('can call the constructor', () => {
    const instance = new StreamError('');
    expect(instance).toHaveBeenCalledTimes(1);
  });
});
