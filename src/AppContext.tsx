import React, { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import data from "./data";
import { Piercing, ContextValues, ModList } from "./types";

const AppContext = createContext<ContextValues | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [piercings, setPiercings] = useState<Piercing[]>(data);
  const [searchParams, setSearchParams] = useSearchParams();
  const [mods, setMods] = useState<string[]>(ModList);
  const type: string | null = searchParams.get("type");
  const location: string | null = searchParams.get("location");
  const [sessionOver, setSessionOver]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false);
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string>("");

  const contextValues: ContextValues = {
    type,
    location,
    mods,
    typeFilter,
    locationFilter,
    piercings,
    sessionOver,
    setMods,
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
      const newParams: { [x: string]: string } = {
        ...Object.fromEntries(prevParams),
      };
      if (value === null) {
        delete newParams[key];
      } else if (key === "type" || key === "location") {
        newParams[key] = value;
      }
      return newParams;
    });
    if (!value) {
      setTypeFilter("");
      setLocationFilter("");
    }
    if (value && key === "type") setTypeFilter(value);
    if (value && key === "location") setLocationFilter(value);
  }

  function confirmDelete(): void {
    let result = confirm(
      "Are you sure you want to delete your set? \n \nPressing OK will clear your set configuration."
    );
    if (result) {
      setPiercings(data);
      setSessionOver(false);
      setMods(ModList);
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
    throw new Error(
      "context returned undefined. Check it is being used within its Context Provider."
    );
  }

  return context;
};
