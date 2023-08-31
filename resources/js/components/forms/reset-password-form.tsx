import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ResetPasswordValidation, ResetPasswordValidationSchema } from "@/lib/validation";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, router } from "@inertiajs/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export function ResetPasswordForm({ token }: { token: string }) {
  const form = useForm<ResetPasswordValidationSchema>({
    resolver: zodResolver(ResetPasswordValidation),
    defaultValues: { email: '', password: '', password_confirmation: '', token }
  });

  const { toast } = useToast();

  const onSubmit: SubmitHandler<ResetPasswordValidationSchema> = ({ email, password, password_confirmation, token }) => {
    router.post(route('post-reset-password'), { email, password, password_confirmation, token }, {
      onError(serverErrors) {
        if (serverErrors.email) form.setError('email', { message: serverErrors.email });
        if (serverErrors.password) form.setError('password', { message: serverErrors.password });
        if (serverErrors.password_confirmation) form.setError('password_confirmation', { message: serverErrors.password_confirmation });
        if (serverErrors.message) toast({ description: serverErrors.message, variant: 'destructive' });
      },
      onSuccess() {
        toast({ description: 'Mot de passe réinitialisé !' });
        form.reset();
      }
    });
  };

  return (
    <Form {...form}>
      <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <Input type="hidden" {...field} />
          )}
        />
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Réinitialisation de mot de passe</CardTitle>
            <CardDescription>Entrez les informations pour réinitialiser votre mot de passe.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(form.formState.errors.email && 'font-bold')}>Confirmez de nouveau votre email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(form.formState.errors.email && 'font-bold')}>Nouveau mot de passe</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="password_confirmation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(form.formState.errors.email && 'font-bold')}>Confirmez le mot de passe</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-between">
                <Link href="/login" className="text-sm text-blue-500 hover:text-blue-300">Se connecter ?</Link>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline">Envoyer</Button>
          </CardFooter>
        </Card>
      </form >
    </Form>
  )
}
