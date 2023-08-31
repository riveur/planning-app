import { RoleForm } from "@/components/forms/role-form";
import { useDashboardLayout } from "@/components/layouts/dashboard-layout";
import { Role } from "@/types";

export default function Edit({ role }: { role: Role }) {
  return (
    <>
      <h1 className="font-bold text-2xl mb-4">Modification du rôle #{role.id}</h1>
      <RoleForm role={role} />
    </>
  );
}

Edit.layout = useDashboardLayout('Rôles - Modification');
