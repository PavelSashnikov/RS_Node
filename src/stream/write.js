const fs = require('fs');
const { Writable } = require('stream');
const { StreamError } = require('../err/streamErr');

class WriteDataStream extends Writable {
  constructor(path, arg = {}) {
    super();
    this._path = path;
    this._arg = arg;
    this.on('error', ({ message }) => {
      throw new StreamError('WriteDataStream', message);
    });
  }

  _openCb(cb) {
    return (err, fd) => {
      if (err) {
        cb(err);
      } else {
        this.fd = fd;
        cb();
      }
    };
  }

  _construct(callback) {
    fs.open(this._path, 'a', this._openCb(callback));
  }

  _writeCb() {
    return (err, d) => {
      if (err) {
        throw new StreamError('WriteDataStream', err.message);
      }
    };
  }

  _write(chunk, encoding, cb) {
    if (chunk) {
      fs.write(this.fd, chunk, this._writeCb());
      cb();
    }
  }
}

module.exports = { WriteDataStream };
