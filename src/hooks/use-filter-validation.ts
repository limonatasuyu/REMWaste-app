import { useState } from "react";
import type { IFilters } from "../types";

export function useFilterValidation({ filters }: { filters: IFilters }) {
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

  return {
    errors,
    validate,
  };
}
