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

  afterEach(() => {});

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
    const instance = () => {
      return new Promise((r) => {
        return new ReadStream(filePath);
      });
    };
    instance().then(() => {
      expect(spyOpen).toHaveBeenCalled();
    });
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
});
