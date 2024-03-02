import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import SetModal from "../components/SetModal";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import { ViewList, Trash, XCircle, PlusCircle } from "react-bootstrap-icons";
import { Animate } from "react-simple-animate";

export default function Header(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [play, setPlay] = useState();

  const { type, location, mods, piercings, handleFilterChange, handleModsChange, confirmDelete, toggleSessionOver, sessionOver } = props;

  const empty = piercings.filter((prc) => prc.selected).length === 0;

  return (
    <>
      <header>
        <Row>
          <Col lg={8} className="align-self-center">
            <Link className="site-logo" to="/">
              Indoct's BG3 Piercing Set Creator
            </Link>
          </Col>
          <Col lg={4} className="d-flex flex-row justify-content-md-end mb-2 align-items-center">
            <Button variant="primary" onClick={handleShow} disabled={empty}>
              <ViewList /> View Current Set
            </Button>
            <SetModal show={show} onClose={handleClose} sessionOver={sessionOver} generateNodes={toggleSessionOver} piercings={piercings} />
            <Button id="hr-clear-btn" variant="secondary" onClick={confirmDelete} disabled={empty}>
              <Trash /> Clear Set
            </Button>
          </Col>
        </Row>
      </header>
      {!sessionOver && (
        <Row className="mt-3 mb-1">
          <Col lg={6}>
            <div className="filter-btns">
              <span>Type:</span>
              <button
                onClick={() => {
                  handleFilterChange("type", null);
                }}
                className={`all-piercings ${!type ? "selected" : ""}`}
              >
                Show All
              </button>
              <button onClick={() => handleFilterChange("type", "mod")} className={`mod-btn ${type === "mod" ? "selected" : ""}`}>
                Mod Only
              </button>
              <button
                onClick={() => {
                  handleFilterChange("type", "vanilla");
                  if (filtersOpen) {
                    setFiltersOpen((prevState) => !prevState);
                    setPlay(!play);
                  }
                }}
                className={`vanilla ${type === "vanilla" ? "selected" : ""}`}
                disabled={location === "lips"}
                data-tooltip-id="my-tooltip"
                data-tooltip-content="There are no vanilla piercings in the lip slot, change/clear the location filter to enable this filter"
                data-tooltip-place="bottom"
              >
                Vanilla
              </button>
              <button
                onClick={() => {
                  setPlay(!play);
                  setFiltersOpen((prevState) => !prevState);
                }}
                className="toggle"
                disabled={type === "vanilla"}
              >
                {filtersOpen ? "Hide" : "Show"} Mod Filters {!filtersOpen ? <PlusCircle size="18" /> : <XCircle size="18" />}
              </button>
            </div>
          </Col>
          <Col lg={6}>
            <div className="filter-btns">
              <span>Location:</span>
              <button
                onClick={() => {
                  handleFilterChange("location", "ears");
                }}
                className={`filter ears ${location === "ears" ? "selected" : ""}`}
              >
                Ears
              </button>
              <button onClick={() => handleFilterChange("location", "nose")} className={`filter nose ${location === "nose" ? "selected" : ""}`}>
                Nose
              </button>
              <button
                onClick={() => {
                  handleFilterChange("location", "brows");
                }}
                className={`filter brows ${location === "brows" ? "selected" : ""}`}
              >
                Brows
              </button>
              <button
                onClick={() => {
                  handleFilterChange("location", "lips");
                  if (type === "vanilla") handleFilterChange("type", null);
                }}
                className={`filter lips ${location === "lips" ? "selected" : ""}`}
              >
                Lips
              </button>
              {location && (
                <button
                  onClick={() => {
                    handleFilterChange("location", null);
                  }}
                  className="clear-btn"
                >
                  Clear Filter
                </button>
              )}
            </div>
            {location === "lips" && <Tooltip id="my-tooltip" />}
          </Col>
        </Row>
      )}
      <Animate
        play={play}
        start={{
          transform: "translateY(0px)",
          visibility: "hidden",
          opacity: "0",
          height: "0",
        }}
        end={{
          transform: "translateY(6px)",
          visibility: "visible",
          height: "45px",
        }}
      >
        <Row>
          <Col>
            <div className="mod-filters">
              <button
                onClick={() => {
                  handleModsChange("isp_gold");
                }}
                className={`mod ${mods.includes("isp_gold") ? "selected" : ""}`}
              >
                Indoct's Subtler Piercings (Gold)
              </button>
              <button
                onClick={() => {
                  handleModsChange("isp_silver");
                }}
                className={`mod ${mods.includes("isp_silver") ? "selected" : ""}`}
              >
                Indoct's Subtler Piercings (Silver)
              </button>
              <button
                onClick={() => {
                  handleModsChange("p4_blooming");
                }}
                className={`mod ${mods.includes("p4_blooming") ? "selected" : ""}`}
              >
                P4 Blooming Circlets & Piercings
              </button>
              {/* <form id="check-filters">
                <fieldset>
                  <input
                    id="isp_gold"
                    type="checkbox"
                    name="isp_gold"
                    onChange={handleFilterChange}
                    // checked={checked}
                  />
                  <label htmlFor="isp_gold">
                    Indoct's Subtler Piercings (Gold)
                  </label>
                  <input
                    id="isp_silver"
                    type="checkbox"
                    name="isp_silver"
                    // onChange={handleChange}
                    // checked={checked}
                  />
                  <label htmlFor="isp_silver">
                    Indoct's Subtler Piercings (Silver)
                  </label>
                  <input
                    id="p4_blooming"
                    type="checkbox"
                    name="p4_blooming"
                    // onChange={handleChange}
                    // checked={checked}
                  />
                  <label htmlFor="p4_blooming">
                    P4 Blooming Circlets & Piercings
                  </label>
                </fieldset>
              </form> */}
            </div>
          </Col>
        </Row>
      </Animate>
    </>
  );
}
