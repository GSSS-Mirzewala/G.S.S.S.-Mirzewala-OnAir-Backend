class ServerError extends Error {
  constructor(errorCode, statusCode = 500) {
    super(errorCode);

    this.errorCode = errorCode
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ServerError;
