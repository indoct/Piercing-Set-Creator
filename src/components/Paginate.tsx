import { PaginateProps, PiercingTileProps } from "../types";
import { Row, Col } from "react-bootstrap";
import { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { toggleSelected } from "../features/piercings/piercingsSlice";

const flippedSet: Set<string> = new Set([
  "piercing_lobe_a_l",
  "piercing_brow_a_l",
  "piercing_lobe_b_l",
  "piercing_tragus_a_l",
  "beard_upper_lip1_l",
  "piercing_brow_b_l",
]);

const PiercingTile = (props: PiercingTileProps): JSX.Element => {
  const dispatch = useDispatch();
  const { prc } = props;
  const selectedIds = useSelector(
    (state: RootState) => state.piercings.selectedIds
  );
  const disabledBones = useSelector(
    (state: RootState) => state.piercings.disabledBones
  );

  const srcToWebp = (src: string): string => {
    return src.replace(".jpg", ".webp");
  };

  const imgClass = (bone: string, category: string): string | undefined => {
    return flippedSet.has(bone) ||
      (bone === "lowerlip_08" && category === "ghouls_customs")
      ? "flipped"
      : undefined;
  };

  return (
    <Col className="prc-col">
      {prc.type === "mod" && <span className="set-name">{prc.set_name}</span>}
      <button
        type="button"
        id={prc.index.toString()}
        className={`prc-container ${selectedIds[prc.nodeid] ? "selected" : ""}`}
        onClick={() => dispatch(toggleSelected(prc.nodeid))}
        disabled={!!disabledBones[prc.bone] && !selectedIds[prc.nodeid]}
        role="button"
      >
        <div className="img-cont">
          <picture>
            <source
              srcSet={srcToWebp(prc.imgurl)}
              className={imgClass(prc.bone, prc.site_cat)}
              type="image/webp"
            />
            <img
              src={prc.imgurl}
              alt={`${prc.name} - ${prc.pt_bone}`}
              height="150"
              width="254"
              role="img"
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
};

const Paginate: React.FC<PaginateProps> = ({
  itemsPerPage,
  filteredPiercings,
  currentPage,
  handlePageChange,
}) => {
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;

  const entries = filteredPiercings.slice(startIdx, endIdx);
  const showLoading = entries.length === 0;

  const divideResult = filteredPiercings.length / itemsPerPage;
  const numPages =
    divideResult % 1 === 0 ? divideResult : Math.floor(divideResult) + 1;

  const pages = Array.from({ length: numPages }, (_, index) => index + 1);

  return (
    <>
      <Row
        className="mt-2 row-cols-2"
        sm="4"
        md="5"
        lg="6"
        data-testid="entries"
      >
        {showLoading ? (
          <p>Loading piercings...</p>
        ) : (
          entries.map((prc) => <PiercingTile key={prc.nodeid} prc={prc} />)
        )}
      </Row>
      <Row className="mt-3">
        <Col>
          <ul className="page-nums" role="list" data-testid="pagination">
            {pages.map((page, ind) => {
              const current: boolean = ind + 1 === currentPage;
              return (
                <li
                  key={`pagination-${ind}`}
                  className={current ? "current-page" : ""}
                  role="listitem"
                >
                  <button
                    id={page.toString()}
                    onClick={() => handlePageChange(page)}
                    disabled={current}
                  >
                    {page}
                  </button>
                </li>
              );
            })}
          </ul>
        </Col>
      </Row>
    </>
  );
};

export default Paginate;
