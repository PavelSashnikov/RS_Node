const fs = require("fs");
const { getArguments, getFileSrc } = require("./helpers");
const { TransformEncode } = require("./stream/transform");
const { ReadStream } = require("./stream/read");
const { GlobalError } = require("./err/globalErr");

const arg = getArguments(process.argv.slice(2), __dirname);

const readStream = arg.i
  ? fs.createReadStream(arg.i, { encoding: "utf-8" })
  : process.stdin;
// const readStream = new ReadStream(arg.i)
const transform = new TransformEncode(arg, {});
const writeStream = getFileSrc(arg.o, fs.constants.W_OK)
  ? fs.createWriteStream(arg.o, {
      flags: "a",
    })
  : process.stdout;

readStream
  .pipe(transform)
  .pipe(writeStream)
  .on("error", (err) => {
    throw new GlobalError(err.message);
  });
