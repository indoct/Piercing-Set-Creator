import { useState, useEffect } from "react";
import data from "./piercings/data";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import "./App.css";
import PiercingSetBlock from "./components/PiercingSetBlock";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [piercings, setPiercings] = useState(data);
  const [barbBear, setBarbBear] = useState({});
  const [barbEagle, setBarbEagle] = useState({});

  useEffect(() => {
    const bearPrcs = piercings.filter((prc) => prc.prc_set === "barb-bear");
    setBarbBear(bearPrcs);
    const eaglePrcs = piercings.filter((prc) => prc.prc_set === "barb-eagle");
    setBarbEagle(eaglePrcs);
  }, [piercings]);

  return (
    <ThemeProvider
      breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]}
      minBreakpoint="xxs"
    >
      <Container fluid>
        <Row>
          <PiercingSetBlock set={barbBear} />
        </Row>
        <Row>
          <PiercingSetBlock set={barbEagle} />
        </Row>
      </Container>
    </ThemeProvider>
  );
}

export default App;
