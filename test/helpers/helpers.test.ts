const path = require('path');
const fs = require('fs');
const { GlobalError } = require('../../src/err/globalErr');
const {
  getArguments,
  getNewLetterCode,
  getFileSrc,
} = require('../../src/helpers/helpers');
const { ERR_MESSAGE } = require('../../src/err/errMessages');

describe('getNewLetterCode func should return', () => {
  test('next letterCode', () => {
    expect(getNewLetterCode(98, false, 1, 1)).toBe(99);
    expect(getNewLetterCode(66, true, 1, 1)).toBe(67);
  });

  test('previous letterCode', () => {
    expect(getNewLetterCode(98, false, 1, 0)).toBe(97);
    expect(getNewLetterCode(66, true, 1, 0)).toBe(65);
  });

  test('mirror letterCode', () => {
    expect(getNewLetterCode(98, false, 0, 0)).toBe(121);
    expect(getNewLetterCode(66, true, 0, 0)).toBe(89);
  });

  test('curcular letterCode', () => {
    expect(getNewLetterCode(122, false, 1, 1)).toBe(97);
    expect(getNewLetterCode(64, true, 0, 0)).toBe(90);
  });
});

describe('GetArguments func should return', () => {
  const mockPath = jest.fn(path.resolve);
  const spy = jest
    .spyOn(process.stderr, 'write')
    .mockImplementation(() => true);
  jest.spyOn(process, 'exit').mockImplementation();

  beforeEach(() => {
    spy.mockClear();
  });
  afterAll(() => {
    spy.mockClear();
  });

  test('params obj', () => {
    expect(getArguments(['-c', 'A-A'])).toEqual({ c: 'A-A', i: '', o: '' });
    expect(getArguments(['-c', 'A-A', '-i', 'iPath'])).toEqual({
      c: 'A-A',
      i: mockPath('iPath'),
      o: '',
    });
    expect(getArguments(['-c', 'A-A', '-i', 'iPath', '-o', 'oPath'])).toEqual({
      c: 'A-A',
      i: mockPath('iPath'),
      o: mockPath('oPath'),
    });
  });

  test('Validation Error (missed config)', () => {
    expect(getArguments(['-i', 'path'])).not.toBeDefined();
    expect(process.stderr.write).toHaveBeenLastCalledWith(
      ERR_MESSAGE.conf.missed
    );
  });

  test('Validation Error (wrong config)', () => {
    expect(getArguments(['-c', 'W'])).not.toBeDefined();
    expect(process.stderr.write).toHaveBeenLastCalledWith(
      ERR_MESSAGE.conf.wrong
    );
  });

  test('Validation Error (duplicated params)', () => {
    expect(getArguments(['-c', '--config'])).not.toBeDefined();
    expect(process.stderr.write).toHaveBeenNthCalledWith(
      1,
      ERR_MESSAGE.params.dupl
    );
  });
});

describe('File access should be', () => {
  const mockPath = jest.fn(path.resolve);

  beforeAll(() => {
    jest.spyOn(process.stderr, 'write').mockImplementation(() => true);
    jest.spyOn(process, 'exit').mockImplementation();
  });

  test('input success', () => {
    expect(
      getFileSrc(mockPath('./src/data/input.txt'), fs.constants.R_OK)
    ).toBeTruthy();
  });

  test('output success', () => {
    expect(
      getFileSrc(mockPath('./src/data/output.txt'), fs.constants.W_OK)
    ).toBeTruthy();
  });

  test('input denied', () => {
    const expected = expect.stringMatching(/(file|directory).* access/gi);
    expect(getFileSrc('', fs.constants.R_OK)).toBeFalsy();
    expect(
      getFileSrc(mockPath('./src/data/in.txt'), fs.constants.R_OK)
    ).toBeDefined();
    expect(process.stderr.write).toHaveBeenLastCalledWith(expected);
  });

  test('output denied', () => {
    const expected = expect.stringMatching(/(file|directory).* access/gi);
    expect(getFileSrc('', fs.constants.W_OK)).toBeFalsy();
    expect(
      getFileSrc(mockPath('./src/data/in.txt'), fs.constants.W_OK)
    ).toBeDefined();
    expect(process.stderr.write).toHaveBeenLastCalledWith(expected);
  });
});
