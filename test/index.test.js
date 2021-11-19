const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

describe('Entry point test', () => {
  const pathIn = './test/data/input.txt';
  const pathOut = './test/data/output.txt';

  const mockPath = jest.fn(path.resolve);

  let innerData;
  beforeEach(() => {
    innerData = fs.readFileSync(mockPath(pathIn), 'utf-8');
    fs.writeFileSync(mockPath(pathOut), '');
  });

  test('should return encoded data C1-C1-R0-A', () => {
    const cp = spawn('node', [
      'index.js',
      '-i',
      pathIn,
      '-o',
      pathOut,
      '-c',
      'C1-C1-R0-A',
    ]);
    const outData = 'Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!';

    const watcher = fs.watch(mockPath(pathOut), (e, n) => {
      const d = fs.readFileSync(path.resolve(pathOut), 'utf-8');
      if (d) {
        expect(d).toEqual(outData);
        watcher.close();
      }
    });
  });

  test('should return encoded data C1-C0-A-R1-R0-A-R0-R0-C1-A', () => {
    const cp = spawn('node', [
      'index.js',
      '-i',
      pathIn,
      '-o',
      pathOut,
      '-c',
      'C1-C0-A-R1-R0-A-R0-R0-C1-A',
    ]);
    const outData = 'Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!';

    const watcher = fs.watch(mockPath(pathOut), (e, n) => {
      const d = fs.readFileSync(path.resolve(pathOut), 'utf-8');
      if (d) {
        expect(d).toEqual(outData);
        watcher.close();
      }
    });
  });

  test('should return encoded data A-A-A-R1-R0-R0-R0-C1-C1-A', () => {
    const cp = spawn('node', [
      'index.js',
      '-i',
      pathIn,
      '-o',
      pathOut,
      '-c',
      'A-A-A-R1-R0-R0-R0-C1-C1-A',
    ]);
    const outData = 'Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!';

    const watcher = fs.watch(mockPath(pathOut), (e, n) => {
      const d = fs.readFileSync(path.resolve(pathOut), 'utf-8');
      if (d) {
        expect(d).toEqual(outData);
        watcher.close();
      }
    });
  });

  test('should return encoded data C1-R1-C0-C0-A-R0-R1-R1-A-C1', () => {
    const cp = spawn('node', [
      'index.js',
      '-i',
      pathIn,
      '-o',
      pathOut,
      '-c',
      'C1-R1-C0-C0-A-R0-R1-R1-A-C1',
    ]);
    const outData = 'This is secret. Message about "_" symbol!';

    const watcher = fs.watch(mockPath(pathOut), (e, n) => {
      const d = fs.readFileSync(path.resolve(pathOut), 'utf-8');
      expect(d).toEqual(outData);
      watcher.close();
    });
  });

  test('should get & return encoded data to process', () => {
    const cp = spawn('node', ['index.js', '-c', 'A']);

    cp.stdin.write('a');

    cp.stdout.on('data', (chunk) => {
      expect(chunk.toString()).toEqual('z');
      cp.kill();
    });
  });
});
