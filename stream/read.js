const fs = require("fs");
const { Readable } = require("stream");
const { StreamError } = require("../err/streamErr");
const { getFileSrc } = require("../helpers");

class ReadStream extends Readable {
  constructor(path = "", opts = {}) {
    super(opts);
    this.path = path;
    this.setEncoding("utf-8");
    this.on("error", (err) => {
      throw new StreamError("ReadStream", err.message);
    });
    this.on("data", (c) => {
      console.log("read data ", c);
    });
    this.on("readable", () => {
      let chunk;
      console.log("Stream is readable (new data received in buffer)");
      // Use a loop to make sure we read all currently available data
      while (null !== (chunk = this.read())) {
        console.log(`Read ${chunk.length} bytes of data...`);
      }
    });
  }

  _read(chunk) {
    console.log("d ", chunk.toString());
    this.push(null);
    this.pause();
  }
}

module.exports = { ReadStream };
