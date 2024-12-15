
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../Global-Interface/TError';
import config from '../config';
import handleZodError from '../errors/HandleZodError';
import handleValidationError from '../errors/HandleValidationError';
import handleCastError from '../errors/HandleCastError';

const globalErrorHandler: ErrorRequestHandler  = (err, req, res, next) => {

  //setting default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

    let errorSources : TErrorSource = [{
      path: "",
      message: 'Something went wrong'
  }]



  if(err instanceof ZodError){
   const simplifiedError = handleZodError(err)
   statusCode = simplifiedError?.statusCode;
   message = simplifiedError?.message;
   errorSources = simplifiedError?.errorSources
  } else if(err?.name === 'ValidationError'){
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources
  } else if(err?.name === 'CastError'){
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources
  }
   else if(err?.code === 11000){
    const simplifiedError = handleDuplicateError(err)
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
