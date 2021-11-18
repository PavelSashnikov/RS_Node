jest.mock('../../src/stream/transformR');
const { TransformEncodeR } = require('../../src/stream/transformR');
jest.mock('fs');
const fs = require('fs');
const path = require('path');
const { StreamError } = require('../../src/err/streamErr');

describe('TransformEncodeR stream', () => {
  const mockPath = jest.fn(path.resolve);
  const filePath = mockPath('./test/data/input.txt');
  let testData;

  beforeAll(() => {
    TransformEncodeR.mockImplementation(() => TransformEncodeR);
    testData = fs.readFileSync(filePath, 'utf-8');
  });

  afterEach(() => {
    TransformEncodeR.mockClear();
  });

  test('can call the constructor', () => {
    const instance = new TransformEncodeR('');
    expect(instance).toHaveBeenCalledTimes(1);
  });

  test('can get data', () => {
    const instance = new TransformEncodeR(filePath);
    instance.on('data', (data) => {
      expect(data).toBe(testData);
    });
  });
});
