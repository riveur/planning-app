import { EventForm } from "@/components/forms/event-form";
import { useDashboardLayout } from "@/components/layouts/dashboard-layout";
import { Event, Group, User } from "@/types";

export default function Edit({ event, formateurs, groups }: { event: Event, formateurs: User[], groups: Group[] }) {
  return (
    <>
      <h1 className="font-bold text-2xl mb-4">Modification du évènement #{event.id}</h1>
      <EventForm event={event} formateurs={formateurs} groups={groups} />
    </>
  );
}

Edit.layout = useDashboardLayout('&Eacute;vènements - Modification');
