const fs = require("fs");
const { Readable } = require("stream");
const { getFileSrc } = require("../helpers");

class ReadStream extends Readable {
  constructor(data = {}, opts = {}) {
    super(opts);
    this._src = getFileSrc(data.i)
      ? fs.createReadStream(data.i)
      : process.stdin;
    this.on("error", (err) => {
      process.stderr.write(
        "Error with reading data at (ReadStream)\n" + err.message
      );
      process.exit(125);
    });
    this.on('data', (data) => {
      console.log('read data ', data);
    })
    this.from(data.i)
  }

  _read(d) {
    console.log('d ', d);
    this.push(d);
  }
}

module.exports = { ReadStream };
