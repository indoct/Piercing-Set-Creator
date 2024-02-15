import { useState, useEffect } from "react";
import data from "../data";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import "../App.css";
import PiercingSetBlock from "../components/PiercingSetBlock";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AllPiercings() {
  const [piercings, setPiercings] = useState(data);
  const [vanillaSetA, setVanillaSetA] = useState({});
  const [barbBear, setBarbBear] = useState({});
  const [barbEagle, setBarbEagle] = useState({});
  const [barbWolf, setBarbWolf] = useState({});
  const [barbElk, setBarbElk] = useState({});
  const [barbTiger, setBarbTiger] = useState({});
  const [ispGold, setIspGold] = useState({});
  const [ispSilver, setIspSilver] = useState({});

  useEffect(() => {
    const setAPrcs = piercings.filter(
      (prc) => prc.site_category === "vanilla-ab"
    );
    setVanillaSetA(setAPrcs);
    const bearPrcs = piercings.filter(
      (prc) => prc.site_category === "barb-bear"
    );
    setBarbBear(bearPrcs);
    const eaglePrcs = piercings.filter(
      (prc) => prc.site_category === "barb-eagle"
    );
    setBarbEagle(eaglePrcs);
    const wolfPrcs = piercings.filter(
      (prc) => prc.site_category === "barb-wolf"
    );
    setBarbWolf(wolfPrcs);
    const tigerPrcs = piercings.filter(
      (prc) => prc.site_category === "barb-tiger"
    );
    setBarbTiger(tigerPrcs);
    const elkPrcs = piercings.filter((prc) => prc.site_category === "barb-elk");
    setBarbElk(elkPrcs);
    const ispGoldPrcs = piercings.filter(
      (prc) => prc.site_category === "isp_gold"
    );
    setIspGold(ispGoldPrcs);
    const ispSilverPrcs = piercings.filter(
      (prc) => prc.site_category === "isp_silver"
    );
    setIspSilver(ispSilverPrcs);
  }, [piercings]);

  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <Container fluid>
        <Row>
          <PiercingSetBlock set={vanillaSetA} />
        </Row>
        <Row>
          <PiercingSetBlock set={barbBear} />
        </Row>
        <Row>
          <PiercingSetBlock set={barbEagle} />
        </Row>
        <Row>
          <PiercingSetBlock set={barbWolf} />
        </Row>
        <Row>
          <PiercingSetBlock set={barbTiger} />
        </Row>
        <Row>
          <PiercingSetBlock set={barbElk} />
        </Row>
        <Row>
          <PiercingSetBlock set={ispGold} />
        </Row>
        <Row>
          <PiercingSetBlock set={ispSilver} />
        </Row>
      </Container>
    </ThemeProvider>
  );
}
