import { z } from "zod";
import { months, semesterCodes, semesterNames } from "./academicSemester.const";



const createAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum([...semesterNames] as [string, ...string[]]),
        year: z.string(),
        code: z.enum([...semesterCodes] as [string, ...string[]]),
        startMonth: z.enum([...months] as [string, ...string[]]),
        endMonth: z.enum([...months] as [string, ...string[]]),
    })
})
const updateAcademicSemesterValidationSchema = z.object({
    body: z.object({
        year: z.string().optional(),
        startMonth: z.enum([...months] as [string, ...string[]]).optional(),
        endMonth: z.enum([...months] as [string, ...string[]]).optional(),
    })
})

export const AcademicSemesterValidations = {
    createAcademicSemesterValidationSchema,
    updateAcademicSemesterValidationSchema
}