import Col from "react-bootstrap/Col";

export default function PiercingSetBlock({ ...props }) {
  const prcBlock =
    props.set.length === undefined
      ? ""
      : props.set.map((prc) => {
          return (
            <Col key={prc.prc_nodeid} xl={2} className="prc-col">
              <div className="prc-container">
                <div className="img-dummy">
                  <span className="color-tag">{prc.prc_color}</span>
                </div>
                <ul className="prc-stats">
                  <li>{prc.prc_name}</li>
                  <li className="location">{prc.prc_location}</li>
                </ul>
              </div>
            </Col>
          );
        });

  return (
    <>
      <h4>{props.set.length != undefined ? props.set[0].pt_setname : ""}</h4>
      {prcBlock}
    </>
  );
}
