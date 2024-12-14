import  httpStatus  from 'http-status-codes';
import { populate } from 'dotenv';
import { Student } from './student.model';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';

const getStudentsFromDB = async () => {
  const result = await Student.find().populate('admissionSemester').populate({
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
  }
  
};
export const StudentServices = {
  getStudentsFromDB,
  getSingleStudent,
  deleteStudentFromDB,
};
