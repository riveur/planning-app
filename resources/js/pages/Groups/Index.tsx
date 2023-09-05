import { useDashboardLayout } from "@/components/layouts/dashboard-layout";
import { BaseDataTable } from "@/components/tables/base-data-table";
import { columns } from "@/components/tables/groups-table";
import { Button } from "@/components/ui/button";
import { Group } from "@/types";
import { Link } from "@inertiajs/react";
import { PlusCircle } from "lucide-react";

export default function Index() {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-2xl">Groupes/Classes</h1>
        <Button asChild>
          <Link href="/groups/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>Ajouter un groupe</span>
          </Link>
        </Button>
      </div>
      <BaseDataTable
        url={route('groups.index')}
        queryKey="groups"
        emptyMessage="Aucun groupe"
        columns={columns}
      />
    </>
  );
}


Index.layout = useDashboardLayout('Groupes');
