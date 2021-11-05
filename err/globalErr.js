class GlobalError extends Error {
  constructor(message) {
    super(message);
    this.name = "Error";
    process.stderr.write(`${this.name}: ${message}`);
    process.exit(900);
  }
}

module.exports = { GlobalError };
