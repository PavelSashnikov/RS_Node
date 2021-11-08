const fs = require("fs");
const { Readable } = require("stream");
const { StreamError } = require("../err/streamErr");
const { getFileSrc } = require("../helpers/helpers");

class ReadStream extends Readable {
  constructor(path = "", opts = {}) {
    super(opts);
    this.fileData = fs.readFileSync(path, opts, () => {
      console.log("read data ", dat);
    });

    this.on("error", (err) => {
      throw new StreamError("ReadStream", err.message);
    });
    this.on("data", (c) => {
      console.log("read data ", c);
    });
  }
  _read(_) {
    if (this.fileData) {
      this.push(this.fileData);
    }
    this.push(null);
  }
}

module.exports = { ReadStream };
