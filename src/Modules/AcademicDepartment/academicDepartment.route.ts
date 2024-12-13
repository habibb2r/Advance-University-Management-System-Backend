import { Router } from "express";

import validateRequest from "../../Middlewares/validateRequest";
import { AcademicDepartmentValidation } from "./academicDepartment.validation";
import { AcademicDepartmentController } from "./academicDepartment.controller";

const router  = Router()

router.post('/create-academic-feculty', validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema), AcademicDepartmentController.createAcademicDepartment)
router.get('/', AcademicDepartmentController.getAllAcademicDepartment )
router.get('/:facultyId', AcademicDepartmentController.getSingleAcademicDepartment)
router.patch('/:facultyId', validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema), AcademicDepartmentController.updateAcademicDepartment)


export const AcademicDepartmentRoutes = router