import axios from "axios";
import { UserColumn } from "@/pages/users/partials/use-column";

export async function getAllUsers({
  page,
  search,
  sortBy,
  orderBy = "asc",
}: {
  page: string;
  search: string;
  sortBy: string;
  orderBy: "asc" | "desc";
}): Promise<UserColumn[]> {
  let userUrl = `${import.meta.env.VITE_MOCK_DATA_URL}/users?`;

  if (search) {
    userUrl += `q=${search}&`;
  }

  if (page) {
    userUrl += `_page=${page}&`;
  }

  if (sortBy) {
    userUrl += `_sort=${sortBy}&`;
  }

  if (orderBy) {
    userUrl += `_order=${orderBy}&`;
  }

  if (userUrl.endsWith("&")) {
    userUrl = userUrl.slice(0, -1);
  }

  return axios.get(`${userUrl}`).then((response) => response.data);
}
