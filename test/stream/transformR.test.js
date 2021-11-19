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
    testData = fs.readFileSync(filePath, 'utf-8');
  });

  afterEach(() => {});

  test('can call transform', () => {
    const cb = jest.fn();
    const instance = new TransformEncodeR('');
    instance._transform('data', 'utf-8', cb);
    expect(cb).toHaveBeenCalled();
  });
  test('can get data', () => {
    const instance = new TransformEncodeR(filePath);
    instance.on('data', (data) => {
      expect(data).toBe(testData);
    });
  });

  test('can call error', () => {
    const instance = new TransformEncodeR(filePath);
    expect(() => instance.emit('error', { message: 'test error' })).toThrow(
      StreamError
    );
  });
});
