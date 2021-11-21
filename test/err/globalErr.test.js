jest.mock('../../src/err/globalErr');
const { GlobalError } = require('../../src/err/globalErr');

describe('Global err', () => {
  beforeAll(() => {
    GlobalError.mockImplementation(() => GlobalError);
  });

  afterEach(() => {
    GlobalError.mockClear();
  });
  test('can call the constructor', () => {
    const instance = new GlobalError('');
    expect(instance).toHaveBeenCalledTimes(1);
  });
});
