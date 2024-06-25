import { useMemo } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Piercing } from "../types";
import Paginate from "./Paginate";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { setCurrentPage, setItemsPerPage } from "../features/pagination/paginateSlice";

export default function PiercingsBlock(): JSX.Element {
  const dispatch = useDispatch();
  const piercings = useSelector((state: RootState) => state.piercings.data);
  const typeFilter = useSelector((state: RootState) => state.filters.typeFilter);
  const locaFilter = useSelector((state: RootState) => state.filters.locaFilter);
  const modFilters = useSelector((state: RootState) => state.filters.modFilters);
  const currentPage = useSelector((state: RootState) => state.paginate.currentPage);
  const itemsPerPage = useSelector((state: RootState) => state.paginate.itemsPerPage);

  const filteredPiercings: Piercing[] = useMemo(() => {
    return piercings.filter((piercing) => {
      const matchesType = typeFilter ? piercing.type === typeFilter : true;
      const matchesLocation = locaFilter ? piercing.location === locaFilter : true;
      const matchesMods = piercing.type === "mod" ? modFilters.includes(piercing.site_cat) : typeFilter === "Vanilla" ? piercing.type !== "mod" : true;
      return matchesType && matchesLocation && matchesMods;
    });
  }, [piercings, typeFilter, locaFilter, modFilters]);

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    if (value === "All") {
      dispatch(setItemsPerPage(filteredPiercings.length));
    } else {
      dispatch(setItemsPerPage(Number(value)));
    }
    dispatch(setCurrentPage(1)); // Reset to the first page
  };

  return (
    <>
      <Row className="mt-2 mt-lg-3 title-row">
        <Col>
          <h5 className="prc-block-h">{typeFilter === "vanilla" ? "Vanilla Sets" : typeFilter === "mod" ? "Mod Piercings" : "All Piercings"}</h5>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <label htmlFor="page-length">per page: </label>
          <select value={itemsPerPage === filteredPiercings.length ? "All" : itemsPerPage} onChange={handleSelectChange} id="page-length">
            <option value="30">30</option>
            <option value="54">54</option>
            <option value="84">84</option>
            <option value="All">All ({filteredPiercings.length})</option>
          </select>
        </Col>
      </Row>
      {filteredPiercings.length > 0 ? (
        <Paginate itemsPerPage={itemsPerPage} filteredPiercings={filteredPiercings} currentPage={currentPage} handlePageChange={handlePageChange} />
      ) : (
        <Row className="mt-2">
          <Col>
            <p>
              <big>
                {" "}
                There are no piercings with these filters. {modFilters.length === 1 && modFilters[0] === "" && "You have no mods selected in Mod Filters."}
              </big>
            </p>
          </Col>
        </Row>
      )}
    </>
  );
}
