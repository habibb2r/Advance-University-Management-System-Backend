
import httpStatus from 'http-status-codes';
import sendResponse from '../../Utils/sendResponse';
import catchAsync from '../../Utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';


const createAcademicSemester = catchAsync(
  async (req, res,) => {
    
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester created successfully',
      data: result,
    });
  },
);

export const AcademicSemesterController = {
  createAcademicSemester,
};
