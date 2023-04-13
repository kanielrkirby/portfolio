import chroma from "chroma-js";
import { Canvas, useFrame } from "@react-three/fiber";
import { fragmentShader, vertexShader } from "./shaders";
import polyline from "./polyline";
import * as THREE from "three";

export default function Background({ className }: { className: string }) {
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
    polylines = [] as any[],
    { randFloat: rnd } = THREE.MathUtils;
  for (let i = 0; i < conf.nx; i++) {
    const points: any[] = [];
    for (let j = 0; j < conf.ny; j++) {
      const x = ox + i * dx,
        y = oy + j * dy;
      points.push(new THREE.Vector3(x, y, 0));
    }
    polylines.push(new polyline({ points }));
  }

  return (
    <div className={className}>
      <Canvas
        className="bg-canvas brightness-75"
        fallback={
          <div className="no-bg-canvas h-full w-full bg-gradient-to-br from-amber-400 to-violet-900"></div>
        }
      >
        {polylines.map((pline: typeof polyline, i: number) => {
          const deps = { uTime, uTimeCoef, rnd, mat2, conf };
          return <CustomMesh deps={deps} pline={pline} key={i} i={i} />;
        })}
      </Canvas>
      <div className="no-bg-canvas h-full w-full bg-gradient-to-br from-amber-400 to-violet-900"></div>
      <div className="bg-overlay fixed top-0 left-0 z-10 h-full w-full brightness-75 backdrop-invert transition-all duration-500"></div>
    </div>
  );
}

function CustomMesh({ deps, pline, i }: any) {
  const { uTime, uTimeCoef, rnd, mat2, conf } = deps;
  useFrame(({ clock }) => {
    const t = clock.oldTime;
    uTime.value = t * 0.001;
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
              rnd(0.4, 0.7),
            ),
          },
          uColor1: { value: new THREE.Color(conf.cscale(i / conf.nx).hex()) },
          uColor2: {
            value: new THREE.Color(
              conf
                .cscale(i / conf.nx)
                .darken(conf.darken)
                .desaturate(conf.sat)
                .hex(),
            ),
          },
        }}
      />
    </mesh>
  );
}
