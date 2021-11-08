class ValidationError extends Error {
  constructor(id) {
    super(id);
    this.message = [
      "config missed",
      "wrong config",
      "duplicated config condition",
    ];
    this.name = "ValidationError";
  }
}

module.exports = { ValidationError };
