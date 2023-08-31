import { useDashboardLayout } from "@/components/layouts/dashboard-layout";
import { DataTable, columns } from "@/components/tables/roles-table";
import { Button } from "@/components/ui/button";
import { Role } from "@/types";
import { Link } from "@inertiajs/react";
import { PlusCircle } from "lucide-react";

export default function Index({ roles }: { roles: Role[] }) {
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
      <DataTable columns={columns} data={roles} />
    </>
  );
}


Index.layout = useDashboardLayout('Rôles');
