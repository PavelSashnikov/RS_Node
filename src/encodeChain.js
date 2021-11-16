const { TransformEncodeA } = require("./stream/transformA");
const { TransformEncodeC } = require("./stream/transformC");
const { TransformEncodeR } = require("./stream/transformR");

function encodeChain(conf) {
  const params = conf.split("-");

  return params.reduce((acc, el) => {
    switch (el[0]) {
      case "A":
        acc.push(new TransformEncodeA(el));
        break;
      case "R":
        acc.push(new TransformEncodeR(el));
        break;
      case "C":
        acc.push(new TransformEncodeC(el));
        break;
    }
    return acc;
  }, []);
}

module.exports = { encodeChain };
