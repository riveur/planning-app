import { useDashboardLayout } from "@/components/layouts/dashboard-layout";
import { DataTable, columns } from "@/components/tables/groups-table";
import { Button } from "@/components/ui/button";
import { Group } from "@/types";
import { Link } from "@inertiajs/react";
import { PlusCircle } from "lucide-react";

export default function Index({ groups }: { groups: Group[] }) {
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
      <DataTable columns={columns} data={groups} />
    </>
  );
}


Index.layout = useDashboardLayout('Groupes');
