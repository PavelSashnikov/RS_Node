const { Transform } = require("stream");
const { encode } = require("../encode");
const { GlobalError } = require("../err/globalErr");
const { StreamError } = require("../err/streamErr");

class TransformEncodeA extends Transform {
  constructor(conf, opts = {}) {
    super(opts);
    this._conf = conf;
    this.on("error", (err) => {
      if (err) {
        throw new StreamError("TransformEncodeA", err?.message);
      }
    });
  }
  _transform(chunk, enc, done) {
    this.push(encode(chunk.toString(), this._conf));
    done();
  }
}

module.exports = { TransformEncodeA };
