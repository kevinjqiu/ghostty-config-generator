import React from 'react';

interface MultiSelectProps {
  label: string;
  value: string[];
  onChange: (value: string[]) => void;
  options: string[];
  description?: string;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  value,
  onChange,
  options,
  description,
}) => {
  const toggleOption = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-200 mb-1">
        {label}
      </label>
      {description && (
        <p className="text-xs text-gray-400 mb-2">{description}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => toggleOption(option)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              value.includes(option)
                ? 'bg-purple-600 text-white'
                : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-gray-600'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
