import { GroupForm } from "@/components/forms/group-form";
import { useDashboardLayout } from "@/components/layouts/dashboard-layout";

export default function New() {
  return (
    <>
      <h1 className="font-bold text-2xl mb-4">Nouveau groupe</h1>
      <GroupForm />
    </>
  );
}

New.layout = useDashboardLayout('Groupes - Ajout');
