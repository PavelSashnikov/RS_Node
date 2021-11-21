class GlobalError extends Error {
  constructor(message) {
    super(message);
    this.name = "Error";
  }
}

module.exports = { GlobalError };
