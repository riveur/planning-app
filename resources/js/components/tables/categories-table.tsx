import { Category } from "@/types";
import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Edit, Eye, MoreVertical, Trash } from "lucide-react";
import { Method } from "@inertiajs/inertia";
import { CategoryColorLabel } from "@/components/elements/category-color-label";
import { useQueryClient } from "react-query";

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "#",
  },
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "color",
    header: "Couleur",
    cell: ({ row }) => {
      const color = row.getValue('color') as string;
      return <CategoryColorLabel color={color}>{color}</CategoryColorLabel>
    }
  },
  {
    accessorKey: "created_at",
    header: "Date de création",
    cell: ({ row }) => {
      const date = new Date(row.getValue('created_at'));
      return format(date, 'dd/MM/yyyy hh:mm:ss');
    }
  },
  {
    accessorKey: "updated_at",
    header: "Date de modification",
    cell: ({ row }) => {
      const date = new Date(row.getValue('updated_at'));
      return format(date, 'dd/MM/yyyy hh:mm:ss');
    }
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const queryClient = useQueryClient();
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" variant="ghost" className="rounded-full"><MoreVertical className="h-4 w-4" /></Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/categories/${row.getValue('id')}`}>
                <Eye className="mr-2 h-4 w-4" />
                <span>Voir</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/categories/edit/${row.getValue('id')}`}>
                <Edit className="mr-2 h-4 w-4" />
                <span>Modifier</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`/categories/${row.getValue('id')}`}
                as="button"
                className="w-full"
                method={Method.DELETE}
                onSuccess={() => {
                  queryClient.invalidateQueries(['categories']);
                }}
              >
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
