import { z } from "zod";

export const UserValidation = z.object({
  firstname: z.string().min(1, 'Vous devez renseigner votre prénom').max(255),
  lastname: z.string().min(1, 'Vous devez renseigner votre nom').max(255),
  email: z.string().min(1, 'Vous devez renseigner un mail').email('Email invalide').max(255)
});

export const RegisterValidation = UserValidation
  .extend({
    password: z.string().min(1, 'Vous devez renseigner un mot de passe'),
    password_confirmation: z.string().min(1, 'Vous devez renseigner un mot de passe')
  })
  .refine(({ password, password_confirmation }) => password === password_confirmation, {
    message: 'Les mots de passes ne correspondent pas',
    path: ['password_confirmation']
  });

export const LoginValidation = z.object({
  email: z.string().min(1, 'Vous devez renseigner votre mail').email('Email invalide').max(255),
  password: z.string().min(1, 'Vous devez renseigner un nom d\'utilisateur').max(255)
});

export type RegisterValidationSchema = z.infer<typeof RegisterValidation>;
export type LoginValidationSchema = z.infer<typeof LoginValidation>;
