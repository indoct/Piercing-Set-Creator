import React, { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import data from "./data";
import { Piercing, ContextValues, ModList } from "./types";

const AppContext = createContext<ContextValues | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [piercings, setPiercings] = useState<Piercing[]>(data);
  const [searchParams, setSearchParams] = useSearchParams();
  const type: string | null = searchParams.get("type");
  const location: string | null = searchParams.get("location");
  const [modFilters, setModFilters] = useState<string[]>(
    searchParams.get("mods") ? searchParams.get("mods")!.split(",") : ModList
  );
  const [sessionOver, setSessionOver]: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ] = useState(false);

  const contextValues: ContextValues = {
    type,
    location,
    piercings,
    modFilters,
    sessionOver,
    handleFilterChange,
    confirmDelete,
    toggleSessionOver,
    handleModFilterChange,
    handleBtns,
    handleClearFilters,
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
  }

  function handleModFilterChange(mod: string): void {
    setModFilters((prevFilters) => {
      const newFilters = prevFilters.includes(mod)
        ? prevFilters.filter((id) => id !== mod)
        : [...prevFilters, mod];

      setSearchParams((prevParams) => {
        const newParams: { [key: string]: string } = {
          ...Object.fromEntries(prevParams),
        };
        newParams["mods"] = newFilters.join(",");
        return new URLSearchParams(newParams);
      });

      return newFilters;
    });
  }

  function handleClearFilters(): void {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams.toString());
      newParams.delete("type");
      newParams.delete("location");
      newParams.delete("mods");
      return newParams;
    });
    setModFilters(ModList);
  }

  function confirmDelete(): void {
    let result = confirm(
      "Are you sure you want to delete your set? \n \nPressing OK will clear your set configuration."
    );
    if (result) {
      setPiercings(data);
      setSessionOver(false);
      setModFilters(ModList);
    }
  }

  function toggleSessionOver(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    if ((e.target as HTMLInputElement).id === "back-btn") setSessionOver(false);
    if ((e.target as HTMLInputElement).id === "generate-btn")
      setSessionOver(true);
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
