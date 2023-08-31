import { RoleForm } from "@/components/forms/role-form";
import { useDashboardLayout } from "@/components/layouts/dashboard-layout";

export default function New() {
  return (
    <>
      <h1 className="font-bold text-2xl mb-4">Nouveau rôle</h1>
      <RoleForm />
    </>
  );
}

New.layout = useDashboardLayout('Rôles - Ajout');
