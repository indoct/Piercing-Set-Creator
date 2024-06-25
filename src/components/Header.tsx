import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import SetModal from "./SetModal";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ViewList, Trash, InfoCircle } from "react-bootstrap-icons";
import InstructionsModal from "./InstructionsModal";
import { RootState } from "../app/store";
import { resetPiercings } from "../features/piercings/piercingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { setSessionOver } from "../features/session/sessionSlice";

export default function Header(): JSX.Element {
  const [play, setPlay] = useState<boolean>(false);
  const [showSet, setShowSet] = useState<boolean>(false);
  const [showInstructions, setShowInstructions] = useState<boolean>(false);
  const dispatch = useDispatch();
  const sessionOver = useSelector((state: RootState) => state.session.sessionOver);
  const selectedIds = useSelector((state: RootState) => state.piercings.selectedIds);
  const empty = Object.keys(selectedIds).length === 0;

  function handleCloseModal(modal: string): void {
    return modal === "set" ? setShowSet(false) : setShowInstructions(false);
  }

  function handleSessionOver(): void {
    dispatch(setSessionOver(true));
  }

  function confirmDelete(): void {
    let result = confirm("Are you sure you want to delete your set? \n \nPressing OK will clear your set configuration.");
    if (result) {
      dispatch(resetPiercings());
      dispatch(setSessionOver(false));
    }
  }

  return (
    <header>
      <Row className="mt-3 mt-md-0 mb-2 mb-sm-0 justify-content-between">
        <Col lg={5} className="align-self-center mb-2 mb-lg-0">
          <Link className="site-logo" to="/">
            Indoct's BG3 Piercing Set Creator
          </Link>
        </Col>
        <Col lg={6} className="d-flex flex-row justify-content-xl-end align-items-center justify-content-start">
          <Button type="button" variant="primary" onClick={() => setShowSet(true)} disabled={empty} aria-label="Show Current Set Modal">
            <ViewList />
          </Button>
          <SetModal
            show={showSet}
            onClose={() => handleCloseModal("set")}
            sessionOver={sessionOver}
            generateNodes={() => dispatch(setSessionOver(true))}
            togglePlay={() => {
              if (play) setPlay(!play);
            }}
          />
          <Button type="button" id="instructions-btn" variant="secondary" onClick={() => setShowInstructions(true)} aria-label="Show Instructions Modal">
            <InfoCircle />
          </Button>
          <InstructionsModal show={showInstructions} onClose={() => handleCloseModal("instructions")} />
          <Button type="button" id="hr-clear-btn" variant="secondary" onClick={confirmDelete} disabled={empty} aria-label="Clear Current Set">
            <Trash /> Clear Set
          </Button>
        </Col>
      </Row>
    </header>
  );
}

//     <div>
//       <div>
//         <label>Type:</label>
//         <input type="text" value={filters.typeFilter || ""} onChange={(e) => handleFilterChange("type", e.target.value)} />
//       </div>
//       <div>
//         <label>Location:</label>
//         <input type="text" value={filters.locaFilter || ""} onChange={(e) => handleFilterChange("location", e.target.value)} />
//       </div>
//       <div>
//         <label>Mods:</label>
//         {filters.modFilters.map((mod, idx) => (
//           <button key={idx} onClick={() => handleModFilterChange(mod)}>
//             {mod}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
// const [showSet, setShowSet] = useState<boolean>(false);
// const [showInstructions, setShowInstructions] = useState<boolean>(false);
// const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
// const [play, setPlay] = useState<boolean>(false);

// const {
//   type,
//   location,
//   piercings,
//   handleFilterChange,
//   confirmDelete,
//   toggleSessionOver,
//   sessionOver,
//   handleModFilterChange,
//   modFilters,
//   handleClearFilters,
// } = useAppContext();

// function handleCloseModal(modal: string): void {
//   return modal === "set" ? setShowSet(false) : setShowInstructions(false);
// }

// const empty: boolean = piercings.filter((prc) => prc.selected).length === 0;

// return (
