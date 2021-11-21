const ENCODE = "utf-8";
const SHIFT = {
  C: 1,
  R: 8,
};

const minL = 97;
const maxL = 122;
const minU = 65;
const maxU = 90;

const inputPattern = /^(-i)$|^(--input)$/;
const outputPattern = /^(-o)$|^(--output)$/;
const confFlagPattern = /^(-c)$|^(--config)$/;
const configPattern = /^(([CR][01]-)|A-)*(([CR][01])|A)$/;

module.exports = {
  ENCODE,
  SHIFT,
  minL,
  maxL,
  minU,
  maxU,
  inputPattern,
  outputPattern,
  confFlagPattern,
  configPattern,
};
