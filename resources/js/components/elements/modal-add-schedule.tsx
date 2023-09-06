import React, { useEffect } from "react";
import { Event, Schedule } from "@/types";
import { format } from "date-fns";
import axios from "axios";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogProps } from "@radix-ui/react-dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { StoreScheduleValidation, StoreScheduleValidationSchema } from "@/lib/validation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";

type ModalAddScheduleProps = DialogProps & {
  children?: React.ReactNode;
  events?: Event[];
  startDate: Date;
  endDate: Date;
  onSuccess?: () => void;
  onError?: () => void;
};

export function ModalAddSchedule({
  children,
  events = [],
  startDate,
  endDate,
  onSuccess,
  onError,
  ...props
}: ModalAddScheduleProps) {

  const { toast } = useToast();

  const form = useForm<StoreScheduleValidationSchema>({
    resolver: zodResolver(StoreScheduleValidation),
    defaultValues: { start_date: new Date(), end_date: new Date() }
  });

  useEffect(() => {
    form.setValue('start_date', startDate);
    form.setValue('end_date', endDate);
  }, [startDate, endDate]);

  const onSubmit: SubmitHandler<StoreScheduleValidationSchema> = async (data) => {
    await axios.post<{ schedule: Schedule }>(route('api.schedules.store'), {
      ...data,
      start_date: format(data.start_date, 'yyyy-MM-dd HH:mm:ss'),
      end_date: format(data.end_date, 'yyyy-MM-dd HH:mm:ss'),
    })
      .then(() => {
        toast({ description: 'Horaire ajouté !' });
        onSuccess?.();
      })
      .catch(() => {
        toast({ description: 'Une erreur a survenue lors de la sauvegarde', variant: 'destructive' });
        onError?.();
      });
  };

  return (
    <Dialog  {...props}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ajouter un horaire</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form method="post" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <FormField
                  control={form.control}
                  name="event_id"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormLabel>&Eacute;vènement</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choisir un évènement" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <ScrollArea className="h-[200px]">
                            {events.map((event) => (
                              <SelectItem key={event.id} value={event.id.toString()}>
                                {event.title}
                              </SelectItem>
                            ))}
                          </ScrollArea>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormItem className="flex flex-col">
                  <FormLabel>Date de début</FormLabel>
                  <Input readOnly disabled value={format(startDate, 'PPPpp')} />
                </FormItem>
              </div>
              <div className="flex flex-col space-y-1.5">
                <FormItem className="flex flex-col">
                  <FormLabel>Date de fin</FormLabel>
                  <Input readOnly disabled value={format(endDate, 'PPPpp')} />
                </FormItem>
              </div>
              <div className="flex space-y-1.5 justify-end">
                <Button variant="outline">Ajouter</Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};