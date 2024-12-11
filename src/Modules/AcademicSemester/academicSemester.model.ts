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



academicSemesterSchema.pre('save', async function(next){
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  })

  if(isSemesterExists){
    throw new Error('Semester with same name and year already exists');
  }

  next();
})


export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema);
