import { useDashboardLayout } from "@/components/layouts/dashboard-layout";
import { BaseDataTable } from "@/components/tables/base-data-table";
import { columns } from "@/components/tables/users-table";
import { Button } from "@/components/ui/button";
import { User } from "@/types";
import { Link } from "@inertiajs/react";
import { PlusCircle } from "lucide-react";

export default function Index() {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-2xl">Utilisateurs</h1>
        <Button asChild>
          <Link href="/users/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>Ajouter un utilisateur</span>
          </Link>
        </Button>
      </div>
      <BaseDataTable
        url={route('users.index')}
        queryKey="users"
        emptyMessage="Aucun utilisateur"
        columns={columns}
      />
    </>
  );
}


Index.layout = useDashboardLayout('Utilisateurs');
