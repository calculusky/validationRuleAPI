

  exports.throwError = ({ message, statusCode }) => {
    const error = new Error(message);
    error.status = 'error';
    error.statusCode = statusCode || 500;
    error.data = null;
    throw error;
}


