import { useDashboardLayout } from "@/components/layouts/dashboard-layout";
import FullCalendar from "@fullcalendar/react";
import fr from "@fullcalendar/core/locales/fr";
import TimeGridPlugin from "@fullcalendar/timegrid";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format, formatDuration, intervalToDuration } from "date-fns";
import { CustomContentGenerator, EventContentArg, EventSourceInput } from "@fullcalendar/core";
import axios from "axios";

export const EventContentRender: CustomContentGenerator<EventContentArg> = (info) => {
  return (
    <>
      <p>
        <b>{info.timeText}</b>
        {
          (info.event.start && info.event.end) &&
          <span>{' '}({formatDuration(intervalToDuration({ start: info.event.start, end: info.event.end }))})</span>
        }
      </p>
      <div className="flex items-center justify-center h-[calc(100%-20px)]">
        <span>{info.event.title}</span>
      </div>
    </>
  );
};

const eventsSource: EventSourceInput = function (info, successCallback, failureCallback) {
  const urlParams = new URLSearchParams({ start: format(info.start, 'yyyy-MM-dd'), end: format(info.end, 'yyyy-MM-dd') });

  axios.get<{ title: string, start: string, end: string }[]>(
    `${route('api.events.feed')}?${urlParams.toString()}`,
    { headers: { 'Accept': 'application/json' } }
  )
    .then(response => {
      successCallback(response.data.map(row => ({
        title: row.title,
        start: new Date(row.start),
        end: new Date(row.end),
      })));
    })
    .catch(error => {
      failureCallback(error);
    });
}

export default function Calendar() {
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
            plugins={[TimeGridPlugin]}
            allDaySlot={false}
            events={eventsSource}
            eventContent={EventContentRender}
            contentHeight="auto"
            slotMinTime="07:00:00"
            slotMaxTime="18:00:00"
          />
        </CardContent>
      </Card>
    </>
  );
}

Calendar.layout = useDashboardLayout('Calendrier');
