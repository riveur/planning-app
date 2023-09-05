import { EventForm } from "@/components/forms/event-form";
import { useDashboardLayout } from "@/components/layouts/dashboard-layout";
import { Category, Group, User } from "@/types";

export default function New({ formateurs, groups, categories }: { formateurs: User[], groups: Group[], categories: Category[] }) {
  return (
    <>
      <h1 className="font-bold text-2xl mb-4">Nouvel évènement</h1>
      <EventForm formateurs={formateurs} groups={groups} categories={categories} />
    </>
  );
}

New.layout = useDashboardLayout('&Eacute;vènements - Ajout');
