import { useDashboardLayout } from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@inertiajs/react";
import { User, WithGroup, WithRole } from "@/types";
import { Edit, Trash } from "lucide-react";
import { Method } from "@inertiajs/inertia";
import { format } from "date-fns";

export default function Show({ user }: { user: User & WithRole & WithGroup }) {
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">Détails</CardTitle>
              <CardDescription>Informations sur l'utilisateur #{user.id}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button asChild>
                <Link href={route('users.edit', { user: user.id })}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Modifier l'utilisateur</span>
                </Link>
              </Button>
              <Button variant="destructive" asChild>
                <Link method={Method.DELETE} href={route('users.destroy', { user: user.id })}>
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Supprimer l'utilisateur</span>
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
              <span>{user.lastname}</span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold">Prénom</h2>
              <span>{user.firstname}</span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold">Rôle</h2>
              <span>{user.role ? user.role.name : 'Pas de rôle'}</span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold">Groupe</h2>
              <span>{user.group ? user.group.name : 'Pas de groupe'}</span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold">Date de création</h2>
              <span>{format(new Date(user.created_at), 'dd/MM/yyyy hh:mm:ss')}</span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold">Date de modification</h2>
              <span>{format(new Date(user.updated_at), 'dd/MM/yyyy hh:mm:ss')}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

Show.layout = useDashboardLayout('Utilisateurs - Visualiser');
