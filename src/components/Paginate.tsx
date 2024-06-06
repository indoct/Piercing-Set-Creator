import classnames from "classnames";
import { usePaginate, dots } from "../usePaginate";
import { PaginateProps } from "../types";
import "../pagination.css";

const Paginate: React.FC<PaginateProps> = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    itemsPerPage,
    className,
  } = props;

  const paginationRange = usePaginate({
    currentPage,
    totalCount,
    siblingCount,
    itemsPerPage,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className={classnames("pagination-container", {
        [className!]: className,
      })}
    >
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === 1,
        })}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, ind) => {
        return pageNumber === dots ? (
          <li className="pagination-item dots">&#8230;</li>
        ) : (
          <li
            className={classnames("pagination-item", {
              selected: pageNumber === currentPage,
            })}
            onClick={() => {
              if (typeof pageNumber === "number") onPageChange(pageNumber);
            }}
            key={ind}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={classnames("pagination-item", {
          disabled: currentPage === lastPage,
        })}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Paginate;
