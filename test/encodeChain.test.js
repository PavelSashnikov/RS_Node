const { encodeChain } = require('../src/encodeChain');
const { TransformEncodeA } = require('../src/stream/transformA');
const { TransformEncodeC } = require('../src/stream/transformC');
const { TransformEncodeR } = require('../src/stream/transformR');

describe('Encode chain', () => {
  test('should be filled arr', () => {
    expect(encodeChain('A')).toHaveLength(1);
    expect(encodeChain('C1')).toHaveLength(1);
    expect(encodeChain('R0-R1')).toHaveLength(2);
    expect(encodeChain('R0-A-C1')).toHaveLength(3);
  });

  test('should be empty arr', () => {
    expect(encodeChain('')).toHaveLength(0);
  });

  test('should be instance', () => {
    expect(encodeChain('A')[0]).toBeInstanceOf(TransformEncodeA);
    expect(encodeChain('C1')[0]).toBeInstanceOf(TransformEncodeC);
    expect(encodeChain('R0')[0]).toBeInstanceOf(TransformEncodeR);
  });
});
