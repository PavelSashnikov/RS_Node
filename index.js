const fs = require("fs");
const { pipeline } = require("stream");
const { getArguments, getFileSrc } = require("./helpers/helpers");
const { ENCODE } = require("./helpers/constants");
const { encodeChain } = require("./encodeChain");
const { ReadStream } = require("./stream/read");
const { GlobalError } = require("./err/globalErr");
const { WriteDataStream } = require("./stream/write");

process.on("uncaughtException", (err) => {
  process.stderr.write(
    `Something went wrong: ${err?.message || "unknown err"}`
  );
  process.exit(999);
});

const arg = getArguments(process.argv.slice(2));

const readStream = getFileSrc(arg.i, fs.constants.R_OK)
  ? new ReadStream(arg.i, { encoding: ENCODE })
  : process.stdin;

const writeStream = getFileSrc(arg.o, fs.constants.W_OK)
  ? new WriteDataStream(arg.o, { encoding: ENCODE })
  : process.stdout;

pipeline(readStream, ...encodeChain(arg.c), writeStream, (err) => {
  if (err) {
    throw new GlobalError(err?.message);
  }
});
