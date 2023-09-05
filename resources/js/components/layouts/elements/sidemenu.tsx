import { Button } from "@/components/ui/button";
import { Link, usePage } from "@inertiajs/react";
import { useUser } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { BookCopyIcon, Calendar, CalendarDaysIcon, HomeIcon, ShieldAlert, UserIcon, Users } from "lucide-react";
import React from "react";

type SideMenuProps = React.HTMLAttributes<HTMLDivElement> & {
  onChangePage?: (open: boolean) => void;
};

export function SideMenu({ className, onChangePage }: SideMenuProps) {
  const { url } = usePage();
  const { can } = useUser();
  return (
    <aside className={cn(className)}>
      <nav>
        <ul className="flex flex-col items-center justify-center gap-2 p-6">
          <li className="w-full">
            <Button variant="ghost" className="w-full font-bold justify-start" asChild>
              <Link href="/" className={activeClass(url === '/')} onClick={() => onChangePage?.(false)}>
                <HomeIcon className="mr-2 w-4 h-4" />
                Accueil
              </Link>
            </Button>
          </li>
          {can('viewAnyEvent') &&
            <li className="w-full">
              <Button variant="ghost" className="w-full font-bold justify-start" asChild>
                <Link href="/events" className={activeClass(url.startsWith('/events'))} onClick={() => onChangePage?.(false)}>
                  <CalendarDaysIcon className="mr-2 w-4 h-4" />
                  &Eacute;vènements
                </Link>
              </Button>
            </li>
          }
          {can('viewAnyCategory') &&
            <li className="w-full">
              <Button variant="ghost" className="w-full font-bold justify-start" asChild>
                <Link href="/categories" className={activeClass(url.startsWith('/categories'))} onClick={() => onChangePage?.(false)}>
                  <BookCopyIcon className="mr-2 w-4 h-4" />
                  Catégories
                </Link>
              </Button>
            </li>
          }
          {can('viewAnyUser') &&
            <li className="w-full">
              <Button variant="ghost" className="w-full font-bold justify-start" asChild>
                <Link href="/users" className={activeClass(url.startsWith('/users'))} onClick={() => onChangePage?.(false)}>
                  <UserIcon className="mr-2 w-4 h-4" />
                  Utilisateurs
                </Link>
              </Button>
            </li>
          }
          {can('viewAnyGroup') &&
            <li className="w-full">
              <Button variant="ghost" className="w-full font-bold justify-start" asChild>
                <Link href="/groups" className={activeClass(url.startsWith('/groups'))} onClick={() => onChangePage?.(false)}>
                  <Users className="mr-2 w-4 h-4" />
                  Groupes
                </Link>
              </Button>
            </li>
          }
          {can('viewAnyRole') &&
            <li className="w-full">
              <Button variant="ghost" className="w-full font-bold justify-start" asChild>
                <Link href="/roles" className={activeClass(url.startsWith('/roles'))} onClick={() => onChangePage?.(false)}>
                  <ShieldAlert className="mr-2 w-4 h-4" />
                  Rôles
                </Link>
              </Button>
            </li>
          }
          <li className="w-full">
            <Button variant="ghost" className="w-full font-bold justify-start" asChild>
              <Link href="/calendar" className={activeClass(url.startsWith('/calendar'))} onClick={() => onChangePage?.(false)}>
                <Calendar className="mr-2 w-4 h-4" />
                Calendrier
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

function activeClass(active: boolean) {
  return cn(active && 'bg-accent');
}
