const { Transform } = require('stream');
const { encode } = require('../encode');
const { GlobalError } = require('../err/globalErr');
const { StreamError } = require('../err/streamErr');

class TransformEncodeR extends Transform {
  constructor(conf, opts = {}) {
    super(opts);
    this._conf = conf;
    this.on('error', (err) => {
      throw new StreamError('TransformEncodeR', err?.message);
    });
  }
  _transform(chunk, enc, done) {
    this.push(encode(chunk.toString(), this._conf));
    done();
  }
}

module.exports = { TransformEncodeR };
