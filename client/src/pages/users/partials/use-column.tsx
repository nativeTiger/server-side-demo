import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";

export type UserColumn = {
  name: string;
  email: string;
  imageUrl: string;
  phoneNumber: string;
  designation: string;
};

export function useColumn() {
  const columns = useMemo<ColumnDef<UserColumn>[]>(
    () => [
      {
        accessorKey: "name",
        header: "User",
        cell: (info) => {
          const { name, imageUrl } = info.row.original;
          return (
            <figure className="flex items-center gap-x-2">
              <div className="w-10 h-10 border rounded-full">
                <img
                  src={imageUrl}
                  alt="profileimage"
                  className="h-full w-full rounded-full object-cover object-center"
                />
              </div>
              <figcaption>{name}</figcaption>
            </figure>
          );
        },
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "phoneNumber",
        header: "Phone Number",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "designation",
        header: "Designation",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );
  return { columns };
}
