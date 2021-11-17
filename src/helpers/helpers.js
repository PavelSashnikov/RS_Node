const fs = require("fs");
const path = require("path");
const { ValidationError } = require("../err/confErr");
const { ERR_MESSAGE } = require("../err/errMessages");
const { FileError } = require("../err/fileErr");
const { GlobalError } = require("../err/globalErr");
const {
  minU,
  minL,
  maxU,
  maxL,
  inputPattern,
  outputPattern,
  configPattern,
  confFlagPattern,
} = require("./constants");

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

function getArguments(argArr, dir) {
  try {
    findDuplicated(argArr);
  } catch ({ message }) {
    process.stderr.write(message);
    process.exit(5);
  }

  const inp = argArr.findIndex((el) => el.match(inputPattern));
  const out = argArr.findIndex((el) => el.match(outputPattern));
  const conf = argArr.findIndex((el) => el.match(confFlagPattern));

  try {
    const res = {
      i: inp === -1 ? "" : `${path.resolve(argArr[inp + 1])}`,
      o: out === -1 ? "" : `${path.resolve(argArr[out + 1])}`,
      c: conf === -1 ? checkConfig("") : checkConfig(argArr[conf + 1]),
    };
    return res;
  } catch ({ message }) {
    process.stderr.write(message);
    process.exit(4);
  }
}

function checkConfig(str) {
  if (!str) {
    throw new ValidationError(ERR_MESSAGE.conf.missed);
  } else if (!str.match(configPattern)) {
    throw new ValidationError(ERR_MESSAGE.conf.wrong);
  }
  return str;
}

function findDuplicated(arr) {
  const res = arr.some(function (el, i, arr) {
    if (el[0] !== "-") {
      return false;
    }
    if (el.length > 2) {
      const short = `${el[1]}${el[2]}`;
      return arr.lastIndexOf(el) != i || arr.indexOf(short) !== -1;
    }
    return arr.lastIndexOf(el) != i;
  });

  if (res) {
    throw new GlobalError(ERR_MESSAGE.params.dupl);
  }
}

function checkFileAccess(path, key) {
  try {
    fs.accessSync(path, fs.constants.F_OK | key);
  } catch (err) {
    throw new FileError(err.message);
  }
}

function getFileSrc(path, key) {
  if (path) {
    try {
      checkFileAccess(path, key);
    } catch ({ message }) {
      process.stderr.write(message);
      process.exit(6);
    }
    return true;
  }
  return false;
}

module.exports = { getNewLetterCode, getArguments, getFileSrc };
