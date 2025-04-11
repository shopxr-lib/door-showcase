import React from "react";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";

const House = ({ doorWidth }) => {
  const houseRef = useRef();
  const { scene } = useGLTF("/assets/models/house-exterior.glb");

  useEffect(() => {
    if (houseRef.current) {
      // Position the house appropriately
      houseRef.current.position.set(0, -1.12, -0.03); // Position behind the door/gate

      // Apply different scaling based on door width
      if (doorWidth === "91") {
        // Scaling for 91cm door width
        houseRef.current.scale.set(0.95, 1, 1);
      } else if (doorWidth === "123") {
        // Scaling for 123cm door width
        houseRef.current.scale.set(1.25, 1, 1);
      }
    }
  }, [doorWidth]);

  return (
    <group ref={houseRef}>
      <primitive object={scene.clone()} />
    </group>
  );
};

// Preload the house model
useGLTF.preload("/assets/models/house-exterior.glb");

export default House;
