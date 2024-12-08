/* eslint-disable @typescript-eslint/no-unused-vars */
import httpStatus from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../Utils/sendResponse';
import catchAsync from '../../Utils/catchAsync';


const createStudent = catchAsync(
  async (req, res,) => {
    const { password, student: studentData } = req.body;
    // const zodValidationData = studentValidationSchema.parse(studentData)
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  },
);

export const UserController = {
  createStudent,
};
