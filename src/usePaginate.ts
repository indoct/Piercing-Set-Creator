import { useMemo } from "react";
import { UsePaginateProps } from "./types";

export const dots: string = "...";

const range = (start: number, end: number): number[] => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePaginate = ({
  totalCount,
  itemsPerPage,
  siblingCount = 1,
  currentPage,
}: UsePaginateProps): (string | number)[] => {
  const paginationRange: (string | number)[] = useMemo(() => {
    const totalPageCount: number = Math.ceil(totalCount / itemsPerPage);
    const totalPageNumbers: number = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex: number = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex: number = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const showPrevDots: boolean = leftSiblingIndex > 2;
    const showNextDots: boolean = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex: number = 1;
    const lastPageIndex: number = totalPageCount;

    if (!showPrevDots && showNextDots) {
      let leftItemCount: number = 3 + 2 * siblingCount;
      let leftRange: number[] = range(1, leftItemCount);

      return [...leftRange, dots, totalPageCount];
    }

    if (showPrevDots && !showNextDots) {
      let rightItemCount: number = 3 + 2 * siblingCount;
      let rightRange: number[] = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, dots, ...rightRange];
    }

    if (showPrevDots && showNextDots) {
      let middleRange: number[] = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, dots, ...middleRange, dots, lastPageIndex];
    }

    return [];
  }, [totalCount, itemsPerPage, siblingCount, currentPage]);

  return paginationRange;
};
