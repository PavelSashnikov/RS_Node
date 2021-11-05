const { Transform } = require("stream");
const { encode } = require("../encode");
const { GlobalError } = require("../err/globalErr");
const { StreamError } = require("../err/streamErr");

class TransformEncodeC extends Transform {
  constructor(conf, opts = {}) {
    super(opts);
    this._conf = conf;
    this.on("error", (err) => {
      if (err) {
        throw new StreamError("TransformEncodeC", err?.message);
      }
    });
  }
  _transform(chunk, enc, done) {
    try {
      this.push(encode(chunk.toString(), this._conf));
    } catch {
      throw new GlobalError();
    }
    done();
  }
}

module.exports = { TransformEncodeC };
