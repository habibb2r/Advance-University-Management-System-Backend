import httpStatus from 'http-status-codes';
import catchAsync from '../../Utils/catchAsync';

import sendResponse from '../../Utils/sendResponse';
import { AcademicDepartmentServices } from './academicDepartment.service';



const createAcademicDepartment = catchAsync(
  async (req, res,) => {
    
    const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department created successfully',
      data: result,
    });
  },
);

const getAllAcademicDepartment = catchAsync(
  async (req, res) => {
    const result = await AcademicDepartmentServices.getAllAcademicDepartmentFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department are retrieved successfully',
      data: result,
    });
  }
)

const getSingleAcademicDepartment = catchAsync(
  async (req, res) => {
    const { departmentId } = req.params;
    const result = await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(departmentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department is retrieved successfully',
      data: result,
    });
  }
)

const updateAcademicDepartment = catchAsync(
  async (req, res) => {
    const { departmentId } = req.params;
    const result = await AcademicDepartmentServices.updateAcademicDepartmentInDB(departmentId, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Department updated successfully',
      data: result,
    });
  }
)

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment
};
