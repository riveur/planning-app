import { z } from "zod";

const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

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

export const ForgotPasswordValidation = UserValidation.pick({ email: true });

export const ResetPasswordValidation = UserValidation.pick({ email: true })
  .extend({
    password: z.string().min(1, 'Vous devez renseigner un mot de passe'),
    password_confirmation: z.string().min(1, 'Vous devez renseigner un mot de passe'),
    token: z.string().min(1, "Vous devez préciser le token")
  })
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
  formateur_id: z.string().regex(/^\d*$/, 'Valeur invalide').or(z.number()).nullable().optional().transform(v => v === '' ? null : v),
  category_id: z.string({ required_error: 'Vous devez choisir une catégorie' }).regex(/^\d+$/, 'Valeur invalide').or(z.number()),
  groups: z.array(z.object({ label: z.string(), value: z.number() })),
});

export const StoreEventValidation = EventValidation.extend({
  start_date: z.date(),
  end_date: z.date(),
  start_morning_time: z.string().regex(timeRegex, 'Heure invalide'),
  end_morning_time: z.string().regex(timeRegex, 'Heure invalide'),
  start_afternoon_time: z.string().regex(timeRegex, 'Heure invalide'),
  end_afternoon_time: z.string().regex(timeRegex, 'Heure invalide'),
  days: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'Vous devez choisir au moins une valeur',
  }),
});

export const StoreScheduleValidation = z.object({
  event_id: z.string({ required_error: 'Vous devez choisir un évènement' }).regex(/^\d+$/, 'Valeur invalide').or(z.number()),
  start_date: z.date(),
  end_date: z.date()
});

export const LoginValidation = z.object({
  email: z.string().min(1, 'Vous devez renseigner votre mail').email('Email invalide').max(255),
  password: z.string().min(1, 'Vous devez renseigner votre mot de passe').max(255)
});

export const CategoryValidation = z.object({
  name: z.string().min(1, 'Vous devez préciser un nom').max(255),
  color: z.string().min(1, 'Vous devez préciser une couleur').max(255)
});

export type UserValidationSchema = z.infer<typeof UserValidation>;
export type RoleValidationSchema = z.infer<typeof RoleValidation>;
export type GroupValidationSchema = z.infer<typeof GroupValidation>;
export type EventValidationSchema = z.infer<typeof EventValidation>;
export type StoreEventValidationSchema = z.infer<typeof StoreEventValidation>;
export type StoreScheduleValidationSchema = z.infer<typeof StoreScheduleValidation>;
export type RegisterValidationSchema = z.infer<typeof RegisterValidation>;
export type ForgotPasswordValidationSchema = z.infer<typeof ForgotPasswordValidation>;
export type ResetPasswordValidationSchema = z.infer<typeof ResetPasswordValidation>;
export type LoginValidationSchema = z.infer<typeof LoginValidation>;
export type CategoryValidationSchema = z.infer<typeof CategoryValidation>;
