import chroma from "chroma-js";
import { Canvas, useFrame } from "@react-three/fiber";
import { fragmentShader, vertexShader } from "./shaders";
import polyline from "./polyline";
import * as THREE from "three";
import { useEffect, useState } from "react";
import useLocal from "../../hooks/useLocal";

const conf = {
  cscale: chroma
    .scale(["#916ECA", "#D05FAD", "#F2698B", "#FD9E7E", "#EDBA5E"])
    .mode("lch"),
  darken: -1,
  sat: 0.25,
  angle: (Math.PI * 2) / 3,
  timeCoef: 0.04,
  nx: 25,
  ny: 70,
};

export default function Background({ className }: { className: string }) {
  const { settings } = useLocal();
  const [on, setOn] = useState(true);
  const [movingCanvas, setMovingCanvas] = useState<JSX.Element>();
  const [stoppedCanvas, setStoppedCanvas] = useState<JSX.Element>();

  useEffect(() => {
    const stoppedCanvas = (
      <Canvas
        id="stopped-canvas"
        className="bg-canvas brightness-75"
        fallback={<div className="fixed h-full w-full bg-black" />}
      >
        {init(true)}
      </Canvas>
    );
    const movingCanvas = (
      <Canvas
        id="moving-canvas"
        className="no-bg-canvas brightness-75"
        fallback={stoppedCanvas}
      >
        {init()}
      </Canvas>
    );
    setMovingCanvas(movingCanvas);
    setStoppedCanvas(stoppedCanvas);
  }, []);

  useEffect(() => {
    if (settings?.background != undefined && settings?.background != on) {
      setOn(settings?.background);
    }
  }, [settings]);

  function init(stopped: boolean = false) {
    const uTime = { value: 0 },
      uTimeCoef = { value: conf.timeCoef },
      dx = 2 / conf.nx,
      dy = -2 / (conf.ny - 1),
      ox = -1 + dx / 2,
      oy = 1,
      mat2 = Float32Array.from([
        Math.cos(conf.angle),
        -Math.sin(conf.angle),
        Math.sin(conf.angle),
        Math.cos(conf.angle),
      ]),
      lines = [] as any[],
      { randFloat: rnd } = THREE.MathUtils;
    for (let i = 0; i < conf.nx; i++) {
      const points: any[] = [];
      for (let j = 0; j < conf.ny; j++) {
        const x = ox + i * dx,
          y = oy + j * dy;
        points.push(new THREE.Vector3(x, y, 0));
      }
      lines.push(new polyline({ points }));
    }
    return lines.map((pline: typeof polyline, i: number) => {
      const deps = { uTime, uTimeCoef, rnd, mat2, conf };
      return (
        <CustomMesh deps={deps} pline={pline} key={i} i={i} stopped={stopped} />
      );
    });
  }

  return (
    <div className={className}>
      {stoppedCanvas}
      {movingCanvas}
      <div className="bg-overlay fixed left-0 top-0 z-10 h-full w-full brightness-75 backdrop-invert transition-all duration-500"></div>
    </div>
  );
}

function CustomMesh({ deps, pline, i, stopped }: any) {
  const { uTime, uTimeCoef, rnd, mat2, conf } = deps;
  useFrame(({ clock }) => {
    if (!stopped) {
      const t = clock.oldTime;
      uTime.value = t * 0.001;
    }
  });
  return (
    <mesh>
      <bufferGeometry
        attach="geometry"
        attributes={{
          ...pline.geometry.attributes,
        }}
        index={pline.geometry.index}
      />
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
              rnd(0.4, 0.7)
            ),
          },
          uColor1: { value: new THREE.Color(conf.cscale(i / conf.nx).hex()) },
          uColor2: {
            value: new THREE.Color(
              conf
                .cscale(i / conf.nx)
                .darken(conf.darken)
                .desaturate(conf.sat)
                .hex()
            ),
          },
        }}
      />
    </mesh>
  );
}
