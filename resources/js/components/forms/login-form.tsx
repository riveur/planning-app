import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoginValidation, LoginValidationSchema } from "@/lib/validation";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, router } from "@inertiajs/react";
import { zodResolver } from "@hookform/resolvers/zod";

export function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setError,
    setValue
  } = useForm<LoginValidationSchema>({
    resolver: zodResolver(LoginValidation)
  });

  const { toast } = useToast();

  const onSubmit: SubmitHandler<LoginValidationSchema> = ({ email, password }) => {
    router.post(route('login'), { email, password }, {
      onError(serverErrors) {
        if (serverErrors.email) setError('email', { message: serverErrors.email });
        if (serverErrors.password) setError('password', { message: serverErrors.password });
        setValue('password', '');
      },
      onSuccess() {
        toast({ description: 'Connexion réussie !' });
      }
    });
  };

  return (
    <form method="post" onSubmit={handleSubmit(onSubmit)}>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Planning</CardTitle>
          <CardDescription>Connectez-vous pour démarrer la session.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
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
            <div className="flex justify-between">
              <Link href="/register" className="text-sm text-blue-500 hover:text-blue-300">Pas de compte ?</Link>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button variant="outline">Se connecter</Button>
        </CardFooter>
      </Card>
    </form >
  )
}
