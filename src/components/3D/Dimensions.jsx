import React from "react";
import { Text, Line } from "@react-three/drei";
import * as THREE from "three";

const Dimensions = ({ doorWidth }) => {
  const width = parseInt(doorWidth) / 100; // Convert to meters
  const halfWidth = width / 2;
  const height = 2.13; // Height of the door in meters = 213cm

  // Create rounded rectangle shape
  const createRoundedRectShape = (width, height, radius) => {
    const shape = new THREE.Shape();

    shape.moveTo(-width / 2 + radius, -height / 2);
    shape.lineTo(width / 2 - radius, -height / 2);
    shape.quadraticCurveTo(
      width / 2,
      -height / 2,
      width / 2,
      -height / 2 + radius
    );
    shape.lineTo(width / 2, height / 2 - radius);
    shape.quadraticCurveTo(
      width / 2,
      height / 2,
      width / 2 - radius,
      height / 2
    );
    shape.lineTo(-width / 2 + radius, height / 2);
    shape.quadraticCurveTo(
      -width / 2,
      height / 2,
      -width / 2,
      height / 2 - radius
    );
    shape.lineTo(-width / 2, -height / 2 + radius);
    shape.quadraticCurveTo(
      -width / 2,
      -height / 2,
      -width / 2 + radius,
      -height / 2
    );

    return shape;
  };

  // Card dimensions
  const cardWidth = 0.4;
  const cardHeight = 0.25;
  const borderRadius = 0.04;

  // Create shapes for card and border
  const cardShape = createRoundedRectShape(cardWidth, cardHeight, borderRadius);
  const borderShape = createRoundedRectShape(
    cardWidth + 0.02,
    cardHeight + 0.02,
    borderRadius
  );
  return (
    <group position={[0, 0.1, 0.1]}>
      {/* Width line */}
      <group position={[0, 0.1, 0]}>
        {/* Horizontal line */}
        <Line
          points={[
            [-halfWidth, 0, 0],
            [halfWidth, 0, 0],
          ]}
          color="red"
          lineWidth={3}
        />

        {/* Left vertical line */}
        <Line
          points={[
            [-halfWidth, 0, 0],
            [-halfWidth, 0.1, 0],
          ]}
          color="red"
          lineWidth={3}
        />

        {/* Right vertical line */}
        <Line
          points={[
            [halfWidth, 0, 0],
            [halfWidth, 0.1, 0],
          ]}
          color="red"
          lineWidth={3}
        />

        {/* Card border (slightly larger, positioned behind) */}
        <mesh position={[0, 0.15, -0.02]}>
          <shapeGeometry args={[borderShape]} />
          <meshBasicMaterial color="black" transparent opacity={0.2} />
        </mesh>

        {/* Card background */}
        <mesh position={[0, 0.15, -0.01]}>
          <shapeGeometry args={[cardShape]} />
          <meshBasicMaterial color="white" transparent opacity={1} />
        </mesh>

        {/* Width text */}
        <Text
          position={[0, 0.15, 0]}
          fontSize={0.1}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          {doorWidth} cm
        </Text>
      </group>
    </group>
  );
};

export default Dimensions;
