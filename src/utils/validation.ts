import { z } from 'zod';

export const emailSchema = z.string().email();
export const passwordSchema = z.string().min(8).max(100);
export const nameSchema = z.string().min(2).max(50);

export const userSchema = z.object({
  id: z.string().optional(),
  email: emailSchema,
  name: nameSchema,
  role: z.enum(['admin', 'teacher', 'student', 'parent']),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const registrationSchema = userSchema.extend({
  password: passwordSchema,
  confirmPassword: passwordSchema,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type User = z.infer<typeof userSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type RegistrationInput = z.infer<typeof registrationSchema>;