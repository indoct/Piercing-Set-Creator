import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Tooltip } from "react-tooltip";

export default function Piercing(props) {
  const { piercings, type, location, handleBtns } = props;

  const displayedPiercings =
    type && !location
      ? piercings.filter((prc) => prc.type === type)
      : type && location
      ? piercings.filter(
          (prc) => prc.type === type && prc.location === location
        )
      : location && !type
      ? piercings.filter((prc) => prc.location === location)
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
    const locaInd =
      prc.location === "ears"
        ? "indicator ears-ind"
        : prc.location === "nose"
        ? "indicator nose-ind"
        : prc.location === "brows"
        ? "indicator brows-ind"
        : "indicator lips-ind";

    return (
      <Col key={prc.nodeid} lg={2} className="prc-col">
        <button
          type="button"
          id={prc.index}
          className={`${contClass} ${prc.selected ? "selected" : ""}`}
          onClick={(e) => handleBtns(e, nodeId, nodeLoca)}
          disabled={prc.disabled}
        >
          <div className="img-dummy">
            <span
              className={
                prc.color === "silver" ? "silver color-tag" : "gold color-tag"
              }
            ></span>
            <span
              className={locaInd}
              data-tooltip-id="indicator"
              data-tooltip-content={prc.location}
              data-tooltip-place="bottom"
            ></span>
            <Tooltip id="indicator" />
          </div>
          <ul className="prc-stats">
            <li className="prc-name">{prc.name}</li>
            <li className="location">{prc.pt_bone}</li>
          </ul>
        </button>
      </Col>
    );
  });

  return (
    <>
      <Row className="mt-4 title-row">
        <Col lg={3}>
          <h5>
            {type === "vanilla"
              ? "Vanilla Sets"
              : type === "mod"
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
    </>
  );
}
