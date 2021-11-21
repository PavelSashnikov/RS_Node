const fs = require("fs");
const { Writable } = require("stream");
const { StreamError } = require("../err/streamErr");

class WriteDataStream extends Writable {
  constructor(path = "", arg = {}) {
    super();
    this._path = path;
    this._arg = arg;
    this.on("error", ({ message }) => {
      throw new StreamError("WriteDataStream", message || "unknown err");
    });
  }

  _construct(callback) {
    fs.open(this._path, "a", (err, fd) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }
  _write(chunk, encoding, cb) {
    if (chunk) {
      fs.write(this.fd, chunk, (err, d) => {
        if (err) {
          throw new StreamError("WriteDataStream", err.message);
        }
      });
      cb();
    }
  }
}

module.exports = { WriteDataStream };
