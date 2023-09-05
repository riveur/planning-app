import { CategoryForm } from "@/components/forms/category-form";
import { useDashboardLayout } from "@/components/layouts/dashboard-layout";
import { Category } from "@/types";

export default function Edit({ category }: { category: Category }) {
  return (
    <>
      <h1 className="font-bold text-2xl mb-4">Modification de la catégorie #{category.id}</h1>
      <CategoryForm category={category} />
    </>
  );
}

Edit.layout = useDashboardLayout('Catégories - Modification');
