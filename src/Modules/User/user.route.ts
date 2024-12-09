/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import { AnyZodObject } from 'zod';
import { studentValidations } from '../Student/student.validation';
import validateRequest from '../../Middlewares/validateRequest';

const router = express.Router();



router.post('/create-student', validateRequest(studentValidations.studentValidationSchema), UserController.createStudent);

export const UserRoutes = router;
