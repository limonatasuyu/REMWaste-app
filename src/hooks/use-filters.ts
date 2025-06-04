import { useState } from "react";
import type { IFilters, ISkipData } from "../types";

export function useFilters({ data }: { data: ISkipData[] }) {
  const [filteredData, setFilteredData] = useState<ISkipData[] | null>(null);
  const [filters, setFilters] = useState<IFilters>({
    hirePeriod: "",
    size: "",
    allowedOnRoad: "",
    allowsHeavyWaste: "",
    maxPrice: "",
    minPrice: "",
    set: false,
  });

  const applyFilters = () => {
    const filtered = data.filter((skip) => {
      const hirePeriodMatches =
        filters.hirePeriod === "" || skip.hire_period_days === Number(filters.hirePeriod);
      const sizeMatches = filters.size === "" || skip.size === Number(filters.size);
      const allowedOnRoadMatches =
        (filters.allowedOnRoad === "yes" && skip.allowed_on_road) || filters.allowedOnRoad === "";
      const allowsHeavyWasteMatches =
        (filters.allowsHeavyWaste === "yes" && skip.allows_heavy_waste) || filters.allowsHeavyWaste === "";
      const price = skip.price_before_vat + skip.vat;
      const priceMatches =
        (filters.maxPrice === "" || price <= Number(filters.maxPrice)) &&
        (filters.minPrice === "" || price >= Number(filters.minPrice));
      return (
        hirePeriodMatches && sizeMatches && allowedOnRoadMatches && allowsHeavyWasteMatches && priceMatches
      );
    });

    setFilteredData(filtered);
    setFilters({ ...filters, set: true });
  };

  const clearFilters = () => {
    setFilters({
      hirePeriod: "",
      size: "",
      allowedOnRoad: "",
      allowsHeavyWaste: "",
      maxPrice: "",
      minPrice: "",
      set: false,
    });
    setFilteredData(data);
  };
  return {
    filteredData,
    filters,
    setFilters,
    applyFilters,
    clearFilters,
  };
}
