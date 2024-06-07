import { useMemo, useEffect, useState } from "react";
import { useAppContext } from "../AppContext";
import { useParams } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Piercing } from "../types";
import Paginate from "./Paginate";

let itemsPerPage: number = 54;

export default function PiercingsBlock(): JSX.Element {
  const {
    piercings,
    type,
    location,
    mods,
    modFilters,
    typeFilter,
    locationFilter,
    handleBtns,
  } = useAppContext();
  const { pageParam } = useParams<{ pageParam: string }>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  console.log(modFilters);

  useEffect(() => {
    const number = pageParam ? parseInt(pageParam, 10) : 1;
    setPageNumber(number);
  }, [pageParam]);

  // const filteredPiercings: Piercing[] = useMemo(() => {
  //   return piercings.filter((piercing) => {
  //     const matchesType = typeFilter ? piercing.type === typeFilter : true;
  //     const matchesLocation = locationFilter
  //       ? piercing.location === locationFilter
  //       : true;
  //     console.log(typeFilter);
  //     const matchesMods =
  //       typeFilter === "mod"
  //         ? piercing.set_name
  //           ? modFilters.includes(piercing.set_name)
  //           : false
  //         : typeFilter === "" // Show All option selected
  //         ? true // Always include piercings when Show All is selected
  //         : false; // Exclude piercings when Vanilla is selected
  //     // typeFilter === "mod" ? modFilters.includes(piercing.set_name) : true;
  //     console.log(matchesType, matchesLocation, matchesMods);
  //     return matchesType && matchesLocation && matchesMods;
  //   });
  // }, [piercings, typeFilter, locationFilter, pageNumber]);

  const filteredPiercings: Piercing[] = useMemo(() => {
    return piercings.filter((piercing) => {
      const matchesType = typeFilter ? piercing.type === typeFilter : true;
      const matchesLocation = locationFilter
        ? piercing.location === locationFilter
        : true;
      const matchesMods =
        typeFilter === "Mod" // If the type filter is "Mod"
          ? piercing.set_name
            ? modFilters.includes(piercing.set_name)
            : false // Include mods if their set name is in modFilters
          : typeFilter === "Vanilla" // If the type filter is "Vanilla"
          ? piercing.type === "Vanilla" // Include only vanilla piercings
          : true; // Include all piercings for other type filters or when no filter is selected
      return matchesType && matchesLocation && matchesMods;
    });
  }, [piercings, typeFilter, locationFilter, modFilters]);
  // const paginatedPiercings: Piercing[] = useMemo(() => {
  //   const firstPageIndex = (pageNumber - 1) * itemsPerPage;
  //   const lastPageIndex = firstPageIndex + itemsPerPage;
  //   return filteredPiercings.slice(firstPageIndex, lastPageIndex);
  // }, [filteredPiercings]);

  // function filterByMod(modArr: string[]): Piercing[] {
  //   if (location && type) {
  //     const mainFilters: Piercing[] = piercings.filter(
  //       (prc) => prc.location === location && prc.type === type
  //     );
  //     return mainFilters.filter((obj) => modArr.includes(obj.site_cat));
  //   } else if (location && !type && mods.length === 4) {
  //     return piercings.filter((prc) => prc.location === location);
  //   } else if (location && !type && mods.length !== 4) {
  //     const locaFirst: Piercing[] = piercings.filter(
  //       (prc) => prc.location === location && prc.type !== "mod"
  //     );
  //     const selectedMods: Piercing[] = piercings.filter(
  //       (obj) => modArr.includes(obj.site_cat) && obj.location === location
  //     );
  //     return selectedMods.concat(locaFirst);
  //   } else if (!location && type && mods.length !== 4) {
  //     const typeFirst: Piercing[] = piercings.filter(
  //       (prc) => prc.type === type
  //     );
  //     return typeFirst.filter((obj) => modArr.includes(obj.site_cat));
  //   } else if (!location && !type && mods.length === 4) {
  //     return piercings;
  //   } else if (!location && !type) {
  //     const selectedMods: Piercing[] = piercings.filter((obj) =>
  //       modArr.includes(obj.site_cat)
  //     );
  //     const noMods: Piercing[] = piercings.filter((prc) => prc.type !== "mod");
  //     return noMods.concat(selectedMods);
  //   } else {
  //     return piercings.filter((obj) => modArr.includes(obj.site_cat));
  //   }
  // }

  // function filterNoMods(): Piercing[] | JSX.Element {
  //   if (type && location) {
  //     return piercings.filter(
  //       (prc) => prc.type === type && prc.location === location
  //     );
  //   } else if (location && !type) {
  //     return piercings.filter((prc) => prc.location === location);
  //   } else if (type !== "mod" && !location) {
  //     return piercings.filter((prc) => prc.type === type);
  //   } else if (type === "mod") {
  //     return (
  //       <Col>
  //         <p>
  //           There are no piercings with these filters.{" "}
  //           {mods.length === 0 && "You have no mods selected in Mod Filters."}
  //         </p>
  //       </Col>
  //     );
  //   } else return piercings;
  // }

  // const displayedPiercings: Piercing[] | JSX.Element =
  //   mods.length > 0 && type !== "vanilla"
  //     ? filterByMod(mods)
  //     : mods.length > 0 && type === "vanilla" && !location
  //     ? piercings.filter((prc) => prc.type === "vanilla")
  //     : mods.length > 0 && type === "vanilla" && location
  //     ? piercings.filter(
  //         (prc) => prc.type === "vanilla" && prc.location === location
  //       )
  //     : filterNoMods();

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

  // const displayedPiercings = useMemo(() => {
  //   const firstPageIndex = (strToNum(pageNumber) - 1) * itemsPerPage;
  //   const lastPageIndex = firstPageIndex + itemsPerPage;
  //   return Array.isArray(filteredPiercings)
  //     ? filteredPiercings.slice(firstPageIndex, lastPageIndex)
  //     : filteredPiercings;
  // }, [pageNumber]);

  // function paginatePiercings() {
  //   const firstPageIndex = (pageNumber - 1) * itemsPerPage;
  //   const lastPageIndex = firstPageIndex + itemsPerPage;
  //   return Array.isArray(filteredPiercings)
  //     ? filteredPiercings.slice(firstPageIndex, lastPageIndex)
  //     : filteredPiercings;
  // }
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

  // const prcElements: JSX.Element | JSX.Element[] = Array.isArray(
  //   filteredPiercings
  // )
  //   ? filteredPiercings.map((prc) => {
  //       const nodeId: string = prc.nodeid;
  //       const nodeLoca: string = prc.bone;
  //       return (
  //         <Col key={prc.nodeid} className="prc-col">
  //           {prc.type === "mod" && (
  //             <span className="set-name">{prc.set_name}</span>
  //           )}
  //           <button
  //             type="button"
  //             id={prc.index.toString()}
  //             className={`prc-container ${prc.selected ? "selected" : ""}`}
  //             onClick={() => handleBtns(nodeId, nodeLoca)}
  //             disabled={prc.disabled}
  //           >
  //             <div className="img-cont">
  //               <picture>
  //                 <source
  //                   srcSet={srcToWebp(prc.imgurl)}
  //                   className={imgClass(prc.bone, prc.site_cat)}
  //                 />
  //                 <img
  //                   src={prc.imgurl}
  //                   alt={`${prc.name} - ${prc.pt_bone}`}
  //                   className={imgClass(prc.bone, prc.site_cat)}
  //                 />
  //               </picture>
  //             </div>
  //             <ul className={`prc-stats config-cont ${prc.location}`}>
  //               <li className="prc-name">{prc.name}</li>
  //               <li className="location">{prc.pt_bone}</li>
  //             </ul>
  //           </button>
  //         </Col>
  //       );
  //     })
  //   : filteredPiercings;

  // const onPageChange = (newPage: number) => {
  // const firstPageIndex = (strToNum(pageNumber) - 1) * itemsPerPage;
  // const lastPageIndex = firstPageIndex + itemsPerPage;
  // return Array.isArray(displayedPiercings)
  //   ? displayedPiercings.slice(firstPageIndex, lastPageIndex)
  //   : displayedPiercings;
  // };

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
          currentPage={pageNumber}
          totalCount={piercings.length}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
        />
      </Row>
    </>
  );
}
