import { useDashboardLayout } from "@/components/layouts/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@inertiajs/react";
import { Category } from "@/types";
import { Edit, Trash } from "lucide-react";
import { Method } from "@inertiajs/inertia";
import { format } from "date-fns";
import { CategoryColorLabel } from "@/components/elements/category-color-label";

export default function Show({ category }: { category: Category }) {
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg">Détails</CardTitle>
              <CardDescription>Informations sur la catégorie #{category.id}</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button asChild>
                <Link href={route('categories.edit', { category: category.id })}>
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Modifier la catégorie</span>
                </Link>
              </Button>
              <Button variant="destructive" asChild>
                <Link method={Method.DELETE} href={route('categories.destroy', { category: category.id })}>
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Supprimer la catégorie</span>
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
              <span>{category.name}</span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold">Couleur</h2>
              <CategoryColorLabel color={category.color}>{category.color}</CategoryColorLabel>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold">Date de création</h2>
              <span>{format(new Date(category.created_at), 'dd/MM/yyyy hh:mm:ss')}</span>
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold">Date de modification</h2>
              <span>{format(new Date(category.updated_at), 'dd/MM/yyyy hh:mm:ss')}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

Show.layout = useDashboardLayout('Catégories - Visualiser');
