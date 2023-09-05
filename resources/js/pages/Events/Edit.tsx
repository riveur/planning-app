import { EventForm } from "@/components/forms/event-form";
import { useDashboardLayout } from "@/components/layouts/dashboard-layout";
import { Category, Event, Group, User } from "@/types";

export default function Edit({ event, formateurs, groups, categories }: { event: Event, formateurs: User[], groups: Group[], categories: Category[] }) {
  return (
    <>
      <h1 className="font-bold text-2xl mb-4">Modification du évènement #{event.id}</h1>
      <EventForm event={event} formateurs={formateurs} groups={groups} categories={categories} />
    </>
  );
}

Edit.layout = useDashboardLayout('&Eacute;vènements - Modification');
