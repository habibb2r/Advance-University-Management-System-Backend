import httpStatus  from 'http-status-codes';
import mongoose from 'mongoose';
import config from '../../config';
import { TAcademicSemester } from '../AcademicSemester/academicSemester.interface';
import { AcademicSemester } from '../AcademicSemester/academicSemester.model';
import { TStudent } from '../Student/student.interface';
import { Student } from '../Student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};

  userData.password = password || (config.default_password as string);
  userData.role = 'student';

  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)

  const session = await mongoose.startSession()
  try{
    session.startTransaction();
    userData.id  = await generateStudentId(admissionSemester as TAcademicSemester);

    //create a user
    const newUser = await User.create([userData], {session});
    //create a student
    if (!newUser.length) {
        throw new AppError(httpStatus.BAD_REQUEST,'Failed to create user');
    }
       //set id, _id as user
       payload.id = newUser[0].id;
       payload.user = newUser[0]._id;
       const newStudent = await Student.create([payload], {session});
       if(!newStudent.length) {
        throw new AppError(httpStatus.BAD_REQUEST,'Failed to create student');
       }

       await session.commitTransaction();
       await session.endSession();
       return newStudent;

  }catch(err){
    await session.abortTransaction();
    await session.endSession();
    
  }

};

export const UserServices = {
  createStudentIntoDB,
};
