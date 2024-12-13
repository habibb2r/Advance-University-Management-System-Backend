import { z } from "zod";

const academicFacultyValidationSchema = z.object({
    name: z.string({
        invalid_type_error: 'Academic Faculty must be string',
    })
})

export const AcademicFacultyValidation = {
    academicFacultyValidationSchema,
}