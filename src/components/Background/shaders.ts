export const vertexShader = `
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

export const fragmentShader = `
        uniform vec3 uColor1;
        uniform vec3 uColor2;
        varying vec2 vUv;
        void main() {
          gl_FragColor = vec4(mix(uColor1, uColor2, vUv.x), 1.0);
        }
      `;
