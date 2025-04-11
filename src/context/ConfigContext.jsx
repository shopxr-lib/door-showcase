import { createContext, useContext, useState } from "react";

const prices = {
  doorWidth: {
    91: 310,
    123: 510,
  },
  gateDesign: {
    design1: 1320,
    design2: 1320,
    design3: 1320,
    design4: 1320,
  },
  doorLockDesign: {
    lock1: 888,
    lock2: 999,
    lock3: 699,
  },
  doorMaterial: {
    stone1: 800,
    stone2: 810,
    stone3: 820,
    stone4: 830,
    stone5: 840,
    stone6: 850,
    stone7: 860,
    stone8: 870,
  },
  installation: 180,
};

const ConfigContext = createContext();

export const ConfigProvider = ({ children }) => {
  // Default configuration values
  const [config, setConfig] = useState({
    doorWidth: 91,
    gateDesign: "design1",
    doorLockDesign: "lock1",
    doorMaterial: "stone1",
    installation: false,
  });

  // Calculate total price based on selected options
  const calculateTotalPrice = () => {
    let totalPrice = 0;

    // Add price for door width
    totalPrice += prices.doorWidth[config.doorWidth];

    // Add price for gate design
    totalPrice += prices.gateDesign[config.gateDesign];

    // Add price for door lock design
    totalPrice += prices.doorLockDesign[config.doorLockDesign];

    // Add price for door material
    totalPrice += prices.doorMaterial[config.doorMaterial];

    // Add installation cost if selected
    if (config.installation) {
      totalPrice += prices.installation;
    }

    return totalPrice;
  };

  // Function to update configuration values
  const updateConfig = (key, value) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      [key]: value,
    }));
  };

  // Get the total sum from the calculate function
  const finalTotalPrice = calculateTotalPrice();

  return (
    <ConfigContext.Provider
      value={{ config, updateConfig, finalTotalPrice, PRICES: prices }}
    >
      {children}
    </ConfigContext.Provider>
  );
};

// Custom hook to use the ConfigContext
export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};
