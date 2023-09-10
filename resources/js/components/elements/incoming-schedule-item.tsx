import { Event, Schedule, WithCategory } from "@/types";
import { FC } from "react";
import { format, intervalToDuration } from "date-fns";
import { CategoryColorLabel } from "./category-color-label";

const formatInterval = (start: Date, end: Date) => {
  const durations = intervalToDuration({ start, end });
  let formattedInterval = `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`;
  if (durations) {
    formattedInterval += ` (${durations.hours}h${durations.minutes})`;
  }
  return formattedInterval;
};

export const IncomingScheduleItem: FC<{ schedule: (Schedule & ({ event: Event & WithCategory })) }> = ({ schedule }) => {
  return (
    <div className="px-4 py-3 grid grid-cols-4 items-center gap-2 border-b">
      <div className="col-span-2 flex items-center gap-2">
        <span className="text-xl font-medium">{format(new Date(schedule.start_date), 'dd')}</span>
        <span className="text-gray-500 font-bold">{format(new Date(schedule.start_date), 'MMM eee').toUpperCase()}</span>
        <span>{formatInterval(new Date(schedule.start_date), new Date(schedule.end_date))}</span>
      </div>
      <div className="col-span-2 flex justify-between">
        <span>{schedule.event.title}</span>
        <CategoryColorLabel
          color={schedule.event.category.color}
          className="text-xs"
        >
          {schedule.event.category.name}
        </CategoryColorLabel>
      </div>
    </div>
  );
}