import { UserNav } from "@/components/layouts/elements/user-nav";
import { AuthenticatedInertiaPage } from "@/types";
import { Link, usePage } from "@inertiajs/react";

export function Header() {
  const { props: { auth: { user } } } = usePage() as AuthenticatedInertiaPage;
  return (
    <header className="w-full p-2 border-b flex items-center justify-between">
      <div className="flex gap-8">
        <Link href="/" className="font-bold">Planning</Link>
        <nav>
          <ul className="flex gap-4">
            <li><Link href="/events" className="font-semibold hover:text-slate-500">Evenements</Link></li>
            <li><Link href="/users" className="font-semibold hover:text-slate-500">Utilisateurs</Link></li>
            <li><Link href="/groups" className="font-semibold hover:text-slate-500">Groupes</Link></li>
            <li><Link href="/roles" className="font-semibold hover:text-slate-500">Rôles</Link></li>
          </ul>
        </nav></div>
      <UserNav username={user.fullname} />
    </header>
  );
}
