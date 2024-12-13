import  httpStatus  from 'http-status-codes';
import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import { months, semesterCodes, semesterNames } from './academicSemester.const';
import AppError from '../../errors/AppError';

const academicSemesterSchema = new Schema<TAcademicSemester>(
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
      required: true,
    },
    startMonth: {
      type: String,
      enum: months,
      required: true,
    },
    endMonth: {
      type: String,
      enum: months,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });

  if (isSemesterExists) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE,'Semester with same name and year already exists');
  }

  next();
});

academicSemesterSchema.pre('findOneAndUpdate', async function (next) {
  if (this._update.name || this._update.code) {
    throw new AppError(httpStatus.NOT_ACCEPTABLE,'Can not update name or code');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
);
