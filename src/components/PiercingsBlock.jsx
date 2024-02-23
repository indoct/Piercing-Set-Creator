import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Piercing(props) {
  const { piercings, type, location, selectDisableBtns } = props;

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

  return <>{prcElements}</>;
}
