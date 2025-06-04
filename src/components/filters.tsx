import { useState } from "react";
import type { IFilters, IFilterOptions } from "../types.ts";
import { useFilterValidation } from "../hooks/use-filter-validation.ts";
import { SelectInput } from "./select-input.tsx";

export function Filters({
  filterOptions,
  filters,
  setFilters,
  applyFilters,
  clearFilters,
}: {
  filterOptions: IFilterOptions;
  filters: IFilters;
  setFilters: (filters: IFilters) => void;
  applyFilters: () => void;
  clearFilters: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { errors, validate } = useFilterValidation({ filters });

  function handleApply() {
    if (validate()) {
      applyFilters();
      setIsOpen(false);
    }
  }

  return (
    <div className="relative" aria-label="Filter Controls">
      <div className="flex">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition-colors"
          aria-controls="filter-drawer"
        >
          {isOpen ? "Close Filters" : "Open Filters"}
        </button>
        <button
          onClick={clearFilters}
          disabled={!filters.set}
          className={`ml-4 mb-4 px-4 py-2 text-white rounded-xl shadow transition-colors ${
            filters.set ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
          }`}
          aria-label="Clear All Filters"
        >
          Clear Filters
        </button>
      </div>

      {/* Drawer */}
      <div
        id="filter-drawer"
        role="dialog"
        aria-labelledby="filter-heading"
        aria-modal="true"
        className={`max-w-screen fixed top-0 left-0 h-full w-xl bg-white shadow-xl p-6 space-y-6 transform transition-transform duration-300 ease-in-out z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Options</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Size Filter */}
          <SelectInput
            id="size-filter"
            label="Size"
            value={filters.size}
            onChange={(value) => setFilters({ ...filters, size: value })}
            options={[
              { value: "", label: "All Sizes" },
              ...filterOptions.sizes.map((size) => ({ value: String(size), label: `${size} Yard` })),
            ]}
          />

          {/* Min Price Filter */}
          <div className="flex flex-col">
            <label htmlFor="min-price-filter" className="text-sm font-medium text-gray-700 mb-1">
              Min Price (before VAT)
            </label>
            <input
              id="min-price-filter"
              type="number"
              min="0"
              placeholder="e.g., 100"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              className={`rounded-xl border border-gray-300 px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                errors.minPrice ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.minPrice && <p className="text-red-500 text-xs mt-1">{errors.minPrice}</p>}
          </div>

          {/* Max Price Filter*/}
          <div className="flex flex-col">
            <label htmlFor="max-price-filter" className="text-sm font-medium text-gray-700 mb-1">
              Max Price (before VAT)
            </label>
            <input
              id="max-price-filter"
              type="number"
              min="0"
              placeholder="e.g., 250"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              className={`rounded-xl border px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                errors.maxPrice ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.maxPrice && <p className="text-red-500 text-xs mt-1">{errors.maxPrice}</p>}
          </div>

          {/* Hire Period Filter */}
          <SelectInput
            id="hire-filter"
            label="Hire Period"
            value={filters.hirePeriod}
            onChange={(value) => setFilters({ ...filters, hirePeriod: value })}
            options={[
              { value: "", label: "All Periods" },
              ...filterOptions.hirePeriods.map((days) => ({ value: String(days), label: `${days} Days` })),
            ]}
          />

          {/* Allowed on Road Filter */}
          <SelectInput
            id="road-filter"
            label="Allowed On Road"
            value={filters.allowedOnRoad}
            onChange={(value) => setFilters({ ...filters, allowedOnRoad: value as "" | "yes" | "no" })}
            options={[
              { value: "", label: "All Options" },
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />

          {/* Allows Heavy Waste Filter */}
          <SelectInput
            id="waste-filter"
            label="Allowed Heavy Waste"
            value={filters.allowsHeavyWaste}
            onChange={(value) => setFilters({ ...filters, allowsHeavyWaste: value as "" | "yes" | "no" })}
            options={[
              { value: "", label: "All Options" },
              { value: "yes", label: "Yes" },
              { value: "no", label: "No" },
            ]}
          />
        </div>

        {/* Apply Button */}
        <div className="flex flex-col sm:flex-row gap-2 justify-end">
          <button
            onClick={handleApply}
            className="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition-colors"
          >
            Apply Filters
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="mt-4 px-6 py-2 bg-blue-600 text-white font-medium rounded-xl shadow hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/20 bg-opacity-30 z-40"
          aria-hidden="true"
        />
      )}
    </div>
  );
}
