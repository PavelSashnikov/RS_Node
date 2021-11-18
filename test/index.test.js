const path = require('path');
const fs = require('fs');

describe('Entry point test', () => {
  afterAll(() => setTimeout(() => process.exit(), 500));

  const pathIn = './test/data/input.txt';
  const pathOut = './test/data/output.txt';

  const mockPath = jest.fn(path.resolve);

  let innerData;
  beforeEach(() => {
    innerData = fs.readFileSync(mockPath(pathIn), 'utf-8');
    fs.writeFileSync(mockPath(pathOut), '');
  });

  test('should return encoded data C1-C1-R0-A', async () => {
    process.argv = ['', '', '-i', pathIn, '-o', pathOut, '-c', 'C1-C1-R0-A'];
    const outData = 'Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!';

    function module() {
      return new Promise((r) => {
        jest.mock('../index');
        const index = require('../index');
      });
    }

    module().then(() => {
      fs.readFile(mockPath(pathOut), (err, data) => {
        const d = data.toString();
        expect(data.toString()).toBe(outData);
      });
    });
  });

  test('should return encoded data C1-C0-A-R1-R0-A-R0-R0-C1-A', async () => {
    process.argv = [
      '',
      '',
      '-i',
      pathIn,
      '-o',
      pathOut,
      '-c',
      'C1-C0-A-R1-R0-A-R0-R0-C1-A',
    ];
    const outData = 'Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!';

    function module() {
      return new Promise((r) => {
        jest.mock('../index');
        const index = require('../index');
      });
    }

    module().then(() => {
      fs.readFile(mockPath(pathOut), (err, data) => {
        const d = data.toString();
        expect(data.toString()).toBe(outData);
      });
    });
  });

  test('should return encoded data A-A-A-R1-R0-R0-R0-C1-C1-A', async () => {
    process.argv = [
      '',
      '',
      '-i',
      pathIn,
      '-o',
      pathOut,
      '-c',
      'A-A-A-R1-R0-R0-R0-C1-C1-A',
    ];
    const outData = 'Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!';

    function module() {
      return new Promise((r) => {
        jest.mock('../index');
        const index = require('../index');
      });
    }

    module().then(() => {
      fs.readFile(mockPath(pathOut), (err, data) => {
        const d = data.toString();
        expect(data.toString()).toBe(outData);
      });
    });
  });

  test('should return encoded data C1-R1-C0-C0-A-R0-R1-R1-A-C1', async () => {
    process.argv = [
      '',
      '',
      '-i',
      pathIn,
      '-o',
      pathOut,
      '-c',
      'C1-R1-C0-C0-A-R0-R1-R1-A-C1',
    ];
    const outData = 'This is secret. Message about "_" symbol!';

    function module() {
      return new Promise((r) => {
        jest.mock('../index');
        const index = require('../index');
      });
    }

    module().then(() => {
      fs.readFile(mockPath(pathOut), (err, data) => {
        const d = data.toString();
        expect(data.toString()).toBe(outData);
      });
    });
  });
});
