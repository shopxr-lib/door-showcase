import React from "react";
import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";

const DoorLock = ({ designType, doorWidth, gateType }) => {
  const lockRef = useRef();
  const lockDesign1 = useGLTF("/assets/models/Door-lock-1.glb");
  const lockDesign2 = useGLTF("/assets/models/Door-lock-2.glb");
  const lockDesign3 = useGLTF("/assets/models/Door-lock-3.glb");

  // Map design types to models
  const lockModels = {
    lock1: lockDesign1.scene.clone(),
    lock2: lockDesign2.scene.clone(),
    lock3: lockDesign3.scene.clone(),
  };

  // Position the lock based on door width and gate type
  useEffect(() => {
    if (lockRef.current) {
      // Clear previous children
      while (lockRef.current.children.length > 0) {
        lockRef.current.remove(lockRef.current.children[0]);
      }

      // Add the selected lock design
      const selectedLock = lockModels[designType].clone();
      lockRef.current.add(selectedLock);

      // Calculate position based on door width and gate type
      const width = parseInt(doorWidth);
      let xPos = 0;
      let zPos = 0.016; // Position slightly in front of the gate

      // Adjust position based on gate type
      switch (gateType) {
        case "design1":
          xPos = width / 275;
          break;
        case "design2":
          xPos = width / 240 - 0.05;
          break;
        case "design3":
          xPos = width / 210 - 0.1;
          break;
        case "design4":
          xPos = width / 170 - 0.15;
          break;
        default:
          xPos = width / 200;
      }

      lockRef.current.position.set(xPos, 1, zPos);
    }
  }, [designType, doorWidth, gateType]);

  return <group ref={lockRef} castShadow />;
};

// Preload all lock models
useGLTF.preload("/assets/models/Door-lock-1.glb");
useGLTF.preload("/assets/models/Door-lock-2.glb");
useGLTF.preload("/assets/models/Door-lock-3.glb");

export default DoorLock;
