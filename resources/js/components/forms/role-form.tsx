import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useForm, SubmitHandler } from "react-hook-form";
import { router } from "@inertiajs/react";
import { RoleValidation, RoleValidationSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role } from "@/types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

export function RoleForm({ role }: { role?: Role }) {
  const form = useForm<RoleValidationSchema>({
    resolver: zodResolver(RoleValidation),
    defaultValues: role || { name: '', description: '' }
  });

  const { toast } = useToast();

  const onSubmit: SubmitHandler<RoleValidationSchema> = (data) => {
    if (role) {
      router.put(route('roles.update', { role: role.id }), { ...role, ...data }, {
        onError(serverErrors) {
          if (serverErrors.name) form.setError('name', { message: serverErrors.name });
          if (serverErrors.description) form.setError('description', { message: serverErrors.description });
        },
        onSuccess() {
          toast({ description: `Le rôle #${role.id} à bien été modifié` });
        }
      });
    } else {
      router.post(route('roles.store'), data, {
        onError(serverErrors) {
          if (serverErrors.name) form.setError('name', { message: serverErrors.name });
          if (serverErrors.description) form.setError('description', { message: serverErrors.description });
        },
        onSuccess() {
          toast({ description: 'Le rôle à bien été créée' });
        }
      });
    }
  };

  return (
    <Form {...form}>
      <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardContent className="pt-6">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(form.formState.errors.name && 'font-bold')}>Nom</FormLabel>
                      <FormControl>
                        <Input placeholder="admin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(form.formState.errors.description && 'font-bold')}>Description</FormLabel>
                      <FormControl>
                        <Input placeholder="Administrateur" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline">{role ? 'Modifier' : 'Ajouter'}</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
