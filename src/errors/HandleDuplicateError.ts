import { TErrorSource, TGenericErrorResponse } from "../Global-Interface/TError";

const handleDuplicateError = (err: any): TGenericErrorResponse =>{

    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1]

    const errorSources : TErrorSource = [{
        path: '',
        message: `${extractedMessage} is already exist`
    }]

    const statusCode = 400;
    return {
       
      statusCode,
      message : 'Validation Error',
      errorSources
    }
}

export default handleDuplicateError