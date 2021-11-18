const fs = require('fs');
const { pipeline } = require('stream');
const { getArguments, getFileSrc } = require('./src/helpers/helpers');
const { ENCODE } = require('./src/helpers/constants');
const { encodeChain } = require('./src/encodeChain');
const { ReadStream } = require('./src/stream/read');
const { GlobalError } = require('./src/err/globalErr');
const { WriteDataStream } = require('./src/stream/write');

process.on('uncaughtException', (err) => {
  process.stderr.write(
    `Something went wrong: ${err?.message || 'unknown err'}`
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
