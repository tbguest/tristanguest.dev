import React from "react";

interface SegmentedControlProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className="inline-flex ">
      <div className="inline-flex rounded-lg border border-gray-200 p-1 bg-gray-100">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`
            px-4 py-2 
            rounded-md
            text-sm
            font-medium
            transition-all
            duration-200
            drop-shadow-sm
            ${
              option === value
                ? "bg-white text-black shadow-md"
                : "text-gray-700 hover:text-black"
            }
            `}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SegmentedControl;
