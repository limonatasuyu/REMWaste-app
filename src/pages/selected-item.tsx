import { useRef } from "react";
import type { ISkipData } from "../types";
import { getSkipItemImage } from "../utils";
import { useConfetti } from "../hooks/use-confetti";

export function SelectedItemPage({ item }: { item: ISkipData | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useConfetti({ canvasRef, item });

  if (!item) {
    return <div className="text-center py-20 text-gray-500">No item selected</div>;
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50" />

      <div className="relative z-10 bg-white group p-6 rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-lg hover:scale-105 max-w-sm w-full">
        <div className="flex flex-col items-center gap-4">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-xl shadow-md">
            <img
              src={getSkipItemImage(item.size)}
              alt={`${item.size}-yard skip`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="text-center space-y-1">
            <h3 className="text-2xl font-bold text-gray-900">{item.size} Yard Skip</h3>
            <p className="text-sm text-gray-600">
              Hire period: <span className="font-medium text-gray-800">{item.hire_period_days} days</span>
            </p>
            <p className="text-lg font-semibold text-gray-800 mt-1">
              £{item.price_before_vat} + VAT <span className="text-sm text-gray-500">(£{item.vat})</span>
            </p>
          </div>

          <div className="flex flex-col items-center gap-1 text-sm mt-2 text-red-500">
            {!item.allowed_on_road && <span>⚠️ Not allowed on road</span>}
            {!item.allows_heavy_waste && <span>⚠️ Does not allow heavy waste</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
