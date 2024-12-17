import  httpStatus  from 'http-status-codes';
import { Student } from './student.model';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { TStudent } from './student.interface';

const getStudentsFromDB = async (query: Record<string, unknown>) => {
  const queryObj = {...query}

  const studentSearchableFields = ['email', 'name.firstName', 'presentAddress']
  let searchTerm = ''

  if(query?.searchTerm){
    searchTerm = query.searchTerm as string;
  }
  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field)=>({
      [field]: { $regex: searchTerm, $options: 'i' }
    }))
  })

  const excludeFields = ['searchTerm']
  excludeFields.forEach(el => delete queryObj[el])
  const result = await searchQuery.find(queryObj).populate('admissionSemester').populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty'
    }
  });
  return result;
};

const getSingleStudent = async (id: string) => {
  const result = await Student.findOne({ id }).populate('admissionSemester').populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty'
    }
  });;
  // const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {

  const { name, guardian, localGuardian, ...remainingStudentData} = payload;
  const modifiedUpdatedData : Record<string, unknown> = {
    ...remainingStudentData,
  }

  if(name && Object.keys(name).length){
    for(const [key, value] of Object.entries(name)){
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }
  if(guardian && Object.keys(guardian).length){
    for(const [key, value] of Object.entries(guardian)){
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }
  if(localGuardian && Object.keys(localGuardian).length){
    for(const [key, value] of Object.entries(localGuardian)){
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }
  const result = await Student.findOneAndUpdate({id}, modifiedUpdatedData, {new: true, runValidators: true});
  return result;
};

const deleteStudentFromDB = async (id: string) => {

  const isExist = await Student.findOne({id, isDeleted: false})
  if(!isExist){
    throw new AppError(httpStatus.NOT_FOUND, 'Student not found')
  }
  
  const session = await mongoose.startSession();
  try{
    session.startTransaction();


    const deletedStudent = await Student.findOneAndUpdate({ id }, { isDeleted: true }, {new: true, session});

    if(!deletedStudent){
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
    }

    const deletedUser = await User.findOneAndUpdate({id}, { isDeleted: true}, {new: true, session});
    if(!deletedUser){
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user')
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedUser;

  }catch(err){
    await session.abortTransaction();
    await session.endSession()
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student')
  }
  
};
export const StudentServices = {
  getStudentsFromDB,
  getSingleStudent,
  deleteStudentFromDB,
  updateStudentIntoDB
};
