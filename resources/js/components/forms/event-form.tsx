import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useForm, SubmitHandler } from "react-hook-form";
import { router } from "@inertiajs/react";
import { EventValidation, EventValidationSchema, StoreEventValidation, StoreEventValidationSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Event, Group, User, WithGroups } from "@/types";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MultiSelect } from "../ui/multi-select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { fr as FrenchDateLocale } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

const groupMapper = (group: Group) => ({ label: group.name, value: group.id });

export function EventForm({ event, formateurs = [], groups = [] }: { event?: Event & WithGroups, formateurs?: User[], groups?: Group[] }) {
  const form = useForm<StoreEventValidationSchema>({
    resolver: zodResolver(event ? EventValidation : StoreEventValidation),
    defaultValues: event ?
      { ...event, groups: event?.groups?.map(groupMapper) || [] } :
      {
        title: '',
        description: '',
        groups: [],
        start_date: new Date(),
        end_date: new Date(),
        start_morning_time: '08:00',
        end_morning_time: '12:00',
        start_afternoon_time: '13:00',
        end_afternoon_time: '16:00'
      }
  });

  const { toast } = useToast();

  const mappedGroups = groups.map(groupMapper);

  const onSubmit: SubmitHandler<StoreEventValidationSchema> = (data) => {
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
      router.post(route('events.store'), {
        ...data,
        start_date: format(data.start_date, 'yyyy-MM-dd'),
        end_date: format(data.end_date, 'yyyy-MM-dd'),
        groups: data.groups.map(group => group.value)
      }, {
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {!event && (
                <>
                  <div className="space-y-1.5">
                    <CardTitle className="text-lg">Horaires</CardTitle>
                    <CardDescription>Définissez les horaires pour cet évènement</CardDescription>
                  </div>
                  <div className="flex justify-between gap-4">
                    <div className="space-y-1.5 w-full">
                      <FormField
                        control={form.control}
                        name="start_date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date de début</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    type="button"
                                    className={cn(
                                      "pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {
                                      field.value ?
                                        format(field.value, 'PPP') :
                                        <span>Choisir une date</span>
                                    }
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  locale={FrenchDateLocale}
                                  mode="single"
                                  required
                                  selected={field.value}
                                  onSelect={field.onChange}
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="space-y-1.5">
                        <CardTitle className="text-base">Matin</CardTitle>
                        <div className="flex justify-between gap-4">
                          <div className="space-y-1.5 w-full">
                            <FormField
                              control={form.control}
                              name="start_morning_time"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className={cn(form.formState.errors.start_morning_time && 'font-bold')}>Heure de début</FormLabel>
                                  <FormControl>
                                    <Input type="time" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="space-y-1.5 w-full">
                            <FormField
                              control={form.control}
                              name="end_morning_time"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className={cn(form.formState.errors.end_morning_time && 'font-bold')}>Heure de fin</FormLabel>
                                  <FormControl>
                                    <Input type="time" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-1.5 w-full">
                      <FormField
                        control={form.control}
                        name="end_date"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Date de fin</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant="outline"
                                    type="button"
                                    className={cn(
                                      "pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {
                                      field.value ?
                                        format(field.value, 'PPP') :
                                        <span>Choisir une date</span>
                                    }
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  locale={FrenchDateLocale}
                                  mode="single"
                                  required
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  disabled={(date) => date < form.getValues().start_date}
                                />
                              </PopoverContent>
                            </Popover>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="space-y-1.5">
                        <CardTitle className="text-base">Après-midi</CardTitle>
                        <div className="flex justify-between gap-4">
                          <div className="space-y-1.5 w-full">
                            <FormField
                              control={form.control}
                              name="start_afternoon_time"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className={cn(form.formState.errors.start_afternoon_time && 'font-bold')}>Heure de début</FormLabel>
                                  <FormControl>
                                    <Input type="time" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="space-y-1.5 w-full">
                            <FormField
                              control={form.control}
                              name="end_afternoon_time"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className={cn(form.formState.errors.end_afternoon_time && 'font-bold')}>Heure de fin</FormLabel>
                                  <FormControl>
                                    <Input type="time" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
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
