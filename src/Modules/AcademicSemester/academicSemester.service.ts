import {  Types } from "mongoose";
import { academicSemesterNameCodeMapper } from "./academicSemester.const";
import { TAcademicSemester, TUpdateAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";


const createAcademicSemesterIntoDB = async(payload: TAcademicSemester) =>{



    if(academicSemesterNameCodeMapper[payload.name] !== payload.code){
        throw new Error('Invalid semester name or code')
    }
    const result  = await AcademicSemester.create(payload);
    return result
}


const getAllAcademicSemestersFromDB = async()=>{
    const result = await AcademicSemester.find();
    return result
}

const getSingleAcademicSemesterFromDB = async(id: Types.ObjectId | string) =>{
    const ObjectId = Types.ObjectId
    const result = await AcademicSemester.findOne({_id: new ObjectId(id)});
    if(!result){
        throw new Error('Academic Semester not found')
    }
    return result
}

const updateAcademicSemesterInDB = async(id: Types.ObjectId | string, payload: Partial<TUpdateAcademicSemester>) =>{
    const ObjectId = Types.ObjectId
    const result = await AcademicSemester.findOneAndUpdate(
        {_id: new ObjectId(id)},
        payload,
        {new: true}
    )
    if(!result){
        throw new Error('Academic Semester not found')
    }
    return result
}

export const AcademicSemesterServices = {
    createAcademicSemesterIntoDB,
    getAllAcademicSemestersFromDB,
    getSingleAcademicSemesterFromDB,
    updateAcademicSemesterInDB
}