import { academicSemesterNameCodeMapper } from "./academicSemester.const";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";


const createAcademicSemesterIntoDB = async(payload: TAcademicSemester) =>{



    if(academicSemesterNameCodeMapper[payload.name] !== payload.code){
        throw new Error('Invalid semester name or code')
    }
    const result  = await AcademicSemester.create(payload);
    return result
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB
}