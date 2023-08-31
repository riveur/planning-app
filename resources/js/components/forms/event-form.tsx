import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useForm, SubmitHandler } from "react-hook-form";
import { router } from "@inertiajs/react";
import { EventValidation, EventValidationSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Event, Group, User, WithGroups } from "@/types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "../ui/multi-select";

const groupMapper = (group: Group) => ({ label: group.name, value: group.id });

export function EventForm({ event, formateurs = [], groups = [] }: { event?: Event & WithGroups, formateurs?: User[], groups?: Group[] }) {
  const form = useForm<EventValidationSchema>({
    resolver: zodResolver(EventValidation),
    defaultValues: event ?
      { ...event, groups: event?.groups?.map(groupMapper) || [] } :
      { title: '', description: '', groups: [] }
  });

  const { toast } = useToast();

  const mappedGroups = groups.map(groupMapper);

  const onSubmit: SubmitHandler<EventValidationSchema> = (data) => {
    if (event) {
      router.put(route('events.update', { event: event.id }), { ...event, ...data, groups: data.groups.map(group => group.value) }, {
        onError(serverErrors) {
          if (serverErrors.title) form.setError('title', { message: serverErrors.title });
          if (serverErrors.description) form.setError('description', { message: serverErrors.description });
        },
        onSuccess() {
          toast({ description: `L'évènement #${event.id} à bien été modifié` });
        }
      });
    } else {
      router.post(route('events.store'), { ...data, groups: data.groups.map(group => group.value) }, {
        onError(serverErrors) {
          if (serverErrors.title) form.setError('title', { message: serverErrors.title });
          if (serverErrors.description) form.setError('description', { message: serverErrors.description });
        },
        onSuccess() {
          toast({ description: 'L\'évènement à bien été créée' });
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
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(form.formState.errors.title && 'font-bold')}>Titre</FormLabel>
                      <FormControl>
                        <Input placeholder="Développement en couches" {...field} />
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
                        <Input placeholder="Une courte description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="formateur_id"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Formateur</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir un formateur" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">Aucun</SelectItem>
                          {formateurs.map((formateur) => <SelectItem key={formateur.id} value={formateur.id.toString()}>{formateur.fullname}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="groups"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>Groupes</FormLabel>
                      <MultiSelect
                        onChange={field.onChange}
                        defaultValue={field.value}
                        isMulti
                        placeholder=""
                        options={mappedGroups}
                      />
                      {/* <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir un formateur" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="">Aucun</SelectItem>
                          {formateurs.map((formateur) => <SelectItem key={formateur.id} value={formateur.id.toString()}>{formateur.fullname}</SelectItem>)}
                        </SelectContent>
                      </Select> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline">{event ? 'Modifier' : 'Ajouter'}</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
