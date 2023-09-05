import { CategoryForm } from "@/components/forms/category-form";
import { useDashboardLayout } from "@/components/layouts/dashboard-layout";

export default function New() {
  return (
    <>
      <h1 className="font-bold text-2xl mb-4">Nouvelle catégorie</h1>
      <CategoryForm />
    </>
  );
}

New.layout = useDashboardLayout('Catégories - Ajout');
