/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';

const router = express.Router();

const validationMiddleware = () =>{
    return async(req: Request, res: Response, next: NextFunction)=>{
        console.log('Checking by Army')
        // next();
    }
}

router.post('/create-student', validationMiddleware(), UserController.createStudent);

export const UserRoutes = router;
