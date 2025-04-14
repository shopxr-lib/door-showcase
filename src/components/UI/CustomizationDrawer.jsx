import React from "react";
import { FaTimes } from "react-icons/fa";
import { useConfig } from "../../context/ConfigContext";
import OptionCard from "./OptionCard";

const CustomizationDrawer = ({ isOpen, onClose }) => {
  const { config, updateConfig, PRICES } = useConfig();

  const doorWidthOptions = [
    {
      id: "91",
      label: "91 cm",
      price: PRICES.doorWidth["91"],
      img: "/thumbnails/width_91.png",
      desc: "W:91 x H:213 cm"
    },
    {
      id: "123",
      label: "123 cm",
      price: PRICES.doorWidth["123"],
      img: "/thumbnails/width_123.png",
      desc: "W:123 x H:213 cm"
    },
  ];

  const gateDesignOptions = [
    {
      id: "design1",
      label: "Design 1",
      price: PRICES.gateDesign.design1,
      img: "/assets/images/Gate/Gate 1 - Icon.png",
      desc: "H:213 cm"
    },
    {
      id: "design2",
      label: "Design 2",
      price: PRICES.gateDesign.design2,
      img: "/assets/images/Gate/Gate 2 - Icon.png",
      desc: "H:213 cm"
    },
    {
      id: "design3",
      label: "Design 3",
      price: PRICES.gateDesign.design3,
      img: "/assets/images/Gate/Gate 3 - Icon.png",
      desc: "H:213 cm"
    },
    {
      id: "design4",
      label: "Design 4",
      price: PRICES.gateDesign.design4,
      img: "/assets/images/Gate/Gate 4 - Icon.png",
      desc: "H:213 cm"
    },
  ];

  const doorLockOptions = [
    {
      id: "lock1",
      label: "Lock 1",
      price: PRICES.doorLockDesign.lock1,
      img: "/assets/images/DoorLock/Door Lock 1 - Icon.png",
      desc: "W:7.45 x H:40 x D:6.1 cm"
    },
    {
      id: "lock2",
      label: "Lock 2",
      price: PRICES.doorLockDesign.lock2,
      img: "/assets/images/DoorLock/Door Lock 2 - Icon.png",
      desc: "W:8.0 x H:38.9 x D:6.53 cm"
    },
    {
      id: "lock3",
      label: "Lock 3",
      price: PRICES.doorLockDesign.lock3,
      img: "/assets/images/DoorLock/Door Lock 3 - Icon.png",
      desc: "W:7.7 x H:37.5 x D:2.36 cm"
    },
  ];

  const doorMaterialOptions = [
    {
      id: "stone1",
      label: "Stone 1",
      price: PRICES.doorMaterial.stone1,
      img: "/assets/images/Textures_Imgs/Stone_Texture_1.jpg",
    },
    {
      id: "stone2",
      label: "Stone 2",
      price: PRICES.doorMaterial.stone2,
      img: "/assets/images/Textures_Imgs/Stone_Texture_2.png",
    },
    {
      id: "stone3",
      label: "Stone 3",
      price: PRICES.doorMaterial.stone3,
      img: "/assets/images/Textures_Imgs/Stone_Texture_3.png",
    },
    {
      id: "stone4",
      label: "Stone 4",
      price: PRICES.doorMaterial.stone4,
      img: "/assets/images/Textures_Imgs/Stone_Texture_4.png",
    },
    {
      id: "stone5",
      label: "Stone 5",
      price: PRICES.doorMaterial.stone5,
      img: "/assets/images/Textures_Imgs/Stone_Texture_5.png",
    },
    {
      id: "stone6",
      label: "Stone 6",
      price: PRICES.doorMaterial.stone6,
      img: "/assets/images/Textures_Imgs/Stone_Texture_6.png",
    },
    {
      id: "stone7",
      label: "Stone 7",
      price: PRICES.doorMaterial.stone7,
      img: "/assets/images/Textures_Imgs/Stone_Texture_7.png",
    },
    {
      id: "stone8",
      label: "Stone 8",
      price: PRICES.doorMaterial.stone8,
      img: "/assets/images/Textures_Imgs/Stone_Texture_8.png",
    },
  ];

  // Handle option selection
  const handleSelectOption = (category, optionId) => {
    updateConfig(category, optionId);
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 w-100 bg-white shadow-xl transition-transform transform px-6 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } overflow-y-auto`}
    >
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Customise Door</h2>
          <button
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={onClose}
          >
            <FaTimes size={24} />
          </button>
        </div>
        <p className="py-2">Create your own custom door and gate design.</p>
      </div>

      {/* Content */}
      <div className="px-4">
        {/* Door Width Section */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Door Width</h3>
          <div className="grid grid-cols-2 gap-4">
            {doorWidthOptions.map((option) => (
              <OptionCard
                key={option.id}
                option={option}
                isSelected={config.doorWidth === option.id}
                onSelect={() => handleSelectOption("doorWidth", option.id)}
              />
            ))}
          </div>
        </section>

        {/* Gate Design Section */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Gate Design</h3>
          <div className="grid grid-cols-2 gap-4">
            {gateDesignOptions.map((option) => (
              <OptionCard
                key={option.id}
                option={option}
                isSelected={config.gateDesign === option.id}
                onSelect={() => handleSelectOption("gateDesign", option.id)}
              />
            ))}
          </div>
        </section>

        {/* Door Lock Section */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Door Lock</h3>
          <div className="grid grid-cols-2 gap-4">
            {doorLockOptions.map((option) => (
              <OptionCard
                key={option.id}
                option={option}
                isSelected={config.doorLockDesign === option.id}
                onSelect={() => handleSelectOption("doorLockDesign", option.id)}
              />
            ))}
          </div>
        </section>

        {/* Door Material Section */}
        <section className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Door Material</h3>
          <div className="grid grid-cols-2 gap-4">
            {doorMaterialOptions.map((option) => (
              <OptionCard
                key={option.id}
                option={option}
                isSelected={config.doorMaterial === option.id}
                onSelect={() => handleSelectOption("doorMaterial", option.id)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CustomizationDrawer;
