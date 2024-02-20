import { useState, useEffect } from "react";
import data from "../data";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import "../App.css";
import PiercingSetBlock from "../components/PiercingSetBlock";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [piercings, setPiercings] = useState(data);
  const [vanillaAll, setVanillaAll] = useState({});
  const [ispGold, setIspGold] = useState({});
  const [ispSilver, setIspSilver] = useState({});

  useEffect(() => {
    const vanillaPrcs = piercings.filter((prc) => prc.prc_type === "vanilla");
    setVanillaAll(vanillaPrcs);

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
          <PiercingSetBlock set={vanillaAll} />
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
