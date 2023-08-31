import { useDashboardLayout } from "@/components/layouts/dashboard-layout";
import { DataTable, columns } from "@/components/tables/events-table";
import { Button } from "@/components/ui/button";
import { Event } from "@/types";
import { Link } from "@inertiajs/react";
import { PlusCircle } from "lucide-react";

export default function Index({ events }: { events: Event[] }) {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-2xl">&Eacute;vènements</h1>
        <Button asChild>
          <Link href="/events/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>Ajouter un évènement</span>
          </Link>
        </Button>
      </div>
      <DataTable columns={columns} data={events} />
    </>
  );
}


Index.layout = useDashboardLayout('&Eacute;vènements');
