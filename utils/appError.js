const createAppError = (msg, statusCode) => {
  const error = new Error(msg);
  error.statusCode = statusCode;
  error.error = `${statusCode}`.startsWith("4") ? "fail" : "error";
  error.isOperational = true;

  if (Error.captureStackTrace) {
    Error.captureStackTrace(error, createAppError);
  }

  return error;
};

module.exports = createAppError;
