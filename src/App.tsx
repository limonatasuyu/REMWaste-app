import { useState } from "react";
import { SkipHireOptionsPage } from "./pages/skip-hire-options";
import { SelectedItemPage } from "./pages/selected-item";
import type { ISkipData } from "./types";

export default function App() {
  const [selectedItem, setSelectedItem] = useState<null | ISkipData>(null);
  const [isSelectedItemPage, setIsSelectedItemPage] = useState(false);

  if (isSelectedItemPage) {
    return <SelectedItemPage item={selectedItem} />;
  }

  return (
    <SkipHireOptionsPage
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      setIsSelectedItemPage={setIsSelectedItemPage}
    />
  );
}
