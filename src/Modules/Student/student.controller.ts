/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status-codes';
import { StudentServices } from './student.service';
import sendResponse from '../../Utils/sendResponse';
import catchAsync from '../../Utils/catchAsync';


const getStudents = catchAsync(
  async (req, res) => {
    const result = await StudentServices.getStudentsFromDB(req.query);
    
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students retrived successfully',
      data: result,
    });
  },
);

const getSingleStudent = catchAsync(
  async (req, res) => {
    const { studentId } = req.params;
    
    const result = await StudentServices.getSingleStudent(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Retrieved successfully',
      data: result,
    });
  },
);

const updateStudent = catchAsync(
  async (req, res) => {
    const { studentId } = req.params;
    const {student} = req.body;
    const result = await StudentServices.updateStudentIntoDB(studentId, student);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student Updated successfully',
      data: result,
    });
  },
);

const deleteStudent = catchAsync(
  async (req, res) => {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
  },
);

export const StudentControllers = {
  getStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent
};
