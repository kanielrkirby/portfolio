import chroma from "chroma-js";
import * as THREE from "three";
import Polyline from "./Polyline";
import { fragmentShader, vertexShader } from "./shaders";

export default function Inspo() {
  const conf = {
    nx: 40,
    ny: 100,
    cscale: chroma
      .scale(["#2175D8", "#DC5DCE", "#CC223D", "#F07414", "#FDEE61", "#74C425"])
      .mode("lch"),
    darken: -1,
    angle: Math.PI / 3,
    timeCoef: 0.1,
  };
  const canvas = document.createElement("canvas");
  canvas.id = "canvas";
  document.querySelector("#root")!.appendChild(canvas);

  let renderer: THREE.Renderer,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera;
  let width, height;
  const { randFloat: rnd } = THREE.MathUtils;

  const uTime = { value: 0 },
    uTimeCoef = { value: conf.timeCoef };
  const polylines = [];

  init();

  function init() {
    renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("canvas")!,
      antialias: true,
    });
    camera = new THREE.PerspectiveCamera();

    updateSize();
    window.addEventListener("resize", updateSize, false);

    initScene();
    requestAnimationFrame(animate);
  }

  function initScene() {
    scene = new THREE.Scene();

    const dx = 2 / conf.nx,
      dy = -2 / (conf.ny - 1);
    const ox = -1 + dx / 2,
      oy = 1;
    const mat2 = Float32Array.from([
      Math.cos(conf.angle),
      -Math.sin(conf.angle),
      Math.sin(conf.angle),
      Math.cos(conf.angle),
    ]);
    for (let i = 0; i < conf.nx; i++) {
      const points = [];
      for (let j = 0; j < conf.ny; j++) {
        const x = ox + i * dx,
          y = oy + j * dy;
        points.push(new THREE.Vector3(x, y, 0));
      }
      const polyline = new Polyline({ points });
      polylines.push(polyline);

      const material = new THREE.ShaderMaterial({
        uniforms: {
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
                .hex(),
            ),
          },
        },
        vertexShader,
        fragmentShader,
      });
      const mesh = new THREE.Mesh(polyline.geometry, material);
      scene.add(mesh);
    }
  }

  function animate(t: number) {
    uTime.value = t * 0.001;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  function updateSize() {
    width = window.innerWidth;
    height = window.innerHeight;
    renderer.setSize(width, height);
  }
}
