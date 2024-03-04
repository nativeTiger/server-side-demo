import { useState } from "react";
import {
  type ColumnDef,
  type SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

/**
 * Custom hook for created on top of tanstack table with sorting functionality.
 * @template T - Generics types.
 * @param {ColumnDef<T>[]} columns - Array of column definitions.
 * @param {T[]} data - Array of data items.
 * @returns {{ table: Table<T>, sorting: SortingState, setSorting: React.Dispatch<React.SetStateAction<SortingState>> }}
 */

export function useTable<T>(columns: ColumnDef<T>[], data: T[]) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable<T>({
    data,
    columns,
    state: {
      sorting,
    },
    manualSorting: true,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel<T>(),
    getSortedRowModel: getSortedRowModel<T>(),
  });

  return { table, sorting, setSorting };
}
