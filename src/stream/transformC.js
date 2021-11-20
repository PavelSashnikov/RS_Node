const { Transform } = require('stream');
const { encode } = require('../encode');
const { StreamError } = require('../err/streamErr');

class TransformEncodeC extends Transform {
  constructor(conf, opts = {}) {
    super(opts);
    this._conf = conf;
    this.on('error', (err) => {
      throw new StreamError('TransformEncodeC', err?.message);
    });
  }
  _transform(chunk, enc, done) {
    this.push(encode(chunk.toString(), this._conf));
    done();
  }
}

module.exports = { TransformEncodeC };
