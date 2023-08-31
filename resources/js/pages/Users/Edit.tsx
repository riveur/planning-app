import { UserForm } from "@/components/forms/user-form";
import { useDashboardLayout } from "@/components/layouts/dashboard-layout";
import { Group, Role, User } from "@/types";

export default function Edit({ user, roles, groups }: { user: User, roles: Role[], groups: Group[] }) {
  return (
    <>
      <h1 className="font-bold text-2xl mb-4">Modification de l'utilisateur #{user.id}</h1>
      <UserForm user={user} roles={roles} groups={groups} />
    </>
  );
}

Edit.layout = useDashboardLayout('Rôles - Modification');
