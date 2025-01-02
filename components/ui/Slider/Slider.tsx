interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export function Slider({
  label,
  value,
  onChange,
  min = 1,
  max = 10,
  step = 0.5,
}: SliderProps) {
  return (
    <div className="my-4 flex items-center gap-4">
      <label htmlFor={label} className="text-sm font-medium text-gray-700">
        {label}:
      </label>
      <input
        type="range"
        id={label}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-48 cursor-pointer appearance-none rounded-lg bg-gray-200"
      />
      <span className="min-w-[3ch] text-sm text-gray-600">
        {value.toFixed(1)}
      </span>
    </div>
  );
}
