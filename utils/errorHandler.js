const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  let errorType;
  switch (statusCode) {
    case 400:
        errorType = "Validation Failed";
        break;
    case 404:
        errorType = "Not Found";
        break;
    case 401:
        errorType = "Unauthorized";
        break;
    case 403:
        errorType = "Forbidden";
        break;
    case 500:
        errorType = "Server Error";
        break;
    default:
        errorType = "Invalid input"
        break;
  }
    res.json({reason:errorType, message: err.message});
};
module.exports = errorHandler;