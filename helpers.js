const minL = 97;
const maxL = 122;
const minU = 65;
const maxU = 90;

const SHIFT = {
  c: 1,
  r: 8,
}

const inputPattern = /^(-i)|^(--input)/;
const outputPattern = /^(-o)|^(--output)/;
const confPattern = /^(-c)|^(--config)/;
const config = /^(([cr][01]-)|a-)*(([cr][01])|a)$/i;

function getNewLetterCode(letterCode, isUpperCase, shift, direction) {
  const min = isUpperCase ? minU : minL;
  const max = isUpperCase ? maxU : maxL;
  let l = letterCode;

  if (!shift) {
    if (l >= min && l <= max) {
      return -l + min + max;
    }
  }

  if (l >= min && l <= max) {
    l = direction ? l + shift : l - shift;
  }
  if (l > max) {
    l = l - max - 1 + min;
  }
  if (l < min) {
    l = l + max + 1 - min;
  }
  return l;
}

function getArguments(argArr) {
  const inp = argArr.findIndex((el) => el.match(inputPattern));
  const out = argArr.findIndex((el) => el.match(outputPattern));
  const conf = argArr.findIndex((el) => el.match(confPattern));
  const res = {
    i: inp === -1 ? '' : argArr[inp + 1],
    o: out === -1 ? '' : argArr[out + 1],
    c: conf === -1 ? checkConfig('') : checkConfig(argArr[conf + 1]),
  };
  if (!res.c) {
    process.stderr.write("Can't find config");
    process.exit(125);
  }

  return res;
}

function checkConfig(str) {
  const errCode = 126;
  if (!str) {
    process.stderr.write("config ERR: missed");
    process.exit(errCode);
  } else if (!str.match(config)) {
    process.stderr.write("config ERR: wrong config");
    process.exit(errCode);
  }
  return str;
}

module.exports = { getNewLetterCode, getArguments, SHIFT };
