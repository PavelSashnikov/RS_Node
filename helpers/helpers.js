const fs = require("fs");
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
  // argArr = "-i data\\input.txt --output data\\output.txt  -c C1-C1-R0-A".split(" ");
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
      i: inp === -1 ? "" : `${dir}\\${argArr[inp + 1]}`,
      o: out === -1 ? "" : `${dir}\\${argArr[out + 1]}`,
      c: conf === -1 ? checkConfig("") : checkConfig(argArr[conf + 1]),
    };
    return res;
  } catch ({ message }) {
    process.stderr.write(message);
    process.exit(4);
  }
}

function checkConfig(str) {
  const norStr = str?.toUpperCase();
  if (!norStr) {
    throw new ValidationError(ERR_MESSAGE.conf.missed);
  } else if (!norStr.match(configPattern)) {
    throw new ValidationError(ERR_MESSAGE.conf.wrong);
  }
  return norStr;
}

function findDuplicated(arr) {
  const res = arr.some(function (el, i, arr) {
    return arr.lastIndexOf(el) != i && el[0] === "-";
  });

  if (res) {
    throw new GlobalError(ERR_MESSAGE.params.dupl);
  }
}

function getFileSrc(path, key) {
  if (path) {
    try {
      fs.accessSync(path, fs.constants.F_OK | key);
    } catch (err) {
      throw new FileError(err.message);
    }
    return true;
  }
  return false;
}

module.exports = { getNewLetterCode, getArguments, getFileSrc };
