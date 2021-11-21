const { TransformEncodeA } = require('../../src/stream/transformA');
jest.mock('fs');
const fs = require('fs');
const path = require('path');
const { StreamError } = require('../../src/err/streamErr');

describe('TransformEncodeA stream', () => {
  const mockPath = jest.fn(path.resolve);
  const filePath = mockPath('./test/data/input.txt');
  let testData;

  beforeAll(() => {
    testData = fs.readFileSync(filePath, 'utf-8');
  });

  afterEach(() => {});

  test('can call transform', () => {
    const cb = jest.fn();
    const instance = new TransformEncodeA('');
    instance._transform('data', 'utf-8', cb);
    expect(cb).toHaveBeenCalled();
  });

  test('can get data', () => {
    const instance = new TransformEncodeA(filePath);
    instance.on('data', (data) => {
      expect(data).toBe(testData);
    });
  });

  test('can call error', () => {
    const instance = new TransformEncodeA(filePath);
    expect(() => instance.emit('error', { message: 'test error' })).toThrow(
      StreamError
    );
  });
});
