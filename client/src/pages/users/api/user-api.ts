import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/pages/users/api/user-api-slice";
import { useSearchParams } from "react-router-dom";

export function useGetAllUsers() {
  const [searchParams] = useSearchParams();

  const page = searchParams.get("page") as string;

  const search = searchParams.get("search") as string;

  const orderBy = searchParams.get("order_by") as "asc" | "desc";

  const sortBy = searchParams.get("sort_by") as string;

  return useQuery({
    queryKey: ["users", search, orderBy, sortBy, page],
    queryFn: () => getAllUsers({ search, orderBy, sortBy, page }),
  });
}
