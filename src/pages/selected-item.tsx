import { useRef } from "react";
import { getSkipItemImage } from "../utils";
import { useConfetti } from "../hooks/use-confetti";
import { useSelectedItem } from "../context/selected-item-context";

export function SelectedItemPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { selectedItem: item } = useSelectedItem();
  useConfetti({ canvasRef, item });

  if (!item) {
    return (
      <div className="text-center py-20 text-gray-500" role="alert" aria-label="No item selected">
        No item selected
      </div>
    );
  }

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" aria-hidden="true" />

      <article
        className="relative z-10 bg-white group p-6 rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 max-w-sm w-full"
        aria-labelledby="skip-title"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-xl shadow-md">
            <img
              src={getSkipItemImage(item.size)}
              alt={`${item.size} yard skip container`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="text-center space-y-1">
            <h1 id="skip-title" className="text-2xl font-bold text-gray-900">
              {item.size} Yard Skip
            </h1>
            <p className="text-sm text-gray-600">
              <span className="sr-only">Hire period: </span>
              <span className="font-medium text-gray-800">{item.hire_period_days} days</span>
            </p>
            <p className="text-lg font-semibold text-gray-800 mt-1">
              <span className="sr-only">Price: </span>£{item.price_before_vat} + VAT{" "}
              <span className="text-sm text-gray-500">(£{item.vat})</span>
            </p>
          </div>

          <div
            className="flex flex-col items-center gap-1 text-sm mt-2 text-red-500"
            role="alert"
            aria-label="Usage restrictions"
          >
            {!item.allowed_on_road && <p aria-label="Warning: Not allowed on road">⚠️ Not allowed on road</p>}
            {!item.allows_heavy_waste && (
              <p aria-label="Warning: Does not allow heavy waste">⚠️ Does not allow heavy waste</p>
            )}
          </div>
        </div>
      </article>
    </main>
  );
}
