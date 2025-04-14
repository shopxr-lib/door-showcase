import React from "react";
import { useEffect, useRef } from "react";
import { useGLTF, useEnvironment } from "@react-three/drei";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const Door = ({ doorWidth, materialType }) => {
  const doorRef = useRef();
  const { scene } = useGLTF("/assets/models/door-updated.glb");

  // Load environment map for reflections
  const envMap = useEnvironment({files: '/assets/envmap/venice_sunset_1k.hdr'})

  // Clone the scene once at component mount
  const doorScene = useRef(scene.clone());

  // Load textures for different door materials
  const textures = {
    stone1: useTexture("/assets/images/Textures_Imgs/Stone_Texture_1.jpg"),
    stone2: useTexture("/assets/images/Textures_Imgs/Stone_Texture_2.png"),
    stone3: useTexture("/assets/images/Textures_Imgs/Stone_Texture_3.png"),
    stone4: useTexture("/assets/images/Textures_Imgs/Stone_Texture_4.png"),
    stone5: useTexture("/assets/images/Textures_Imgs/Stone_Texture_5.png"),
    stone6: useTexture("/assets/images/Textures_Imgs/Stone_Texture_6.png"),
    stone7: useTexture("/assets/images/Textures_Imgs/Stone_Texture_7.png"),
    stone8: useTexture("/assets/images/Textures_Imgs/Stone_Texture_8.png"),
  };

  // Configure textures
  Object.values(textures).forEach((texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
  });

  // Find the door mesh in the scene heierarchy
  const findDoorMesh = (object) => {
    let doorMesh = null;
    object.traverse((child) => {
      // Check if the child is a mesh and has a material
      if (child.isMesh && child.material) {
        doorMesh = child;
      }
    });
    return doorMesh;
  };

  // Apply door width and material
  useEffect(() => {
    if (doorRef.current) {
      // Scale the door based on width
      const width = parseInt(doorWidth) / 100; // Convert to meters
      
      if(width === 0.91) {
        doorRef.current.scale.set(width + 0.1, 1, 1);
      } else if(width === 1.23) {
        doorRef.current.scale.set(width + 0.13, 1, 1);
      }

      // Find and update the door mesh material
      const doorMesh = findDoorMesh(doorRef.current);

      if (doorMesh) {
        // Ensure we're working with a material instance that can be modified
        if (Array.isArray(doorMesh.material)) {
          // Handle multi-material objects
          doorMesh.material.forEach((mat) => {
            mat.map = textures[materialType];

            // Add reflections
            mat.envMap = envMap;
            mat.envMapIntensity = 0.5; // Reflection intensity
            mat.metalness = 0.8; // Some metalness for better reflections
            mat.roughness = 0.9; // Slightly rough for more realistic reflections

            mat.needsUpdate = true;
          });
        } else {
          // Handle single material
          doorMesh.material.map = textures[materialType];

          // Add Reflections
          doorMesh.material.envMap = envMap;
          doorMesh.material.envMapIntensity = 0.5;
          doorMesh.material.metalness = 0.8;
          doorMesh.material.roughness = 0.4;

          doorMesh.material.needsUpdate = true;
        }
      } else {
        console.error("Could not find door mesh with material");
      }
    }
  }, [doorWidth, materialType, envMap]);

  return (
    <group ref={doorRef} position={[0, 0, -0.15]} castShadow>
      <primitive object={doorScene.current} />
    </group>
  );
};

// Ensure the model is loaded before rendering
useGLTF.preload("/assets/models/door-updated.glb");

export default Door;
