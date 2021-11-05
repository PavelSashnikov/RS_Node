const fs = require("fs");
const { ValidationError } = require("./err/confErr");
const { FileError } = require("./err/fileErr");
const { GlobalError } = require("./err/globalErr");

const minL = 97;
const maxL = 122;
const minU = 65;
const maxU = 90;

const SHIFT = {
  C: 1,
  R: 8,
};

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

function getArguments(argArr, dir) {
  // argArr = "-i data\\input.txt --output data\\output.txt  -c C1-C1-R0-A".split(" ");
  findDuplicated(argArr);
  const inp = argArr.findIndex((el) => el.match(inputPattern));
  const out = argArr.findIndex((el) => el.match(outputPattern));
  const conf = argArr.findIndex((el) => el.match(confPattern));
  const res = {
    i: inp === -1 ? "" : `${dir}\\${argArr[inp + 1]}`,
    o: out === -1 ? "" : `${dir}\\${argArr[out + 1]}`,
    c: conf === -1 ? checkConfig("") : checkConfig(argArr[conf + 1]),
  };
  return res;
}

function checkConfig(str) {
  const errCode = 126;
  const norStr = str?.toUpperCase();
  if (!norStr) {
    throw new ValidationError(0);
  } else if (!norStr.match(config)) {
    throw new ValidationError(1);
  }
  return norStr;
}

function findDuplicated(arr) {
  const res = arr.some(function (el, i, arr) {
    return arr.lastIndexOf(el) != i && el[0] === "-";
  });

  if (res) {
    throw new GlobalError("duplicated parameters was found");
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

module.exports = { getNewLetterCode, getArguments, getFileSrc, SHIFT };
