class StreamError extends Error {
  constructor(stream, message) {
    super(message);
    this.name = `Stream ERR at ${stream}`;
    process.stderr.write(`${this.name}: ${message}`);
    process.exit(300);
  }
}

module.exports = { StreamError };
