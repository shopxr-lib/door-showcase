import React from "react";
import { useEffect, useRef } from "react";
import { useGLTF, useEnvironment } from "@react-three/drei";
import * as THREE from 'three'

const Gate = ({ designType, doorWidth }) => {
  const gateRef = useRef();
  const gateDesign1 = useGLTF("/assets/models/gate-1.glb");
  const gateDesign2 = useGLTF("/assets/models/gate-2.glb");
  const gateDesign3 = useGLTF("/assets/models/gate-3.glb");
  const gateDesign4 = useGLTF("/assets/models/gate-4.glb");

   // Load environment map for reflections
   const envMap = useEnvironment({ files: '/assets/envmap/venice_sunset_1k.hdr' });

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
      
      // Apply reflective materials to all meshes
      selectedGate.traverse((child) => {
        if (child.isMesh && child.material) {
          // Special handling for gate-2 glass parts
          if (designType === "design2") {
            if (child.name.includes("glass") || 
                (child.material.name && child.material.name.includes("glass")) || 
                child.material.transparent) {
              
              // Handle material arrays
              if (Array.isArray(child.material)) {
                child.material = child.material.map(mat => {
                  // Create a new material while preserving textures
                  const newMat = new THREE.MeshPhysicalMaterial({
                    map: mat.map,
                    normalMap: mat.normalMap,
                    roughnessMap: mat.roughnessMap,
                    metalnessMap: mat.metalnessMap,
                    alphaMap: mat.alphaMap,
                    envMap: envMap,
                    transparent: true,
                    opacity: 0.8,
                    side: THREE.DoubleSide,
                    depthWrite: false,
                    metalness: 0.2,
                    roughness: 0.1,
                    envMapIntensity: 0.8,
                    transmission: 0.9, // For glass-like material
                    clearcoat: 1.0     // Add a clear coat for more realistic glass
                  });
                  return newMat;
                });
              } else {
                // Clone the original material to preserve properties
                const originalMat = child.material;
                child.material = new THREE.MeshPhysicalMaterial({
                  map: originalMat.map,
                  normalMap: originalMat.normalMap,
                  roughnessMap: originalMat.roughnessMap,
                  metalnessMap: originalMat.metalnessMap,
                  alphaMap: originalMat.alphaMap,
                  envMap: envMap,
                  transparent: true,
                  opacity: 0.8,
                  side: THREE.DoubleSide,
                  depthWrite: false,
                  metalness: 0.2,
                  roughness: 0.1,
                  envMapIntensity: 0.8,
                  transmission: 0.9, // For glass-like material
                  clearcoat: 1.0     // Add a clear coat for more realistic glass
                });
              }
              
              // Fix UV mapping if needed
              if (child.geometry) {
                child.geometry.attributes.uv.needsUpdate = true;
              }
            }
          } else {
            // Handle material arrays for non-gate-2 or non-glass parts
            if (Array.isArray(child.material)) {
              child.material.forEach(mat => {
                // Add reflections
                mat.envMap = envMap;
                mat.envMapIntensity = 0.6; 
                mat.metalness = 0.7;
                mat.roughness = 0;
                mat.needsUpdate = true;
              });
            } else {
              // Handle single material for non-glass parts
              child.material.envMap = envMap;
              child.material.envMapIntensity = 0.6;
              child.material.metalness = 0.2;
              child.material.roughness = 0.3;
              child.material.needsUpdate = true;
            }
          }
        }
      });
      
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
  }, [designType, doorWidth, envMap]);

  return <group ref={gateRef} position={[0, 0, 0]} castShadow />;
};

// Preload the models for faster loading
useGLTF.preload("/assets/models/gate-1.glb");
useGLTF.preload("/assets/models/gate-2.glb");
useGLTF.preload("/assets/models/gate-3.glb");
useGLTF.preload("/assets/models/gate-4.glb");

export default Gate;
