class StreamError extends Error {
  constructor(stream, message) {
    super(message);
    this.name = `Stream ERR at ${stream}`;
  }
}

module.exports = { StreamError };
