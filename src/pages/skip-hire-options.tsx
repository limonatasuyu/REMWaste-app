import { useSkipsData } from "../hooks/use-skips-data.ts";
import { SkipItem } from "../components/skip-item.tsx";
import { Filters } from "../components/filters.tsx";
import { SkipContinueBar } from "../components/skip-continue-bar.tsx";
import { useFilters } from "../hooks/use-filters.ts";
import { ProgressBar } from "../components/progress-bar.tsx";

export function SkipHireOptionsPage({
  setIsSelectedItemPage,
}: {
  setIsSelectedItemPage: (is: boolean) => void;
}) {
  const { data, loading, error, filterOptions } = useSkipsData();
  const { filters, setFilters, applyFilters, clearFilters, filteredData } = useFilters({ data });


  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 w-screen">
      <header className="text-gray-600 bg-white pb-6 pt-12 shadow-lg sm:sticky top-0 z-10" role="banner">
        <ProgressBar />
        <h1 className="text-center text-3xl font-extrabold tracking-tight drop-shadow-md mt-12" tabIndex={0}>
          Skip Hire Options
        </h1>
      </header>

      <section
        aria-labelledby="skips-list-title"
        className="max-w-[80%] mx-auto py-12"
        aria-busy={loading}
        aria-live="polite"
      >
        {loading ? (
          <div role="status" className="text-center text-xl font-medium text-gray-700">
            <span className="sr-only">Loading skip options</span>
            Loading skips...
          </div>
        ) : error ? (
          <div role="alert" className="text-red-600 text-center text-lg font-semibold" aria-atomic="true">
            Failed to load skip data. Please try again later.
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
            <ul
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              aria-label="Skip options"
            >
              {(filteredData ?? data).map((item) => (
                <SkipItem key={item.id} item={item} />
              ))}
            </ul>
            {(filteredData ?? data).length === 0 && (
              <p role="status" className="text-center text-lg text-gray-600 mt-4">
                No skips match your selected filters.
              </p>
            )}
          </>
        )}
      </section>
      <SkipContinueBar setIsSelectedItemPage={setIsSelectedItemPage}/>
    </main>
  );
}
