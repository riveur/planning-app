import { UserNav } from "@/components/layouts/elements/user-nav";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AuthenticatedInertiaPage } from "@/types";
import { Link, usePage } from "@inertiajs/react";

export function Header() {
  const { props: { auth: { user } }, url } = usePage() as AuthenticatedInertiaPage;
  return (
    <header className="w-full p-2 border-b flex items-center justify-between">
      <div className="flex gap-8 items-center">
        <Link href="/" className="font-bold">Planning</Link>
        <nav>
          <ul className="flex gap-4">
            <li>
              <Button variant="ghost" asChild>
                <Link href="/events" className={className(url.startsWith('/events'))}>&Eacute;vènements</Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost" asChild>
                <Link href="/users" className={className(url.startsWith('/users'))}>Utilisateurs</Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost" asChild>
                <Link href="/groups" className={className(url.startsWith('/groups'))}>Groupes</Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost" asChild>
                <Link href="/roles" className={className(url.startsWith('/roles'))}>Rôles</Link>
              </Button>
            </li>
            <li>
              <Button variant="ghost" asChild>
                <Link href="/calendar" className={className(url.startsWith('/calendar'))}>Calendrier</Link>
              </Button>
            </li>
          </ul>
        </nav></div>
      <UserNav username={user.fullname} />
    </header>
  );
}

function className(active: boolean) {
  return cn(active && 'bg-accent');
}
