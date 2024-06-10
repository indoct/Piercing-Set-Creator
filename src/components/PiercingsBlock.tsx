import { useMemo } from "react";
import { useAppContext } from "../AppContext";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Piercing } from "../types";

export default function PiercingsBlock(): JSX.Element {
  const { piercings, type, location, modFilters, handleBtns } = useAppContext();

  const filteredPiercings: Piercing[] = useMemo(() => {
    return piercings.filter((piercing) => {
      const matchesType = type ? piercing.type === type : true;
      const matchesLocation = location ? piercing.location === location : true;
      const matchesMods =
        piercing.type === "mod"
          ? modFilters.includes(piercing.site_cat)
          : type === "Vanilla"
          ? piercing.type !== "mod"
          : true;
      return matchesType && matchesLocation && matchesMods;
    });
  }, [piercings, type, location, modFilters]);

  console.log(filteredPiercings.length);

  const srcToWebp = (src: string): string => {
    return src.replace(".jpg", ".webp");
  };

  const imgClass = (bone: string, category: string): string | undefined => {
    return bone === "piercing_lobe_a_l" ||
      bone === "piercing_brow_a_l" ||
      bone === "piercing_lobe_b_l" ||
      bone === "piercing_tragus_a_l" ||
      bone === "beard_upper_lip1_l" ||
      (bone === "lowerlip_08" && category === "ghouls_customs") ||
      bone === "piercing_brow_b_l"
      ? "flipped"
      : undefined;
  };

  const prcElements: JSX.Element[] = filteredPiercings.map((prc) => {
    const nodeId: string = prc.nodeid;
    const nodeLoca: string = prc.bone;
    return (
      <Col key={prc.nodeid} className="prc-col">
        {prc.type === "mod" && <span className="set-name">{prc.set_name}</span>}
        <button
          type="button"
          id={prc.index.toString()}
          className={`prc-container ${prc.selected ? "selected" : ""}`}
          onClick={() => handleBtns(nodeId, nodeLoca)}
          disabled={prc.disabled}
        >
          <div className="img-cont">
            <picture>
              <source
                srcSet={srcToWebp(prc.imgurl)}
                className={imgClass(prc.bone, prc.site_cat)}
              />
              <img
                src={prc.imgurl}
                alt={`${prc.name} - ${prc.pt_bone}`}
                className={imgClass(prc.bone, prc.site_cat)}
              />
            </picture>
          </div>
          <ul className={`prc-stats config-cont ${prc.location}`}>
            <li className="prc-name">{prc.name}</li>
            <li className="location">{prc.pt_bone}</li>
          </ul>
        </button>
      </Col>
    );
  });

  console.log(prcElements.length);

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
      {filteredPiercings.length > 0 ? (
        <Row className="mt-2 row-cols-2" sm="4" md="5" lg="6">
          {prcElements}
        </Row>
      ) : (
        <Row className="mt-2">
          <Col>
            <p>
              <big>
                {" "}
                There are no piercings with these filters.{" "}
                {modFilters.length === 0 &&
                  "You have no mods selected in Mod Filters."}
              </big>
            </p>
          </Col>
        </Row>
      )}
    </>
  );
}
