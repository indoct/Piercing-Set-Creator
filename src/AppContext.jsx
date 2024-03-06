import React, { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import data from "./data";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [piercings, setPiercings] = useState(data);
  const [searchParams, setSearchParams] = useSearchParams();
  const [mods, setMods] = useState([
    "isp_silver",
    "isp_gold",
    "p4_blooming",
    "ghouls_customs",
  ]);
  const type = searchParams.get("type");
  const location = searchParams.get("location");
  const [sessionOver, setSessionOver] = useState(false);

  const contextValues = {
    type,
    location,
    mods,
    piercings,
    sessionOver,
    handleFilterChange,
    confirmDelete,
    toggleSessionOver,
    handleModsChange,
    handleBtns,
  };

  function handleBtns(e, nodeId, nodeLoca) {
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
    let result = confirm(
      "Are you sure you want to delete your set? \n \nPressing OK will clear your set configuration."
    );
    if (result) {
      setPiercings(data);
      setSessionOver(false);
      setMods(["isp_silver", "isp_gold", "p4_blooming", "ghouls_customs"]);
    }
  }

  function toggleSessionOver(e) {
    if (e.target.id === "back-btn") setSessionOver(false);
    if (e.target.id === "generate-btn") setSessionOver(true);
  }

  function handleModsChange(modname) {
    setMods((prevMods) => {
      return prevMods.includes(modname)
        ? mods.filter((mod) => mod !== modname)
        : [...mods, modname];
    });
  }

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
