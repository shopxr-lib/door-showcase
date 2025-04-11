import { useEffect } from "react";
import { useThree } from "@react-three/fiber";

export default useCustomControls = (orbitControlsRef) => {
  const { camera } = useThree();

  useEffect(() => {
    if (orbitControlsRef.current) {
      // Set minimum distance to prevent camera from going through the model
      orbitControlsRef.current.minDistance = 2;
      // Set maximum distance to keep model in view
      orbitControlsRef.current.maxDistance = 10;

      // Limit vertical rotation to prevent viewing from below or high above
      orbitControlsRef.current.minPolarAngle = Math.PI / 6; // 30 degrees from top
      orbitControlsRef.current.maxPolarAngle = Math.PI / 2; // 90 degrees (horizontal)

      // Limit horizontal rotation to prevent viewing from behind
      orbitControlsRef.current.minAzimuthAngle = -Math.PI / 4; // -45 degrees
      orbitControlsRef.current.maxAzimuthAngle = Math.PI / 4; // 45 degrees

      // Disable panning to keep model centered
      orbitControlsRef.current.enablePan = false;
    }
  }, [orbitControlsRef]);

  return null;
};
