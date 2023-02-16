import chroma from "chroma-js";
import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import { fragmentShader, vertexShader } from "./shaders";
import polyline from "./Polyline";
import * as THREE from "three";

export default function Background(props: React.HTMLAttributes<HTMLElement>) {
  const conf = {
    cscale: chroma.scale(["purple", "yellow"]).mode("lch"),
    darken: -1,
    angle: Math.PI / 3,
    timeCoef: 0.1,
    nx: 40,
    ny: 100,
  };

  const [size, setSize] = React.useState({ width: 0, height: 0 });

  useEffect(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  }, [window.innerWidth, window.innerHeight]);

  const points = [] as THREE.Vector3[],
    uTime = { value: 0 },
    uTimeCoef = { value: conf.timeCoef },
    mat2 = Float32Array.from([
      Math.cos(conf.angle),
      -Math.sin(conf.angle),
      Math.sin(conf.angle),
      Math.cos(conf.angle),
    ]),
    { randFloat: rnd } = THREE.MathUtils;

  return (
    <Canvas className={`w-full h-full ${props.className || ""}`}>
      <mesh>
        <planeBufferGeometry attach="geometry" args={[conf.nx, conf.ny]} />
        <meshBasicMaterial attach="material" color="black" />
      </mesh>
      <mesh>
        <bufferGeometry attach="geometry" {...new polyline({ points })} />
        <shaderMaterial
          attach="material"
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
          uniforms={{
            uTime,
            uTimeCoef,
            uMat2: { value: mat2 },
            uSize: { value: 1.5 / conf.nx },
            uRnd1: {
              value: new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)),
            },
            uRnd2: {
              value: new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)),
            },
            uRnd3: {
              value: new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)),
            },
            uRnd4: {
              value: new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)),
            },
            uRnd5: {
              value: new THREE.Vector3(
                rnd(0.2, 0.5),
                rnd(0.3, 0.6),
                rnd(0.4, 0.7),
              ),
            },
            uColor1: { value: new THREE.Color(conf.cscale(1 / conf.nx).hex()) },
            uColor2: {
              value: new THREE.Color(
                conf
                  .cscale(1 / conf.nx)
                  .darken(conf.darken)
                  .hex(),
              ),
            },
          }}
        />
      </mesh>
    </Canvas>
  );
}
