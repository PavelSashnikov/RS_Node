jest.mock('../../src/stream/transformC');
const { TransformEncodeC } = require('../../src/stream/transformC');
jest.mock('fs');
const fs = require('fs');
const path = require('path');

describe('TransformEncodeC stream', () => {
  const mockPath = jest.fn(path.resolve);
  const filePath = mockPath('./test/data/input.txt');
  let testData;

  beforeAll(() => {
    TransformEncodeC.mockImplementation(() => TransformEncodeC);
    testData = fs.readFileSync(filePath, 'utf-8');
  });

  afterEach(() => {
    TransformEncodeC.mockClear();
  });

  test('can call the constructor', () => {
    const instance = new TransformEncodeC('');
    expect(instance).toHaveBeenCalledTimes(1);
  });

  test('can get data', () => {
    const instance = new TransformEncodeC(filePath);
    instance.on('data', (data) => {
      expect(data).toBe(testData);
    });
  });
});
