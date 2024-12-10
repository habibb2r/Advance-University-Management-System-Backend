import { Router } from 'express';
import { AcademicSemesterController } from './academicSemester.controller';


const router = Router()

router.post('/create-academic-semester', AcademicSemesterController.createAcademicSemester )

export const AcademicRouter = router