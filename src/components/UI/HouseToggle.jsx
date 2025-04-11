import React from "react";
import { GoHomeFill } from "react-icons/go";

const HouseToggle = ({ isActive, onClick }) => {
  return (
    <button
      className={`bg-white rounded-md p-2 shadow-lg flex items-center justify-center cursor-pointer ${
        isActive ? "" : "text-gray-700"
      }`}
      onClick={onClick}
      title="Toggle House View"
    >
      <div
        className={`${
          isActive
            ? "border-2 border-blue-200 p-1 rounded-md"
            : "p-1 border-2 border-transparent hover:border-blue-200 rounded-md"
        }`}
      >
        <GoHomeFill size={26} />
      </div>
    </button>
  );
};

export default HouseToggle;
