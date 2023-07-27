const notFound = (req,res,next) => {
    const error = new Error(`Invalid URL! Please try again`);
    res.status(404);
    next(error);
}

const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode===200 ? 500: res.statusCode;
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
        errorType = "Something went wrong, please try again";
        break;
  }
    res.status(statusCode);
    res.json({reason:errorType, message: err.message});
};
module.exports = {notFound,errorHandler};
