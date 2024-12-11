import { Router } from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../Middlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validation';


const router = Router()

router.post('/create-academic-semester', validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema), AcademicSemesterController.createAcademicSemester )
router.get('/', AcademicSemesterController.getAllAcademicSemester )
router.get('/:semesterId', AcademicSemesterController.getSingleAcademicSemester)
router.patch('/:semesterId', validateRequest(AcademicSemesterValidations.updateAcademicSemesterValidationSchema), AcademicSemesterController.updateAcademicSemester)

export const AcademicRoutes = router