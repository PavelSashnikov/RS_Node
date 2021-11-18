jest.mock('../../src/stream/read');
const { StreamError } = require('../../src/err/streamErr');
const { ReadStream } = require('../../src/stream/read');

describe('Read stream', () => {
  beforeAll(() => {
    ReadStream.mockImplementation(() => ReadStream);
  });

  afterEach(() => {
    ReadStream.mockClear();
  });
  test('can call the constructor', () => {
    const instance = new ReadStream('');
    expect(instance).toHaveBeenCalledTimes(1);
  });
});
