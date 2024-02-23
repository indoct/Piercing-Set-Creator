import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import data from "../data";
import dataConfig from "../dataConfig";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import "../App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { Tooltip } from "react-tooltip";
import "bootstrap/dist/css/bootstrap.min.css";
import SetModal from "../components/SetModal";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [piercings, setPiercings] = useState(data);
  const [prcsConfig, setPrcsConfig] = useState(dataConfig);
  const [emptySet, setEmptySet] = useState(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const typeFilter = searchParams.get("type");
  const locaFilter = searchParams.get("location");

  useEffect(() => {
    setEmptySet(() => {
      return piercings.filter((prc) => prc.selected).length === 0;
    });
  }, [piercings]);

  const displayedPiercings =
    typeFilter && !locaFilter
      ? piercings.filter((prc) => prc.type === typeFilter)
      : typeFilter && locaFilter
      ? piercings.filter(
          (prc) => prc.type === typeFilter && prc.location === locaFilter
        )
      : locaFilter && !typeFilter
      ? piercings.filter((prc) => prc.location === locaFilter)
      : piercings;

  const prcElements = displayedPiercings.map((prc) => {
    const contClass =
      prc.site_cat === "vanilla-ab"
        ? "vanilla-ab prc-container"
        : prc.site_cat === "barbarian"
        ? "barbarian prc-container"
        : prc.site_cat === "ortheus"
        ? "ortheus prc-container"
        : "mod prc-container";
    const nodeId = prc.nodeid;
    const nodeLoca = prc.bone;
    return (
      <Col key={prc.nodeid} lg={2} className="prc-col">
        <button
          type="button"
          id={prc.index}
          className={`${contClass} ${prc.selected ? "selected" : ""}`}
          onClick={(e) => selectDisableBtns(e, nodeId, nodeLoca)}
          disabled={prc.disabled}
        >
          <div className="img-dummy">
            <span
              className={
                prc.color === "silver" ? "silver color-tag" : "gold color-tag"
              }
            >
              {prc.color}
            </span>
          </div>
          <ul className="prc-stats">
            <li className="prc-name">{prc.name}</li>
            <li className="location">{prc.pt_bone}</li>
          </ul>
        </button>
      </Col>
    );
  });

  function selectDisableBtns(e, nodeId, nodeLoca) {
    setPiercings((prevPrcs) =>
      prevPrcs.map((prc) => {
        return nodeId === prc.nodeid
          ? {
              ...prc,
              selected: !prc.selected,
            }
          : nodeId !== prc.nodeid && nodeLoca === prc.bone
          ? {
              ...prc,
              disabled: !prc.disabled,
            }
          : prc;
      })
    );
    addPrcToConfig(nodeId, nodeLoca);
  }

  function addPrcToConfig(nodeId, nodeLoca) {
    setPrcsConfig((prevPrcs) => {
      // nothing in the config's piercing location OR clicked prc's node ID doesn't match the ID at the config's location key: ADD ID
      if (prevPrcs[nodeLoca].length === 0 || prevPrcs[nodeLoca] !== nodeId) {
        return {
          ...prevPrcs,
          [nodeLoca]: nodeId,
        };
      } else if (
        // something is in the piercing location AND the ID is the same as clicked prc: REMOVE ID from config obj
        prevPrcs[nodeLoca].length > 0 &&
        prevPrcs[nodeLoca] === nodeId
      ) {
        return {
          ...prevPrcs,
          [nodeLoca]: "",
        };
        // no match for ID or location: return object as is
      } else {
        return { ...prevPrcs };
      }
    });
  }

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <Container>
        <Row>
          <Col lg={4}>
            <div className="filter-btns">
              <span>Type:</span>
              <button
                onClick={() => {
                  handleFilterChange("type", null);
                }}
                className={`all-piercings ${!typeFilter ? "selected" : ""}`}
              >
                Show All
              </button>
              <button
                onClick={() => handleFilterChange("type", "mod")}
                className={`mod-btn ${typeFilter === "mod" ? "selected" : ""}`}
              >
                Mod Only
              </button>
              <button
                onClick={() => {
                  handleFilterChange("type", "vanilla");
                }}
                className={`vanilla ${
                  typeFilter === "vanilla" ? "selected" : ""
                }`}
                disabled={locaFilter === "lips"}
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
                className={`filter ${locaFilter === "ears" ? "selected" : ""}`}
              >
                Ears
              </button>
              <button
                onClick={() => handleFilterChange("location", "nose")}
                className={`filter ${locaFilter === "nose" ? "selected" : ""}`}
              >
                Nose
              </button>
              <button
                onClick={() => {
                  handleFilterChange("location", "brows");
                }}
                className={`filter ${locaFilter === "brows" ? "selected" : ""}`}
              >
                Brows
              </button>
              <button
                onClick={() => {
                  handleFilterChange("location", "lips");
                  if (typeFilter === "vanilla")
                    handleFilterChange("type", null);
                }}
                className={`filter ${locaFilter === "lips" ? "selected" : ""}`}
              >
                Lips
              </button>
              {locaFilter && (
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
            {locaFilter === "lips" && <Tooltip id="my-tooltip" />}
          </Col>
          <Col lg={2} className="d-flex justify-content-md-end">
            <Button variant="primary" onClick={handleShow} disabled={emptySet}>
              Current Set Config
            </Button>
            <SetModal show={show} onClose={handleClose} piercings={piercings} />
          </Col>
        </Row>
        <Row className="mt-4 title-row">
          <Col lg={3}>
            <h5>
              {typeFilter === "vanilla"
                ? "Vanilla Sets"
                : typeFilter === "mod"
                ? "Mod Piercings"
                : "All Piercings"}
            </h5>
          </Col>
          <Col lg={9}>
            <p>
              Notes: You can only have ONE piercing per location. Deselect the
              current piercing to access others in the same location.
            </p>
          </Col>
        </Row>
        <Row className="mt-2">{prcElements}</Row>
      </Container>
    </ThemeProvider>
  );
}
