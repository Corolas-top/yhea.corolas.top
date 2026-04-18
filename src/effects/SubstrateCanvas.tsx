import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* ─── Substrate Engine Classes ─── */

class Cluster {
  pos: THREE.Vector2;
  radius: number;
  intensity: number;
  targetIntensity: number;
  pulsePhase: number;
  sectorCount: number;
  baseFreq: number;
  neighbors: Cluster[];
  connections: Connection[];
  visitCount: number;

  constructor(x: number, y: number, radius?: number, intensity?: number) {
    this.pos = new THREE.Vector2(x, y);
    this.radius = radius || 0.02 + Math.random() * 0.03;
    this.intensity = intensity || 0;
    this.targetIntensity = this.intensity;
    this.pulsePhase = Math.random() * Math.PI * 2;
    this.sectorCount = 3 + Math.floor(Math.random() * 5);
    this.baseFreq = 0.5 + Math.random() * 2;
    this.neighbors = [];
    this.connections = [];
    this.visitCount = 0;
  }

  update(dt: number, _time: number) {
    this.pulsePhase += dt * (this.baseFreq + this.visitCount * 0.1);
    this.intensity += (this.targetIntensity - this.intensity) * (dt * 2);
    if (this.targetIntensity > 0.01) {
      this.targetIntensity *= (1 - dt * 0.5);
    } else {
      this.targetIntensity = 0;
    }
    if (Math.random() < dt * this.neighbors.length * 0.2) {
      const n = this.neighbors[Math.floor(Math.random() * this.neighbors.length)];
      if (n) n.pulse(0.3 + Math.random() * 0.3);
    }
  }

  pulse(intensity?: number) {
    this.recordVisit();
    this.targetIntensity = Math.min(1, this.targetIntensity + (intensity || 0.5));
  }

  recordVisit() {
    this.visitCount++;
    if (this.connections.length > 0 && Math.random() < 0.3) {
      const c = this.connections[Math.floor(Math.random() * this.connections.length)];
      if (c) c.transmit(0.4);
    }
  }

  getSectorIntensity(sectorIndex: number, time: number): number {
    return Math.max(0, Math.sin(time * (this.baseFreq + sectorIndex * 0.3) + this.pulsePhase + sectorIndex * 1.7)) * this.intensity;
  }

  toShaderData(time: number): number[] {
    const sectors: number[] = [];
    for (let i = 0; i < this.sectorCount; i++) {
      sectors.push(this.getSectorIntensity(i, time));
    }
    const sum = sectors.reduce((a, b) => a + b, 0);
    if (sum === 0) return [this.pos.x, this.pos.y, this.radius, 0];
    const avg = sum / this.sectorCount;
    const mx = Math.max(...sectors);
    const pk = mx / (avg + 0.01);
    const modRadius = this.radius * (0.7 + Math.min(pk, 3) * 0.3);
    const modIntensity = Math.min(1, avg * (1 + this.visitCount * 0.05));
    return [this.pos.x, this.pos.y, modRadius, modIntensity];
  }
}

class Connection {
  a: Cluster;
  b: Cluster;
  strength: number;
  energy: number;
  lastTransmitDir: number;
  visualThickness: number;
  packets: { origin: Cluster; dir: number; energy: number; progress: number; speed: number }[];

  constructor(a: Cluster, b: Cluster, strength?: number) {
    this.a = a;
    this.b = b;
    this.strength = strength || 0.3 + Math.random() * 0.4;
    this.energy = 0;
    this.lastTransmitDir = Math.random() > 0.5 ? 1 : -1;
    this.visualThickness = 0.002 + this.strength * 0.004;
    this.packets = [];
  }

  transmit(energy?: number) {
    this.lastTransmitDir *= -1;
    const origin = this.lastTransmitDir > 0 ? this.a : this.b;
    const speed = 0.3 + Math.random() * 0.4;
    this.packets.push({ origin, dir: this.lastTransmitDir, energy: energy || 0.5, progress: 0, speed });
  }

  update(dt: number) {
    this.energy *= (1 - dt * 0.5);
    for (let i = this.packets.length - 1; i >= 0; i--) {
      const p = this.packets[i];
      p.progress += p.speed * dt;
      if (p.progress >= 1) {
        this.energy = Math.max(this.energy, p.energy);
        const dest = p.dir > 0 ? this.b : this.a;
        dest.pulse(p.energy * 0.5);
        this.packets.splice(i, 1);
      }
    }
  }

  getRenderPackets(_time: number): { pos: THREE.Vector2; energy: number; progress: number }[] {
    const result: { pos: THREE.Vector2; energy: number; progress: number }[] = [];
    const baseA = this.a.pos;
    const baseB = this.b.pos;
    const dx = baseB.clone().sub(baseA);
    for (const p of this.packets) {
      const ca = new THREE.Vector2(-dx.y, dx.x).normalize().multiplyScalar(
        Math.sin(_time * 3 + p.progress * 10) * 0.01 * (1 - Math.abs(p.progress - 0.5) * 2)
      );
      const pos = baseA.clone().add(dx.clone().multiplyScalar(p.progress)).add(ca);
      result.push({ pos, energy: p.energy, progress: p.progress });
    }
    return result;
  }
}

class Particle {
  pos: THREE.Vector2;
  vel: THREE.Vector2;
  energy: number;
  size: number;
  decayRate: number;
  maxLife: number;
  age: number;
  path: { x: number; y: number; energy: number; size: number }[];
  splitCount: number;

  constructor(x: number, y: number, energy?: number, size?: number) {
    this.pos = new THREE.Vector2(x, y);
    this.vel = new THREE.Vector2((Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02);
    this.energy = energy || 0.5 + Math.random() * 0.5;
    this.size = size || 0.002 + Math.random() * 0.003;
    this.decayRate = 0.1 + Math.random() * 0.2;
    this.maxLife = 3 + Math.random() * 5;
    this.age = 0;
    this.path = [];
    this.splitCount = 0;
  }

  update(dt: number, clusters: Cluster[], _connections: Connection[]): boolean | Cluster {
    this.energy -= dt * this.decayRate;
    this.age += dt;
    const pos = this.pos;

    let nearest: Cluster | null = null;
    let minD2 = 0.01; // 0.1 * 0.1
    for (const c of clusters) {
      const d2 = pos.distanceToSquared(c.pos);
      if (d2 < minD2) {
        minD2 = d2;
        nearest = c;
      }
    }

    if (nearest) {
      const desired = nearest.pos.clone().sub(pos).normalize().multiplyScalar(0.1);
      this.vel.add(desired.sub(this.vel).multiplyScalar(dt * 5));
    }

    this.path.push({ x: this.pos.x, y: this.pos.y, energy: this.energy, size: this.size });
    if (this.path.length > 20) this.path.shift();

    this.pos.add(this.vel.clone().multiplyScalar(dt));

    if (this.pos.x < -0.1 || this.pos.x > 1.1 || this.pos.y < -0.1 || this.pos.y > 1.1) {
      return false;
    }
    if (this.energy <= 0 || this.age >= this.maxLife) {
      return false;
    }
    if (nearest && this.energy > 0.3 && this.splitCount < 2 && Math.random() < 0.05) {
      nearest.recordVisit();
      this.energy *= 0.5;
      return nearest;
    }
    return true;
  }

  toShaderData(): number[] {
    return [this.pos.x, this.pos.y, this.size, this.energy];
  }
}

class SubstrateEngine {
  width: number;
  height: number;
  SIMULATION_WIDTH: number;
  SIMULATION_HEIGHT: number;
  clusters: Cluster[];
  connections: Connection[];
  particles: Particle[];
  spawnAccumulator: number;
  engineTime: number;
  globalIntensity: number;
  paused: boolean;
  mousePos: THREE.Vector2;
  mouseActive: boolean;
  mouseDown: boolean;
  options: Record<string, number>;

  constructor(width: number, height: number, options: Record<string, number> = {}) {
    this.width = width;
    this.height = height;
    this.SIMULATION_WIDTH = 1024;
    this.SIMULATION_HEIGHT = 1024;
    this.clusters = [];
    this.connections = [];
    this.particles = [];
    this.spawnAccumulator = 0;
    this.engineTime = 0;
    this.globalIntensity = 1.0;
    this.paused = false;
    this.mousePos = new THREE.Vector2(0.5, 0.5);
    this.mouseActive = false;
    this.mouseDown = false;
    this.options = Object.assign({
      clusterCount: 12, maxParticles: 150, spawnRate: 40,
      baseDecay: 0.985, noiseIntensity: 0.05,
      bloomStrength: 1.2, bloomRadius: 0.4, bloomThreshold: 0.1,
      connectionIntensity: 0.6, useTrails: true, showVignette: true, mouseForce: 0.5
    }, options);
    this.initClusters();
  }

  initClusters() {
    const N = this.options.clusterCount;
    for (let i = 0; i < N; i++) {
      const angle = (i / N) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const dist = 0.2 + Math.random() * 0.25;
      this.clusters.push(new Cluster(0.5 + Math.cos(angle) * dist, 0.5 + Math.sin(angle) * dist * 0.6));
    }
    this.formTriadicTopology();
  }

  formTriadicTopology() {
    const angles = this.clusters.map((c, i) => ({
      idx: i,
      angle: Math.atan2(c.pos.y - 0.5, c.pos.x - 0.5)
    }));
    angles.sort((a, b) => a.angle - b.angle);
    const n = angles.length;
    this.connections = [];
    for (let i = 0; i < n; i++) {
      this.link(angles[i].idx, angles[(i + 1) % n].idx);
    }
    const triads = [[0, 4, 8], [1, 5, 9], [2, 6, 10], [3, 7, 11], [2, 5, 8], [0, 3, 6]];
    for (const triad of triads) {
      const [a, b, c] = triad;
      if (a < n && b < n && c < n) {
        this.link(angles[a].idx, angles[b].idx);
        this.link(angles[b].idx, angles[c].idx);
        this.link(angles[a].idx, angles[c].idx);
      }
    }
  }

  link(a: number, b: number) {
    const c = new Connection(this.clusters[a], this.clusters[b]);
    this.connections.push(c);
    this.clusters[a].connections.push(c);
    this.clusters[b].connections.push(c);
    this.clusters[a].neighbors.push(this.clusters[b]);
    this.clusters[b].neighbors.push(this.clusters[a]);
  }

  spawnParticle() {
    if (this.particles.length >= this.options.maxParticles) return;
    const angle = Math.random() * Math.PI * 2;
    const dist = 0.05 + Math.random() * 0.1;
    const x = 0.5 + Math.cos(angle) * dist;
    const y = 0.5 + Math.sin(angle) * dist;
    let closest: Cluster | null = null;
    let minD = 1e9;
    for (const c of this.clusters) {
      const d = Math.hypot(c.pos.x - x, c.pos.y - y);
      if (d < minD) { minD = d; closest = c; }
    }
    const p = new Particle(x, y);
    if (closest) {
      p.vel = closest.pos.clone().sub(p.pos).normalize().multiplyScalar(0.02 + Math.random() * 0.02);
    }
    this.particles.push(p);
    if (closest) closest.pulse(0.5);
  }

  setMouse(x: number, y: number, active: boolean, isDown: boolean) {
    this.mousePos.set(x, y);
    this.mouseActive = active;
    this.mouseDown = isDown;
  }

  update(dt: number) {
    if (this.paused) return;
    dt = Math.min(dt, 0.05);
    this.engineTime += dt;

    if (Math.random() < dt * 2) {
      const c = this.clusters[Math.floor(Math.random() * this.clusters.length)];
      if (c) c.pulse(0.3 + Math.random() * 0.4);
    }

    const rate = this.options.spawnRate * (1 + 0);
    this.spawnAccumulator += rate * dt;
    while (this.spawnAccumulator >= 1) {
      this.spawnAccumulator -= 1;
      this.spawnParticle();
    }

    for (const c of this.clusters) c.update(dt, this.engineTime);
    for (const c of this.connections) c.update(dt);

    const newParticles: Particle[] = [];
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      const result = p.update(dt, this.clusters, this.connections);
      if (result === false) {
        this.particles.splice(i, 1);
      } else if (result !== true) {
        const cluster = result as Cluster;
        this.particles.splice(i, 1);
        if (this.particles.length < this.options.maxParticles) {
          const newP = new Particle(
            cluster.pos.x + (Math.random() - 0.5) * 0.01,
            cluster.pos.y + (Math.random() - 0.5) * 0.01,
            p.energy * 0.5,
            p.size * 0.8
          );
          newP.splitCount = p.splitCount + 1;
          newParticles.push(newP);
          cluster.pulse(0.5);
        }
      }
    }
    this.particles.push(...newParticles);

    if (this.mouseActive) {
      const mF = this.options.mouseForce;
      for (const c of this.clusters) {
        const d = c.pos.distanceTo(this.mousePos);
        if (d < 0.2) {
          const f = (0.2 - d) / 0.2 * mF * dt * 0.5;
          c.pos.lerp(this.mousePos, f);
        }
      }
      for (const p of this.particles) {
        const d = p.pos.distanceTo(this.mousePos);
        if (d < 0.15) {
          const f = (0.15 - d) / 0.15 * mF * dt * 1.5;
          if (this.mouseDown) {
            p.pos.lerp(this.mousePos, f);
          } else {
            p.pos.lerp(this.mousePos, -f * 0.5);
          }
        }
      }
    }

    if (this.particles.length === 0) this.spawnParticle();
  }

  getClusterData(): number[][] {
    return this.clusters.map(c => c.toShaderData(this.engineTime));
  }

  getParticleData(): number[][] {
    return this.particles.map(p => p.toShaderData());
  }
}

/* ─── Shader Sources ─── */

const fadeVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fadeFragmentShader = `
uniform sampler2D uTexture;
uniform float uDecay;
varying vec2 vUv;
void main() {
  vec4 texel = texture2D(uTexture, vUv);
  gl_FragColor = vec4(texel.rgb * uDecay, 1.0);
}
`;

const connectionVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const connectionFragmentShader = `
uniform sampler2D uTexture;
uniform vec2 uResolution;
uniform vec4 uClusters[12];
uniform int uClusterCount;
uniform float uConnectionIntensity;
uniform float uTime;
varying vec2 vUv;

float hash(float n) { return fract(sin(n) * 43758.5453123); }
float noise(vec2 x) {
  vec2 i = floor(x);
  vec2 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  float n = i.x + i.y * 57.0;
  return mix(mix(hash(n), hash(n + 1.0), f.x), mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y);
}
float calcLineThickness(float dist, float lineWidth) {
  return (1.0 - smoothstep(lineWidth * 0.4, lineWidth * 0.8, dist));
}
vec3 energyColor(float e) { return vec3(0.3 + e * 0.7, 0.5 + e * 0.3, 0.8 + e * 0.2); }

void main() {
  vec4 texel = texture2D(uTexture, vUv);
  vec3 col = texel.rgb;
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
  vec2 uv = vUv * aspect;
  float t = uTime;
  float maxDist = 0.05 + 0.02 * sin(t * 0.5);
  float lineIntensity = 0.0;
  vec3 lineColor = vec3(0.0);
  for (int i = 0; i < 12; i++) {
    if (i >= uClusterCount) break;
    vec4 a = uClusters[i];
    vec4 b = uClusters[(i + 1) % uClusterCount];
    vec2 posA = a.xy * aspect;
    vec2 posB = b.xy * aspect;
    vec2 ab = posB - posA;
    vec2 ap = uv - posA;
    float abLen = length(ab);
    if (abLen < 0.0001) continue;
    float proj = clamp(dot(ap, ab) / (abLen * abLen), 0.0, 1.0);
    vec2 closest = posA + ab * proj;
    float d = length(uv - closest);
    float thickness = calcLineThickness(d, 0.003);
    float pulse = 0.5 + 0.5 * sin(t * 2.0 + float(i));
    float intensity = thickness * pulse * uConnectionIntensity;
    lineIntensity += intensity;
    lineColor += energyColor(pulse) * intensity;
  }
  if (lineIntensity > 0.0) {
    col += lineColor / lineIntensity * lineIntensity * 0.4;
  }
  float n = noise(uv * 3.0 + t * 0.1) * 0.05;
  col += n;
  gl_FragColor = vec4(col, 1.0);
}
`;

const sceneVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const sceneFragmentShader = `
uniform sampler2D uFade;
uniform vec2 uResolution;
uniform vec4 uClusters[12];
uniform int uClusterCount;
uniform vec4 uParticles[60];
uniform int uParticleCount;
uniform float uTime;
uniform float uGlobalIntensity;
uniform float uNoiseIntensity;
varying vec2 vUv;

float hash(float n) { return fract(sin(n) * 43758.5453123); }
float noise(vec2 x) {
  vec2 i = floor(x);
  vec2 f = fract(x);
  f = f * f * (3.0 - 2.0 * f);
  float n = i.x + i.y * 57.0;
  return mix(mix(hash(n), hash(n + 1.0), f.x), mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y);
}
vec3 energyColor(float e) { return vec3(0.3 + e * 0.7, 0.5 + e * 0.3, 0.8 + e * 0.2); }

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  float aspect = uResolution.x / uResolution.y;
  float t = uTime;
  vec2 p = uv;
  p.x *= aspect;
  vec3 col = texture2D(uFade, vUv).rgb;
  float totalGlow = 0.0;
  vec3 glowColor = vec3(0.0);
  for (int i = 0; i < 12; i++) {
    if (i >= uClusterCount) break;
    vec4 c = uClusters[i];
    vec2 cp = c.xy;
    cp.x *= aspect;
    float d = length(p - cp);
    float rad = c.z * 0.5;
    float glow = rad / (d + 0.001);
    float angle = atan(p.y - cp.y, p.x - cp.x);
    float sector = floor((angle + 3.14159) / (3.14159 * 2.0 / 12.0));
    float secHash = hash(sector * 7.0 + float(i) * 13.0);
    float intensity = (0.5 + secHash * 0.5) * c.w;
    glow *= intensity;
    totalGlow += glow;
    glowColor += energyColor(intensity) * glow;
  }
  if (totalGlow > 0.0) {
    col += glowColor * 0.3 * uGlobalIntensity;
  }
  float partGlow = 0.0;
  vec3 partColor = vec3(0.0);
  for (int i = 0; i < 60; i++) {
    if (i >= uParticleCount) break;
    vec4 pt = uParticles[i];
    vec2 pp = pt.xy;
    pp.x *= aspect;
    float d = length(p - pp);
    float glow = 0.005 / (d * d + 0.0001);
    float size = pt.z * 3.0;
    glow *= size * pt.w;
    float energy = pt.w;
    partGlow += glow;
    partColor += energyColor(energy) * glow;
  }
  if (partGlow > 0.0) {
    col += partColor * 1.2 * uGlobalIntensity;
  }
  col += noise(uv * 10.0 + t) * uNoiseIntensity;
  float vig = 1.0 - smoothstep(0.5, 1.5, length(uv - 0.5) * 2.0);
  col *= 0.7 + 0.3 * vig;
  gl_FragColor = vec4(col, 1.0);
}
`;

/* ─── React Component ─── */

export default function SubstrateCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<SubstrateEngine | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const width = container.offsetWidth || window.innerWidth;
    const height = container.offsetHeight || window.innerHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(dpr);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Engine
    const engine = new SubstrateEngine(width, height);
    engineRef.current = engine;

    // Scenes & Cameras
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geo = new THREE.PlaneGeometry(2, 2);

    // Render targets
    const SIM_W = 1024;
    const SIM_H = 1024;
    const rtParams: THREE.RenderTargetOptions = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat
    };
    let rtScene = new THREE.WebGLRenderTarget(SIM_W, SIM_H, rtParams);
    let rtFade = new THREE.WebGLRenderTarget(SIM_W, SIM_H, rtParams);
    let rtConnections = new THREE.WebGLRenderTarget(SIM_W, SIM_H, rtParams);

    // Fade material
    const fadeMat = new THREE.ShaderMaterial({
      uniforms: { uTexture: { value: rtScene.texture }, uDecay: { value: 0.985 } },
      vertexShader: fadeVertexShader,
      fragmentShader: fadeFragmentShader,
      depthWrite: false,
      depthTest: false
    });
    const fadeMesh = new THREE.Mesh(geo, fadeMat);
    const fadeScene = new THREE.Scene();
    fadeScene.add(fadeMesh);

    // Connection material
    const clusterUniforms: THREE.Vector4[] = [];
    for (let i = 0; i < 12; i++) clusterUniforms.push(new THREE.Vector4(0, 0, 0, 0));

    const connMat = new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: rtFade.texture },
        uResolution: { value: new THREE.Vector2(SIM_W, SIM_H) },
        uClusters: { value: clusterUniforms },
        uClusterCount: { value: 12 },
        uConnectionIntensity: { value: 0.6 },
        uTime: { value: 0 }
      },
      vertexShader: connectionVertexShader,
      fragmentShader: connectionFragmentShader,
      depthWrite: false,
      depthTest: false
    });
    const connMesh = new THREE.Mesh(geo, connMat);
    const connScene = new THREE.Scene();
    connScene.add(connMesh);

    // Scene material
    const particleUniforms: THREE.Vector4[] = [];
    for (let i = 0; i < 60; i++) particleUniforms.push(new THREE.Vector4(0, 0, 0, 0));

    const sceneMat = new THREE.ShaderMaterial({
      uniforms: {
        uFade: { value: rtFade.texture },
        uResolution: { value: new THREE.Vector2(SIM_W, SIM_H) },
        uClusters: { value: clusterUniforms },
        uClusterCount: { value: 12 },
        uParticles: { value: particleUniforms },
        uParticleCount: { value: 0 },
        uTime: { value: 0 },
        uGlobalIntensity: { value: 1.0 },
        uNoiseIntensity: { value: 0.05 }
      },
      vertexShader: sceneVertexShader,
      fragmentShader: sceneFragmentShader,
      depthWrite: false,
      depthTest: false
    });
    const sceneMesh = new THREE.Mesh(geo, sceneMat);
    const mainScene = new THREE.Scene();
    mainScene.add(sceneMesh);

    // Display scene
    const displayMat = new THREE.MeshBasicMaterial({ map: rtScene.texture });
    const displayMesh = new THREE.Mesh(geo, displayMat);
    const displayScene = new THREE.Scene();
    displayScene.add(displayMesh);

    let lastTime = performance.now();

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      engine.update(dt);

      // Update uniforms
      const clusterData = engine.getClusterData();
      for (let i = 0; i < 12; i++) {
        if (i < clusterData.length) {
          clusterUniforms[i].set(clusterData[i][0], clusterData[i][1], clusterData[i][2], clusterData[i][3]);
        } else {
          clusterUniforms[i].set(0, 0, 0, 0);
        }
      }

      const particleData = engine.getParticleData();
      const pCount = Math.min(particleData.length, 60);
      for (let i = 0; i < 60; i++) {
        if (i < pCount) {
          particleUniforms[i].set(particleData[i][0], particleData[i][1], particleData[i][2], particleData[i][3]);
        } else {
          particleUniforms[i].set(0, 0, 0, 0);
        }
      }

      const time = engine.engineTime;
      fadeMat.uniforms.uTexture.value = rtScene.texture;
      connMat.uniforms.uTexture.value = rtFade.texture;
      connMat.uniforms.uTime.value = time;
      connMat.uniforms.uClusterCount.value = clusterData.length;
      sceneMat.uniforms.uFade.value = rtConnections.texture;
      sceneMat.uniforms.uTime.value = time;
      sceneMat.uniforms.uClusterCount.value = clusterData.length;
      sceneMat.uniforms.uParticleCount.value = pCount;

      // Render passes
      renderer.setRenderTarget(rtFade);
      renderer.render(fadeScene, camera);

      renderer.setRenderTarget(rtConnections);
      renderer.render(connScene, camera);

      renderer.setRenderTarget(rtScene);
      renderer.render(mainScene, camera);

      renderer.setRenderTarget(null);
      renderer.render(displayScene, camera);
    };

    animate();

    // Mouse
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      engine.setMouse((e.clientX - rect.left) / rect.width, 1 - (e.clientY - rect.top) / rect.height, true, engine.mouseDown);
    };
    const onMouseDown = () => { engine.mouseDown = true; };
    const onMouseUp = () => { engine.mouseDown = false; };
    const onMouseLeave = () => { engine.setMouse(0.5, 0.5, false, false); };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mousedown', onMouseDown);
    container.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mouseleave', onMouseLeave);

    // Resize
    const onResize = () => {
      const w = container.offsetWidth || window.innerWidth;
      const h = container.offsetHeight || window.innerHeight;
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mousedown', onMouseDown);
      container.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      rtScene.dispose();
      rtFade.dispose();
      rtConnections.dispose();
      geo.dispose();
      fadeMat.dispose();
      connMat.dispose();
      sceneMat.dispose();
      displayMat.dispose();
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
