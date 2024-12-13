import { Types } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment";
import { AcademicDepartment } from "./academicDepartment.model";




const createAcademicDepartmentIntoDB = async(payload: TAcademicDepartment) =>{

    const result  = await AcademicDepartment.create(payload);
    return result
}


const getAllAcademicDepartmentFromDB = async()=>{
    const result = await AcademicDepartment.find();
    return result
}

const getSingleAcademicDepartmentFromDB = async(id: Types.ObjectId | string) =>{
    const ObjectId = Types.ObjectId
    const result = await AcademicDepartment.findOne({_id: new ObjectId(id)});
    if(!result){
        throw new Error('Academic Department not found')
    }
    return result
}

const updateAcademicDepartmentInDB = async(id: Types.ObjectId | string, payload: Partial<TAcademicDepartment>) =>{
    const ObjectId = Types.ObjectId
    const result = await AcademicDepartment.findOneAndUpdate(
        {_id: new ObjectId(id)},
        payload,
        {new: true}
    )
    if(!result){
        throw new Error('Academic Department not found')
    }
    return result
}

export const AcademicDepartmentServices = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentFromDB,
    getSingleAcademicDepartmentFromDB,
    updateAcademicDepartmentInDB
}