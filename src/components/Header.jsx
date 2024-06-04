import { useAppContext } from "../AppContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import SetModal from "./SetModal";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import {
  ViewList,
  Trash,
  XCircle,
  PlusCircle,
  InfoCircle,
} from "react-bootstrap-icons";
import { Animate } from "react-simple-animate";
import InstructionsModal from "./InstructionsModal";

export default function Header() {
  const [showSet, setShowSet] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [play, setPlay] = useState();

  const {
    type,
    location,
    mods,
    piercings,
    handleFilterChange,
    confirmDelete,
    toggleSessionOver,
    sessionOver,
    handleModsChange,
  } = useAppContext();

  function handleCloseModal(modal) {
    return modal === "set" ? setShowSet(false) : setShowInstructions(false);
  }

  const empty = piercings.filter((prc) => prc.selected).length === 0;
  console.log(sessionOver);

  return (
    <>
      <header>
        <Row className="mt-3">
          <Col lg={6} className="align-self-center mb-3 mb-sm-0">
            <Link className="site-logo" to="/">
              Indoct's BG3 Piercing Set Creator
            </Link>
          </Col>
          <Col
            lg={6}
            className="d-flex flex-row justify-content-md-end mb-2 align-items-center"
          >
            <Button
              variant="primary"
              onClick={() => setShowSet(true)}
              disabled={empty}
            >
              <ViewList />
            </Button>
            <SetModal
              show={showSet}
              onClose={() => handleCloseModal("set")}
              sessionOver={sessionOver}
              generateNodes={toggleSessionOver}
              piercings={piercings}
              togglePlay={() => {
                if (play) setPlay(!play);
              }}
            />
            <Button
              id="instructions-btn"
              variant="secondary"
              onClick={() => setShowInstructions(true)}
            >
              <InfoCircle />
            </Button>
            <InstructionsModal
              show={showInstructions}
              onClose={() => handleCloseModal("instructions")}
            />
            <Button
              id="hr-clear-btn"
              variant="secondary"
              onClick={confirmDelete}
              disabled={empty}
            >
              <Trash /> Clear Set
            </Button>
          </Col>
        </Row>
      </header>
      {!sessionOver && (
        <Row className="mt-2 mb-1">
          <Col lg={6}>
            <div className="filter-btns mb-1 mb-sm-0">
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
                  if (filtersOpen) {
                    setFiltersOpen((prevState) => !prevState);
                    setPlay(!play);
                  }
                }}
                className={`vanilla ${type === "vanilla" ? "selected" : ""}`}
                disabled={location === "lips"}
                data-tooltip-id="my-tooltip"
                data-tooltip-content="There are no vanilla piercings in the lip slot, change/clear the location filter to enable this filter"
                data-tooltip-place="top"
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
                {filtersOpen ? "Hide" : "Show"} Mod Filters{" "}
                {!filtersOpen ? (
                  <PlusCircle size="18" />
                ) : (
                  <XCircle size="18" />
                )}
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
                className={`filter ears ${
                  location === "ears" ? "selected" : ""
                }`}
              >
                Ears
              </button>
              <button
                onClick={() => handleFilterChange("location", "nose")}
                className={`filter nose ${
                  location === "nose" ? "selected" : ""
                }`}
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
                className={`filter lips ${
                  location === "lips" ? "selected" : ""
                }`}
                disabled={type === "vanilla"}
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
                <input
                  type="checkbox"
                  checked={mods.includes("isp_gold")}
                  readOnly
                />
                Indoct's Subtler Piercings (Gold)
              </button>
              <button
                onClick={() => {
                  handleModsChange("isp_silver");
                }}
                className={`mod ${
                  mods.includes("isp_silver") ? "selected" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={mods.includes("isp_silver")}
                  readOnly
                />
                Indoct's Subtler Piercings (Silver)
              </button>
              <button
                onClick={() => {
                  handleModsChange("p4_blooming");
                }}
                disabled={location === "lips"}
                className={`mod ${
                  mods.includes("p4_blooming") && location !== "lips"
                    ? "selected"
                    : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={mods.includes("p4_blooming") && location !== "lips"}
                  disabled={location === "lips"}
                  readOnly
                />
                P4 Blooming Circlets & Piercings
              </button>
              <button
                onClick={() => {
                  handleModsChange("ghouls_customs");
                }}
                className={`mod ${
                  mods.includes("ghouls_customs") ? "selected" : ""
                }`}
              >
                <input
                  type="checkbox"
                  checked={mods.includes("ghouls_customs")}
                  readOnly
                />
                Ghouls Custom Piercings
              </button>
              <button
                onClick={() => {
                  handleModsChange("LV_E_V1");
                }}
                className={`mod ${mods.includes("LV_E_V1") ? "selected" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={mods.includes("LV_E_V1")}
                  readOnly
                />
                LVDNRs Earrings V1
              </button>
            </div>
          </Col>
        </Row>
      </Animate>
    </>
  );
}
