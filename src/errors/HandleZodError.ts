import { ZodError, ZodIssue } from "zod";
import { TErrorSource, TGenericErrorResponse } from "../Global-Interface/TError";

  const handleZodError =(err: ZodError): TGenericErrorResponse=>{
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

  export default handleZodError;