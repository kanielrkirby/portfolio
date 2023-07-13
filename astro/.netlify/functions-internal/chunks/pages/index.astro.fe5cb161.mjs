/* empty css                         */import { c as createAstro, a as createComponent, r as renderTemplate, b as addAttribute, s as spreadAttributes, u as unescapeHTML, d as renderComponent, e as renderHead, f as renderSlot, _ as __astro_tag_component__ } from '../astro.edfd8688.mjs';
/* empty css                           */import { createComponent as createComponent$1, ssr, ssrHydrationKey, ssrAttribute, escape } from 'solid-js/web';
import chroma from 'chroma-js';
import { createSignal, createEffect } from 'solid-js';
import { Canvas, useFrame } from 'solid-three';
import { useStore } from '@nanostores/solid';
import { persistentAtom } from '@nanostores/persistent';
import { action } from 'nanostores';
import * as THREE from 'three';
import 'cookie';
import 'kleur/colors';
import '@astrojs/internal-helpers/path';
import 'path-to-regexp';
import 'mime';
import 'html-escaper';
import 'string-width';

const $$Astro$b = createAstro();
const $$OpenGraphArticleTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$OpenGraphArticleTags;
  const { publishedTime, modifiedTime, expirationTime, authors, section, tags } = Astro2.props.openGraph.article;
  return renderTemplate`${publishedTime ? renderTemplate`<meta property="article:published_time"${addAttribute(publishedTime, "content")}>` : null}
${modifiedTime ? renderTemplate`<meta property="article:modified_time"${addAttribute(modifiedTime, "content")}>` : null}
${expirationTime ? renderTemplate`<meta property="article:expiration_time"${addAttribute(expirationTime, "content")}>` : null}
${authors ? authors.map((author) => renderTemplate`<meta property="article:author"${addAttribute(author, "content")}>`) : null}
${section ? renderTemplate`<meta property="article:section"${addAttribute(section, "content")}>` : null}
${tags ? tags.map((tag) => renderTemplate`<meta property="article:tag"${addAttribute(tag, "content")}>`) : null}`;
}, "/Users/mx/dev/portfolio/astro/node_modules/astro-seo/src/components/OpenGraphArticleTags.astro");

const $$Astro$a = createAstro();
const $$OpenGraphBasicTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$OpenGraphBasicTags;
  const { openGraph } = Astro2.props;
  return renderTemplate`<meta property="og:title"${addAttribute(openGraph.basic.title, "content")}>
<meta property="og:type"${addAttribute(openGraph.basic.type, "content")}>
<meta property="og:image"${addAttribute(openGraph.basic.image, "content")}>
<meta property="og:url"${addAttribute(openGraph.basic.url || Astro2.url.href, "content")}>`;
}, "/Users/mx/dev/portfolio/astro/node_modules/astro-seo/src/components/OpenGraphBasicTags.astro");

const $$Astro$9 = createAstro();
const $$OpenGraphImageTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$OpenGraphImageTags;
  const { image } = Astro2.props.openGraph.basic;
  const { secureUrl, type, width, height, alt } = Astro2.props.openGraph.image;
  return renderTemplate`<meta property="og:image:url"${addAttribute(image, "content")}>
${secureUrl ? renderTemplate`<meta property="og:image:secure_url"${addAttribute(secureUrl, "content")}>` : null}
${type ? renderTemplate`<meta property="og:image:type"${addAttribute(type, "content")}>` : null}
${width ? renderTemplate`<meta property="og:image:width"${addAttribute(width, "content")}>` : null}
${!(height === null) ? renderTemplate`<meta property="og:image:height"${addAttribute(height, "content")}>` : null}
${!(alt === null) ? renderTemplate`<meta property="og:image:alt"${addAttribute(alt, "content")}>` : null}`;
}, "/Users/mx/dev/portfolio/astro/node_modules/astro-seo/src/components/OpenGraphImageTags.astro");

const $$Astro$8 = createAstro();
const $$OpenGraphOptionalTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$OpenGraphOptionalTags;
  const { optional } = Astro2.props.openGraph;
  return renderTemplate`${optional.audio ? renderTemplate`<meta property="og:audio"${addAttribute(optional.audio, "content")}>` : null}
${optional.description ? renderTemplate`<meta property="og:description"${addAttribute(optional.description, "content")}>` : null}
${optional.determiner ? renderTemplate`<meta property="og:determiner"${addAttribute(optional.determiner, "content")}>` : null}
${optional.locale ? renderTemplate`<meta property="og:locale"${addAttribute(optional.locale, "content")}>` : null}
${optional.localeAlternate?.map((locale) => renderTemplate`<meta property="og:locale:alternate"${addAttribute(locale, "content")}>`)}
${optional.siteName ? renderTemplate`<meta property="og:site_name"${addAttribute(optional.siteName, "content")}>` : null}
${optional.video ? renderTemplate`<meta property="og:video"${addAttribute(optional.video, "content")}>` : null}`;
}, "/Users/mx/dev/portfolio/astro/node_modules/astro-seo/src/components/OpenGraphOptionalTags.astro");

const $$Astro$7 = createAstro();
const $$ExtendedTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$ExtendedTags;
  const { props } = Astro2;
  return renderTemplate`${props.extend.link?.map((attributes) => renderTemplate`<link${spreadAttributes(attributes)}>`)}
${props.extend.meta?.map(({ content, httpEquiv, name, property }) => renderTemplate`<meta${addAttribute(content, "content")}${addAttribute(httpEquiv, "http-equiv")}${addAttribute(name, "name")}${addAttribute(property, "property")}>`)}`;
}, "/Users/mx/dev/portfolio/astro/node_modules/astro-seo/src/components/ExtendedTags.astro");

const $$Astro$6 = createAstro();
const $$TwitterTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$TwitterTags;
  const { card, site, title, creator, description, image, imageAlt } = Astro2.props.twitter;
  return renderTemplate`${card ? renderTemplate`<meta name="twitter:card"${addAttribute(card, "content")}>` : null}
${site ? renderTemplate`<meta name="twitter:site"${addAttribute(site, "content")}>` : null}
${title ? renderTemplate`<meta name="twitter:title"${addAttribute(title, "content")}>` : null}
${image ? renderTemplate`<meta name="twitter:image"${addAttribute(image, "content")}>` : null}
${imageAlt ? renderTemplate`<meta name="twitter:image:alt"${addAttribute(imageAlt, "content")}>` : null}
${description ? renderTemplate`<meta name="twitter:description"${addAttribute(description, "content")}>` : null}
${creator ? renderTemplate`<meta name="twitter:creator"${addAttribute(creator, "content")}>` : null}`;
}, "/Users/mx/dev/portfolio/astro/node_modules/astro-seo/src/components/TwitterTags.astro");

const $$Astro$5 = createAstro();
const $$LanguageAlternatesTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$LanguageAlternatesTags;
  const { languageAlternates } = Astro2.props;
  return renderTemplate`${languageAlternates.map((alternate) => renderTemplate`<link rel="alternate"${addAttribute(alternate.hrefLang, "hreflang")}${addAttribute(alternate.href, "href")}>`)}`;
}, "/Users/mx/dev/portfolio/astro/node_modules/astro-seo/src/components/LanguageAlternatesTags.astro");

const $$Astro$4 = createAstro();
const $$SEO = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$SEO;
  Astro2.props.surpressWarnings = true;
  function validateProps(props) {
    if (props.openGraph) {
      if (!props.openGraph.basic || props.openGraph.basic.title == null || props.openGraph.basic.type == null || props.openGraph.basic.image == null) {
        throw new Error(
          "If you pass the openGraph prop, you have to at least define the title, type, and image basic properties!"
        );
      }
    }
    if (props.title && props.openGraph?.basic.title) {
      if (props.title == props.openGraph.basic.title && !props.surpressWarnings) {
        console.warn(
          "WARNING(astro-seo): You passed the same value to `title` and `openGraph.optional.title`. This is most likely not what you want. See docs for more."
        );
      }
    }
    if (props.openGraph?.basic?.image && !props.openGraph?.image?.alt && !props.surpressWarnings) {
      console.warn(
        "WARNING(astro-seo): You defined `openGraph.basic.image`, but didn't define `openGraph.image.alt`. This is stongly discouraged.'"
      );
    }
  }
  validateProps(Astro2.props);
  let updatedTitle = "";
  if (Astro2.props.title) {
    updatedTitle = Astro2.props.title;
    if (Astro2.props.titleTemplate) {
      updatedTitle = Astro2.props.titleTemplate.replace(/%s/g, updatedTitle);
    }
  } else if (Astro2.props.titleDefault) {
    updatedTitle = Astro2.props.titleDefault;
  }
  return renderTemplate`${updatedTitle ? renderTemplate`<title>${unescapeHTML(updatedTitle)}</title>` : null}

${Astro2.props.charset ? renderTemplate`<meta${addAttribute(Astro2.props.charset, "charset")}>` : null}

<link rel="canonical"${addAttribute(Astro2.props.canonical || Astro2.url.href, "href")}>

${Astro2.props.description ? renderTemplate`<meta name="description"${addAttribute(Astro2.props.description, "content")}>` : null}

<meta name="robots"${addAttribute(`${Astro2.props.noindex ? "noindex" : "index"}, ${Astro2.props.nofollow ? "nofollow" : "follow"}`, "content")}>

${Astro2.props.openGraph && renderTemplate`${renderComponent($$result, "OpenGraphBasicTags", $$OpenGraphBasicTags, { ...Astro2.props })}`}
${Astro2.props.openGraph?.optional && renderTemplate`${renderComponent($$result, "OpenGraphOptionalTags", $$OpenGraphOptionalTags, { ...Astro2.props })}`}
${Astro2.props.openGraph?.image && renderTemplate`${renderComponent($$result, "OpenGraphImageTags", $$OpenGraphImageTags, { ...Astro2.props })}`}
${Astro2.props.openGraph?.article && renderTemplate`${renderComponent($$result, "OpenGraphArticleTags", $$OpenGraphArticleTags, { ...Astro2.props })}`}
${Astro2.props.twitter && renderTemplate`${renderComponent($$result, "TwitterTags", $$TwitterTags, { ...Astro2.props })}`}
${Astro2.props.extend && renderTemplate`${renderComponent($$result, "ExtendedTags", $$ExtendedTags, { ...Astro2.props })}`}
${Astro2.props.languageAlternates && renderTemplate`${renderComponent($$result, "LanguageAlternatesTags", $$LanguageAlternatesTags, { ...Astro2.props })}`}`;
}, "/Users/mx/dev/portfolio/astro/node_modules/astro-seo/src/SEO.astro");

const $$Astro$3 = createAstro();
const $$Nav = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Nav;
  return renderTemplate``;
}, "/Users/mx/dev/portfolio/astro/src/components/Nav.astro");

const $$Astro$2 = createAstro();
const $$Footer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Footer;
  return renderTemplate``;
}, "/Users/mx/dev/portfolio/astro/src/components/Footer.astro");

const $$Astro$1 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { SEO: seoProps } = Astro2.props;
  return renderTemplate`<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="description" content="Astro description">
		<meta name="viewport" content="width=device-width">
		<link rel="icon" type="image/svg+xml" href="/favicon.svg">
		<meta name="generator"${addAttribute(Astro2.generator, "content")}>
		${renderComponent($$result, "SEO", $$SEO, { ...seoProps, "titleDefault": "Kaniel Kirby", "titleTemplate": "%s | Kaniel Kirby" })}
	${renderHead()}</head>
	<body>
		${renderComponent($$result, "Nav", $$Nav, {})}
		${renderSlot($$result, $$slots["default"])}
		${renderComponent($$result, "Footer", $$Footer, {})}
		
	</body>
</html>`;
}, "/Users/mx/dev/portfolio/astro/src/layouts/Layout.astro");

const $settings = persistentAtom(
  "settings",
  {
    dev: false,
    invertBackground: false,
    movingBackground: false
  },
  { encode: JSON.stringify, decode: JSON.parse }
);
action(
  $settings,
  "set",
  (store, key, val) => {
    const obj = store.get();
    obj[key] = val;
    store.set(obj);
  }
);

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

const polyline = function() {
  const tmp = new THREE.Vector3();
  class Polyline {
    points;
    count;
    geometry;
    position;
    prev;
    next;
    constructor(params) {
      const { points } = params;
      this.points = points;
      this.count = points.length;
      this.init();
      this.updateGeometry();
    }
    init() {
      this.geometry = new THREE.BufferGeometry();
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
        if (i === this.count - 1)
          continue;
        index.set([i2 + 0, i2 + 1, i2 + 2], (i2 + 0) * 3);
        index.set([i2 + 2, i2 + 1, i2 + 3], (i2 + 1) * 3);
      }
      this.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(this.position, 3)
      );
      this.geometry.setAttribute(
        "prev",
        new THREE.BufferAttribute(this.prev, 3)
      );
      this.geometry.setAttribute(
        "next",
        new THREE.BufferAttribute(this.next, 3)
      );
      this.geometry.setAttribute("side", new THREE.BufferAttribute(side, 1));
      this.geometry.setAttribute("uv", new THREE.BufferAttribute(uv, 2));
      this.geometry.setIndex(new THREE.BufferAttribute(index, 1));
    }
    updateGeometry() {
      this.points.forEach((p, i) => {
        p.toArray(this.position, i * 3 * 2);
        p.toArray(this.position, i * 3 * 2 + 3);
        if (!i) {
          tmp.copy(p).sub(this.points[i + 1]).add(p);
          tmp.toArray(this.prev, i * 3 * 2);
          tmp.toArray(this.prev, i * 3 * 2 + 3);
        } else {
          p.toArray(this.next, (i - 1) * 3 * 2);
          p.toArray(this.next, (i - 1) * 3 * 2 + 3);
        }
        if (i === this.points.length - 1) {
          tmp.copy(p).sub(this.points[i - 1]).add(p);
          tmp.toArray(this.next, i * 3 * 2);
          tmp.toArray(this.next, i * 3 * 2 + 3);
        } else {
          p.toArray(this.prev, (i + 1) * 3 * 2);
          p.toArray(this.prev, (i + 1) * 3 * 2 + 3);
        }
      });
      this.geometry.attributes.position.needsUpdate = true;
      this.geometry.attributes.prev.needsUpdate = true;
      this.geometry.attributes.next.needsUpdate = true;
    }
  }
  return Polyline;
}();

const _tmpl$ = ["<div", " class=\"fixed h-full w-full bg-black\"></div>"],
  _tmpl$2 = ["<div", "><!--#-->", "<!--/--><div class=\"bg-overlay fixed left-0 top-0 z-10 h-full w-full brightness-75 backdrop-invert transition-all duration-500\"></div></div>"],
  _tmpl$3 = ["<mesh", "><bufferGeometry attach=\"geometry\"", "></bufferGeometry><shaderMaterial attach=\"material\"", "></shaderMaterial></mesh>"];
const conf = {
  cscale: chroma.scale(["#916ECA", "#D05FAD", "#F2698B", "#FD9E7E", "#EDBA5E"]).mode("lch"),
  darken: -1,
  sat: 0.25,
  angle: Math.PI * 2 / 3,
  timeCoef: 0.04,
  nx: 25,
  ny: 70
};
function Background(props) {
  const settings = useStore($settings);
  const [on, setOn] = createSignal(true);
  const [movingCanvas, setMovingCanvas] = createSignal(createComponent$1(Canvas, {
    id: "moving-canvas",
    "class": "brightness-75",
    get fallback() {
      return ssr(_tmpl$, ssrHydrationKey());
    },
    get children() {
      return init();
    }
  }));
  createEffect(() => {
    const s = settings();
    if (s?.movingBackground != void 0 && s.movingBackground != on()) {
      setOn(s.movingBackground);
    }
  });
  function init(stopped = false) {
    const uTime = {
        value: 0
      },
      uTimeCoef = {
        value: conf.timeCoef
      },
      dx = 2 / conf.nx,
      dy = -2 / (conf.ny - 1),
      ox = -1 + dx / 2,
      oy = 1,
      mat2 = Float32Array.from([Math.cos(conf.angle), -Math.sin(conf.angle), Math.sin(conf.angle), Math.cos(conf.angle)]),
      lines = [],
      {
        randFloat: rnd
      } = THREE.MathUtils;
    for (let i = 0; i < conf.nx; i++) {
      const points = [];
      for (let j = 0; j < conf.ny; j++) {
        const x = ox + i * dx,
          y = oy + j * dy;
        points.push(new THREE.Vector3(x, y, 0));
      }
      lines.push(new polyline({
        points
      }));
    }
    return lines.map((pline, i) => {
      const deps = {
        uTime,
        uTimeCoef,
        rnd,
        mat2,
        conf
      };
      return createComponent$1(CustomMesh, {
        deps: deps,
        pline: pline,
        key: i,
        i: i,
        stopped: stopped
      });
    });
  }
  return ssr(_tmpl$2, ssrHydrationKey() + ssrAttribute("class", escape(props.class, true), false), escape(movingCanvas()));
}
function CustomMesh({
  deps,
  pline,
  i,
  stopped
}) {
  const {
    uTime,
    uTimeCoef,
    rnd,
    mat2,
    conf: conf2
  } = deps;
  useFrame(({
    clock
  }) => {
    if (!stopped) {
      const t = clock.oldTime;
      uTime.value = t * 1e-3;
    }
  });
  return ssr(_tmpl$3, ssrHydrationKey(), ssrAttribute("attributes", escape({
    ...pline.geometry.attributes
  }, true), false) + ssrAttribute("index", escape(pline.geometry.index, true), false), ssrAttribute("fragmentshader", escape(fragmentShader, true), false) + ssrAttribute("vertexshader", escape(vertexShader, true), false) + ssrAttribute("uniforms", escape({
    uTime,
    uTimeCoef,
    uMat2: {
      value: mat2
    },
    uSize: {
      value: 1.5 / conf2.nx
    },
    uRnd1: {
      value: new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1))
    },
    uRnd2: {
      value: new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1))
    },
    uRnd3: {
      value: new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1))
    },
    uRnd4: {
      value: new THREE.Vector3(rnd(-1, 1), rnd(-1, 1), rnd(-1, 1))
    },
    uRnd5: {
      value: new THREE.Vector3(rnd(0.2, 0.5), rnd(0.3, 0.6), rnd(0.4, 0.7))
    },
    uColor1: {
      value: new THREE.Color(conf2.cscale(i / conf2.nx).hex())
    },
    uColor2: {
      value: new THREE.Color(conf2.cscale(i / conf2.nx).darken(conf2.darken).desaturate(conf2.sat).hex())
    }
  }, true), false));
}

__astro_tag_component__(Background, "@astrojs/solid-js");

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "SEO": {} }, { "default": ($$result2) => renderTemplate`
    ${renderComponent($$result2, "Background", Background, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/mx/dev/portfolio/astro/src/components/Background/Main", "client:component-export": "default" })}
` })}`;
}, "/Users/mx/dev/portfolio/astro/src/pages/index.astro");

const $$file = "/Users/mx/dev/portfolio/astro/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
