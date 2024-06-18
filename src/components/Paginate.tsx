import { useState, useEffect, useMemo } from "react";
import { Piercing, PaginateProps } from "../types";
import { Row, Col } from "react-bootstrap";

const Paginate: React.FC<PaginateProps> = ({
  itemsPerPage,
  filteredPiercings,
  currentPage,
  handleBtns,
  handlePageChange,
}) => {
  const [piercingPages, setPiercingPages] = useState<Piercing[][]>([]);
  const [pageNums, setPageNums] = useState<number[]>([]);

  useEffect(() => {
    const prcPage = (array: Piercing[], itemsPerPage: number) => {
      const result: Piercing[][] = [];
      for (let i = 0; i < array.length; i += itemsPerPage) {
        result.push(array.slice(i, i + itemsPerPage));
      }
      return result;
    };

    const result = prcPage(filteredPiercings, itemsPerPage);
    setPiercingPages(result);
  }, [itemsPerPage, filteredPiercings]);

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

  const currentPagePrcs = useMemo(() => {
    if (
      piercingPages.length === 0 ||
      currentPage < 1 ||
      currentPage > piercingPages.length
    ) {
      return <p>Loading...</p>;
    }

    return piercingPages[currentPage - 1].map((prc) => {
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
                  height="150"
                  width="254"
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
  }, [piercingPages, currentPage]);

  useEffect(() => {
    const numPages = piercingPages.length;
    const pages = Array.from({ length: numPages }, (_, index) => index + 1);
    setPageNums(pages);
  }, [piercingPages]);

  const pageNumEls: JSX.Element = (
    <Col>
      <ul className="page-nums" data-testid="pagination">
        {pageNums.map((page, ind) => {
          const current: boolean = ind + 1 === currentPage;
          return (
            <li key={ind} className={current ? "current-page" : ""}>
              <button
                id={page.toString()}
                onClick={handlePageChange}
                disabled={current}
              >
                {page}
              </button>
            </li>
          );
        })}
      </ul>
    </Col>
  );

  return (
    <>
      <Row className="mt-2 row-cols-2" sm="4" md="5" lg="6">
        {currentPagePrcs}
      </Row>
      <Row className="mt-3">{pageNumEls}</Row>
    </>
  );
};

export default Paginate;
