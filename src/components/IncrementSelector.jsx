import React from "react";
import { useAppProvider } from "../providers/AppProvider";

const IncrementSelector = () => {
  const { increment, setIncrement } = useAppProvider();

  const handleSelect = (e) => {
    setIncrement(e.target.value);
  };

  return (
    <div className="shadow-2xl">
      <select
        value={increment}
        onChange={handleSelect}
        className="w-full p-3 rounded-lg outline-none"
      >
        <option value="">No Aggregation</option>
        <option value="0.01">0.01</option>
        <option value="0.05">0.05</option>
        <option value="0.10">0.10</option>
        <option value="0.50">0.50</option>
        <option value="1.00">1.00</option>
      </select>
    </div>
  );
};

export default IncrementSelector;
