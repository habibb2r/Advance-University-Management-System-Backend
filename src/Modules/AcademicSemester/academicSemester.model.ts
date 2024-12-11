import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import { months, semesterCodes, semesterNames } from './academicSemester.const';



const academicSemesterSchema  = new Schema<TAcademicSemester>(
  {
    
    name: {
      type: String,
      enum: semesterNames,
      required: true,
    },
    code: {
      type: String,
      enum: semesterCodes,
      required: true,
    },
    year: {
      type: String,
      required: true
    },
    startMonth: {
      type: String,
      enum: months,
      required: true
    },
    endMonth: {
      type: String,
      enum: months,
      required: true
    },
  },
  {
    timestamps: true,
  },
);



export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema);
