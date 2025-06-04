import { useEffect, useMemo, useState } from "react";
import type { IFilterOptions, ISkipData } from "../types";

export function useSkipsData() {
  const [data, setData] = useState<ISkipData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError((err as { message?: string })?.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterOptions: IFilterOptions = useMemo(
    () => ({
      sizes: Array.from(new Set(data.map((item) => item.size))),
      hirePeriods: Array.from(new Set(data.map((item) => item.hire_period_days))),
    }),
    [data]
  );

  return { data, loading, error, filterOptions };
}
