import chroma from "chroma-js";
import { Canvas } from "@react-three/fiber";
import React from "react";

export default function Background(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <Canvas className={`${props}`}>
      <mesh>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <meshStandardMaterial attach="material" />
      </mesh>
    </Canvas>
  );
}
