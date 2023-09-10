import { useDashboardLayout } from "@/components/layouts/dashboard-layout";
import FullCalendar from "@fullcalendar/react";
import fr from "@fullcalendar/core/locales/fr";
import TimeGridPlugin from "@fullcalendar/timegrid";
import InteractionPlugin, { EventResizeDoneArg } from "@fullcalendar/interaction";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { DateSelectArg, EventClickArg, EventDropArg, EventSourceInput } from "@fullcalendar/core";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { ModalAddSchedule } from "@/components/elements/modal-add-schedule";
import { Event } from "@/types";
import { useRef, useState } from "react";
import { ModalDeleteSchedule } from "@/components/elements/modal-delete-schedule";
import { CalendarEventRender } from "@/components/elements/calendar-event-render";

const eventsSource: EventSourceInput = function (info, successCallback, failureCallback) {
  const urlParams = new URLSearchParams({ start: format(info.start, 'yyyy-MM-dd'), end: format(info.end, 'yyyy-MM-dd') });

  axios.get<{ id: number, title: string, start: string, end: string, color: string }[]>(
    `${route('api.events.feed')}?${urlParams.toString()}`,
    { headers: { 'Accept': 'application/json' } }
  )
    .then(response => {
      successCallback(response.data.map(row => ({
        id: row.id.toString(),
        title: row.title,
        backgroundColor: row.color,
        start: new Date(row.start),
        end: new Date(row.end),
      })));
    })
    .catch(error => {
      failureCallback(error);
    });
}

export default function Planning({
  canEditCalendar,
  canAddSchedule,
  canDeleteSchedule,
  events
}: {
  canEditCalendar: boolean,
  canAddSchedule: boolean,
  canDeleteSchedule: boolean,
  events: Event[]
}) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(null);
  const [{ start, end }, setRange] = useState<Pick<DateSelectArg, "start" | "end">>({
    start: new Date(),
    end: new Date()
  });
  const calendarRef = useRef<FullCalendar>(null);

  const { toast } = useToast();

  const onEventChange = (info: EventDropArg | EventResizeDoneArg) => {
    const newRange = info.event._instance?.range;
    const scheduleId = info.event._def.publicId;

    if (!newRange) {
      info.revert();
      return;
    }

    axios.put(route('api.schedules.update', { schedule: scheduleId }), {
      start: newRange.start,
      end: newRange.end,
    })
      .then(response => {
        toast({ description: response.data.message });
      })
      .catch(error => {
        toast({ description: 'Erreur lors de la modification de l\'horaire', variant: 'destructive' })
        info.revert();
      });
  }

  const onSelect = (info: DateSelectArg) => {
    setModalOpen(true);
    setRange({ start: info.start, end: info.end });
  }

  const onEventClick = (info: EventClickArg) => {
    setAlertOpen(true);
    setSelectedScheduleId(info.event.id);
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Calendrier</CardTitle>
          <CardDescription>Visualiser les différents évènements</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-3">
          <FullCalendar
            ref={calendarRef}
            locale={fr}
            plugins={[TimeGridPlugin, InteractionPlugin]}
            allDaySlot={false}
            events={eventsSource}
            eventContent={CalendarEventRender}
            contentHeight="auto"
            slotMinTime="07:00:00"
            slotMaxTime="18:00:00"
            editable={canEditCalendar}
            selectable={canEditCalendar}
            select={onSelect}
            eventDrop={onEventChange}
            eventResize={onEventChange}
            eventClick={canDeleteSchedule ? onEventClick : undefined}
          />
        </CardContent>
      </Card>
      {canAddSchedule &&
        <ModalAddSchedule
          open={modalOpen}
          onOpenChange={setModalOpen}
          events={events}
          startDate={start}
          endDate={end}
          onSuccess={() => {
            setModalOpen(false);
            calendarRef?.current?.getApi().refetchEvents();
          }}
        />}
      {canDeleteSchedule &&
        <ModalDeleteSchedule
          open={alertOpen}
          onOpenChange={setAlertOpen}
          eventId={selectedScheduleId}
          onSuccess={() => {
            setAlertOpen(false);
            calendarRef.current?.getApi().refetchEvents();
          }}
        />}
    </>
  );
}

Planning.layout = useDashboardLayout('Calendrier');
