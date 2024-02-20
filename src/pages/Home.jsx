import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import data from "../data";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import "../App.css";
import PiercingSetBlock from "../components/PiercingSetBlock";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [piercings, setPiercings] = useState(data);
  const [prcsConfig, setPrcsConfig] = useState({
    lowerlip_04: "",
    lowerlip_06: "",
    lowerlip_08: "",
    beard_upper_lip_m: "",
    beard_upper_lip1_l: "",
    beard_upper_lip1_r: "",
    piercing_bridge_a_l: "",
    piercing_bridge_a_r: "",
    piercing_brow_a_l: "",
    piercing_brow_a_r: "",
    piercing_brow_b_l: "",
    piercing_brow_b_r: "",
    piercing_helix_a_l: "",
    piercing_helix_a_r: "",
    piercing_helix_b_l: "",
    piercing_helix_b_r: "",
    piercing_lobe_a_l: "",
    piercing_lobe_a_r: "",
    piercing_lobe_b_l: "",
    piercing_lobe_b_r: "",
    piercing_nostril_a_l: "",
    piercing_nostril_a_r: "",
    piercing_septum_a_m: "",
    piercing_tragus_a_l: "",
    piercing_tragus_a_r: "",
  });

  console.log(prcsConfig);
  // const [vanillaAll, setVanillaAll] = useState({});
  // const [ispGold, setIspGold] = useState({});
  // const [ispSilver, setIspSilver] = useState({});

  const typeFilter = searchParams.get("type");
  const colorFilter = searchParams.get("color");
  console.log(colorFilter);

  const displayedPiercings =
    typeFilter && colorFilter
      ? piercings.filter(
          (prc) => prc.prc_type === typeFilter && prc.prc_color === colorFilter
        )
      : typeFilter && !colorFilter
      ? piercings.filter((prc) => prc.prc_type === typeFilter.toLowerCase())
      : piercings;

  console.log(displayedPiercings);

  // useEffect(() => {
  //   const vanillaPrcs = piercings.filter((prc) => prc.prc_type === "vanilla");
  //   setVanillaAll(vanillaPrcs);

  //   const ispGoldPrcs = piercings.filter(
  //     (prc) => prc.site_category === "isp_gold"
  //   );
  //   setIspGold(ispGoldPrcs);

  //   const ispSilverPrcs = piercings.filter(
  //     (prc) => prc.site_category === "isp_silver"
  //   );
  //   setIspSilver(ispSilverPrcs);
  // }, [piercings]);

  const prcElements = displayedPiercings.map((prc) => {
    const contClass =
      prc.site_category === "vanilla-ab"
        ? "vanilla-ab prc-container"
        : prc.site_category === "barbarian"
        ? "barbarian prc-container"
        : prc.site_category === "ortheus"
        ? "ortheus prc-container"
        : "mod prc-container";
    return (
      <Col key={prc.prc_nodeid} xl={2} className="prc-col">
        <div className={contClass}>
          <div className="img-dummy">
            <span
              className={
                prc.prc_color === "silver"
                  ? "silver color-tag"
                  : "gold color-tag"
              }
            >
              {prc.prc_color}
            </span>
          </div>
          <ul className="prc-stats">
            <li className="prc-name">{prc.prc_name}</li>
            <li className="location">{prc.prc_location}</li>
          </ul>
        </div>
      </Col>
    );
  });

  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col>
            <span>Type Filters:</span>
            <div className="filter-btns">
              <Link to="/">All Piercings</Link>
              <Link to="?type=mod">Mod Only</Link>
              <Link to="?type=vanilla">Vanilla Only</Link>
            </div>
          </Col>
          {typeFilter === "mod" && (
            <Col>
              <span>Sub-Filters: Color</span>
              <div className="filter-btns">
                <Link to="?type=mod">Silver</Link>
                <Link to="?type=mod&color=gold">Gold</Link>
              </div>
            </Col>
          )}
        </Row>
        <Row className="mt-4">
          <h5>
            {typeFilter === "vanilla"
              ? "Vanilla Sets"
              : typeFilter === "mod"
              ? "Mod Piercings"
              : "All Piercings"}
          </h5>
        </Row>
        <Row className="mt-2">{prcElements}</Row>
        {/* <Row>
          <PiercingSetBlock set={vanillaAll} />
        </Row>
        <Row>
          <PiercingSetBlock set={ispGold} />
        </Row>
        <Row>
          <PiercingSetBlock set={ispSilver} />
        </Row> */}
      </Container>
    </ThemeProvider>
  );
}
