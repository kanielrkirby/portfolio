import { Vector3 } from "three/src/math/Vector3";
import { BufferGeometry } from "three/src/core/BufferGeometry";
import { BufferAttribute } from "three/src/core/BufferAttribute";
import type { Renderer, Camera } from "three";
import { Color } from "three/src/math/Color";
import { Mesh } from "three/src/objects/Mesh";
import { Scene } from "three/src/scenes/Scene";
import { WebGLRenderer } from "three/src/renderers/WebGLRenderer";
import { PerspectiveCamera } from "three/src/cameras/PerspectiveCamera";
import { ShaderMaterial } from "three/src/materials/ShaderMaterial";
import tc from "tinycolor2";
class Polyline {
  tmp = new Vector3();
  points: Vector3[];
  count: number;
  geometry?: BufferGeometry;
  position?: Float32Array;
  prev?: Float32Array;
  next?: Float32Array;

  constructor(params: { points: Vector3[] }) {
    const { points } = params;
    this.points = points;
    this.count = points.length;
    this.init();
    this.updateGeometry();
  }

  init() {
    this.geometry = new BufferGeometry();
    this.position = new Float32Array(this.count * 3 * 2);
    this.prev = new Float32Array(this.count * 3 * 2);
    this.next = new Float32Array(this.count * 3 * 2);
    const side = new Float32Array(this.count * 1 * 2);
    const uv = new Float32Array(this.count * 2 * 2);
    const index = new Uint16Array((this.count - 1) * 3 * 2);

    for (let i = 0; i < this.count; i++) {
      const i2 = i * 2;
      side.set([-1, 1], i2);
      const v = i / (this.count - 1);
      uv.set([0, v, 1, v], i * 4);

      if (i === this.count - 1) continue;
      index.set([i2 + 0, i2 + 1, i2 + 2], (i2 + 0) * 3);
      index.set([i2 + 2, i2 + 1, i2 + 3], (i2 + 1) * 3);
    }

    this.geometry.setAttribute(
      "position",
      new BufferAttribute(this.position, 3)
    );
    this.geometry.setAttribute("prev", new BufferAttribute(this.prev, 3));
    this.geometry.setAttribute("next", new BufferAttribute(this.next, 3));
    this.geometry.setAttribute("side", new BufferAttribute(side, 1));
    this.geometry.setAttribute("uv", new BufferAttribute(uv, 2));
    this.geometry.setIndex(new BufferAttribute(index, 1));
  }

  updateGeometry() {
    this.points.forEach((p, i) => {
      if (this.position) {
        p.toArray(this.position, i * 3 * 2);
        p.toArray(this.position, i * 3 * 2 + 3);
      }
      if (!i) {
        this.tmp
          .copy(p)
          .sub(this.points[i + 1])
          .add(p);
        if (this.prev) {
          this.tmp.toArray(this.prev, i * 3 * 2);
          this.tmp.toArray(this.prev, i * 3 * 2 + 3);
        }
      } else if (this.next) {
        p.toArray(this.next, (i - 1) * 3 * 2);
        p.toArray(this.next, (i - 1) * 3 * 2 + 3);
      }

      if (i === this.points.length - 1) {
        this.tmp
          .copy(p)
          .sub(this.points[i - 1])
          .add(p);
        if (this.next) {
          this.tmp.toArray(this.next, i * 3 * 2);
          this.tmp.toArray(this.next, i * 3 * 2 + 3);
        }
      } else if (this.prev) {
        p.toArray(this.prev, (i + 1) * 3 * 2);
        p.toArray(this.prev, (i + 1) * 3 * 2 + 3);
      }
    });

    if (this.geometry) {
      this.geometry.attributes.position.needsUpdate = true;
      this.geometry.attributes.prev.needsUpdate = true;
      this.geometry.attributes.next.needsUpdate = true;
    }
  }
}

let colors = [
  tc("#916ECA"),
  tc("#D05FAD"),
  tc("#F2698B"),
  tc("#FD9E7E"),
  tc("#EDBA5E"),
];
for (let i = 3; i > 0; i--) {
  let temp = [...colors];
  for (let i = 0; i < colors.length - 1; i++) {
    const n = i * 2 + 1;
    temp.splice(n, 0, tc.mix(colors[i], colors[i + 1]));
  }
  colors = temp;
}

const conf = {
  colors,
  darken: -1,
  brighten: 1,
  sat: 0.25,
  angle: (Math.PI * 2) / 3.3,
  timeCoef: 0.02,
  nx: colors.length,
  ny: 70,
};
let renderer: Renderer, scene: Scene, camera: Camera;
let width: number, height: number;

const uTime = { value: 0 },
  uTimeCoef = { value: conf.timeCoef };
const polylines = [];
const rnd = (max: number, min: number) => Math.random() * (max - min) + min;

renderer = new WebGLRenderer({
  canvas: document.querySelector("#canvas") as HTMLCanvasElement,
  antialias: true,
});
camera = new PerspectiveCamera();

updateSize();
window.addEventListener("resize", updateSize, false);

initScene();
requestAnimationFrame(animate);
(document.querySelector("#canvas") as HTMLCanvasElement).classList.remove(
  "hidden"
);

function initScene() {
  scene = new Scene();
  const vertexShader = `
      uniform float uTime, uTimeCoef;
      uniform float uSize;
      uniform mat2 uMat2;
      uniform vec3 uRnd1;
      uniform vec3 uRnd2;
      uniform vec3 uRnd3;
      uniform vec3 uRnd4;
      uniform vec3 uRnd5;
      attribute vec3 next, prev;
      attribute float side;
      varying vec2 vUv;

      vec2 dp(vec2 sv) {
        return (1.5 * sv * uMat2);
      }

      void main() {
        vUv = uv;

        vec2 pos = dp(position.xy);

        // Well... I know I should update geometry instead...
        // Computing normal here is not needed
        // vec2 sprev = dp(prev.xy);
        // vec2 snext = dp(next.xy);
        // vec2 tangent = normalize(snext - sprev);
        // vec2 normal = vec2(-tangent.y, tangent.x);
        // float dist = length(snext - sprev);
        // normal *= smoothstep(0.0, 0.02, dist);

        vec2 normal = dp(vec2(1, 0));
        normal *= uSize;

        float time = uTime * uTimeCoef;
        vec3 rnd1 = vec3(cos(time * uRnd1.x + uRnd3.x), cos(time * uRnd1.y + uRnd3.y), cos(time * uRnd1.z + uRnd3.z));
        vec3 rnd2 = vec3(cos(time * uRnd2.x + uRnd4.x), cos(time * uRnd2.y + uRnd4.y), cos(time * uRnd2.z + uRnd4.z));
        normal *= 1.0
          + uRnd5.x * (cos((position.y + rnd1.x) * 20.0 * rnd1.y) + 1.0)
          + uRnd5.y * (sin((position.y + rnd2.x) * 20.0 * rnd2.y) + 1.0)
          + uRnd5.z * (cos((position.y + rnd1.z) * 20.0 * rnd2.z) + 1.0);
        pos.xy -= normal * side;

        gl_Position = vec4(pos, 0.0, 1.0);
      }
    `;

  const fragmentShader = `
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      varying vec2 vUv;
      void main() {
        gl_FragColor = vec4(mix(uColor1, uColor2, vUv.x), 1.0);
      }
    `;

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
      points.push(new Vector3(x, y, 0));
    }
    const polyline = new Polyline({ points });
    polylines.push(polyline);

    const material = new ShaderMaterial({
      uniforms: {
        uTime,
        uTimeCoef,
        uMat2: { value: mat2 },
        uSize: { value: 1.5 / conf.nx },
        uRnd1: {
          value: new Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)),
        },
        uRnd2: {
          value: new Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)),
        },
        uRnd3: {
          value: new Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)),
        },
        uRnd4: {
          value: new Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1)),
        },
        uRnd5: {
          value: new Vector3(rnd(0.2, 0.5), rnd(0.3, 0.6), rnd(0.4, 0.7)),
        },
        uColor1: {
          value: new Color(conf.colors[i].toHexString()),
        },
        uColor2: {
          value: new Color(conf.colors[i].brighten(15).toHexString()),
        },
      },
      vertexShader,
      fragmentShader,
    });
    const mesh = new Mesh(polyline.geometry, material);
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
