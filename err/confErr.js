class ValidationError extends Error {
  constructor(id) {
    super(id);
    this.message = [
      "config missed",
      "wrong config",
      "duplicated config condition",
    ];
    this.name = "ValidationError";
    process.stderr.write(`${this.name}: ${this.message[id] || "unknown err"}`);
    process.exit(126);
  }
}

module.exports = { ValidationError };
