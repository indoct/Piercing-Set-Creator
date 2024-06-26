import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CodeSlash, XCircle } from "react-bootstrap-icons";
import { SetModalProps } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const SetModal: React.FC<SetModalProps> = ({ show, onClose, generateNodes, sessionOver, togglePlay }) => {
  const selectedIds = useSelector((state: RootState) => state.piercings.selectedIds);
  const piercings = useSelector((state: RootState) => state.piercings.data);

  const displayConfig: JSX.Element[] = piercings
    .map((prc) => {
      const setClasses: string = prc.type === "mod" ? "config-mod config-set" : "config-set config-vanilla";
      const setName: string = prc.type === "vanilla" ? `Vanilla : ${prc.set_name}` : `MOD : ${prc.set_name}`;
      if (selectedIds[prc.nodeid])
        return (
          <div key={prc.index} className={`config-cont  ${prc.location}`}>
            <div className="config-row">
              <span className="gen-loca">{prc.location}</span>
            </div>
            <div className="config-row">
              <span className="config-loca">{prc.pt_bone} </span>:<span className="config-name"> {prc.name}</span>
            </div>
            <div className="config-row">
              <span className={setClasses}>{setName}</span>
            </div>
          </div>
        );
      return undefined;
    })
    .filter((element): element is JSX.Element => element !== undefined);

  return (
    <Modal show={show} onHide={onClose} id="set-config" size="lg" data-testid="set-modal">
      <Modal.Header closeButton>
        <Modal.Title>Current Piercing Set Config</Modal.Title>
      </Modal.Header>
      <Modal.Body>{displayConfig}</Modal.Body>
      <Modal.Footer className="d-flex justify-content-between">
        <Button variant="secondary" className="btn-secondary" onClick={onClose}>
          <XCircle /> Close
        </Button>
        {!sessionOver && (
          <Button
            id="generate-btn"
            variant="primary"
            onClick={() => {
              generateNodes();
              togglePlay();
              onClose();
            }}
          >
            Generate Piercing Nodes Code <CodeSlash size={20} />
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default SetModal;
