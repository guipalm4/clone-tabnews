export class InternalServerError extends Error {
  constructor({ cause }) {
    super("An unexpected error occurred.", {
      cause,
    });
    this.name = "InternalServerError";
    this.cause = "Please contact support.";
    this.statusCode = 500;
  }

  toJSON() {
    return {
      error: {
        name: this.name,
        message: this.message,
        action: this.cause,
        status_code: this.statusCode,
      },
    };
  }
}
