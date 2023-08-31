import { useDashboardLayout } from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@inertiajs/react";
import { Group } from "@/types";
import { Edit, Trash } from "lucide-react";
import { Method } from "@inertiajs/inertia";
import { format } from "date-fns";

export default function Show({ group }: { group: Group }) {
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">Détails</CardTitle>
              <CardDescription>Informations sur le groupe #{group.id}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button asChild>
                <Link href={route('groups.edit', { group: group.id })}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Modifier le groupe</span>
                </Link>
              </Button>
              <Button variant="destructive" asChild>
                <Link method={Method.DELETE} href={route('groups.destroy', { group: group.id })}>
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Supprimer le groupe</span>
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col">
              <h2 className="font-bold">Nom</h2>
              <span>{group.name}</span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold">Description</h2>
              <span>{group.description}</span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold">Date de création</h2>
              <span>{format(new Date(group.created_at), 'dd/MM/yyyy hh:mm:ss')}</span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold">Date de modification</h2>
              <span>{format(new Date(group.updated_at), 'dd/MM/yyyy hh:mm:ss')}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

Show.layout = useDashboardLayout('Groupes - Visualiser');
