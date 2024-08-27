/* //const process = require("process");



// refers to how Express catches and processes errors that occur both synchronously and asynchronously
const routeNotFound = (req, res ,next)=>{
    const originalUrl = req;
    const error = new Error (`Route not found :${originalUrl}`) 
    res.status(404);
    next(error);
};
const errorHandler = (err, req, res, next)=>{
      let statusCode= res.statusCode === 200 ? 500 : res.statusCode;
      let message= err.message;


      if(err.name === "CastError" && err.kind === "ObjectId"){
        statusCode= 404 ;
        message = "Ressource not found"
      }
      res.status(statusCode).json({
        message: message,
        stack : process.env.NODE_ENV !== "production" ? null : err.stack,
      })

}

export {routeNotFound, errorHandler}
 */