import { useState } from "react";
import { SkipHireOptionsPage } from "./pages/skip-hire-options";
import { SelectedItemPage } from "./pages/selected-item";

export default function App() {
  const [isSelectedItemPage, setIsSelectedItemPage] = useState(false);

  if (isSelectedItemPage) {
    return <SelectedItemPage />;
  }

  return (
    <SkipHireOptionsPage
      setIsSelectedItemPage={setIsSelectedItemPage}
    />
  );
}
