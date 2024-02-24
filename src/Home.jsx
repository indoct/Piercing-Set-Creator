import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { data, config } from "./data";
import ThemeProvider from "react-bootstrap/ThemeProvider";
import "./App.css";
import Container from "react-bootstrap/Container";
import PiercingsBlock from "./components/PiercingsBlock";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";

export default function Home() {
  const [piercings, setPiercings] = useState(data);
  const [prcsConfig, setPrcsConfig] = useState(config);
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFilter = searchParams.get("type");
  const locaFilter = searchParams.get("location");

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
    addPrcToConfig(nodeId, nodeLoca);
  }

  function addPrcToConfig(nodeId, nodeLoca) {
    setPrcsConfig((prevPrcs) => {
      if (prevPrcs[nodeLoca].length === 0 || prevPrcs[nodeLoca] !== nodeId) {
        return {
          ...prevPrcs,
          [nodeLoca]: nodeId,
        };
      } else if (prevPrcs[nodeLoca].length > 0 && prevPrcs[nodeLoca] === nodeId) {
        return {
          ...prevPrcs,
          [nodeLoca]: "",
        };
      } else {
        return { ...prevPrcs };
      }
    });
  }

  function handleFilterChange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  function confirmDelete() {
    let result = confirm("Are you sure you want to delete your set? \n \nPressing OK will clear your configuration.");
    if (result) {
      setPiercings(data);
      setPrcsConfig(config);
    }
  }

  return (
    <ThemeProvider breakpoints={["xxxl", "xxl", "xl", "lg", "md", "sm", "xs", "xxs"]} minBreakpoint="xxs">
      <Container>
        <Header type={typeFilter} location={locaFilter} piercings={piercings} handleFilterChange={handleFilterChange} confirmDelete={confirmDelete} />
        <PiercingsBlock piercings={piercings} type={typeFilter} location={locaFilter} handleBtns={selectDisableBtns} />
      </Container>
    </ThemeProvider>
  );
}
