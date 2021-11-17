jest.mock('../../src/err/fileErr');
const { FileError } = require('../../src/err/fileErr');

describe('Config err (validation)', () => {
  beforeAll(() => {
    FileError.mockImplementation(() => FileError);
  });

  afterEach(() => {
    FileError.mockClear();
  });
  test('can call the constructor', () => {
    const instance = new FileError('');
    expect(instance).toHaveBeenCalledTimes(1);
  });
});
