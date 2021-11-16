const { encode } = require('../src/encode');

describe('Encode', () => {
  const symb = '1!2@_=';

  test('should return ciphered text', () => {
    expect(encode('abc', 'C1')).toBe('bcd');
    expect(encode('abc', 'A')).toBe('zyx');
    expect(encode('abc', 'R1')).toBe('ijk');
  });

  test('should return symbols', () => {
    expect(encode(symb, 'C1')).toBe(symb);
    expect(encode(symb, 'A')).toBe(symb);
    expect(encode(symb, 'R1')).toBe(symb);
  });

  test('should return current case', () => {
    expect(encode('abc', 'C1')).toBe('bcd');
    expect(encode('abc', 'A')).toBe('zyx');
    expect(encode('abc', 'R1')).toBe('ijk');
  });
});
