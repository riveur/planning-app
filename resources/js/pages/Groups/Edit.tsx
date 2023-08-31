import { GroupForm } from "@/components/forms/group-form";
import { useDashboardLayout } from "@/components/layouts/dashboard-layout";
import { Group } from "@/types";

export default function Edit({ group }: { group: Group }) {
  return (
    <>
      <h1 className="font-bold text-2xl mb-4">Modification du groupe #{group.id}</h1>
      <GroupForm group={group} />
    </>
  );
}

Edit.layout = useDashboardLayout('Groupes - Modification');
