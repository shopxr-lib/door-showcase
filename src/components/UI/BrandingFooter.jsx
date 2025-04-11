import React from "react";

const BrandingFooter = () => {
  return (
    <div className="text-center text-gray-800 text-sm font-medium flex items-center justify-center">
      Powered by
      <img
        src="/assets/ShopXRLogo.png"
        alt="ShopXR"
        className="h-4 ml-1"
        style={{
          maxWidth: "80px",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

export default BrandingFooter;
