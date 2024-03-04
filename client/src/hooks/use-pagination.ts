import { useMemo } from "react";

type PaginationType = {
  totalCount: number;
  pageSize: number;
  siblingCount: number;
  currentPage: number;
};

export const DOTS = "...";

function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, index) => index + start);
}

/**
 * Custom hook for generating pagination range based on the provided parameters.
 * @param {PaginationType} param - Object containing pagination parameters.
 * @returns {(number | string)[] | undefined} - Array representing the pagination range or undefined.
 */

export function usePagination({
  totalCount,
  pageSize,
  siblingCount,
  currentPage,
}: PaginationType): (number | string)[] | undefined {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    const totalPageNumbers = siblingCount + 5;

    /**
    * @description Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    /**
     * @description  We do not show dots just when there is just one page number
     *               to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount.
     *               Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
     */
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    /**
     * @description Case 2: No left dots to show, but rights dots to be shown
     */
    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPageCount];
    }

    /**
     * @description Case 3: No right dots to show, but left dots to be shown
     */
    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    /**
     * @description Case 4: Both left and right dots to be shown
     */
    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
}
