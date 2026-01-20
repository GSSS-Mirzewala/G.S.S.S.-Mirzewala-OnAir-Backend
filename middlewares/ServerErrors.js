function handler(err, req, res, next) {
  // Default values
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  console.error("🔥 ERROR:", err); // (for Debugging)

  res.status(err.statusCode).json({
    status: err.status,
    errorCode: err.errorCode,
  });
}

export default handler;
