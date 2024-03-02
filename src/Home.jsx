import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import data from "./data";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import "./App.css";
import Container from "react-bootstrap/Container";
import PiercingsBlock from "./components/PiercingsBlock";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";

export default function Home() {
  const [piercings, setPiercings] = useState(data);
  const [searchParams, setSearchParams] = useSearchParams();
  const [mods, setMods] = useState(["isp_silver", "isp_gold", "p4_blooming"]);
  const typeFilter = searchParams.get("type");
  const locaFilter = searchParams.get("location");
  const [sessionOver, setSessionOver] = useState(false);

  function selectDisableBtns(e, nodeId, nodeLoca) {
    setPiercings((prevPrcs) =>
      prevPrcs.map((prc) => {
        return nodeId === prc.nodeid
          ? {
              ...prc,
              selected: !prc.selected,
            }
          : nodeId !== prc.nodeid && nodeLoca === prc.bone
          ? {
              ...prc,
              disabled: !prc.disabled,
            }
          : prc;
      })
    );
  }

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      const newParams = { ...Object.fromEntries(prevParams) };
      if (value === null) {
        delete newParams[key];
      } else if (key === "type" || key === "location") {
        newParams[key] = value;
      }
      return newParams;
    });
  }

  function confirmDelete() {
    let result = confirm("Are you sure you want to delete your set? \n \nPressing OK will clear your set configuration.");
    if (result) {
      setPiercings(data);
      setSessionOver(false);
    }
  }

  function toggleSessionOver(e) {
    if (e.target.id === "back-btn") setSessionOver(false);
    if (e.target.id === "generate-btn") setSessionOver(true);
  }

  function handleModsChange(modname) {
    setMods((prevMods) => {
      return prevMods.includes(modname) ? mods.filter((mod) => mod !== modname) : [...mods, modname];
    });
  }

  return (
    <ThemeProvider breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]} minBreakpoint="xxs">
      <Container>
        <Header
          type={typeFilter}
          location={locaFilter}
          mods={mods}
          piercings={piercings}
          handleFilterChange={handleFilterChange}
          handleModsChange={handleModsChange}
          confirmDelete={confirmDelete}
          toggleSessionOver={toggleSessionOver}
          sessionOver={sessionOver}
        />
        <PiercingsBlock
          piercings={piercings}
          type={typeFilter}
          location={locaFilter}
          mods={mods}
          handleBtns={selectDisableBtns}
          sessionOver={sessionOver}
          confirmDelete={confirmDelete}
          toggleSessionOver={toggleSessionOver}
        />
      </Container>
    </ThemeProvider>
  );
}
