"use client";

import { useContext, useEffect, useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type RowSelectionState,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Record } from "@/utils/types";
import RecordsContext from "@/context/RecordsContext";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { loadRecords } from "@/backend/load";

const columns: ColumnDef<Record>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "OriginUrl",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() == "asc")}
        >
          Origin Url
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase">{row.getValue("OriginUrl")}</div>
    ),
  },

  {
    accessorKey: "ShortenedUrl",
    header: "Shortened Url",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("ShortenedUrl")}</div>
    ),
  },
];

export default function RecordsTable() {
  const context = useContext(RecordsContext);

  if (!context) {
    throw new Error("no records context");
  }

  const { recs, setRecs, setAlertMessage } = context;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data: recs,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleOnClick = async () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const originUrls = selectedRows.map(row => row.original.OriginUrl);

    try {
      await Promise.all(originUrls.map(url => (
        axios.delete("http://localhost:8080/records", {
          params: {
            origin_url: url 
          }
        })
      )))

      const data = await loadRecords();
      setRecs(Array.isArray(data) ? data : [])
      table.setRowSelection({})
    } catch (err: any) {
      setAlertMessage(err.response.data)
    }
  }

  // const handleOnClick = () => {
  //   for (const row of table.getSelectedRowModel().rows) {
  //     const rec = row.original;

  //     axios
  //       .delete("http://localhost:8080/records", {
  //         params: {
  //           origin_url: rec.OriginUrl,
  //         },
  //       })
  //       .then((_) => {
  //         loadRecords()
  //           .then(setRecs)
  //           .catch((err) =>
  //             setAlertMessage(
  //               err.response?.data || "Ошибка загрузки данных с базы данных"
  //             )
  //           );
  //       })
  //       .catch((err) => {
  //         setAlertMessage(err.response.data);
  //       });
  //   }
  //   table.setRowSelection({});
  // };
  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-md border">
        <Table className="p-20">
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
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table?.getRowModel()?.rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table?.getFilteredSelectedRowModel()?.rows?.length} of{" "}
          {table?.getFilteredRowModel()?.rows?.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleOnClick}
            disabled={table?.getSelectedRowModel()?.rows?.length === 0}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
