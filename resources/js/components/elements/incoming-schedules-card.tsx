import { Event, Schedule, WithCategory } from "@/types";
import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, intervalToDuration } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { CategoryColorLabel } from "./category-color-label";

const formatInterval = (start: Date, end: Date) => {
  const durations = intervalToDuration({ start, end });
  let formattedInterval = `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`;
  if (durations) {
    formattedInterval += ` (${durations.hours}h${durations.minutes})`;
  }
  return formattedInterval;
};

export const ScheduleCard: FC<{ date: string; schedules: (Schedule & ({ event: Event & WithCategory }))[] }> = ({ date, schedules }) => {
  return (
    <Card>
      <CardHeader className="px-4 py-2 bg-accent">
        <CardTitle className="text-base">{format(new Date(date), 'PPPP')}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="px-4 py-2">
        {schedules.map(schedule => (
          <p>
            {formatInterval(new Date(schedule.start_date), new Date(schedule.end_date))}{' : '}
            <span className="font-medium">{schedule.event.title}</span>{' '}
            <CategoryColorLabel
              color={schedule.event.category.color}
              className="text-xs"
            >
              {schedule.event.category.name}
            </CategoryColorLabel>
          </p>
        ))}
      </CardContent>
    </Card>
  );
}