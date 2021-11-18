jest.mock('../../src/stream/write');
const { WriteDataStream } = require('../../src/stream/write');
jest.mock('fs');
const fs = require('fs');
const path = require('path');

describe('Write stream', () => {
  const mockPath = jest.fn(path.resolve);
  const filePath = mockPath('./test/data/input.txt');
  let testData;

  beforeAll(() => {
    WriteDataStream.mockImplementation(() => WriteDataStream);
    testData = fs.readFileSync(filePath, 'utf-8');
  });

  afterEach(() => {
    WriteDataStream.mockClear();
  });

  test('can call the constructor', () => {
    const instance = new WriteDataStream('');
    expect(instance).toHaveBeenCalledTimes(1);
  });

  test('can get data', () => {
    const instance = new WriteDataStream(filePath);
    instance.on('data', (data) => {
      expect(data).toBe(testData);
    });
  });
});
