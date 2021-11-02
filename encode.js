const { getNewLetterCode } = require("./helpers");

function encode(string, shift, direction) {
  const strArr = string.split('')
  let res = "";
  strArr.forEach((l) => {
    if (/[a-z]/i.exec(l)) {
      const code = l.charCodeAt(0);
      const newCode = getNewLetterCode(code, l.toUpperCase() === l, shift, direction);
      res += String.fromCharCode(newCode);
    } else {
      res += l;
    }
  });

  return res
}

module.exports = { encode };
