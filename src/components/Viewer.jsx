import React from "react";
import { useEffect } from "react";
import { Environment } from "@react-three/drei";
import { useConfig } from "../context/ConfigContext";
import { Door, Gate, DoorLock, House, Dimensions } from "./comp";
import { useThree } from "@react-three/fiber";

const Viewer = ({ dimensionsVisible, showHouse }) => {
  const { config } = useConfig();
  const { camera } = useThree();

  // Adjust camera position based on the door width
  useEffect(() => {
    const doorWidth = parseInt(config.doorWidth);
    // Adjust camera position based on door width - move back for wider doors

    camera.position.z = 4;
  }, [config.doorWidth, camera]);

  return (
    <>
      {/* Scene lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <Environment preset="city" />

      {/* House model (optional) */}
      {showHouse && <House doorWidth={config.doorWidth} />}

      {/* Door components */}
      <group position={[0, -1, 0]}>
        {/* Door at the back */}
        <Door doorWidth={config.doorWidth} materialType={config.doorMaterial} />

        {/* Gate in front of the door */}
        <Gate designType={config.gateDesign} doorWidth={config.doorWidth} />

        {/* Door lock on the gate */}
        <DoorLock
          designType={config.doorLockDesign}
          doorWidth={config.doorWidth}
          gateType={config.gateDesign}
        />

        {/* Dimension lines/indicators */}
        {dimensionsVisible && <Dimensions doorWidth={config.doorWidth} />}
      </group>

      {/* Ground plane */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
        receiveShadow
      >
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.2} />
      </mesh>
    </>
  );
};

export default Viewer;
