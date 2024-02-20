import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import data from "../data";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import "../App.css";
import PiercingSetBlock from "../components/PiercingSetBlock";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [piercings, setPiercings] = useState(data);
  const [vanillaAll, setVanillaAll] = useState({});
  const [ispGold, setIspGold] = useState({});
  const [ispSilver, setIspSilver] = useState({});

  console.log(searchParams.get("type"));

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
        <Row></Row>
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
