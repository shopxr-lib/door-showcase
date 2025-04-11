import React from "react";

const OptionCard = ({ option, isSelected, onSelect }) => {
  return (
    <div
      className={`border-4 rounded-lg overflow-hidden cursor-pointer transition-all py-1 px-2 ${
        isSelected ? "border-blue-200 shadow-md" : "border-transparent"
      }`}
      onClick={onSelect}
    >
      {option.id === "91" || option.id === "123" ? (
        ""
      ) : (
        <div className="h-24 bg-gray-100 relative">
          <img
            src={option.img}
            alt={option.label}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="px-2 text-center mt-2">
        <div className="">{option.label}</div>
        <div className="text-sm text-gray-500">${option.price}</div>
      </div>
    </div>
  );
};

export default OptionCard;
