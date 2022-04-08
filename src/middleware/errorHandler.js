// Handling Errors.

export default (err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong";
  return res
    .status(statusCode)
    .json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });

  // next();
};
