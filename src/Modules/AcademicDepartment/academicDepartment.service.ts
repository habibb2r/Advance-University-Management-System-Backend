import  httpStatus from 'http-status-codes';
import { Types } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';
import AppError from '../../errors/AppError';

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentFromDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty');
  return result;
};

const getSingleAcademicDepartmentFromDB = async (
  id: Types.ObjectId | string,
) => {
  const ObjectId = Types.ObjectId;
  const result = await AcademicDepartment.findOne({
    _id: new ObjectId(id),
  }).populate('academicFaculty');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND,'Academic Department not found');
  }
  return result;
};

const updateAcademicDepartmentInDB = async (
  id: Types.ObjectId | string,
  payload: Partial<TAcademicDepartment>,
) => {
  const ObjectId = Types.ObjectId;
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: new ObjectId(id) },
    payload,
    { new: true },
  );
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND,'Academic Department not found');
  }
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentInDB,
};
