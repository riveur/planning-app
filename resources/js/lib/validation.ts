import { number, z } from "zod";

export const UserValidation = z.object({
  firstname: z.string().min(1, 'Vous devez renseigner un prénom').max(255),
  lastname: z.string().min(1, 'Vous devez renseigner un nom').max(255),
  email: z.string().min(1, 'Vous devez renseigner un mail').email('Email invalide').max(255),
  role_id: z.string().regex(/^\d*$/, 'Valeur invalide').or(z.number()).nullable().optional().transform(v => v === '' ? null : v),
  group_id: z.string().regex(/^\d*$/, 'Valeur invalide').or(z.number()).nullable().optional().transform(v => v === '' ? null : v)
});

export const RegisterValidation = UserValidation
  .extend({
    password: z.string().min(1, 'Vous devez renseigner un mot de passe'),
    password_confirmation: z.string().min(1, 'Vous devez renseigner un mot de passe')
  })
  .omit({ role_id: true, group_id: true })
  .refine(({ password, password_confirmation }) => password === password_confirmation, {
    message: 'Les mots de passes ne correspondent pas',
    path: ['password_confirmation']
  });

export const RoleValidation = z.object({
  name: z.string().min(1, 'Vous devez préciser un nom').max(255),
  description: z.string().min(1, 'Vous devez préciser une description').max(255)
});

export const GroupValidation = z.object({
  name: z.string().min(1, 'Vous devez préciser un nom').max(255),
  description: z.string().min(1, 'Vous devez préciser une description').max(255)
});

export const EventValidation = z.object({
  title: z.string().min(1, 'Vous devez préciser un titre').max(255),
  description: z.string().min(1, 'Vous devez préciser une description').max(255),
  formateur_id: z.string().regex(/^\d*$/, 'Valeur invalide').or(z.number()).nullable().optional().transform(v => v === '' ? null : v),
  groups: z.array(z.object({ label: z.string(), value: z.number() }))
});

export const LoginValidation = z.object({
  email: z.string().min(1, 'Vous devez renseigner votre mail').email('Email invalide').max(255),
  password: z.string().min(1, 'Vous devez renseigner un nom d\'utilisateur').max(255)
});

export type UserValidationSchema = z.infer<typeof UserValidation>;
export type RoleValidationSchema = z.infer<typeof RoleValidation>;
export type GroupValidationSchema = z.infer<typeof GroupValidation>;
export type EventValidationSchema = z.infer<typeof EventValidation>;
export type RegisterValidationSchema = z.infer<typeof RegisterValidation>;
export type LoginValidationSchema = z.infer<typeof LoginValidation>;
