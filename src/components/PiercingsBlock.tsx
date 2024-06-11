import { useMemo, useState } from "react";
import { useAppContext } from "../AppContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Piercing } from "../types";
import Paginate from "./Paginate";

export default function PiercingsBlock(): JSX.Element {
  const { piercings, type, location, modFilters, handleBtns } = useAppContext();
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredPiercings: Piercing[] = useMemo(() => {
    if (currentPage !== 1) setCurrentPage(1);
    return piercings.filter((piercing) => {
      const matchesType = type ? piercing.type === type : true;
      const matchesLocation = location ? piercing.location === location : true;
      const matchesMods =
        piercing.type === "mod"
          ? modFilters.includes(piercing.site_cat)
          : type === "Vanilla"
          ? piercing.type !== "mod"
          : true;
      return matchesType && matchesLocation && matchesMods;
    });
  }, [piercings, type, location, modFilters]);

  function handlePageChange(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const target = e.target as HTMLButtonElement;
    const id = parseInt(target.id);
    if (id !== currentPage) setCurrentPage(id);
  }

  return (
    <>
      <Row className="mt-2 mt-lg-3 title-row">
        <Col>
          <h5 className="prc-block-h">
            {type === "vanilla"
              ? "Vanilla Sets"
              : type === "mod"
              ? "Mod Piercings"
              : "All Piercings"}
          </h5>
        </Col>
      </Row>
      {filteredPiercings.length > 0 ? (
        <Paginate
          itemsPerPage={54}
          originalArray={filteredPiercings}
          currentPage={currentPage}
          handleBtns={handleBtns}
          handlePageChange={(e) => handlePageChange(e)}
        />
      ) : (
        <Row className="mt-2">
          <Col>
            <p>
              <big>
                {" "}
                There are no piercings with these filters.{" "}
                {modFilters.length === 0 &&
                  "You have no mods selected in Mod Filters."}
              </big>
            </p>
          </Col>
        </Row>
      )}
    </>
  );
}
