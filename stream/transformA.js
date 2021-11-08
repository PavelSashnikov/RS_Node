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
    try {
      this.push(encode(chunk.toString(), this._conf));
    } catch {
      throw new StreamError("TransformEncodeA", 'encode err');
    }
    done();
  }
}

module.exports = { TransformEncodeA };
