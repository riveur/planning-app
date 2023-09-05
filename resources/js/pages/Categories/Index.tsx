import { useDashboardLayout } from "@/components/layouts/dashboard-layout";
import { BaseDataTable } from "@/components/tables/base-data-table";
import { columns } from "@/components/tables/categories-table";
import { Button } from "@/components/ui/button";
import { Category } from "@/types";
import { Link } from "@inertiajs/react";
import { PlusCircle } from "lucide-react";

export default function Index() {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-2xl">Catégories</h1>
        <Button asChild>
          <Link href="/categories/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            <span>Ajouter une catégorie</span>
          </Link>
        </Button>
      </div>
      <BaseDataTable
        url={route('categories.index')}
        queryKey="categories"
        emptyMessage="Aucune catégorie"
        columns={columns}
      />
    </>
  );
}


Index.layout = useDashboardLayout('Catégories');
