import Col from "react-bootstrap/Col";

export default function PiercingSetBlock({ ...props }) {
  const blockTitle =
    props.set.length === undefined
      ? ""
      : props.set[0].prc_type !== "vanilla"
      ? props.set[0].pt_displayname
      : "Vanilla Sets";

  const prcBlock =
    props.set.length === undefined
      ? ""
      : props.set.map((prc) => {
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
                  <span className="color-tag">{prc.prc_color}</span>
                </div>
                <ul className="prc-stats">
                  <li className="prc-name">{prc.prc_name}</li>
                  <li className="location">{prc.prc_location}</li>
                </ul>
              </div>
            </Col>
          );
        });

  return (
    <>
      <h4 className="block-title">{blockTitle}</h4>
      {prcBlock}
    </>
  );
}
