import { CustomContentGenerator, EventContentArg } from "@fullcalendar/core";
import { intervalToDuration } from "date-fns";

export const CalendarEventRender: CustomContentGenerator<EventContentArg> = (info) => {
  const durations = (info.event.start && info.event.end) ?
    intervalToDuration({ start: info.event.start, end: info.event.end }) :
    null;
  return (
    <>
      <div className="h-full">
        {info.timeText}
        {
          durations !== null &&
          <span className="font-bold">{' '}({`${durations.hours}h${durations.minutes}`})</span>
        }
        <div className="text-center">{info.event.title}</div>
      </div>
    </>
  );
};