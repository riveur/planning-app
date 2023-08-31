import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useForm, SubmitHandler } from "react-hook-form";
import { router } from "@inertiajs/react";
import { UserValidation, UserValidationSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Group, Role, User } from "@/types";
import { Errors } from "@inertiajs/inertia";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Info } from "lucide-react";

export function UserForm({ user, roles = [], groups = [] }: { user?: User, roles?: Role[], groups?: Group[] }) {
  const form = useForm<UserValidationSchema>({
    resolver: zodResolver(UserValidation),
    defaultValues: user || { firstname: '', lastname: '', email: '' }
  });

  const { toast } = useToast();

  const onError = (serverErrors: Errors) => {
    if (serverErrors.firstname) form.setError('firstname', { message: serverErrors.firstname });
    if (serverErrors.lastname) form.setError('lastname', { message: serverErrors.lastname });
    if (serverErrors.email) form.setError('email', { message: serverErrors.email });
    if (serverErrors.role_id) form.setError('role_id', { message: serverErrors.role_id });
    if (serverErrors.group_id) form.setError('group_id', { message: serverErrors.group_id });
    if (serverErrors.message) toast({ description: serverErrors.message, variant: 'destructive' })
  };

  const onSubmit: SubmitHandler<UserValidationSchema> = (data) => {
    if (user) {
      router.put(route('users.update', { user: user.id }), { ...user, ...data }, {
        onError,
        onSuccess() {
          toast({ description: `L'utilisateur #${user.id} a bien été modifié` });
        }
      });
    } else {
      router.post(route('users.store'), data, {
        onError,
        onSuccess() {
          toast({ description: 'L\'utilisateur a bien été créé' });
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
              <div className="flex justify-between gap-4">
                <div className="flex flex-col space-y-1.5 w-full">
                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn(form.formState.errors.lastname && 'font-bold')}>Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="Elon" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col space-y-1.5 w-full">
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={cn(form.formState.errors.firstname && 'font-bold')}>Prénom</FormLabel>
                        <FormControl>
                          <Input placeholder="Musk" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(form.formState.errors.email && 'font-bold')}>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex justify-between gap-4">
                <FormField
                  control={form.control}
                  name="role_id"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Rôle</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir un rôle" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">Aucun</SelectItem>
                          {roles.map((role) => <SelectItem key={role.id} value={role.id.toString()}>{role.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="group_id"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Groupe</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir un groupe" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">Aucun</SelectItem>
                          {groups.map((group) => <SelectItem key={group.id} value={group.id.toString()}>{group.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className={cn('flex', user ? 'justify-end' : 'justify-between')}>
            {!user &&
              <CardDescription className="flex items-center">
                <Info className="mr-2 h-4 w-4" />
                <span>Un email contenant les informations de connexion sera envoyé à l'utilisateur.</span>
              </CardDescription>
            }
            <Button variant="outline">{user ? 'Modifier' : 'Ajouter'}</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
