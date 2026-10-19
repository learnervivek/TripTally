export function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || (res.statusCode === 200 ? 500 : res.statusCode);

  console.error(`[Error] ${req.method} ${req.originalUrl} - ${err.message}`);
  if (process.env.NODE_ENV !== 'production' && err.stack) {
    console.error(err.stack);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    errors: err.errors || undefined,
    stack: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
}

export function notFound(req, res, next) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

export default errorHandler;
