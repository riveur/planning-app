import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useForm, SubmitHandler } from "react-hook-form";
import { router } from "@inertiajs/react";
import { GroupValidation, GroupValidationSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Group } from "@/types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export function GroupForm({ group }: { group?: Group }) {
  const form = useForm<GroupValidationSchema>({
    resolver: zodResolver(GroupValidation),
    defaultValues: group || { name: '', description: '' }
  });

  const { toast } = useToast();

  const onSubmit: SubmitHandler<GroupValidationSchema> = (data) => {
    if (group) {
      router.put(route('groups.update', { group: group.id }), { ...group, ...data }, {
        onError(serverErrors) {
          if (serverErrors.name) form.setError('name', { message: serverErrors.name });
          if (serverErrors.description) form.setError('description', { message: serverErrors.description });
        },
        onSuccess() {
          toast({ description: `Le groupe #${group.id} à bien été modifié` });
        }
      });
    } else {
      router.post(route('groups.store'), data, {
        onError(serverErrors) {
          if (serverErrors.name) form.setError('name', { message: serverErrors.name });
          if (serverErrors.description) form.setError('description', { message: serverErrors.description });
        },
        onSuccess() {
          toast({ description: 'Le groupe à bien été créé' });
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
                        <Input placeholder="CDA" {...field} />
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
                        <Input placeholder="Conception et développement d'applications" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline">{group ? 'Modifier' : 'Ajouter'}</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
