import { useState } from "react";
import { useSkipsData } from "../hooks/use-skips-data.ts";
import { SkipItem } from "../components/skip-item.tsx";
import { Filters } from "../components/filters.tsx";
import { SkipContinueBar } from "../components/skip-continue-bar.tsx";
import type { IFilters, ISkipData } from "../types.ts";

export function SkipHireOptionsPage({
  selectedItem,
  setSelectedItem,
  setIsSelectedItemPage,
}: {
  selectedItem: ISkipData | null;
  setSelectedItem: (item: ISkipData | null) => void;
  setIsSelectedItemPage: (is: boolean) => void;
}) {
  const [filteredData, setFilteredData] = useState<ISkipData[] | null>(null);
  const [filters, setFilters] = useState<IFilters>({
    hirePeriod: "",
    size: "",
    allowedOnRoad: true,
    allowsHeavyWaste: true,
    maxPrice: "",
    minPrice: "",
    set: false,
  });
  const { data, loading, error, filterOptions } = useSkipsData();

  const applyFilters = () => {
    const filtered = data.filter((skip) => {
      const hirePeriodMatches =
        filters.hirePeriod === "" || skip.hire_period_days === Number(filters.hirePeriod);
      const sizeMatches = filters.size === "" || skip.size === Number(filters.size);
      const allowedOnRoadMatches = filters.allowedOnRoad === true || skip.allowed_on_road === true;
      const allowsHeavyWasteMatches = filters.allowsHeavyWaste === true || skip.allows_heavy_waste === true;
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
      allowedOnRoad: true,
      allowsHeavyWaste: false,
      maxPrice: "",
      minPrice: "",
      set: false,
    });
    setFilteredData(data);
  };

  const handleDeselect = () => {
    setSelectedItem(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 w-screen">
      <header className="text-gray-600 bg-white py-6 shadow-lg sticky top-0 z-10">
        <h1 className="text-center text-3xl font-extrabold tracking-tight drop-shadow-md">
          Skip Hire Options
        </h1>
      </header>

      <section aria-labelledby="skips-list-title" className="max-w-[80%] mx-auto py-12">
        {loading ? (
          <div role="status" className="text-center text-xl font-medium text-gray-700">
            Loading skips...
          </div>
        ) : error ? (
          <div role="alert" className="text-red-600 text-center text-lg font-semibold">
            Failed to load skip data.
          </div>
        ) : (
          <>
            <h2 id="skips-list-title" className="sr-only">
              List of available skips
            </h2>
            <Filters
              filters={filters}
              setFilters={setFilters}
              filterOptions={filterOptions}
              applyFilters={applyFilters}
              clearFilters={clearFilters}
            />
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {(filteredData ?? data).map((item) => (
                <SkipItem setSelectedItem={setSelectedItem} selectedItem={selectedItem} item={item} />
              ))}
            </ul>
          </>
        )}
      </section>
      {selectedItem && (
        <SkipContinueBar
          selectedItem={selectedItem}
          handleDeselect={handleDeselect}
          setIsSelectedItemPage={setIsSelectedItemPage}
        />
      )}
    </main>
  );
}
