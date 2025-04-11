import React from "react";

const DimensionsToggle = ({ isActive, onClick }) => {
  return (
    <button
      className={`bg-white rounded-md p-2 shadow-lg flex items-center justify-center cursor-pointer ${
        isActive ? "" : "text-gray-700"
      }`}
      onClick={onClick}
      title="Toggle Dimensions"
    >
      <div
        className={`${
          isActive
            ? "border-2 border-blue-200 p-1 rounded-md"
            : "p-1 border-2 border-transparent hover:border-blue-200 rounded-md"
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#868686"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="tabler-icon tabler-icon-ruler "
        >
          <path d="M5 4h14a1 1 0 0 1 1 1v5a1 1 0 0 1 -1 1h-7a1 1 0 0 0 -1 1v7a1 1 0 0 1 -1 1h-5a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1"></path>
          <path d="M4 8l2 0"></path>
          <path d="M4 12l3 0"></path>
          <path d="M4 16l2 0"></path>
          <path d="M8 4l0 2"></path>
          <path d="M12 4l0 3"></path>
          <path d="M16 4l0 2"></path>
        </svg>
      </div>
    </button>
  );
};

export default DimensionsToggle;
