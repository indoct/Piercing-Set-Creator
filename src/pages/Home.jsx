import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import data from "../data";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import "../App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Tooltip } from "react-tooltip";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [piercings, setPiercings] = useState(data);
  const [prcsConfig, setPrcsConfig] = useState({
    lowerlip_04: "testing",
    lowerlip_06: "",
    lowerlip_08: "",
    beard_upper_lip_m: "",
    beard_upper_lip1_l: "",
    beard_upper_lip1_r: "",
    piercing_bridge_a_l: "",
    piercing_bridge_a_r: "",
    piercing_brow_a_l: "",
    piercing_brow_a_r: "",
    piercing_brow_b_l: "",
    piercing_brow_b_r: "",
    piercing_helix_a_l: "",
    piercing_helix_a_r: "",
    piercing_helix_b_l: "",
    piercing_helix_b_r: "",
    piercing_lobe_a_l: "",
    piercing_lobe_a_r: "",
    piercing_lobe_b_l: "",
    piercing_lobe_b_r: "",
    piercing_nostril_a_l: "",
    piercing_nostril_a_r: "",
    piercing_septum_a_m: "",
    piercing_tragus_a_l: "",
    piercing_tragus_a_r: "",
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const typeFilter = searchParams.get("type");
  const locaFilter = searchParams.get("location");

  useEffect(() => {
    const genLoca = piercings.map((prc) => {
      if (
        prc.location_code === "piercing_nostril_a_l" ||
        prc.location_code === "piercing_nostril_a_r" ||
        prc.location_code === "piercing_septum_a_m" ||
        prc.location_code === "piercing_bridge_a_l" ||
        prc.location_code === "piercing_bridge_a_r"
      ) {
        return {
          ...prc,
          gen_location: "nose",
        };
      } else if (
        prc.location_code === "beard_upper_lip_m" ||
        prc.location_code === "beard_upper_lip1_l" ||
        prc.location_code === "beard_upper_lip1_r" ||
        prc.location_code === "lowerlip_04" ||
        prc.location_code === "lowerlip_06" ||
        prc.location_code === "lowerlip_08"
      ) {
        return {
          ...prc,
          gen_location: "lips",
        };
      } else if (
        prc.location_code === "piercing_brow_a_l" ||
        prc.location_code === "piercing_brow_a_r" ||
        prc.location_code === "piercing_brow_b_l" ||
        prc.location_code === "piercing_brow_b_r"
      ) {
        return {
          ...prc,
          gen_location: "brows",
        };
      } else {
        return {
          ...prc,
          gen_location: "ears",
        };
      }
    });
    setPiercings(genLoca);
  }, []);

  console.log(locaFilter);
  console.log(typeFilter);

  const displayedPiercings =
    typeFilter && !locaFilter
      ? piercings.filter((prc) => prc.prc_type === typeFilter)
      : typeFilter && locaFilter
      ? piercings.filter(
          (prc) =>
            prc.prc_type === typeFilter && prc.gen_location === locaFilter
        )
      : locaFilter && !typeFilter
      ? piercings.filter((prc) => prc.gen_location === locaFilter)
      : piercings;

  const prcElements = displayedPiercings.map((prc) => {
    const contClass =
      prc.site_category === "vanilla-ab"
        ? "vanilla-ab prc-container"
        : prc.site_category === "barbarian"
        ? "barbarian prc-container"
        : prc.site_category === "ortheus"
        ? "ortheus prc-container"
        : "mod prc-container";
    return (
      <Col key={prc.prc_nodeid} lg={2} className="prc-col">
        <div className={contClass}>
          <div className="img-dummy">
            <span
              className={
                prc.prc_color === "silver"
                  ? "silver color-tag"
                  : "gold color-tag"
              }
            >
              {prc.prc_color}
            </span>
          </div>
          <ul className="prc-stats">
            <li className="prc-name">{prc.prc_name}</li>
            <li className="location">{prc.prc_location}</li>
          </ul>
        </div>
      </Col>
    );
  });

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
                Vanilla Only
              </button>
            </div>
          </Col>
          <Col lg={5}>
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
          <Col lg={3} className="d-flex justify-content-md-end">
            <Button variant="primary" onClick={handleShow}>
              My Current Set Config
            </Button>

            <Modal show={show} onHide={handleClose} id="set-config">
              <Modal.Header closeButton>
                <Modal.Title>Current Set Config</Modal.Title>
              </Modal.Header>
              <Modal.Body>{prcsConfig.lowerlip_04}</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
        <Row className="mt-4">
          <h5>
            {typeFilter === "vanilla"
              ? "Vanilla Sets"
              : typeFilter === "mod"
              ? "Mod Piercings"
              : "All Piercings"}
          </h5>
        </Row>
        <Row className="mt-2">{prcElements}</Row>
      </Container>
    </ThemeProvider>
  );
}
