const minL = 97;
const maxL = 122;
const minU = 65;
const maxU = 90;

function getNewLetterCode(letterCode, isUpperCase, shift, direction) {
  const min = isUpperCase ? minU : minL;
  const max = isUpperCase ? maxU : maxL;
  let l = letterCode;

  if(!shift) {
    if (l >= min && l <= max) {
      return -l + min + max
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

module.exports = { getNewLetterCode };
