import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  PaginationState
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { DataTablePagination } from "./data-table-pagination";
import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import { fetchTableData } from "@/lib/fetchers";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[],
  url: string,
  queryKey: string,
  emptyMessage?: string
}

export function BaseDataTable<TData, TValue>({
  columns,
  url,
  queryKey,
  emptyMessage
}: DataTableProps<TData, TValue>) {

  const [
    { pageIndex, pageSize },
    setPagination
  ] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  const queryParams = { page: pageIndex + 1, size: pageSize };

  const pagination = useMemo(() => ({
    pageIndex,
    pageSize
  }), [pageIndex, pageSize]);

  const defaultData = useMemo(() => [], []);

  const dataQuery = useQuery(
    [queryKey, queryParams],
    () => fetchTableData<TData>(url, queryParams),
    { keepPreviousData: true }
  );

  const table = useReactTable({
    data: dataQuery.data?.data as TData[] ?? defaultData,
    pageCount: dataQuery.data?.last_page ?? -1,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    state: {
      pagination
    }
  });

  return (
    <Card>
      <CardContent className="px-0">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-1">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {emptyMessage ?? 'Aucun élément'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-end">
        <DataTablePagination table={table} />
      </CardFooter>
    </Card>
  )
}