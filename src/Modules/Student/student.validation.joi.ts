import Joi from 'joi';

// Joi schema for UserName
const userNameSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .regex(/^[A-Z][a-z]*$/, 'capitalized')
    .required()
    .messages({
      'string.empty': 'First name is required',
      'string.max': 'First name must be less than 20 characters',
      'string.pattern.name': '{#label} is not capitalized',
    }),
  middleName: Joi.string().trim().max(20).messages({
    'string.max': 'Middle name must be less than 20 characters',
  }),
  lastName: Joi.string()
    .trim()
    .max(20)
    .regex(/^[a-zA-Z]*$/, 'alpha')
    .required()
    .messages({
      'string.empty': 'Last name is required',
      'string.max': 'Last name must be less than 20 characters',
      'string.pattern.name': '{#label} is not valid',
    }),
});

// Joi schema for Guardian
const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().trim().max(20).required().messages({
    'string.empty': "Father's name is required",
    'string.max': "Father's name must be less than 20 characters",
  }),
  fatherOccupation: Joi.string().trim().max(20).required().messages({
    'string.empty': "Father's occupation is required",
    'string.max': 'Occupation must be less than 20 characters',
  }),
  fatherContactNo: Joi.string().trim().length(11).required().messages({
    'string.empty': "Father's contact number is required",
    'string.length': "Father's contact number must be 11 digits",
  }),
  motherName: Joi.string().trim().max(20).required().messages({
    'string.empty': "Mother's name is required",
    'string.max': "Mother's name must be less than 20 characters",
  }),
  motherOccupation: Joi.string().trim().max(20).required().messages({
    'string.empty': "Mother's occupation is required",
    'string.max': 'Occupation must be less than 20 characters',
  }),
  motherContactNo: Joi.string().trim().length(11).required().messages({
    'string.empty': "Mother's contact number is required",
    'string.length': "Mother's contact number must be 11 digits",
  }),
});

// Joi schema for LocalGuardian
const localGuardianValidationSchema = Joi.object({
  name: Joi.string().trim().max(20).required().messages({
    'string.empty': "Local guardian's name is required",
    'string.max': 'Name must be less than 20 characters',
  }),
  occupation: Joi.string().trim().max(20).required().messages({
    'string.empty': "Local guardian's occupation is required",
    'string.max': 'Occupation must be less than 20 characters',
  }),
  contactNo: Joi.string().trim().length(11).required().messages({
    'string.empty': "Local guardian's contact number is required",
    'string.length': 'Contact number must be 11 digits',
  }),
  address: Joi.string().trim().required().messages({
    'string.empty': "Local guardian's address is required",
  }),
});

// Joi schema for Student
const studentJOIValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.empty': 'Student ID is required',
  }),
  name: userNameSchema.required().messages({
    'object.base': 'Name is required',
  }),
  gender: Joi.string().valid('Male', 'Female').required().messages({
    'any.only': '{#label} is not a valid gender',
    'string.empty': 'Gender is required',
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    'string.empty': 'Email is required',
    'string.email': '{#label} is not a valid email',
  }),
  contactNo: Joi.string().trim().length(11).required().messages({
    'string.empty': 'Contact number is required',
    'string.length': 'Contact number must be 11 digits',
  }),
  emergencyContact: Joi.string().trim().length(11).required().messages({
    'string.empty': 'Emergency contact is required',
    'string.length': 'Emergency contact number must be 11 digits',
  }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-')
    .optional(),
  presentAddress: Joi.string().trim().required().messages({
    'string.empty': 'Present address is required',
  }),
  permanentAddress: Joi.string().trim().required().messages({
    'string.empty': 'Permanent address is required',
  }),
  guardian: guardianValidationSchema.required().messages({
    'object.base': 'Guardian information is required',
  }),
  localGuardian: localGuardianValidationSchema.required().messages({
    'object.base': 'Local guardian information is required',
  }),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentJOIValidationSchema;
