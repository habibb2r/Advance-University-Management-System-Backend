import { z } from "zod";
import { months, semesterCodes, semesterNames } from "./academicSemester.const";



const createAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum([...semesterNames] as [string, ...string[]]),
        year: z.date(),
        code: z.enum([...semesterCodes] as [string, ...string[]]),
        startMonth: z.enum([...months] as [string, ...string[]]),
        endMonth: z.enum([...months] as [string, ...string[]]),
    })
})

export const AcademicSemesterValidations = {
    createAcademicSemesterValidationSchema,
}