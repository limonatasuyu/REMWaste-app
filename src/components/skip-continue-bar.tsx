import { useSelectedItem } from "../context/selected-item-context";
import { getSkipItemImage } from "../utils";

type SkipContinueBarProps = {
  setIsSelectedItemPage: (is: boolean) => void;
};

export function SkipContinueBar({ setIsSelectedItemPage }: SkipContinueBarProps) {
  const { selectedItem, setSelectedItem } = useSelectedItem();
  if (!selectedItem) {
    return null;
  }
  const totalPrice = selectedItem.price_before_vat + selectedItem.vat;

  return (
    <div
      className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 shadow-md"
      role="region"
      aria-label="Selected skip details"
      aria-live="polite"
    >
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 p-6 sm:p-12">
        <div className="flex items-center gap-4">
          <img
            src={getSkipItemImage(selectedItem.size)}
            alt={`${selectedItem.size} yard skip`}
            className="w-20 h-20 object-cover rounded-md"
          />
          <div>
            <h3 id="selected-skip-heading" className="text-lg font-bold text-gray-900">
              {selectedItem.size} Yard Skip
            </h3>
            <p className="text-sm text-gray-600">
              <span className="sr-only">Selected </span>
              Hire period:{" "}
              <span className="font-medium text-gray-800">{selectedItem.hire_period_days} days</span>
            </p>
            <div
              className="text-base font-semibold text-gray-800"
              aria-label={`Total price: £${totalPrice} including VAT of £${selectedItem.vat}`}
            >
              <span aria-hidden="true">
                £{selectedItem.price_before_vat} + VAT{" "}
                <span className="text-sm text-gray-500">(£{selectedItem.vat})</span>
              </span>
            </div>
          </div>
        </div>

        <div
          className="flex flex-row sm:flex-col md:flex-row items-center gap-4"
          role="group"
          aria-label="Skip selection actions"
        >
          <button
            onClick={() => setSelectedItem(null)}
            className="inline-block px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 transition"
            aria-label="Deselect skip and return to selection"
          >
            Deselect
          </button>
          <button
            onClick={() => setIsSelectedItemPage(true)}
            className="inline-block px-6 py-3 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 transition"
            aria-label={`Continue to checkout with ${selectedItem.size} yard skip for ${selectedItem.hire_period_days} days at £${totalPrice} total`}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
