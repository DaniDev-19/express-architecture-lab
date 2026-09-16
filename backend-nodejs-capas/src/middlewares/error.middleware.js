const notFound = (request, response) => {
  response.status(404).json({
    error: `Route not found: ${request.method} ${request.originalUrl}`,
  });
};

const errorHandler = (error, request, response, next) => {
  console.error(error);

  if (response.headersSent) {
    return next(error);
  }

  response.status(error.statusCode || 500).json({
    error: error.statusCode ? error.message : 'Internal server error',
  });
};

module.exports = { notFound, errorHandler };
