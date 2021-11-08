const fs = require("fs");
const { Writable } = require("stream");
const { StreamError } = require("../err/streamErr");

class WriteDataStream extends Writable {
  constructor(path = "", opt = {}) {
    super(opt);
    this._opt = opt;
    this._path = path;
    this.on("error", (err) => {
      throw new StreamError("WriteDataStream", err?.message);
    });
  }

  _write(chunk, encoding, done) {
    if (chunk) {
      console.log('write data', chunk.toString())
      fs.writeFileSync(this._path, chunk.toString(), this._opt);
    }
    done();
  }
}

module.exports = { WriteDataStream };
