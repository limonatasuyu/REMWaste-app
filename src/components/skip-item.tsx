import type { ISkipData } from "../types.ts";
import { getSkipItemImage } from "../utils.ts";

export function SkipItem({
  setSelectedItem,
  selectedItem,
  item,
}: {
  setSelectedItem: (itemId: ISkipData) => void;
  selectedItem: ISkipData | null;
  item: ISkipData;
}) {
  const isSelected = selectedItem?.id === item.id;

  return (
    <li
      role="option"
      aria-selected={isSelected}
      key={item.id}
      tabIndex={0}
      className={`group relative flex flex-col p-6 rounded-2xl bg-white border shadow-sm transition-all duration-300 focus-within:ring-4 focus-within:ring-blue-500 hover:shadow-lg hover:scale-[1.02] ${
        isSelected ? "ring-2 ring-blue-600 border-blue-300" : "border-gray-200"
      }`}
    >
      <div className="flex flex-col items-center gap-4 h-full">
        {/* Image */}
        <div className="w-full max-w-sm aspect-[4/3] overflow-hidden rounded-xl shadow-md">
          <img
            src={getSkipItemImage(item.size)}
            alt={`${item.size}-yard skip`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Info */}
        <div className="text-center w-full space-y-1">
          <h3 className="text-2xl font-bold text-gray-900">{item.size} Yard Skip</h3>
          <p className="text-sm text-gray-600">
            Hire period: <span className="font-medium text-gray-800">{item.hire_period_days} days</span>
          </p>
          <p className="text-lg font-semibold text-gray-800 mt-1">
            £{item.price_before_vat} + VAT <span className="text-sm text-gray-500">(£{item.vat})</span>
          </p>
        </div>

        {/* Warnings */}
        <div className="flex flex-col items-center gap-1 text-sm mt-2 text-red-500">
          {!item.allowed_on_road && <span>⚠️ Not allowed on road</span>}
          {!item.allows_heavy_waste && <span>⚠️ Does not allow heavy waste</span>}
        </div>

        {/* Button */}
        <button
          onClick={() => setSelectedItem(item)}
          className={`mt-4 w-full py-3 px-5 rounded-lg font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isSelected
              ? "bg-blue-700 hover:bg-blue-800 text-white shadow-lg"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          aria-pressed={isSelected}
          aria-label={`Select ${item.size} yard skip`}
        >
          {isSelected ? "✓ Selected" : "Select"}
        </button>
      </div>
    </li>
  );
}
