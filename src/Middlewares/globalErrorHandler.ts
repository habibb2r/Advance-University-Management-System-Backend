
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../Global-Interface/TError';
import config from '../config';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

  //setting default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

    let errorSources : TErrorSource = [{
      path: "",
      message: 'Something went wrong'
  }]

  const handleZodError =(err: ZodError)=>{
    const errorSources : TErrorSource = err.issues.map((issue: ZodIssue)=>{
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      }
    })

    const statusCode = 400;
    return {
      statusCode,
      message : 'Validation Error',
      errorSources
    }
  }

  if(err instanceof ZodError){
   const simplifiedError = handleZodError(err)
   statusCode = simplifiedError?.statusCode;
   message = simplifiedError?.message;
   errorSources = simplifiedError?.errorSources
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default globalErrorHandler;
