import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CodeSlash, XCircle } from "react-bootstrap-icons";

export default function SetModal(props) {
  const { show, onClose, piercings, generateNodes, sessionOver } = props;

  const displayConfig = piercings.map((prc) => {
    const setClasses =
      prc.type === "mod"
        ? "config-mod config-set"
        : "config-set config-vanilla";
    const setName =
      prc.type === "vanilla"
        ? `Vanilla : ${prc.set_name}`
        : `MOD : ${prc.set_name}`;
    if (prc.selected)
      return (
        <div key={prc.index} className={`config-cont  ${prc.location}`}>
          <div className="config-row">
            <span className="gen-loca">{prc.location}</span>
          </div>
          <div className="config-row">
            <span className="config-loca">{prc.pt_bone} </span>:
            <span className="config-name"> {prc.name}</span>
          </div>
          <div className="config-row">
            <span className={setClasses}>{setName}</span>
          </div>
        </div>
      );
  });

  console.log(sessionOver);

  return (
    <>
      <Modal show={show} onHide={onClose} id="set-config" size="md">
        <Modal.Header closeButton>
          <Modal.Title>Current Piercing Set Config</Modal.Title>
        </Modal.Header>
        <Modal.Body>{displayConfig}</Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="secondary"
            className="btn-secondary"
            onClick={onClose}
          >
            <XCircle /> Close
          </Button>
          {!sessionOver && (
            <Button
              variant="primary"
              onClick={() => {
                generateNodes();
                onClose();
              }}
            >
              Generate Piercing Nodes Code <CodeSlash size={20} />
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
