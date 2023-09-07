import React, { useState } from 'react';

interface GenreDropdownProps {
  displayName: string;
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const GenreDropdown: React.FC<GenreDropdownProps> = ({
  displayName,
  options,
  selected,
  onChange,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(event.target.selectedOptions, option => option.value);
    onChange(selectedValues);
  };

  return (
    <div>
      <label>{displayName}</label>
      <select multiple={true} value={selected} onChange={handleSelectChange}>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreDropdown;
