import { Event, WithOwner } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Edit, Eye, MoreVertical, Trash } from "lucide-react";
import { Method } from "@inertiajs/inertia";
import { format } from "date-fns";

export const columns: ColumnDef<Event & WithOwner>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "title",
    header: "Titre",
  },
  {
    accessorKey: "owner.fullname",
    header: "Créé par"
  },
  {
    accessorKey: "created_at",
    header: "Date de création",
    cell: ({ row }) => {
      const date = new Date(row.getValue('created_at'));
      return format(date, 'PPpp');
    }
  },
  {
    accessorKey: "updated_at",
    header: "Date de modification",
    cell: ({ row }) => {
      const date = new Date(row.getValue('updated_at'));
      return format(date, 'PPpp');
    }
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="rounded-full"><MoreVertical className="h-4 w-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/events/${row.getValue('id')}`}>
                <Eye className="mr-2 h-4 w-4" />
                <span>Voir</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/events/edit/${row.getValue('id')}`}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Modifier</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/events/${row.getValue('id')}`} as="button" className="w-full" method={Method.DELETE}>
                <Trash className="mr-2 h-4 w-4" />
                <span>Supprimer</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
