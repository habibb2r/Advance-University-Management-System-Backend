import { Router } from "express";
import { AcademicFacultyController } from "./academicFaculty.controller";
import { AcademicFacultyValidation } from "./academicFaculty.validation";
import validateRequest from "../../Middlewares/validateRequest";

const router  = Router()

router.post('/create-academic-feculty', validateRequest(AcademicFacultyValidation.createAcademicFacultyValidationSchema), AcademicFacultyController.createAcademicFaculty)
router.get('/', AcademicFacultyController.getAllAcademicFaculty )
router.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty)
router.patch('/:facultyId', validateRequest(AcademicFacultyValidation.updateAcademicFacultyValidationSchema), AcademicFacultyController.updateAcademicFaculty)


export const AcademicFacultyRoutes = router