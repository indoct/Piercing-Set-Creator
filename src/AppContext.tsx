import React, { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import data from "./data";
import { Piercing, ContextValues } from "././interfaces";

const defaultContextValues: ContextValues = {
  type: "",
  location: "",
  mods: [],
  piercings: [],
  sessionOver: false,
  handleFilterChange: () => {},
  confirmDelete: () => {},
  toggleSessionOver: () => {},
  handleModsChange: () => {},
  handleBtns: () => {},
};

const AppContext = createContext<ContextValues>(defaultContextValues);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [piercings, setPiercings] = useState<Piercing[]>(data);
  const [searchParams, setSearchParams] = useSearchParams();
  const [mods, setMods] = useState<string[]>([
    "isp_silver",
    "isp_gold",
    "p4_blooming",
    "ghouls_customs",
    "LV_E_V1",
  ]);
  const type: string | null = searchParams.get("type");
  const location: string | null = searchParams.get("location");
  const [sessionOver, setSessionOver]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false);

  const contextValues: ContextValues = {
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

  function handleBtns(nodeId: string, nodeLoca: string): void {
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

  function handleFilterChange(key: string, value: string | null): void {
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

  function confirmDelete(): void {
    let result = confirm(
      "Are you sure you want to delete your set? \n \nPressing OK will clear your set configuration."
    );
    if (result) {
      setPiercings(data);
      setSessionOver(false);
      setMods(["isp_silver", "isp_gold", "p4_blooming", "ghouls_customs"]);
    }
  }

  function toggleSessionOver(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    if ((e.target as HTMLInputElement).id === "back-btn") setSessionOver(false);
    if ((e.target as HTMLInputElement).id === "generate-btn")
      setSessionOver(true);
  }

  function handleModsChange(modname: string): void {
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

export const useAppContext = (): ContextValues => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }

  return context;
};
