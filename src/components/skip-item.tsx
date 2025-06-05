import { useState, useEffect } from "react";
import type { ISkipData } from "../types.ts";
import { getSkipItemImage } from "../utils.ts";
import { useSelectedItem } from "../context/selected-item-context.tsx";

function SkipImage({ size }: { size: number }) {
  const skipSize = `${size} yard skip`;
  return (
    <div
      className="w-full max-w-sm aspect-[4/3] overflow-hidden rounded-xl shadow-md"
      role="img"
      aria-label={skipSize}
    >
      <img
        src={getSkipItemImage(size)}
        alt=""
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}

function SkipInfo({ item }: { item: ISkipData }) {
  const skipSize = `${item.size} yard skip`;
  return (
    <div className="text-center w-full space-y-1">
      <h3 className="text-2xl font-bold text-gray-900" id={`skip-${item.id}-title`}>
        {skipSize}
      </h3>
      <p className="text-sm text-gray-600">
        Hire period: <span className="font-medium text-gray-800">{item.hire_period_days} days</span>
      </p>
      <p
        className="text-lg font-semibold text-gray-800 mt-1"
        aria-label={`Price: £${item.price_before_vat} plus VAT of £${item.vat}`}
      >
        £{item.price_before_vat} + VAT <span className="text-sm text-gray-500"> (£{item.vat})</span>
      </p>
      <div className="flex flex-col items-center gap-1 text-sm mt-2 text-red-500" role="alert"></div>
      {!item.allowed_on_road && (
        <li className="flex items-center gap-2 p-2 rounded-md border border-amber-900/30">
          <img src="/icons/home.svg" className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <span className="text-sm font-bold text-amber-300">Private property only</span>
        </li>
      )}
      {item.allows_heavy_waste && (
        <li className="flex items-center gap-2 p-2 rounded-md border border-emerald-900/30">
          <img src="/icons/leaf.svg" className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span className="text-sm font-bold text-emerald-300">Heavy waste suitable</span>
        </li>
      )}
      {item.per_tonne_cost && (
        <li className="flex items-center gap-2 p-2 rounded-md border border-red-900/30">
          <img src="/icons/alert.svg" className="w-5 h-5 text-purple-400 flex-shrink-0" />
          <span className="text-sm font-bold text-purple-300">
            £{item.per_tonne_cost}/tonne transfer cost applies
          </span>
        </li>
      )}
    </div>
  );
}

function SkipButtons({
  item,
  isSelected,
  onSelect,
  onOpenModal,
}: {
  item: ISkipData;
  isSelected: boolean;
  onSelect: () => void;
  onOpenModal: () => void;
}) {
  return (
    <div className="mt-4 flex gap-4 w-full">
      <button
        onClick={onSelect}
        className={`flex-1 py-3 rounded-lg font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isSelected
            ? "bg-blue-700 hover:bg-blue-800 text-white shadow-lg"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
        aria-pressed={isSelected}
        aria-describedby={`skip-${item.id}-title`}
      >
        {isSelected ? "✓ Selected" : "Select"}
      </button>

      <button
        onClick={onOpenModal}
        className="flex-1 py-3 rounded-lg font-semibold bg-gray-300 hover:bg-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        aria-haspopup="dialog"
        aria-expanded={false}
        aria-controls={`skip-${item.id}-modal`}
      >
        Info
      </button>
    </div>
  );
}

function SkipModal({ item, isOpen, onClose }: { item: ISkipData; isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`skip-${item.id}-modal-title`}
      id={`skip-${item.id}-modal`}
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50 p-4"
      onClick={onClose}
    >
      <div className="bg-white rounded-xl max-w-md w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
        <h2 id={`skip-${item.id}-modal-title`} className="text-xl font-bold mb-4">
          Additional Info
        </h2>
        <p>
          Transport cost:{" "}
          <strong>{item.transport_cost != null ? `£${item.transport_cost}` : "Unknown"}</strong>
        </p>
        <p>
          Cost per tonne:{" "}
          <strong>{item.per_tonne_cost != null ? `£${item.per_tonne_cost}` : "Unknown"}</strong>
        </p>
        {!item.allowed_on_road && <p aria-label="Warning: Not allowed on road">⚠️ Not allowed on road</p>}
        {!item.allows_heavy_waste && (
          <p aria-label="Warning: Does not allow heavy waste">⚠️ Does not allow heavy waste</p>
        )}
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export function SkipItem({ item }: { item: ISkipData }) {
  const { selectedItem, setSelectedItem } = useSelectedItem();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isSelected = selectedItem?.id === item.id;
  const skipSize = `${item.size} yard skip`;

  return (
    <>
      <li
        role="item"
        aria-selected={isSelected}
        tabIndex={0}
        className={`group relative flex flex-col p-6 rounded-2xl bg-white border shadow-sm transition-all duration-300 focus-within:ring-4 focus-within:ring-blue-500 hover:shadow-lg hover:scale-[1.02] ${
          isSelected ? "ring-2 ring-blue-600 border-blue-300" : "border-gray-200"
        }`}
        aria-label={`${skipSize}. Price: £${item.price_before_vat} plus VAT. Hire period: ${
          item.hire_period_days
        } days${!item.allowed_on_road ? ". Not allowed on road" : ""}${
          !item.allows_heavy_waste ? ". Does not allow heavy waste" : ""
        }`}
      >
        <div className="flex flex-col items-center gap-4 h-full">
          <SkipImage size={item.size} />
          <SkipInfo item={item} />
          <SkipButtons
            item={item}
            isSelected={isSelected}
            onSelect={() => setSelectedItem(item)}
            onOpenModal={() => setIsModalOpen(true)}
          />
        </div>
      </li>

      <SkipModal item={item} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
