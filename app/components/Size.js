import React, { useState } from "react";

function Size({ onSizeSelect, size }) {
  const [selectedSize, setSelectedSize] = useState(null); // State to track selected size

  // Array of sizes to map through
  const sizes = size;


  
  // Function to handle size selection
  const handleSizeClick = (size) => {
    setSelectedSize(size); 
    onSizeSelect(size);
  };

  return (
    <div>
      <p className="mb-4 text-lg font-medium leading-8 text-white">Size</p>
      <div className="flex-wrap w-full pb-8 border-b border-gray-100">
        <div className="grid grid-cols-3 min-[400px]:grid-cols-5 gap-3 max-w-md">
          {sizes.map((size) => (
            <button
              key={size}
              className={`bg-white text-center py-1.5 px-6 w-full font-semibold text-lg leading-8 text-gray-900 border border-gray-200 flex items-center rounded-full justify-center transition-all duration-300 hover:bg-gray-50 hover:shadow-sm hover:shadow-gray-100 hover:border-gray-300 visited:border-gray-300 visited:bg-gray-50 ${
                selectedSize === size ? "bg-red-500" : ""
              }`}
              onClick={() => handleSizeClick(size)}
            >
             {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Size;
