import httpStatus from 'http-status-codes';
import catchAsync from '../../Utils/catchAsync';
import { AcademicFacultyServices } from './academicFaculty.service';
import sendResponse from '../../Utils/sendResponse';



const createAcademicFaculty = catchAsync(
  async (req, res,) => {
    
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty created successfully',
      data: result,
    });
  },
);

const getAllAcademicFaculty = catchAsync(
  async (req, res) => {
    const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculties retrieved successfully',
      data: result,
    });
  }
)

const getSingleAcademicFaculty = catchAsync(
  async (req, res) => {
    const { facultyId } = req.params;
    const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDB(facultyId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty retrieved successfully',
      data: result,
    });
  }
)

const updateAcademicFaculty = catchAsync(
  async (req, res) => {
    const { facultyId } = req.params;
    const result = await AcademicFacultyServices.updateAcademicFacultyInDB(facultyId, req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Faculty updated successfully',
      data: result,
    });
  }
)

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty
};
