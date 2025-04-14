import React from "react";
import { FaTimes } from "react-icons/fa";
import { useConfig } from "../../context/ConfigContext";

const CartDrawer = ({ isOpen, onToggle }) => {
  const { config, updateConfig, finalTotalPrice, PRICES } = useConfig();

  // Get the display names for the current configuration
  const getDisplayName = (type, id) => {
    const displayMap = {
      doorWidth: { 91: "W:91 x H:213 cm", 123: "W:123 x H:213 cm" },
      gateDesign: {
        design1: "Gate Design 1",
        design2: "Gate Design 2",
        design3: "Gate Design 3",
        design4: "Gate Design 4",
      },
      gateDimensions: {
        design1: `W:${config.doorWidth} x H:213 cm`,
        design2: `W:${config.doorWidth} x H:213 cm`,
        design3: `W:${config.doorWidth} x H:213 cm`,
        design4: `W:${config.doorWidth} x H:213 cm`,
      },
      doorLockDesign: {
        lock1: "Door Lock Design 1",
        lock2: "Door Lock Design 2",
        lock3: "Door Lock Design 3",
      },
      doorLockDimensions: {
        lock1: "W:7.45 x H:40 x D:6.1 cm",
        lock2: "W:8.0 x H:38.9 x D:6.53 cm",
        lock3: "W:7.7 x H:37.5 x D:2.36 cm",
      },
      doorMaterial: {
        stone1: "Stone Texture 1",
        stone2: "Stone Texture 2",
        stone3: "Stone Texture 3",
        stone4: "Stone Texture 4",
        stone5: "Stone Texture 5",
        stone6: "Stone Texture 6",
        stone7: "Stone Texture 7",
        stone8: "Stone Texture 8",
      },
    };

    return displayMap[type][id] || id;
  };

  // Handle installation checkbox
  const handleInstallationChange = (e) => {
    updateConfig("installation", e.target.checked);
  };

  // Handle save design
  const handleSaveDesign = () => {
    console.log("Saving design:", config);
    alert("Design saved successfully!");
  };

  return (
    <>
      {/* Cart Button */}
      <button
        className="bg-blue-500/80 text-white rounded-full p-4 gap-3 w-30 shadow-lg flex items-center justify-center cursor-pointer"
        onClick={onToggle}
        title="View Cart"
      >
        <span className="tracking-wider">${finalTotalPrice}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="none"
          className="tabler-icon tabler-icon-shopping-cart-filled text-white"
        >
          <path d="M6 2a1 1 0 0 1 .993 .883l.007 .117v1.068l13.071 .935a1 1 0 0 1 .929 1.024l-.01 .114l-1 7a1 1 0 0 1 -.877 .853l-.113 .006h-12v2h10a3 3 0 1 1 -2.995 3.176l-.005 -.176l.005 -.176c.017 -.288 .074 -.564 .166 -.824h-5.342a3 3 0 1 1 -5.824 1.176l-.005 -.176l.005 -.176a3.002 3.002 0 0 1 1.995 -2.654v-12.17h-1a1 1 0 0 1 -.993 -.883l-.007 -.117a1 1 0 0 1 .883 -.993l.117 -.007h2zm0 16a1 1 0 1 0 0 2a1 1 0 0 0 0 -2zm11 0a1 1 0 1 0 0 2a1 1 0 0 0 0 -2z"></path>
        </svg>
      </button>

      {/* Cart Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-100 bg-white shadow-xl transition-transform transform px-6 py-2 z-10 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } overflow-y-auto`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={onToggle}
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-4">Items</h3>

          {/* Door Width */}
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="font-medium">Door Dimensions</p>
              <p className="text-sm text-gray-500">
                {getDisplayName("doorWidth", config.doorWidth)}
              </p>
            </div>
            <p className="font-medium">${PRICES.doorWidth[config.doorWidth]}</p>
          </div>

          {/* Gate Design */}
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="font-medium">Gate Design</p>
              <p className="text-sm text-gray-500">
                {getDisplayName("gateDesign", config.gateDesign)}
              </p>
              <p className="text-sm text-gray-500">
                {getDisplayName("gateDimensions", config.gateDesign)}
              </p>
            </div>
            <p className="font-medium">
              ${PRICES.gateDesign[config.gateDesign]}
            </p>
          </div>

          {/* Door Lock Design */}
          <div className="flex justify-between items-center mb-2">
            <div>
              <p className="font-medium">Door Lock</p>
              <p className="text-sm text-gray-500">
                {getDisplayName("doorLockDesign", config.doorLockDesign)}
              </p>
              <p className="text-sm text-gray-500">
                {getDisplayName("doorLockDimensions", config.doorLockDesign)}
              </p>
            </div>
            <p className="font-medium">
              ${PRICES.doorLockDesign[config.doorLockDesign]}
            </p>
          </div>

          {/* Door Material */}
          <div className="flex justify-between items-center mb-4 pb-4">
            <div>
              <p className="font-medium">Door Material</p>
              <p className="text-sm text-gray-500">
                {getDisplayName("doorMaterial", config.doorMaterial)}
              </p>
            </div>
            <p className="font-medium">
              ${PRICES.doorMaterial[config.doorMaterial]}
            </p>
          </div>

          {/* Installation Option */}
          <div className="flex items-center justify-between py-3">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={config.includeInstallation}
                onChange={handleInstallationChange}
                className="form-checkbox h-5 w-5 text-teal-500"
              />
              <span className="ml-2 text-gray-700">Include Installation</span>
            </label>
            <p className="font-medium">${PRICES.installation}</p>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center py-4 mt-4">
            <p className="text-lg font-bold">Total</p>
            <p className="text-lg font-bold">${finalTotalPrice}</p>
          </div>

          {/* Save Button */}

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <button
              className="w-full mx-auto hover:bg-blue-500/90 bg-blue-500/80 text-white py-1.5 rounded-sm font-medium cursor-pointer"
              onClick={handleSaveDesign}
            >
              Save Design
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
