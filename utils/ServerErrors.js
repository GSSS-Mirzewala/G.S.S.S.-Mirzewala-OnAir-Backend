class ServerError extends Error {
  constructor(code, statusCode = 500, meta = {}) {
    super(code);
    this.code = code;
    this.statusCode = statusCode;
    this.meta = meta;
  }
}

export default ServerError;
