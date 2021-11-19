const { ReadStream } = require('../../src/stream/read');
jest.mock('fs');
const fs = require('fs');
const path = require('path');
const { StreamError } = require('../../src/err/streamErr');

describe('Read stream', () => {
  const mockPath = jest.fn(path.resolve);
  const filePath = mockPath('./test/data/input.txt');
  const spyOpen = jest.spyOn(fs, 'open');
  const spyRead = jest.spyOn(fs, 'read');
  const spyClose = jest.spyOn(fs, 'close');
  let testData;

  beforeAll(() => {
    testData = fs.readFileSync(filePath, 'utf-8');
  });

  test('can get data', () => {
    const instance = new ReadStream(filePath);
    instance.on('data', (data) => {
      expect(data).toBe(testData);
    });
  });

  test('should trow err', () => {
    const instance = new ReadStream(filePath);

    expect(() => instance.emit('error', { message: 'test' })).toThrow(
      StreamError
    );
  });

  test('should open file', async () => {
    const cb = jest.fn();
    const instance = new ReadStream(filePath);
    instance._construct(cb);
    expect(spyOpen).toHaveBeenCalled();
  });

  test('should call callback', async () => {
    const cb = jest.fn();
    const instance = new ReadStream(filePath);
    instance._construct(cb);
    expect(cb).not.toHaveBeenCalled();
  });

  test('should read file', async () => {
    const instance = () => {
      return new Promise((r) => {
        return new ReadStream(filePath);
      });
    };
    instance().then(() => {
      expect(spyRead).toHaveBeenCalled();
    });
  });

  test('should close file', async () => {
    const instance = () => {
      return new Promise((r) => {
        return new ReadStream(filePath);
      });
    };
    instance().then(() => {
      expect(spyClose).toHaveBeenCalled();
    });
  });
  test('has read method', async () => {
    const instance = new ReadStream(filePath);
    expect(instance._read(20)).not.toBeDefined();
  });

  test('has destroy method', async () => {
    const cb = jest.fn();
    const instance = new ReadStream(filePath);
    instance._destroy('err', cb);
    expect(cb).toHaveBeenCalled();
  });

  test('has destroy method (empty path)', async () => {
    const cb = jest.fn();
    const instance = new ReadStream();
    instance.fd = true;
    instance._destroy('err', cb);
    expect(cb).not.toHaveBeenCalled();
  });

  test('can call error', () => {
    const instance = new ReadStream(filePath);
    expect(() => instance.emit('error', { message: 'test error' })).toThrow(
      StreamError
    );
  });

  test('can call error', () => {
    const cb = jest.fn();
    spyOpen.mockImplementationOnce(() => {
      throw new StreamError();
    });
    const instance = new ReadStream(filePath);
    expect(instance._construct(cb)).toBeInstanceOf(StreamError);
  });
});
