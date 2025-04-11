import React from "react";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";

const Gate = ({ designType, doorWidth }) => {
  const gateRef = useRef();
  const gateDesign1 = useGLTF("/assets/models/gate-1.glb");
  const gateDesign2 = useGLTF("/assets/models/gate-2.glb");
  const gateDesign3 = useGLTF("/assets/models/gate-3.glb");
  const gateDesign4 = useGLTF("/assets/models/gate-4.glb");

  // Map design types to models
  const gateModels = {
    design1: gateDesign1.scene.clone(),
    design2: gateDesign2.scene.clone(),
    design3: gateDesign3.scene.clone(),
    design4: gateDesign4.scene.clone(),
  };

  // Apply door width to gate
  useEffect(() => {
    if (gateRef.current) {
      // Clear previous children
      while (gateRef.current.children.length > 0) {
        gateRef.current.remove(gateRef.current.children[0]);
      }

      // Add the selected gate design
      const selectedGate = gateModels[designType].clone();
      gateRef.current.add(selectedGate);

      // Scale the gate based on door width
      const width = parseInt(doorWidth) / 100; // Convert to meters
      const standardWidth = 0.91; // 91cm base width
      const scaleX = width / standardWidth;

      // Keep the original scale for Y (height) and Z (depth)
      const originalScaleY = selectedGate.scale.y;
      const originalScaleZ = selectedGate.scale.z;

      // Apply scaling only to the X-axis
      gateRef.current.scale.set(scaleX, originalScaleY, originalScaleZ);
    }
  }, [designType, doorWidth]);

  return <group ref={gateRef} position={[0, 0, 0]} castShadow />;
};

// Preload the models for faster loading
useGLTF.preload("/assets/models/gate-1.glb");
useGLTF.preload("/assets/models/gate-2.glb");
useGLTF.preload("/assets/models/gate-3.glb");
useGLTF.preload("/assets/models/gate-4.glb");

export default Gate;
