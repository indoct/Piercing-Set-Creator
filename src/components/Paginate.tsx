import classnames from "classnames";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

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
    const nextPage = currentPage + 1;
    navigate(`/${nextPage}`);
    onPageChange(nextPage);
  };

  const onPrevious = () => {
    const prevPage = currentPage - 1;
    navigate(`/${prevPage}`);
    onPageChange(prevPage);
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
              if (typeof pageNumber === "number") {
                navigate(`/${pageNumber}`);
                onPageChange(pageNumber);
              }
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
