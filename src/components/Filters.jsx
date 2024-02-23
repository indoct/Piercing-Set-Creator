import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Tooltip } from "react-tooltip";

export default function Filters(props) {
  const { typeFilter, locaFilter, handleFilterChange } = props;

  return (
    <Row>
      <Col lg={4}>
        <div className="filter-btns">
          <span>Type:</span>
          <button
            onClick={() => {
              handleFilterChange("type", null);
            }}
            className={`all-piercings ${!typeFilter ? "selected" : ""}`}
          >
            Show All
          </button>
          <button
            onClick={() => handleFilterChange("type", "mod")}
            className={`mod-btn ${typeFilter === "mod" ? "selected" : ""}`}
          >
            Mod Only
          </button>
          <button
            onClick={() => {
              handleFilterChange("type", "vanilla");
            }}
            className={`vanilla ${typeFilter === "vanilla" ? "selected" : ""}`}
            disabled={locaFilter === "lips"}
            data-tooltip-id="my-tooltip"
            data-tooltip-content="There are no vanilla piercings in the lip slot, change/clear the location filter to enable this filter"
            data-tooltip-place="bottom"
          >
            Vanilla
          </button>
        </div>
      </Col>
      <Col lg={6}>
        <div className="filter-btns">
          <span>Location:</span>
          <button
            onClick={() => {
              handleFilterChange("location", "ears");
            }}
            className={`filter ${locaFilter === "ears" ? "selected" : ""}`}
          >
            Ears
          </button>
          <button
            onClick={() => handleFilterChange("location", "nose")}
            className={`filter ${locaFilter === "nose" ? "selected" : ""}`}
          >
            Nose
          </button>
          <button
            onClick={() => {
              handleFilterChange("location", "brows");
            }}
            className={`filter ${locaFilter === "brows" ? "selected" : ""}`}
          >
            Brows
          </button>
          <button
            onClick={() => {
              handleFilterChange("location", "lips");
              if (typeFilter === "vanilla") handleFilterChange("type", null);
            }}
            className={`filter ${locaFilter === "lips" ? "selected" : ""}`}
          >
            Lips
          </button>
          {locaFilter && (
            <button
              onClick={() => {
                handleFilterChange("location", null);
              }}
              className="clear-btn"
            >
              Clear Filter
            </button>
          )}
        </div>
        {locaFilter === "lips" && <Tooltip id="my-tooltip" />}
      </Col>
    </Row>
  );
}
