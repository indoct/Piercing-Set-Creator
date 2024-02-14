import Col from "react-bootstrap/Col";

export default function PiercingSetBlock({ ...props }) {
  const prcBlock =
    props.set.length === undefined
      ? ""
      : props.set.map((prc) => {
          return (
            <Col key={prc.prc_nodeid} lg={2}>
              <ul>
                <li>{prc.prc_name}</li>
                <li>{prc.prc_location}</li>
                <li>{prc.prc_color}</li>
              </ul>
            </Col>
          );
        });

  return (
    <>
      <h2>{props.set.length != undefined ? props.set[0].pt_setname : ""}</h2>
      {prcBlock}
    </>
  );
}
