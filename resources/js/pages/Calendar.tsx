import { useDashboardLayout } from "@/components/layouts/dashboard-layout";
import FullCalendar from "@fullcalendar/react";
import fr from "@fullcalendar/core/locales/fr";
import TimeGridPlugin from "@fullcalendar/timegrid";
import InteractionPlugin, { EventResizeDoneArg } from "@fullcalendar/interaction";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format, intervalToDuration } from "date-fns";
import { CustomContentGenerator, EventContentArg, EventDropArg, EventSourceInput } from "@fullcalendar/core";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

export const EventContentRender: CustomContentGenerator<EventContentArg> = (info) => {
  const durations = (info.event.start && info.event.end) ?
    intervalToDuration({ start: info.event.start, end: info.event.end }) :
    null;
  return (
    <>
      <div className="mb-2">
        {info.timeText}
        {
          durations !== null &&
          <span className="font-bold">{' '}({`${durations.hours}h${durations.minutes}`})</span>
        }
      </div >
      <div className="text-center">{info.event.title}</div>
    </>
  );
};

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

export default function Calendar({ canEditCalendar }: { canEditCalendar: boolean }) {

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
            locale={fr}
            plugins={[TimeGridPlugin, InteractionPlugin]}
            allDaySlot={false}
            events={eventsSource}
            eventContent={EventContentRender}
            contentHeight="auto"
            slotMinTime="07:00:00"
            slotMaxTime="18:00:00"
            editable={canEditCalendar}
            eventDrop={onEventChange}
            eventResize={onEventChange}
          />
        </CardContent>
      </Card>
    </>
  );
}

Calendar.layout = useDashboardLayout('Calendrier');
