// src/PriceRangeInput.tsx
import React, { useState } from "react";

interface IProps {
  minPrice: number;
  maxPrice: number;
  handleMinChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const PriceRangeInput = ({
  minPrice,
  maxPrice,
  handleMinChange,
  handleMaxChange,
}: IProps) => {
  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-base font-bold mb-4">Select Price Range</h1>
      <div className="flex space-x-4 mb-4">
        <input
          type="number"
          value={minPrice}
          onChange={handleMinChange}
          className="w-28 p-2 border border-gray-300 rounded-md"
          placeholder="Min Price"
        />
        <input
          type="number"
          value={maxPrice}
          onChange={handleMaxChange}
          className="w-28 p-2 border border-gray-300 rounded-md"
          placeholder="Max Price"
        />
      </div>
      <div className="text-gray-700">
        Selected Range: ${minPrice} - ${maxPrice}
      </div>
    </div>
  );
};

export default PriceRangeInput;
