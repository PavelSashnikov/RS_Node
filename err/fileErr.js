class FileError extends Error {
  constructor(message) {
    super(message);
    this.name = "FileError";
    process.stderr.write(`${this.name}: ${message}`);
    process.exit(111);
  }
}

module.exports = { FileError };
