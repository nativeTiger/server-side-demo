import { DataTable } from "@/components/data-table";
import { useTable } from "@/hooks/use-table";
import { DebouncedInput } from "@/components/search-input";
import { useGetAllUsers } from "@/pages/users/api/user-api";
import { useColumn } from "@/pages/users/partials/use-column";
import { UserTableSkeleton } from "@/components/skeleton";
import { Pagination } from "@/components/pagination";

export default function UsersPage() {
  const { columns } = useColumn();

  const { data: userList, isLoading, isError } = useGetAllUsers();

  const { table, sorting } = useTable(columns, userList!);

  return (
    <>
      <div className="w-1/4 mb-2">
        <DebouncedInput />
      </div>
      {isLoading ? (
        <UserTableSkeleton />
      ) : isError ? (
        <h1>Error</h1>
      ) : (
        <>
          <DataTable table={table} sorting={sorting} />

          {userList && (
            <Pagination pageSize={10} totalCount={userList.length} />
          )}
        </>
      )}
    </>
  );
}
