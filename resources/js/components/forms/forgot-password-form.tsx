import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ForgotPasswordValidation, ForgotPasswordValidationSchema } from "@/lib/validation";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, router } from "@inertiajs/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export function ForgotPasswordForm() {
  const form = useForm<ForgotPasswordValidationSchema>({
    resolver: zodResolver(ForgotPasswordValidation),
    defaultValues: { email: '' }
  });

  const { toast } = useToast();

  const onSubmit: SubmitHandler<ForgotPasswordValidationSchema> = ({ email }) => {
    router.post(route('forgot-password'), { email }, {
      onError(serverErrors) {
        if (serverErrors.email) form.setError('email', { message: serverErrors.email });
        if (serverErrors.message) toast({ description: serverErrors.message, variant: 'destructive' });
      },
      onSuccess() {
        toast({ description: 'La demande à été effectuée !' });
        form.reset();
      }
    });
  };

  return (
    <Form {...form}>
      <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="sm:w-[400px]">
          <CardHeader>
            <CardTitle>Mot de passe oublié</CardTitle>
            <CardDescription>Entrez votre email, pour recevoir les instructions pour réinitialiser votre mot de passe.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(form.formState.errors.email && 'font-bold')}>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-between">
                <Link href="/login" className="text-sm text-blue-500 hover:text-blue-300">Retour à la connexion ?</Link>
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
