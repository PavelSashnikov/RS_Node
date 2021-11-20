const { WriteDataStream } = require('../../src/stream/write');
jest.mock('fs');
const fs = require('fs');
const path = require('path');
const { StreamError } = require('../../src/err/streamErr');

describe('Write stream', () => {
  const mockPath = jest.fn(path.resolve);
  const filePath = mockPath('./test/data/input.txt');
  const filePathOut = mockPath('./test/data/output.txt');
  let testData;

  beforeAll(() => {
    testData = fs.readFileSync(filePath, 'utf-8');
  });

  test('can get data', () => {
    const instance = new WriteDataStream(filePath);
    instance.on('data', (data) => {
      expect(data).toBe(testData);
    });
  });

  test('can write data', () => {
    const instance = new WriteDataStream(filePathOut);
    expect(instance._write('test data', 'utf-8', () => {})).not.toBeDefined();
  });

  test('can call error', () => {
    const instance = new WriteDataStream();
    expect(() => instance.emit('error', { message: 'test error' })).toThrow(
      StreamError
    );
  });

  test('should cb called (err)', async () => {
    const instance = new WriteDataStream(filePathOut);
    try {
      instance._writeCb()('err', '');
    } catch (err) {
      expect(err).toBeInstanceOf(StreamError);
    }
  });

  test('should cb called (err)', async () => {
    const cb = jest.fn();
    const instance = new WriteDataStream(filePathOut);
    instance._openCb(cb)('err', '');
    expect(cb).toHaveBeenCalled();
  });

  test('should ccb called', async () => {
    const cb = jest.fn();
    const instance = new WriteDataStream(filePathOut);
    instance._openCb(cb)('', '');
    expect(cb).toHaveBeenCalled();
  });
});
