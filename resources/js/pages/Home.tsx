import { useDashboardLayout } from "@/components/layouts/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Schedule, WithEvent } from "@/types";
import FullCalendar from "@fullcalendar/react";
import fr from "@fullcalendar/core/locales/fr";
import TimeGridPlugin from "@fullcalendar/timegrid";
import { EventContentRender } from "./Calendar";
import { format } from "date-fns";
import { ScheduleCard } from "@/components/elements/schedule-card";
import { CalendarCheck } from "lucide-react";

export default function Home({
  scheduleOfDay,
  incomingSchedules
}: {
  scheduleOfDay: Schedule & WithEvent,
  incomingSchedules: (Schedule & WithEvent)[]
}) {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-1 gap-4">
        <div className="col-span-1">
          <Card className="w-full">
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
                events={[
                  {
                    title: scheduleOfDay.event.title,
                    start: new Date(scheduleOfDay.start_morning_date),
                    end: new Date(scheduleOfDay.end_morning_date)
                  },
                  {
                    title: scheduleOfDay.event.title,
                    start: new Date(scheduleOfDay.start_afternoon_date),
                    end: new Date(scheduleOfDay.end_afternoon_date)
                  },
                ]}
                initialView="timeGridOneDay"
                views={{
                  timeGridOneDay: {
                    type: 'timeGrid',
                    duration: { days: 1 }
                  }
                }}
                dayCellClassNames="!bg-inherit"
                dayHeaderContent={(cell) => format(cell.date, 'd MMMM yyyy')}
                eventContent={EventContentRender}
                contentHeight="auto"
                slotMinTime="07:00:00"
                slotMaxTime="18:00:00"
              />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1 lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg">&Eacute;vènements à venir</CardTitle>
              <CardDescription>Liste des évènements à venir</CardDescription>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6 h-full">
              <div className="flex flex-col gap-2">
                {
                  incomingSchedules.length === 0 ?
                    (<Card className="">
                      <CardContent className="pt-6">
                        <div className="flex flex-col justify-center items-center gap-2">
                          <CalendarCheck className="w-8 h-8" />
                          <p className="text-base font-semibold">Aucun évènement à venir</p>
                        </div>
                      </CardContent>
                    </Card>) :
                    incomingSchedules.map(schedule => (<ScheduleCard key={schedule.id} schedule={schedule} />))
                }
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

Home.layout = useDashboardLayout('Accueil');
