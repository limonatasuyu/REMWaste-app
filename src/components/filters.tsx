import { useState } from "react";
import type { IFilters, IFilterOptions } from "../types.ts";

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
  const [errors, setErrors] = useState<{ minPrice?: string; maxPrice?: string }>({});

  function validate() {
    const newErrors: typeof errors = {};

    if (filters.minPrice !== "" && (isNaN(Number(filters.minPrice)) || Number(filters.minPrice) < 0)) {
      newErrors.minPrice = "Min Price must be a positive number";
    }

    if (filters.maxPrice !== "" && (isNaN(Number(filters.maxPrice)) || Number(filters.maxPrice) < 0)) {
      newErrors.maxPrice = "Max Price must be a positive number";
    }

    if (
      filters.minPrice !== "" &&
      filters.maxPrice !== "" &&
      !newErrors.minPrice &&
      !newErrors.maxPrice &&
      Number(filters.minPrice) > Number(filters.maxPrice)
    ) {
      newErrors.minPrice = "Min Price cannot be greater than Max Price";
      newErrors.maxPrice = "Max Price cannot be less than Min Price";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleApply() {
    if (validate()) {
      applyFilters();
      setIsOpen(false);
    }
  }

  return (
    <div className="relative">
      <div className="flex">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition-colors"
        >
          {isOpen ? "Close Filters" : "Open Filters"}
        </button>
        <button
          onClick={clearFilters}
          disabled={!filters.set}
          className={`ml-4 mb-4 px-4 py-2 text-white rounded-xl shadow transition-colors ${
            filters.set ? "bg-blue-600  hover:bg-blue-700" : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Clear Filters
        </button>
      </div>
      {/* Drawer */}
      <div
        className={`max-w-screen fixed top-0 left-0 h-full w-xl bg-white shadow-xl p-6 space-y-6 transform transition-transform duration-300 ease-in-out z-50
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
  `}
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Options</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Size Filter */}
          <div className="flex flex-col">
            <label htmlFor="size-filter" className="text-sm font-medium text-gray-700 mb-1">
              Size
            </label>
            <select
              id="size-filter"
              value={filters.size}
              onChange={(e) => setFilters({ ...filters, size: e.target.value })}
              className="rounded-xl border border-gray-300 px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Sizes</option>
              {filterOptions.sizes.map((size) => (
                <option key={size} value={size}>
                  {size} Yard
                </option>
              ))}
            </select>
          </div>

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

          {/* Max Price Filter */}
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
          <div className="flex flex-col">
            <label htmlFor="hire-filter" className="text-sm font-medium text-gray-700 mb-1">
              Hire Period
            </label>
            <select
              id="hire-filter"
              value={filters.hirePeriod}
              onChange={(e) => setFilters({ ...filters, hirePeriod: e.target.value })}
              className="rounded-xl border border-gray-300 px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Periods</option>
              {filterOptions.hirePeriods.map((days) => (
                <option key={days} value={days}>
                  {days} Days
                </option>
              ))}
            </select>
          </div>

          {/* Allowed on Road Filter */}
          <div className="flex items-center space-x-3 mt-1">
            <input
              id="road-filter"
              type="checkbox"
              checked={filters.allowedOnRoad}
              onChange={(e) => setFilters({ ...filters, allowedOnRoad: e.target.checked })}
              className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="road-filter" className="text-sm text-gray-700">
              Allowed on Road
            </label>
          </div>

          {/* Allows Heavy Waste Filter */}
          <div className="flex items-center space-x-3 mt-1">
            <input
              id="heavy-filter"
              type="checkbox"
              checked={filters.allowsHeavyWaste}
              onChange={(e) => setFilters({ ...filters, allowsHeavyWaste: e.target.checked })}
              className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="heavy-filter" className="text-sm text-gray-700">
              Allows Heavy Waste
            </label>
          </div>
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
