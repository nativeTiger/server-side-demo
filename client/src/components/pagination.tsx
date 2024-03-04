import { Link, useSearchParams } from "react-router-dom";
import { FiMoreHorizontal } from "react-icons/fi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { DOTS, usePagination } from "@/hooks/use-pagination";

type PaginationPropsType = {
  totalCount: number;
  siblingCount?: number;
  pageSize: number;
};

/**
 * Pagination component for handling pagination logic and rendering pagination UI.
 * @param {PaginationPropsType} props - Pagination props including totalCount, pageSize, and siblingCount.
 * @returns {JSX.Element | null} Pagination UI elements.
 */

export function Pagination({
  totalCount,
  pageSize,
  siblingCount = 1,
}: PaginationPropsType) {
  const pageParam = "page";

  const [queryParams] = useSearchParams();

  const currentPage = Number(queryParams.get(pageParam) || 1);

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });
  // const totalPages = Math.ceil(totalCount / pageSize);

  const previousQuery = new URLSearchParams(queryParams);
  previousQuery.set(pageParam, String(currentPage - 1));

  const nextQuery = new URLSearchParams(queryParams);
  nextQuery.set(pageParam, String(currentPage + 1));

  const pageChange = new URLSearchParams(queryParams);

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }

  const lastPage =
    paginationRange && paginationRange[paginationRange.length - 1];

  const isPreviousButtonDisabled = currentPage === 1;

  const isNextButtonDisabled = currentPage >= Number(lastPage);

  return (
    <div className="justify-end py-4 mx-auto flex w-full">
      <div className="justify-center items-center gap-x-3 flex">
        <Link
          to={`?${previousQuery.toString()}`}
          aria-disabled={isPreviousButtonDisabled}
          className={
            isPreviousButtonDisabled
              ? "pointer-events-none"
              : "border p-2 rounded-md"
          }
          tabIndex={isPreviousButtonDisabled ? -1 : undefined}
        >
          <FaAngleLeft />
        </Link>
        {paginationRange &&
          paginationRange.map((pageNumber, index) => {
            if (pageNumber === DOTS) {
              return <FiMoreHorizontal className="h-4 w-4" key={index} />;
            }
            const isActiveButton = currentPage === pageNumber;

            pageChange.set(pageParam, String(pageNumber));
            return (
              <Link
                key={index}
                className={`border py-1 px-2.5 rounded-md ${
                  isActiveButton ? "bg-blue-400 text-white" : ""
                }`}
                to={`?${pageChange.toString()}`}
              >
                {pageNumber}
              </Link>
            );
          })}
        <Link
          to={`?${nextQuery.toString()}`}
          aria-disabled={isNextButtonDisabled}
          className={
            isNextButtonDisabled
              ? "pointer-events-none"
              : "border p-2 rounded-md"
          }
          tabIndex={isNextButtonDisabled ? -1 : undefined}
        >
          <FaAngleRight />
        </Link>
      </div>
    </div>
  );
}
