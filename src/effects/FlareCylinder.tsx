import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

const beamVertexShader = `
varying vec2 vUv;
varying float vYpos;
void main() {
  vUv = uv;
  vYpos = position.y;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const beamFragmentShader = `
uniform float u_time;
uniform float u_hBand;
uniform float u_vBeam;
uniform float u_glow;
uniform vec3 u_colLayer1;
uniform vec3 u_colLayer2;
uniform vec3 u_colLayer3;
uniform vec3 u_colCore;
varying vec2 vUv;
varying float vYpos;

vec3 mod289v3(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289v2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289v3(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289v2(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, m*m*m*m*m*m*m*m);
}

float smoothGlow(float x, float glow) {
  return pow(x, glow) * smoothstep(0.0, 0.1, x);
}

void main() {
  float t = u_time * 0.15;
  vec2 uv = vUv;
  uv.x += t * 0.1;
  float theta = atan(vYpos, vUv.x - 0.5);
  float n1 = snoise(vec2(theta * 2.0, vYpos * 5.0 - t));
  n1 = 0.5 + 0.5 * n1;
  float n2 = snoise(vec2(theta * 3.0 + 100.0, vYpos * 10.0 - t * 2.0));
  n2 = 0.5 + 0.5 * n2;
  float band = pow(sin(vYpos * 3.14159 * u_vBeam) * 0.5 + 0.5, u_hBand);
  float cylDist = abs(vUv.x - 0.5) * 2.0;
  float alpha = 0.0;
  float dist1 = smoothstep(0.4, 0.0, cylDist) * band * n1;
  alpha += smoothGlow(dist1, u_glow);
  float dist2 = smoothstep(0.3, 0.0, cylDist) * band * n2;
  alpha += smoothGlow(dist2, u_glow * 1.5);
  float dist3 = smoothstep(0.2, 0.0, cylDist) * band * (n1 * n2);
  alpha += smoothGlow(dist3, u_glow * 2.0);
  float core = smoothstep(0.1, 0.0, cylDist) * band * 0.5;
  vec4 coreCol = vec4(u_colCore, core);
  alpha += core;
  vec4 colLayer1 = vec4(u_colLayer1 * 0.8, alpha * 0.3);
  vec4 colLayer2 = vec4(u_colLayer2, alpha * 0.5);
  vec4 colLayer3 = vec4(u_colLayer3, alpha * 0.8);
  vec4 finalColor = mix(colLayer1, colLayer2, n1);
  finalColor = mix(finalColor, colLayer3, n2 * 0.5);
  finalColor = mix(finalColor, coreCol, core);
  gl_FragColor = finalColor;
}
`;

export default function FlareCylinder() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const width = container.offsetWidth || 800;
    const height = container.offsetHeight || 600;

    // Scene
    const scene = new THREE.Scene();
    const bloomScene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(dpr);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);

    // Bloom
    const renderPass = new RenderPass(scene, camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(width, height),
      1.5, 0.4, 0.85
    );
    bloomPass.threshold = 0.1;
    bloomPass.strength = 0.35;
    bloomPass.radius = 0.4;

    const composer = new EffectComposer(renderer);
    composer.addPass(renderPass);
    composer.addPass(bloomPass);

    // Geometry
    const cylinderGeo = new THREE.CylinderGeometry(1, 1, 1, 16, 1, true);

    // Material
    const beamMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      uniforms: {
        u_time: { value: 0 },
        u_hBand: { value: 0.2 },
        u_vBeam: { value: 6.0 },
        u_glow: { value: 1.0 },
        u_colLayer1: { value: new THREE.Vector3(0.02, 0.06, 0.12) },
        u_colLayer2: { value: new THREE.Vector3(1.0, 0.72, 0.0) },
        u_colLayer3: { value: new THREE.Vector3(0.9, 0.95, 0.97) },
        u_colCore: { value: new THREE.Vector3(1.0, 0.85, 0.3) }
      },
      vertexShader: beamVertexShader,
      fragmentShader: beamFragmentShader
    });

    // Beams
    const group = new THREE.Group();

    const mainBeam = new THREE.Mesh(cylinderGeo, beamMaterial.clone());
    mainBeam.scale.set(1.5, 5, 1.5);
    group.add(mainBeam);

    const secondBeam = new THREE.Mesh(cylinderGeo, beamMaterial.clone());
    secondBeam.scale.set(1.2, 5, 1.2);
    secondBeam.rotation.x = Math.PI * 0.1;
    group.add(secondBeam);

    const thirdBeam = new THREE.Mesh(cylinderGeo, beamMaterial.clone());
    thirdBeam.scale.set(1.0, 5, 1.0);
    thirdBeam.rotation.x = Math.PI * 0.2;
    group.add(thirdBeam);

    scene.add(group);

    // Shared material reference for uniform updates
    const materials = [mainBeam.material as THREE.ShaderMaterial, secondBeam.material as THREE.ShaderMaterial, thirdBeam.material as THREE.ShaderMaterial];

    // Bloom scene copy
    const bloomBeam1 = new THREE.Mesh(cylinderGeo, new THREE.MeshBasicMaterial({ color: 0xffb800, transparent: true, opacity: 0.3 }));
    bloomBeam1.scale.set(1.5, 5, 1.5);
    bloomScene.add(bloomBeam1);

    let time = 0;

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      if (!isVisibleRef.current) return;

      time += 0.005;

      for (const mat of materials) {
        mat.uniforms.u_time.value = time;
      }

      group.rotation.y += 0.001;
      group.rotation.z = Math.sin(time * 0.05) * 0.05;
      bloomBeam1.rotation.copy(group.rotation);

      composer.render();
    };

    animate();

    // IntersectionObserver
    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Resize
    const onResize = () => {
      const w = container.offsetWidth || 800;
      const h = container.offsetHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      composer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      cylinderGeo.dispose();
      for (const mat of materials) mat.dispose();
      composer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden'
      }}
    />
  );
}
