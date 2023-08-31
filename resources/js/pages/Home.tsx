import { DashboardLayout, useDashboardLayout } from "@/components/layouts/dashboard-layout";
import { AuthenticatedInertiaPage } from "@/types";
import { usePage } from "@inertiajs/react";
export default function Home() {
  const { props: { auth: { user } } } = usePage() as AuthenticatedInertiaPage;
  return (
    <>
      <main className="container mx-auto pt-6">
        <h1 className="font-bold text-lg">Bienvenue, {user.fullname} !</h1>
      </main>
    </>
  );
}

Home.layout = useDashboardLayout('Accueil');
