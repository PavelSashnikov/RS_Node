const { Transform } = require("stream");
const { encode } = require("../encode");

class TransformEncode extends Transform {
  constructor(arg, opts = {}) {
    super(opts);
    this._arg = arg;
    this.on("error", (err) => {
      if (err) {
        process.stderr.write(
          "Error with transformation at (TransformEncode stream)\n" +
            err.message
        );
        process.exit(124);
      }
    });
  }
  _transform(chunk, enc, done) {
    const res = this.encodeChain(chunk.toString());
    this.push(res);
    done();
  }

  encodeChain(data) {
    const args = this._arg.c.split("-");
    return args.reduce((acc, c) => {
      acc = encode(acc, c);
      return acc;
    }, data);
  }
}

module.exports = { TransformEncode };
