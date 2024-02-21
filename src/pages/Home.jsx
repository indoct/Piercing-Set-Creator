import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import data from "../data";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import "../App.css";
import SetModal from "../components/SetModal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
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
  // const [nose, setNose] = useState({});
  // const [lips, setLips] = useState({});
  // const [ears, setEars] = useState({});
  // const [brows, setBrows] = useState({});

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const typeFilter = searchParams.get("type");
  const colorFilter = searchParams.get("color");
  const locaFilter = searchParams.get("location");

  useEffect(() => {}, []);

  function filterLocations(loca) {
    const filtered =
      loca === "nose"
        ? piercings.filter(
            (prc) =>
              prc.location_code === "piercing_nostril_a_l" ||
              prc.location_code === "piercing_nostril_a_r" ||
              prc.location_code === "piercing_septum_a_m" ||
              prc.location_code === "piercing_bridge_a_l" ||
              prc.location_code === "piercing_bridge_a_r"
          )
        : loca === "lips"
        ? piercings.filter(
            (prc) =>
              prc.location_code === "beard_upper_lip_m" ||
              prc.location_code === "beard_upper_lip1_l" ||
              prc.location_code === "beard_upper_lip1_r" ||
              prc.location_code === "lowerlip_04" ||
              prc.location_code === "lowerlip_06" ||
              prc.location_code === "lowerlip_08"
          )
        : loca === "brows"
        ? piercings.filter(
            (prc) =>
              prc.location_code === "piercing_brow_a_l" ||
              prc.location_code === "piercing_brow_a_r" ||
              prc.location_code === "piercing_brow_b_l" ||
              prc.location_code === "piercing_brow_b_l"
          )
        : piercings.filter(
            (prc) =>
              prc.location_code === "piercing_helix_a_l" ||
              prc.location_code === "piercing_helix_a_r" ||
              prc.location_code === "piercing_helix_b_l" ||
              prc.location_code === "piercing_helix_b_r" ||
              prc.location_code === "piercing_lobe_a_l" ||
              prc.location_code === "piercing_lobe_a_r" ||
              prc.location_code === "piercing_lobe_b_l" ||
              prc.location_code === "piercing_lobe_b_r" ||
              prc.location_code === "piercing_tragus_a_l" ||
              prc.location_code === "piercing_tragus_a_r"
          );
    const typeFiltered = piercings.filter((prc) => prc.prc_type === typeFilter);
    return filtered.concat(typeFiltered);
  }

  console.log(locaFilter);

  const displayedPiercings =
    typeFilter && colorFilter
      ? piercings.filter(
          (prc) => prc.prc_type === typeFilter && prc.prc_color === colorFilter
        )
      : (typeFilter && locaFilter) ||
        (typeFilter && locaFilter && colorFilter) ||
        locaFilter
      ? filterLocations(locaFilter)
      : typeFilter && !colorFilter
      ? piercings.filter((prc) => prc.prc_type === typeFilter.toLowerCase())
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
      <Col key={prc.prc_nodeid} xl={2} className="prc-col">
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
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col className="d-flex filters">
            <div className="filter-btns">
              <span>Type Filters:</span>
              <button
                onClick={() => {
                  handleFilterChange("type", null);
                  handleFilterChange("color", null);
                }}
                className={`all-piercings ${!typeFilter ? "selected" : ""}`}
              >
                Everything
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
                  handleFilterChange("color", null);
                }}
                className={`vanilla ${
                  typeFilter === "vanilla" ? "selected" : ""
                }`}
              >
                Vanilla Only
              </button>
            </div>
            {typeFilter === "mod" && (
              <div className="filter-btns">
                <span>Piercing Metal Color:</span>
                <button
                  onClick={() => handleFilterChange("color", null)}
                  className={`silver-btn ${
                    colorFilter === null ? "selected" : ""
                  }`}
                >
                  Silver
                </button>
                <button
                  onClick={() => handleFilterChange("color", "gold")}
                  className={`gold-btn ${
                    colorFilter === "gold" ? "selected" : ""
                  }`}
                >
                  Gold
                </button>
              </div>
            )}
          </Col>
          <Col>
            <Button variant="primary" onClick={handleShow}>
              Launch demo modal
            </Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
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
        {/* <Row>
          <PiercingSetBlock set={vanillaAll} />
        </Row>
        <Row>
          <PiercingSetBlock set={ispGold} />
        </Row>
        <Row>
          <PiercingSetBlock set={ispSilver} />
        </Row> */}
      </Container>
    </ThemeProvider>
  );
}
