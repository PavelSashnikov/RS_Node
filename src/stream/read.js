const fs = require('fs');
const { Readable } = require('stream');
const { StreamError } = require('../err/streamErr');
const { getFileSrc } = require('../helpers/helpers');

class ReadStream extends Readable {
  constructor(path) {
    super();
    this.path = path;
    this.fd = null;

    this.on('error', (err) => {
      throw new StreamError('ReadStream', err.message);
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
    fs.open(this.path, this._openCb(callback));
  }

  _readCb(buf) {
    return (err, bytesRead) => {
      if (err) {
        this.destroy(err);
      } else {
        this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
      }
    };
  }

  _read(n) {
    const buf = Buffer.alloc(n);
    fs.read(this.fd, buf, 0, n, null, this._readCb(buf));
  }
  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}

module.exports = { ReadStream };
