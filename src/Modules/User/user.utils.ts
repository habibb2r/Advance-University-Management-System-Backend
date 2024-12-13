import { TAcademicSemester } from "../AcademicSemester/academicSemester.interface";
import { User } from "./user.model";


const findLastStudentId= async()=>{
    const lastStudent = await User.findOne({role: 'student'}, {id: 1, _id: 0}).sort({createdAt: -1}).lean();
    return lastStudent?.id ? lastStudent.id : undefined;
}

export const generateStudentId = async(payload: TAcademicSemester)=>{

    let currentId = (0).toString();
    const lastStudentId = await findLastStudentId();
    const lastStudentYear = lastStudentId?.substring(0, 4)
    const lastStudentSemesterCode = lastStudentId?.substring(4, 6)
    const currentSemesterCode = payload.code
    const currentYear = payload.year
    if(lastStudentId && lastStudentYear === currentYear && lastStudentSemesterCode === currentSemesterCode){
        currentId = lastStudentId.substring(6)
    }
    let incrementId = (Number(currentId)+ 1).toString().padStart(4, '0');
    incrementId = `${payload.year}${payload.code}${incrementId}`;
    return incrementId
}