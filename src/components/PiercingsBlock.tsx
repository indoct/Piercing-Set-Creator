import { useMemo, useState } from "react";
import { useAppContext } from "../AppContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Piercing } from "../types";
import Paginate from "./Paginate";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import { toggleSelected } from "../features/piercings/piercingsSlice";

export default function PiercingsBlock(): JSX.Element {
  const piercings = useSelector((state: RootState) => state.piercings.data);
  const dispatch = useDispatch();
  // const { type, location, modFilters, handleBtns } = useAppContext();
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const [pageLength, setPageLength] = useState<number>(54);
  // const [selectedOption, setSelectedOption] = useState<string | number>(pageLength);

  const handleToggle = (index: number) => {
    dispatch(toggleSelected(index));
  };

  // const filteredPiercings: Piercing[] = useMemo(() => {
  //   if (currentPage !== 1) setCurrentPage(1);
  //   return piercings.filter((piercing) => {
  //     const matchesType = type ? piercing.type === type : true;
  //     const matchesLocation = location ? piercing.location === location : true;
  //     const matchesMods = piercing.type === "mod" ? modFilters.includes(piercing.site_cat) : type === "Vanilla" ? piercing.type !== "mod" : true;
  //     return matchesType && matchesLocation && matchesMods;
  //   });
  // }, [piercings, type, location, modFilters, pageLength]);

  // function handlePageChange(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  //   const target = e.target as HTMLButtonElement;
  //   const id = parseInt(target.id);
  //   if (id !== currentPage) setCurrentPage(id);
  // }

  // const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const value = event.target.value;
  //   setSelectedOption(value);
  //   if (value === "All") {
  //     setPageLength(filteredPiercings.length);
  //   } else {
  //     setPageLength(Number(value));
  //   }
  // };

  return (
    <>
      {/* <Row className="mt-2 mt-lg-3 title-row">
        <Col>
          <h5 className="prc-block-h">{type === "vanilla" ? "Vanilla Sets" : type === "mod" ? "Mod Piercings" : "All Piercings"}</h5>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <label htmlFor="page-length">per page: </label>
          <select value={selectedOption} onChange={handleSelectChange} id="page-length">
            <option value="30">30</option>
            <option value="54">54</option>
            <option value="84">84</option>
            <option value="All">All ({filteredPiercings.length})</option>
          </select>
        </Col>
      </Row> */}
      <Row>
        {piercings.map((piercing) => (
          <div key={"prc-" + piercing.index} id={`piercing-${piercing.index}`}>
            <span>{piercing.name}</span>
            <button onClick={() => handleToggle(piercing.index)}>{piercing.selected ? "Deselect" : "Select"}</button>
          </div>
        ))}
      </Row>
      {/* {filteredPiercings.length > 0 ? (
        <Paginate
          itemsPerPage={pageLength}
          filteredPiercings={filteredPiercings}
          currentPage={currentPage}
          handleBtns={handleBtns}
          handlePageChange={(e) => handlePageChange(e)}
        />
      ) : (
        <Row className="mt-2">
          <Col>
            <p>
              <big> There are no piercings with these filters. {modFilters.length === 0 && "You have no mods selected in Mod Filters."}</big>
            </p>
          </Col>
        </Row>
      )} */}
    </>
  );
}
