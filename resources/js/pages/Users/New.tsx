import { UserForm } from "@/components/forms/user-form";
import { useDashboardLayout } from "@/components/layouts/dashboard-layout";
import { Group, Role } from "@/types";

export default function New({ roles, groups }: { roles: Role[], groups: Group[] }) {
  return (
    <>
      <h1 className="font-bold text-2xl mb-4">Nouvel utilisateur</h1>
      <UserForm roles={roles} groups={groups} />
    </>
  );
}

New.layout = useDashboardLayout('Utilisateurs - Ajout');
