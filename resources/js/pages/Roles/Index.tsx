import { useDashboardLayout } from "@/components/layouts/dashboard-layout";
import { BaseDataTable } from "@/components/tables/base-data-table";
import { columns } from "@/components/tables/roles-table";
import { Button } from "@/components/ui/button";
import { Role } from "@/types";
import { Link } from "@inertiajs/react";
import { PlusCircle } from "lucide-react";

export default function Index() {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-2xl">Rôles</h1>
        <Button asChild>
          <Link href="/roles/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>Ajouter un rôle</span>
          </Link>
        </Button>
      </div>
      <BaseDataTable
        url={route('roles.index')}
        queryKey="roles"
        emptyMessage="Aucun rôle"
        columns={columns}
      />
    </>
  );
}


Index.layout = useDashboardLayout('Rôles');
