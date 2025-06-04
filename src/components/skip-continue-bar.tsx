import type { ISkipData } from "../types";
import { getSkipItemImage } from "../utils";

export function SkipContinueBar({
  selectedItem,
  handleDeselect,
  setIsSelectedItemPage,
}: {
  selectedItem: ISkipData;
  handleDeselect: () => void;
  setIsSelectedItemPage: (is: boolean) => void;
}) {
  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 shadow-md"
      role="region"
      aria-labelledby="selected-skip-heading"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-12">
        <div className="flex items-center gap-4">
          <img
            src={getSkipItemImage(selectedItem.size)}
            alt={`${selectedItem.size}-yard skip image`}
            className="w-20 h-20 object-cover rounded-md"
          />
          <div>
            <h3 id="selected-skip-heading" className="text-lg font-bold text-gray-900">
              {selectedItem.size} Yard Skip
            </h3>
            <p className="text-sm text-gray-600">
              Hire period:{" "}
              <span className="font-medium text-gray-800">{selectedItem.hire_period_days} days</span>
            </p>
            <p className="text-base font-semibold text-gray-800">
              £{selectedItem.price_before_vat} + VAT{" "}
              <span className="text-sm text-gray-500">(£{selectedItem.vat})</span>
            </p>
          </div>
        </div>

        <div className="flex flex-row sm:flex-col md:flex-row items-center gap-4">
          <button
            onClick={handleDeselect}
            className="inline-block px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 transition"
            aria-label="Deselect Item"
          >
            Deselect
          </button>
          <button
            onClick={() => setIsSelectedItemPage(true)}
            className="inline-block px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 transition"
            role="button"
            aria-label={`Continue with ${selectedItem.size} yard skip for ${selectedItem.hire_period_days} days`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
