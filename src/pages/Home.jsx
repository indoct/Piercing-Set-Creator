import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { data, config } from "../data";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import "../App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Filters from "../components/Filters";
import PiercingsBlock from "../components/PiercingsBlock";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import SetModal from "../components/SetModal";

export default function Home() {
  const [piercings, setPiercings] = useState(data);
  const [prcsConfig, setPrcsConfig] = useState(config);
  const [emptySet, setEmptySet] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  const locaFilter = searchParams.get("location");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setEmptySet(() => {
      return piercings.filter((prc) => prc.selected).length === 0;
    });
  }, [piercings]);

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
        <Filters
          typeFilter={typeFilter}
          locaFilter={locaFilter}
          handleFilterChange={handleFilterChange}
        />
        <Col lg={2} className="d-flex justify-content-md-end">
          <Button variant="primary" onClick={handleShow} disabled={emptySet}>
            Current Set Config
          </Button>
          <SetModal show={show} onClose={handleClose} piercings={piercings} />
        </Col>
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
        <Row className="mt-2">
          <PiercingsBlock
            type={typeFilter}
            location={locaFilter}
            piercings={piercings}
            selectDisableBtns={selectDisableBtns}
          />
        </Row>
      </Container>
    </ThemeProvider>
  );
}
