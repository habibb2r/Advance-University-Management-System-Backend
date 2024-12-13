import { Types } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";



const createAcademicFacultyIntoDB = async(payload: TAcademicFaculty) =>{

    const result  = await AcademicFaculty.create(payload);
    return result
}


const getAllAcademicFacultiesFromDB = async()=>{
    const result = await AcademicFaculty.find();
    return result
}

const getSingleAcademicFacultyFromDB = async(id: Types.ObjectId | string) =>{
    const ObjectId = Types.ObjectId
    const result = await AcademicFaculty.findOne({_id: new ObjectId(id)});
    if(!result){
        throw new Error('Academic Semester not found')
    }
    return result
}

const updateAcademicFacultyInDB = async(id: Types.ObjectId | string, payload: Partial<TAcademicFaculty>) =>{
    const ObjectId = Types.ObjectId
    const result = await AcademicFaculty.findOneAndUpdate(
        {_id: new ObjectId(id)},
        payload,
        {new: true}
    )
    if(!result){
        throw new Error('Academic Semester not found')
    }
    return result
}

export const AcademicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultiesFromDB,
    getSingleAcademicFacultyFromDB,
    updateAcademicFacultyInDB
}