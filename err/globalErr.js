class GlobalError extends Error {
  constructor(message = 'oops :(') {
    super(message);
    this.name = "Error";
  }
}

module.exports = { GlobalError };
