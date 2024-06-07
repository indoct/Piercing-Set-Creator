import { useMemo } from "react";
import { useAppContext } from "../AppContext";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Piercing } from "../types";
import Paginate from "./Paginate";

let itemsPerPage: number = 54;

export default function PiercingsBlock(): JSX.Element {
  const { piercings, type, location, mods, handleBtns } = useAppContext();
  const { pageNumber } = useParams<{ pageNumber: string }>();

  function strToNum(page: string | undefined): number {
    return page === undefined ? 1 : parseInt(page);
  }

  function filterByMod(modArr: string[]): Piercing[] {
    if (location && type) {
      const mainFilters: Piercing[] = piercings.filter(
        (prc) => prc.location === location && prc.type === type
      );
      return mainFilters.filter((obj) => modArr.includes(obj.site_cat));
    } else if (location && !type && mods.length === 4) {
      return piercings.filter((prc) => prc.location === location);
    } else if (location && !type && mods.length !== 4) {
      const locaFirst: Piercing[] = piercings.filter(
        (prc) => prc.location === location && prc.type !== "mod"
      );
      const selectedMods: Piercing[] = piercings.filter(
        (obj) => modArr.includes(obj.site_cat) && obj.location === location
      );
      return selectedMods.concat(locaFirst);
    } else if (!location && type && mods.length !== 4) {
      const typeFirst: Piercing[] = piercings.filter(
        (prc) => prc.type === type
      );
      return typeFirst.filter((obj) => modArr.includes(obj.site_cat));
    } else if (!location && !type && mods.length === 4) {
      return piercings;
    } else if (!location && !type) {
      const selectedMods: Piercing[] = piercings.filter((obj) =>
        modArr.includes(obj.site_cat)
      );
      const noMods: Piercing[] = piercings.filter((prc) => prc.type !== "mod");
      return noMods.concat(selectedMods);
    } else {
      return piercings.filter((obj) => modArr.includes(obj.site_cat));
    }
  }

  function filterNoMods(): Piercing[] | JSX.Element {
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

  const displayedPiercings: Piercing[] | JSX.Element =
    mods.length > 0 && type !== "vanilla"
      ? filterByMod(mods)
      : mods.length > 0 && type === "vanilla" && !location
      ? piercings.filter((prc) => prc.type === "vanilla")
      : mods.length > 0 && type === "vanilla" && location
      ? piercings.filter(
          (prc) => prc.type === "vanilla" && prc.location === location
        )
      : filterNoMods();

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

  const prcElements: JSX.Element | JSX.Element[] = Array.isArray(
    displayedPiercings
  )
    ? displayedPiercings.map((prc) => {
        const nodeId: string = prc.nodeid;
        const nodeLoca: string = prc.bone;
        return (
          <Col key={prc.nodeid} className="prc-col">
            {prc.type === "mod" && (
              <span className="set-name">{prc.set_name}</span>
            )}
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
      })
    : displayedPiercings;

  const onPageChange = (newPage: number) => {
    const currentPiercings = useMemo(() => {
      // const pageCalc: number = currentPage === null ? 1 : currentPage;
      const firstPageIndex = (strToNum(pageNumber) - 1) * itemsPerPage;
      const lastPageIndex = firstPageIndex + itemsPerPage;
      return Array.isArray(displayedPiercings)
        ? displayedPiercings.slice(firstPageIndex, lastPageIndex)
        : displayedPiercings;
    }, [pageNumber]);
  };

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
        <Paginate
          className="pagination-bar"
          currentPage={strToNum(pageNumber)}
          totalCount={piercings.length}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
        />
      </Row>
    </>
  );
}
