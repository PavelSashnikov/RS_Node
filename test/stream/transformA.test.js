jest.mock('../../src/stream/transformA');
const { TransformEncodeA } = require('../../src/stream/transformA');
jest.mock('fs');
const fs = require('fs');
const path = require('path');

describe('TransformEncodeA stream', () => {
  const mockPath = jest.fn(path.resolve);
  const filePath = mockPath('./test/data/input.txt');
  let testData;

  beforeAll(() => {
    TransformEncodeA.mockImplementation(() => TransformEncodeA);
    testData = fs.readFileSync(filePath, 'utf-8');
  });

  afterEach(() => {
    TransformEncodeA.mockClear();
  });

  test('can call the constructor', () => {
    const instance = new TransformEncodeA('');
    expect(instance).toHaveBeenCalledTimes(1);
  });

  test('can get data', () => {
    const instance = new TransformEncodeA(filePath);
    instance.on('data', (data) => {
      expect(data).toBe(testData);
    });
  });
});
