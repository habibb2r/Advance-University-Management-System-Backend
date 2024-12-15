import mongoose from "mongoose";
import { TErrorSource, TGenericErrorResponse } from "../Global-Interface/TError";

const handleCastError = (err: mongoose.Error.CastError): TGenericErrorResponse =>{

    const errorSources : TErrorSource = [{
        path: err.path,
        message: err.message
    }]

    const statusCode = 400;
    return {
       
      statusCode,
      message : 'Validation Error',
      errorSources
    }
}

export default handleCastError