import { useEffect } from "react";
import { LuArrowUpDown } from "react-icons/lu";
import { useSearchParams } from "react-router-dom";
import { HiArrowDown, HiArrowUp } from "react-icons/hi";
import { SortingState, Table, flexRender } from "@tanstack/react-table";

interface DataTableProps<T> {
  table: Table<T>;
  sorting: SortingState;
}

export function DataTable<T>({ table, sorting }: DataTableProps<T>) {
  const [searchParams, setSearchParams] = useSearchParams();

  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    if (sorting.length > 0) {
      params.set("page", "1");
      params.set("sort_by", sorting[0].id);
      params.set("order_by", sorting[0].desc ? "desc" : "asc");
    } else {
      params.delete("sort_by");
      params.delete("order_by");
    }

    setSearchParams(params);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <table className="min-w-full text-gray-900">
            <thead className="rounded-lg text-left text-sm font-normal">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="text-sm font-thin text-gray-600 py-8"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      colSpan={header.colSpan}
                      className="px-3 py-5 font-medium whitespace-nowrap"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "flex items-center gap-x-2 cursor-pointer"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          <span className="">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </span>
                          {header.column.getIsSorted() ? (
                            {
                              asc: <HiArrowUp />,
                              desc: <HiArrowDown />,
                            }[(header.column.getIsSorted() as string) ?? null]
                          ) : (
                            <>
                              {header.column.getCanSort() ? (
                                <LuArrowUpDown />
                              ) : (
                                ""
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody className="bg-white">
              {table.getRowModel().rows?.length ? (
                table
                  .getRowModel()
                  .rows.slice(0, 10)
                  .map((row) => (
                    <tr
                      key={row.id}
                      className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="whitespace-nowrap px-3 py-3"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))
              ) : (
                <tr>
                  <td
                    colSpan={table.getAllColumns().length}
                    className="whitespace-nowrap px-3 py-3 text-center"
                  >
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
