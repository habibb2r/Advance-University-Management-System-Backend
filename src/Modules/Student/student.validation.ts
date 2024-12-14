import { z } from 'zod';

// Enum for gender
const GenderEnum = z.enum(['Male', 'Female']);

// Enum for blood group
const BloodGroupEnum = z.enum([
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
]);

// UserName schema
const userNameSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First name must be less than 20 characters')
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'First name must be capitalized',
      },
    ),
  middleName: z
    .string()
    .max(20, 'Middle name must be less than 20 characters')
    .optional(),
  lastName: z
    .string()
    .max(20, 'Last name must be less than 20 characters')
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last name is not valid',
    }),
});

// Guardian schema
const guardianSchema = z.object({
  fatherName: z
    .string()
    .max(20, "Father's name must be less than 20 characters"),
  fatherOccupation: z
    .string()
    .max(20, 'Occupation must be less than 20 characters'),
  fatherContactNo: z
    .string()
    .length(11, "Father's contact number must be 11 digits")
    .regex(/^\d{11}$/, "Father's contact number must be 11 digits"),
  motherName: z
    .string()
    .max(20, "Mother's name must be less than 20 characters"),
  motherOccupation: z
    .string()
    .max(20, 'Occupation must be less than 20 characters'),
  motherContactNo: z
    .string()
    .length(11, "Mother's contact number must be 11 digits")
    .regex(/^\d{11}$/, "Mother's contact number must be 11 digits"),
});

// LocalGuardian schema
const localGuardianSchema = z.object({
  name: z.string().max(20, 'Name must be less than 20 characters'),
  occupation: z.string().max(20, 'Occupation must be less than 20 characters'),
  contactNo: z
    .string()
    .length(11, 'Contact number must be 11 digits')
    .regex(/^\d{11}$/, 'Contact number must be 11 digits'),
  address: z.string(),
});

// Student schema
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20),
    student: z.object({
      name: userNameSchema,
      gender: GenderEnum,
      dateOfBirth: z.string().optional(),
      email: z.string().email('Email is not valid'),
      contactNo: z
        .string()
        .length(11, 'Contact number must be 11 digits')
        .regex(/^\d{11}$/, 'Contact number must be 11 digits'),
      emergencyContact: z
        .string()
        .length(11, 'Emergency Contact number must be 11 digits')
        .regex(/^\d{11}$/, 'Emergency Contact number must be 11 digits'),
      bloodGroup: BloodGroupEnum,
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: guardianSchema,
      localGuardian: localGuardianSchema,
      profileImg: z.string().optional(),
      admissionSemester: z.string().optional(),  
      academicDepartment: z.string().optional(),
    })
  
  })
});

const updateUserNameSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First name must be less than 20 characters')
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: 'First name must be capitalized',
      },
    ).optional(),
  middleName: z
    .string()
    .max(20, 'Middle name must be less than 20 characters')
    .optional(),
  lastName: z
    .string()
    .max(20, 'Last name must be less than 20 characters')
    .refine((value) => /^[A-Za-z]+$/.test(value), {
      message: 'Last name is not valid',
    }).optional(),
});

// Guardian schema
const updateGuardianSchema = z.object({
  fatherName: z
    .string()
    .max(20, "Father's name must be less than 20 characters").optional(),
  fatherOccupation: z
    .string()
    .max(20, 'Occupation must be less than 20 characters').optional(),
  fatherContactNo: z
    .string()
    .length(11, "Father's contact number must be 11 digits")
    .regex(/^\d{11}$/, "Father's contact number must be 11 digits").optional(),
  motherName: z
    .string()
    .max(20, "Mother's name must be less than 20 characters").optional(),
  motherOccupation: z
    .string()
    .max(20, 'Occupation must be less than 20 characters').optional(),
  motherContactNo: z
    .string()
    .length(11, "Mother's contact number must be 11 digits")
    .regex(/^\d{11}$/, "Mother's contact number must be 11 digits").optional(),
});

// LocalGuardian schema
const updateLocalGuardianSchema = z.object({
  name: z.string().max(20, 'Name must be less than 20 characters').optional(),
  occupation: z.string().max(20, 'Occupation must be less than 20 characters').optional(),
  contactNo: z
    .string()
    .length(11, 'Contact number must be 11 digits')
    .regex(/^\d{11}$/, 'Contact number must be 11 digits'),
  address: z.string().optional(),
});
const updateStudentValidationSchema = z.object({
  body: z.object({
    student: z.object({
      name: updateUserNameSchema.optional(),
      gender: GenderEnum.optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email('Email is not valid').optional(),
      contactNo: z
        .string()
        .length(11, 'Contact number must be 11 digits')
        .regex(/^\d{11}$/, 'Contact number must be 11 digits').optional(),
      emergencyContact: z
        .string()
        .length(11, 'Emergency Contact number must be 11 digits')
        .regex(/^\d{11}$/, 'Emergency Contact number must be 11 digits').optional(),
      bloodGroup: BloodGroupEnum.optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianSchema.optional(),
      localGuardian: updateLocalGuardianSchema.optional(),
      profileImg: z.string().optional(),
      admissionSemester: z.string().optional(),  
      academicDepartment: z.string().optional(),
    })
  
  })
});

export const studentValidations = {
  
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
