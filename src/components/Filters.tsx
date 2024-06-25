import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import { XCircle, PlusCircle } from "react-bootstrap-icons";
import { Animate } from "react-simple-animate";
import { RootState } from "../app/store";
import { setType, setLocation, setMods, toggleMod } from "../features/filters/filtersSlice";
import { useDispatch, useSelector } from "react-redux";
import { ModList } from "../types";

export default function Filters(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const [play, setPlay] = useState<boolean>(false);
  const dispatch = useDispatch();
  const sessionOver = useSelector((state: RootState) => state.session.sessionOver);
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const typeFilter = useSelector((state: RootState) => state.filters.typeFilter);
  const locaFilter = useSelector((state: RootState) => state.filters.locaFilter);
  const modFilters = useSelector((state: RootState) => state.filters.modFilters);

  useEffect(() => {
    const typeFilter = searchParams.get("type");
    const locaFilter = searchParams.get("location");
    const modFilters = searchParams.get("mods")?.split(",") || ModList;

    dispatch(setType(typeFilter));
    dispatch(setLocation(locaFilter));
    dispatch(setMods(modFilters));
  }, [searchParams, dispatch]);

  const handleFilterChange = (key: string, value: string | null): void => {
    setSearchParams((prevParams) => {
      const newParams: { [x: string]: string } = {
        ...Object.fromEntries(prevParams),
      };
      if (value === null) {
        delete newParams[key];
      } else {
        newParams[key] = value;
      }
      return newParams;
    });

    if (key === "type") {
      dispatch(setType(value));
    } else if (key === "location") {
      dispatch(setLocation(value));
    }
  };

  const handleModFilterChange = (mod: string): void => {
    dispatch(toggleMod(mod));

    setSearchParams((prevParams) => {
      const newParams: { [key: string]: string } = {
        ...Object.fromEntries(prevParams),
      };
      const newFilters = modFilters.includes(mod) ? modFilters.filter((id) => id !== mod) : [...modFilters, mod];
      newParams["mods"] = newFilters.join(",");
      return new URLSearchParams(newParams);
    });
  };

  function handleClearFilters(): void {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams.toString());
      newParams.delete("type");
      newParams.delete("location");
      newParams.delete("mods");
      return newParams;
    });
    dispatch(setType(null));
    dispatch(setLocation(null));
    dispatch(setMods(ModList));
  }

  return (
    <>
      {!sessionOver && (
        <Row className="mt-2 filter-row mb-1">
          <Col xs={12} lg={6} xl={5}>
            <div className="filter-btns mb-1 mb-xl-0">
              <span>Type:</span>
              <button
                type="button"
                onClick={() => {
                  handleFilterChange("type", null);
                }}
                className={`all-piercings ${!typeFilter ? "selected" : ""}`}
              >
                Show All
              </button>
              <button type="button" onClick={() => handleFilterChange("type", "mod")} className={`mod-btn ${typeFilter === "mod" ? "selected" : ""}`}>
                Mod Only
              </button>
              <button
                type="button"
                onClick={() => {
                  handleFilterChange("type", "vanilla");
                  if (filtersOpen) {
                    setFiltersOpen((prevState) => !prevState);
                    setPlay(!play);
                  }
                }}
                className={`vanilla ${typeFilter === "vanilla" ? "selected" : ""}`}
                disabled={locaFilter === "lips"}
                data-tooltip-id="my-tooltip"
                data-tooltip-content="There are no vanilla piercings in the lip slot, change/clear the location filter to enable this filter"
                data-tooltip-place="top"
              >
                Vanilla
              </button>
              <button
                type="button"
                onClick={() => {
                  setPlay(!play);
                  setFiltersOpen((prevState) => !prevState);
                }}
                className="toggle"
                disabled={typeFilter === "vanilla"}
              >
                {filtersOpen ? "Hide" : "Show"} Mod Filters
                {!filtersOpen ? <PlusCircle size="17" /> : <XCircle size="17" />}
              </button>
            </div>
          </Col>
          <Col lg={6} xl={5}>
            <div className="filter-btns loca-filters">
              <span>Location:</span>
              <button
                type="button"
                onClick={() => {
                  handleFilterChange("location", "ears");
                }}
                className={`filter ears ${locaFilter === "ears" ? "selected" : ""}`}
              >
                Ears
              </button>
              <button type="button" onClick={() => handleFilterChange("location", "nose")} className={`filter nose ${locaFilter === "nose" ? "selected" : ""}`}>
                Nose
              </button>
              <button
                type="button"
                onClick={() => {
                  handleFilterChange("location", "brows");
                }}
                className={`filter brows ${locaFilter === "brows" ? "selected" : ""}`}
              >
                Brows
              </button>
              <button
                onClick={() => {
                  handleFilterChange("location", "lips");
                  if (typeFilter === "vanilla") handleFilterChange("type", null);
                }}
                className={`filter lips ${locaFilter === "lips" ? "selected" : ""}`}
                disabled={typeFilter === "vanilla"}
              >
                Lips
              </button>
              {locaFilter && (
                <button
                  type="button"
                  onClick={() => {
                    handleFilterChange("location", null);
                  }}
                  className="clear-btn"
                  aria-label="Clear Location Filters"
                >
                  Clear
                </button>
              )}
            </div>
            {locaFilter === "lips" && <Tooltip id="my-tooltip" />}
          </Col>
          <Col xs={4} xl={2} className="d-flex align-items-center mt-1 mt-xl-0 justify-content-xl-end">
            <button
              type="button"
              className="clear-btn btn reset"
              onClick={() => {
                handleClearFilters();
                if (filtersOpen) {
                  setFiltersOpen((prevState) => !prevState);
                  setPlay(!play);
                }
              }}
              disabled={typeFilter === null && locaFilter === null}
            >
              Reset All Filters
            </button>
          </Col>
        </Row>
      )}
      <Animate
        play={play}
        start={{
          transform: "translateY(0px)",
          visibility: "hidden",
          opacity: "0",
          height: "0",
        }}
        end={{
          transform: "translateY(6px)",
          visibility: "visible",
          height: "45px",
        }}
      >
        <Row>
          <Col>
            <div className="mod-filters">
              {ModList.map((mod) => (
                <button key={mod} type="button" onClick={() => handleModFilterChange(mod)} className={`mod ${modFilters.includes(mod) ? "selected" : ""}`}>
                  <input type="checkbox" name={mod} checked={modFilters.includes(mod)} readOnly />
                  {mod === "isp_gold"
                    ? "Indoct's Subtler Piercings (Gold)"
                    : mod === "isp_silver"
                    ? "Indoct's Subtler Piercings (Silver)"
                    : mod === "p4_blooming"
                    ? "P4 Blooming Circlets & Piercings"
                    : mod === "ghouls_customs"
                    ? "Ghouls Custom Piercings"
                    : "LVNDRs earrings v1"}
                </button>
              ))}
            </div>
          </Col>
        </Row>
      </Animate>
    </>
  );
}
