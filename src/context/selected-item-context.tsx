import React, { createContext, useContext, useState } from "react";
import type { ISkipData } from "../types";

interface SelectedItemContextType {
  selectedItem: ISkipData | null;
  setSelectedItem: (item: ISkipData | null) => void;
}

const SelectedItemContext = createContext<SelectedItemContextType | undefined>(undefined);

export const SelectedItemProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedItem, setSelectedItem] = useState<null | ISkipData>(null);

  return (
    <SelectedItemContext.Provider value={{ selectedItem, setSelectedItem }}>
      {children}
    </SelectedItemContext.Provider>
  );
};

export const useSelectedItem = () => {
  const context = useContext(SelectedItemContext);
  if (!context) throw new Error("useSelectedItem must be used within a SelectedItemProvider");
  return context;
};
