import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import SetModal from "../components/SetModal";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Tooltip } from "react-tooltip";

export default function Header(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { type, location, piercings, handleFilterChange, confirmDelete } =
    props;

  const empty = piercings.filter((prc) => prc.selected).length === 0;

  return (
    <>
      <header>
        <Row>
          <Col lg={8}>
            <Link className="site-logo" to="/">
              Indoct's BG3 Piercing Set Creator
            </Link>
          </Col>
          <Col
            lg={4}
            className="d-flex flex-row justify-content-md-end mb-2 align-items-center"
          >
            <Button variant="primary" onClick={handleShow} disabled={empty}>
              Current Set Config
            </Button>
            <SetModal show={show} onClose={handleClose} piercings={piercings} />
            <Button
              variant="secondary"
              onClick={confirmDelete}
              disabled={empty}
            >
              Clear Set
            </Button>
          </Col>
        </Row>
      </header>
      <Row>
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
            <button
              onClick={() => handleFilterChange("type", "mod")}
              className={`mod-btn ${type === "mod" ? "selected" : ""}`}
            >
              Mod Only
            </button>
            <button
              onClick={() => {
                handleFilterChange("type", "vanilla");
              }}
              className={`vanilla ${type === "vanilla" ? "selected" : ""}`}
              disabled={location === "lips"}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="There are no vanilla piercings in the lip slot, change/clear the location filter to enable this filter"
              data-tooltip-place="bottom"
            >
              Vanilla
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
            <button
              onClick={() => handleFilterChange("location", "nose")}
              className={`filter nose ${location === "nose" ? "selected" : ""}`}
            >
              Nose
            </button>
            <button
              onClick={() => {
                handleFilterChange("location", "brows");
              }}
              className={`filter brows ${
                location === "brows" ? "selected" : ""
              }`}
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
    </>
  );
}
