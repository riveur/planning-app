import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, router } from "@inertiajs/react";
import { RegisterValidation, RegisterValidationSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";

export function RegisterForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError
  } = useForm<RegisterValidationSchema>({
    resolver: zodResolver(RegisterValidation)
  });

  const { toast } = useToast();

  const onSubmit: SubmitHandler<RegisterValidationSchema> = (data) => {
    router.post(route('register'), data, {
      onError(serverErrors) {
        if (serverErrors.firstname) setError('firstname', { message: serverErrors.firstname });
        if (serverErrors.lastname) setError('lastname', { message: serverErrors.lastname });
        if (serverErrors.email) setError('email', { message: serverErrors.email });
        if (serverErrors.password) setError('password', { message: serverErrors.password });
        if (serverErrors.password_confirmation) setError('password_confirmation', { message: serverErrors.password_confirmation });
      },
      onSuccess() {
        toast({ description: 'Votre compte à bien été créé' });
      }
    });
  };

  return (
    <form method="post" onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-full sm:w-[550px]">
        <CardHeader>
          <CardTitle>Création de compte</CardTitle>
          <CardDescription>Renseignez vos informations.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex flex-col space-y-1.5 w-full">
                <Label htmlFor="lastname" className={cn(errors.lastname && 'text-red-500 font-bold')}>Nom</Label>
                <Input id="lastname" type="text" {...register('lastname')} placeholder="Elon" />
                {errors.lastname && <span className="text-sm text-red-500">{errors.lastname.message}</span>}
              </div>
              <div className="flex flex-col space-y-1.5 w-full">
                <Label htmlFor="firstname" className={cn(errors.firstname && 'text-red-500 font-bold')}>Prénom</Label>
                <Input id="firstname" type="text" {...register('firstname')} placeholder="Musk" />
                {errors.firstname && <span className="text-sm text-red-500">{errors.firstname.message}</span>}
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email" className={cn(errors.email && 'text-red-500 font-bold')}>Email</Label>
              <Input id="email" type="email" {...register('email')} placeholder="john@example.com" />
              {errors.email && <span className="text-sm text-red-500">{errors.email.message}</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password" className={cn(errors.password && 'text-red-500 font-bold')}>Mot de passe</Label>
              <Input id="password" {...register('password')} type="password" />
              {errors.password && <span className="text-sm text-red-500">{errors.password.message}</span>}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password-confirmation" className={cn(errors.password_confirmation && 'text-red-500 font-bold')}>Confirmez votre mot de passe</Label>
              <Input id="password-confirmation" {...register('password_confirmation')} type="password" />
              {errors.password_confirmation && <span className="text-sm text-red-500">{errors.password_confirmation.message}</span>}
            </div>
            <div className="flex justify-between">
              <Link href={route('login')} className="text-sm text-blue-500 hover:text-blue-300">Déjà un compte ?</Link>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline">Créer</Button>
        </CardFooter>
      </Card>
    </form >
  )
}
