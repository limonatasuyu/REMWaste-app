type SelectInputProps = {
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  description?: string;
};

export function SelectInput({
  id,
  label,
  value,
  options,
  onChange,
  required = false,
  disabled = false,
  error,
  description,
}: SelectInputProps) {
  const descriptionId = `${id}-description`;
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col">
      <label htmlFor={id} className={`text-sm font-medium mb-1 ${error ? "text-red-700" : "text-gray-700"}`}>
        {label}
        {required && (
          <span className="text-red-500 ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {description && (
        <span id={descriptionId} className="text-sm text-gray-500 mb-1">
          {description}
        </span>
      )}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
        aria-invalid={!!error}
        aria-describedby={`${description ? descriptionId : ""} ${error ? errorId : ""}`.trim() || undefined}
        className={`rounded-xl border px-3 py-2 shadow-sm focus:ring-2 focus:ring-offset-1 disabled:bg-gray-100 disabled:text-gray-500 ${
          error
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        }`}
      >
        {options.map(({ value: optValue, label: optLabel }) => (
          <option key={optValue} value={optValue}>
            {optLabel}
          </option>
        ))}
      </select>
      {error && (
        <span id={errorId} className="text-sm text-red-600 mt-1" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
