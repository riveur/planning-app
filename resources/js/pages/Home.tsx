import { useDashboardLayout } from "@/components/layouts/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Event, Schedule, WithCategory } from "@/types";
import FullCalendar from "@fullcalendar/react";
import fr from "@fullcalendar/core/locales/fr";
import TimeGridPlugin from "@fullcalendar/timegrid";
import { format } from "date-fns";
import { IncomingScheduleItem } from "@/components/elements/incoming-schedule-item";
import { CalendarCheck } from "lucide-react";
import { CalendarEventRender } from "@/components/elements/calendar-event-render";

export default function Home({
  schedulesOfDay,
  incomingSchedules
}: {
  schedulesOfDay: (Schedule & { event: Event & WithCategory })[],
  incomingSchedules: (Schedule & { event: Event & WithCategory })[]
}) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="col-span-1 w-full">
          <CardHeader>
            <CardTitle className="text-lg">Aujourd'hui</CardTitle>
            <CardDescription>&Eacute;vènement du jour</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <FullCalendar
              locale={fr}
              plugins={[TimeGridPlugin]}
              allDaySlot={false}
              headerToolbar={false}
              events={schedulesOfDay.map(schedule => (
                {
                  title: schedule.event.title,
                  start: new Date(schedule.start_date),
                  end: new Date(schedule.end_date),
                  backgroundColor: schedule.event.category.color
                }
              ))}
              initialView="timeGridOneDay"
              views={{
                timeGridOneDay: {
                  type: 'timeGrid',
                  duration: { days: 1 }
                }
              }}
              dayCellClassNames="!bg-inherit"
              dayHeaderContent={(cell) => format(cell.date, 'd MMMM yyyy')}
              eventContent={CalendarEventRender}
              contentHeight="auto"
              slotMinTime="07:00:00"
              slotMaxTime="18:00:00"
            />
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">&Eacute;vènements à venir</CardTitle>
            <CardDescription>Liste des évènements à venir</CardDescription>
          </CardHeader>
          <Separator />
          <CardContent className="p-0">
            <div className="flex flex-col [&>*:last-child]:border-0">
              {
                Object.keys(incomingSchedules).length === 0 ?
                  (<Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-col justify-center items-center gap-2">
                        <CalendarCheck className="w-8 h-8" />
                        <p className="text-base font-semibold">Aucun évènement à venir</p>
                      </div>
                    </CardContent>
                  </Card>) :
                  incomingSchedules.map((schedule) => (<IncomingScheduleItem key={schedule.id} schedule={schedule} />))
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

Home.layout = useDashboardLayout('Accueil');
