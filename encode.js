const { getNewLetterCode } = require("./helpers/helpers");
const { SHIFT } = require("./helpers/constants");

function encode(string, conf) {
  const shift = SHIFT[conf[0]];
  const direction = +conf[1];
  const strArr = string.split("");

  let res = "";
  strArr.forEach((l) => {
    if (/[a-z]/i.exec(l)) {
      const code = l.charCodeAt(0);
      const newCode = getNewLetterCode(
        code,
        l.toUpperCase() === l,
        shift,
        direction
      );
      res += String.fromCharCode(newCode);
    } else {
      res += l;
    }
  });

  return res;
}

module.exports = { encode };
