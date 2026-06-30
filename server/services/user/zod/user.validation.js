import { z } from 'zod';

export const userRoleValues = ['RENTER', 'BROKER', 'OWNER'];

const nameSchema = z
  .string()
  .trim()
  .min(1, 'This field is required')
  .max(50, 'This field must be 50 characters or less');

const emailSchema = z
  .string()
  .trim()
  .email('Please provide a valid email address')
  .max(255, 'Email must be 255 characters or less');

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long')
  .max(128, 'Password must be 128 characters or less')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

const phoneSchema = z
  .string()
  .trim()
  .regex(/^\+?[1-9]\d{9,14}$/, 'Please provide a valid phone number');

const profilePictureSchema = z
  .string()
  .trim()
  .url('Profile picture must be a valid URL')
  .optional()
  .or(z.literal(''));

export const userBasicInfoSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  phone: phoneSchema,
  profilePicture: profilePictureSchema
});

export const userRegistrationSchema = z.object({
  basicInfo: userBasicInfoSchema,
  role: z.enum(userRoleValues).optional()
});

export const validateUserRegistration = (data) =>
  userRegistrationSchema.safeParse(data);