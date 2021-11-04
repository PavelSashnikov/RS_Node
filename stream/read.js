const { Readable } = require("stream");

class ReadStream extends Readable {
  constructor(data = null, opts = {}) {
    super(opts);
    this._data = data || process.stdin;
    this.on("error", (err) => {
      process.stderr.write(
        "Error with reading data at (ReadStream)\n" + err.message
      );
      process.exit(125);
    });
  }

  _read() {
    if (this._data) {
      this.push(this._data);
    } else {
      this.push(null);
    }
  }
}

module.exports = { ReadStream };
