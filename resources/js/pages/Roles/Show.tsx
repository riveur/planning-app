import { useDashboardLayout } from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@inertiajs/react";
import { Role } from "@/types";
import { Edit, Trash } from "lucide-react";
import { Method } from "@inertiajs/inertia";
import { format } from "date-fns";

export default function Show({ role }: { role: Role }) {
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">Détails</CardTitle>
              <CardDescription>Informations sur le rôle #{role.id}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button asChild>
                <Link href={route('roles.edit', { role: role.id })}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Modifier le rôle</span>
                </Link>
              </Button>
              <Button variant="destructive" asChild>
                <Link method={Method.DELETE} href={route('roles.destroy', { role: role.id })}>
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Supprimer le rôle</span>
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
              <span>{role.name}</span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold">Description</h2>
              <span>{role.description}</span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold">Date de création</h2>
              <span>{format(new Date(role.created_at), 'dd/MM/yyyy hh:mm:ss')}</span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold">Date de modification</h2>
              <span>{format(new Date(role.updated_at), 'dd/MM/yyyy hh:mm:ss')}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

Show.layout = useDashboardLayout('Rôles - Visualiser');
