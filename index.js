const fs = require("fs");
const { getArguments, getFileSrc } = require("./helpers");
const { ReadStream } = require("./stream/read");
const { GlobalError } = require("./err/globalErr");
const { pipeline } = require("stream");
const { encodeChain } = require("./encodeChain");

const arg = getArguments(process.argv.slice(2), __dirname);

const readStream = arg.i
  ? fs.createReadStream(arg.i, { encoding: "utf-8" })
  : process.stdin;
// const readStream = new ReadStream(arg.i)
// const transform = new TransformEncodeC(arg, {});
const writeStream = getFileSrc(arg.o, fs.constants.W_OK)
  ? fs.createWriteStream(arg.o, {
      flags: "a",
      encoding: 'utf-8'
    })
  : process.stdout;

pipeline(readStream, ...encodeChain(arg.c), writeStream, (err) => {
  if (err) {
    throw new GlobalError(err?.message);
  }
});
