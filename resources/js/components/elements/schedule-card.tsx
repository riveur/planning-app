import { Schedule, WithEvent } from "@/types";
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, formatDuration, intervalToDuration } from "date-fns";
import { Separator } from "@/components/ui/separator";

const formatInterval = (start: Date, end: Date) => {
  return `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')} (${formatDuration(intervalToDuration({ start, end }))})`;
};

export const ScheduleCard: FC<{ schedule: Schedule & WithEvent }> = ({ schedule }) => {
  return (
    <Card>
      <CardHeader className="px-4 py-2 bg-accent">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <CardTitle className="text-base font-normal">{schedule.event.title}</CardTitle>
          <CardTitle className="text-base">{format(new Date(schedule.date), 'PPPP')}</CardTitle>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="px-4 py-2">
        <p><strong>Matin: </strong>{formatInterval(new Date(schedule.start_morning_date), new Date(schedule.end_morning_date))}</p>
        <p><strong>Après-midi: </strong>{formatInterval(new Date(schedule.start_afternoon_date), new Date(schedule.end_afternoon_date))}</p>
      </CardContent>
    </Card>
  );
}