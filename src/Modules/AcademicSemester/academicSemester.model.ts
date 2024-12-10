import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import { TAcademicSemester, TMonths } from './academicSemester.interface';


const months : TMonths[] = [
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August", 
    "September", 
    "October", 
    "November", 
    "December"
  ];
const academicSemesterSchema  = new Schema<TAcademicSemester>(
  {
    
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    year: {
      type: Date,
      required: true
    },
    startMonth: {
      type: String,
      enum: months,
    },
    endMonth: {
      type: String,
      enum: months,
    },
  },
  {
    timestamps: true,
  },
);



export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema);
