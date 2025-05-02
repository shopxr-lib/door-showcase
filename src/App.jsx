import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import {
  Viewer,
  DimensionsToggle,
  CustomizationDrawer,
  CartDrawer,
  HouseToggle,
  BrandingFooter,
} from "./components/comp";
import { ConfigProvider } from "./context/ConfigContext";

import "./App.css";
import { BsDoorOpen } from "react-icons/bs";

function App() {
  const [dimensionsVisible, setDimensionsVisible] = useState(false);
  const [customizationOpen, setCustomizationOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [showHouse, setShowHouse] = useState(false);

  return (
    <ConfigProvider>
      <div className="app-container bg-gray-300">
        <div className="canvas-container ">
          <Canvas
            shadows
            camera={{ position: [0, 1, 4], fov: 50 }}
            dpr={[1, 2]}
          >
            <Suspense fallback={null}>
              <Viewer
                dimensionsVisible={dimensionsVisible}
                showHouse={showHouse}
              />
            </Suspense>
            <OrbitControls
              minDistance={0.8}
              maxDistance={10}
              minPolarAngle={0.5}
              maxPolarAngle={Math.PI / 2 - 0.1}
              minAzimuthAngle={-Math.PI / 3}
              maxAzimuthAngle={Math.PI / 3}
              enablePan={false}
            />
          </Canvas>
        </div>

        {/* UI Controls */}
        <div className="absolute top-6 left-6">
          <DimensionsToggle
            isActive={dimensionsVisible}
            onClick={() => setDimensionsVisible(!dimensionsVisible)}
          />
        </div>

        <div className="absolute bottom-10 left-6">
          <button
            className="bg-white rounded-md p-2 shadow-lg flex items-center justify-center cursor-pointer"
            onClick={() => setCustomizationOpen(!customizationOpen)}
          >
            <span className="material-icons p-2 border-2 rounded-md border-blue-300">
              <BsDoorOpen size={28} color="#4e4c4c" />
            </span>
          </button>
        </div>

        <div className="absolute top-6 right-6">
          <CartDrawer
            isOpen={cartOpen}
            onToggle={() => setCartOpen(!cartOpen)}
          />
        </div>

        <div className="absolute bottom-10 right-6">
          <HouseToggle
            isActive={showHouse}
            onClick={() => setShowHouse(!showHouse)}
          />
        </div>

        <div className="absolute bottom-3 w-full">
          <BrandingFooter />
        </div>

        {/* Drawers */}
        <CustomizationDrawer
          isOpen={customizationOpen}
          onClose={() => setCustomizationOpen(false)}
        />
      </div>
    </ConfigProvider>
  );
}

export default App;
