import { useAppContext } from "../AppContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function PiercingsBlock() {
  const { piercings, type, location, mods, handleBtns, sessionOver } =
    useAppContext();

  function filterByMod(modArr) {
    if (location && type) {
      const mainFilters = piercings.filter(
        (prc) => prc.location === location && prc.type === type
      );
      return mainFilters.filter((obj) => modArr.includes(obj.site_cat));
    } else if (location && !type && mods.length === 4) {
      return piercings.filter((prc) => prc.location === location);
    } else if (location && !type && mods.length !== 4) {
      const locaFirst = piercings.filter(
        (prc) => prc.location === location && prc.type !== "mod"
      );
      const selectedMods = piercings.filter(
        (obj) => modArr.includes(obj.site_cat) && obj.location === location
      );
      return selectedMods.concat(locaFirst);
    } else if (!location && type & (mods.length !== 4)) {
      const typeFirst = piercings.filter((prc) => prc.type === type);
      return typeFirst.filter((obj) => modArr.includes(obj.site_cat));
    } else if (!location && !type && mods.length === 4) {
      return piercings;
    } else if (!location && !type) {
      const selectedMods = piercings.filter((obj) =>
        modArr.includes(obj.site_cat)
      );
      const noMods = piercings.filter((prc) => prc.type !== "mod");
      return noMods.concat(selectedMods);
    } else {
      return piercings.filter((obj) => modArr.includes(obj.site_cat));
    }
  }

  function filterNoMods() {
    if (type && location) {
      return piercings.filter(
        (prc) => prc.type === type && prc.location === location
      );
    } else if (location && !type) {
      return piercings.filter((prc) => prc.location === location);
    } else if (type !== "mod" && !location) {
      return piercings.filter((prc) => prc.type === type);
    } else if (type === "mod") {
      return (
        <Col>
          <p>
            There are no piercings with these filters.{" "}
            {mods.length === 0 && "You have no mods selected in Mod Filters."}
          </p>
        </Col>
      );
    } else return piercings;
  }

  const displayedPiercings =
    mods.length > 0 && type !== "vanilla"
      ? filterByMod(mods)
      : mods.length > 0 && type === "vanilla" && !location
      ? piercings.filter((prc) => prc.type === "vanilla")
      : mods.length > 0 && type === "vanilla" && location
      ? piercings.filter(
          (prc) => prc.type === "vanilla" && prc.location === location
        )
      : filterNoMods();

  const prcElements = Array.isArray(displayedPiercings)
    ? displayedPiercings.map((prc) => {
        const nodeId = prc.nodeid;
        const nodeLoca = prc.bone;

        return (
          <Col key={prc.nodeid} className="prc-col">
            {prc.type === "mod" && (
              <span className="set-name">{prc.set_name}</span>
            )}
            <button
              type="button"
              id={prc.index}
              className={`prc-container ${prc.selected ? "selected" : ""}`}
              onClick={(e) => handleBtns(e, nodeId, nodeLoca)}
              disabled={prc.disabled}
            >
              <div className="img-dummy">
                <img
                  src={prc.imgurl}
                  className={
                    prc.bone === "piercing_lobe_a_l" ||
                    prc.bone === "piercing_brow_a_l" ||
                    prc.bone === "piercing_lobe_b_l" ||
                    prc.bone === "piercing_tragus_a_l" ||
                    prc.bone === "beard_upper_lip1_l" ||
                    (prc.bone === "lowerlip_08" &&
                      prc.site_cat === "ghouls_customs") ||
                    prc.bone === "piercing_brow_b_l"
                      ? "flipped"
                      : undefined
                  }
                />
              </div>
              <ul className={`prc-stats config-cont ${prc.location}`}>
                <li className="prc-name">{prc.name}</li>
                <li className="location">{prc.pt_bone}</li>
              </ul>
            </button>
          </Col>
        );
      })
    : displayedPiercings;

  return (
    <>
      <Row className="mt-3 title-row">
        <Col>
          <h5 className="prc-block-h">
            {type === "vanilla"
              ? "Vanilla Sets"
              : type === "mod"
              ? "Mod Piercings"
              : "All Piercings"}
          </h5>
        </Col>
      </Row>
      <Row className="mt-2 row-cols-2" sm="4" md="5" lg="6">
        {prcElements}
      </Row>
    </>
  );
}
