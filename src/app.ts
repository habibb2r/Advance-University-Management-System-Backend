/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './Modules/Student/student.route';
import { UserRoutes } from './Modules/User/user.route';
import globalErrorHandler from './Middlewares/globalErrorHandler';
import notFound from './Middlewares/notFound';
import sendResponse from './Utils/sendResponse';
import router from './Routes';
const app: Application = express();

//parser

app.use(express.json());
app.use(cors());

//routes

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
