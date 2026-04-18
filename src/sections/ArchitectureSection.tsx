import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Cilia Bars ─── */
function CiliaBars() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex items-end"
      style={{ gap: 4, height: 40, marginTop: 24 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 2,
            height: 8 + Math.random() * 16,
            background: hovered ? 'var(--accent-amber)' : 'var(--accent-cyan)',
            opacity: hovered ? 0.8 : 0.3,
            transition: 'all 0.3s ease',
            animation: `pulse-glow ${1.5 + Math.random()}s ease-in-out infinite`,
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Memristor Grid ─── */
function MemristorGrid() {
  const [dots, setDots] = useState(() =>
    Array.from({ length: 64 }, (_, i) => ({
      id: i,
      active: false,
      scale: 1,
      opacity: 0.2,
    }))
  );

  const fireDot = useCallback((index: number, depth = 0) => {
    if (depth > 3) return;
    setDots(prev => {
      const next = [...prev];
      if (next[index]) {
        next[index] = { ...next[index], active: true, scale: 1.5, opacity: 1 };
      }
      return next;
    });

    setTimeout(() => {
      setDots(prev => {
        const next = [...prev];
        if (next[index]) {
          next[index] = { ...next[index], active: false, scale: 1, opacity: 0.2 };
        }
        return next;
      });
    }, 1000);

    // Propagate to neighbors
    setTimeout(() => {
      const row = Math.floor(index / 8);
      const col = index % 8;
      const neighbors = [
        row > 0 ? index - 8 : -1,
        row < 7 ? index + 8 : -1,
        col > 0 ? index - 1 : -1,
        col < 7 ? index + 1 : -1,
      ].filter(n => n >= 0 && Math.random() < 0.3);

      neighbors.forEach(n => fireDot(n, depth + 1));
    }, 100);
  }, []);

  return (
    <div
      className="grid grid-cols-8"
      style={{ gap: 8, marginTop: 24, width: 'fit-content' }}
    >
      {dots.map((dot, i) => (
        <div
          key={dot.id}
          onClick={() => fireDot(i)}
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: dot.active ? 'var(--accent-amber)' : 'var(--text-secondary)',
            opacity: dot.opacity,
            transform: `scale(${dot.scale})`,
            transition: 'all 0.5s ease',
            cursor: 'pointer',
          }}
        />
      ))}
    </div>
  );
}

/* ─── DNA Helix ─── */
function DnaHelix() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const w = 200;
    const h = 120;
    canvas.width = w;
    canvas.height = h;

    let offset = 0;

    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      ctx.clearRect(0, 0, w, h);
      offset += 0.02;

      for (let i = 0; i < 20; i++) {
        const y = (i / 20) * h;
        const phase = i * 0.5 + offset;
        const x1 = w / 2 + Math.sin(phase) * 40;
        const x2 = w / 2 + Math.sin(phase + Math.PI) * 40;

        ctx.beginPath();
        ctx.arc(x1, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 184, 0, 0.8)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(x2, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 184, 0, 0.4)';
        ctx.fill();

        // Connection
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.strokeStyle = `rgba(255, 184, 0, ${0.1 + Math.sin(phase) * 0.05})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    };

    draw();
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <div style={{ marginTop: 24 }}>
      <canvas ref={canvasRef} style={{ width: 200, height: 120 }} />
    </div>
  );
}

/* ─── Layer Card ─── */
const layers = [
  {
    num: 'LAYER 1',
    title: 'Ectoderm',
    subtitle: 'Transformable cilia array',
    desc: '10,000 PZT-ionic gel cilia operate as mechanical sensors (0.1–10kHz strain detection), chemical sensors (MIP coating, nM sensitivity), and piezoelectric effectors (±10μm bending). Information is encoded as 10,000-dimensional spatiotemporal hypervectors with temporal spike coding and synchrony-based multimodal binding.',
    visual: <CiliaBars />,
  },
  {
    num: 'LAYER 2',
    title: 'Mesoderm',
    subtitle: 'World-self models',
    desc: 'Random Resistor Network of MoS₂ memristors forms the external world model — natural relaxation to minimum energy corresponds to Bayesian inference. Mirror memristor islands encode self-state. Free energy is decomposed into epistemic (uncertainty reduction) and pragmatic (preference satisfaction) terms, minimized through OTA negative feedback circuits.',
    visual: <MemristorGrid />,
  },
  {
    num: 'LAYER 3',
    title: 'Endoderm',
    subtitle: 'Genotype-phenotype recursion',
    desc: 'Carbon nanotube storage rings in a diamondoid core (1Mb non-volatile) encode the genotype. Phenotype expression occurs through microfluidic transcription — electric field patterns drive gel self-assembly. CNT-FET probes read mesoderm states; a differential memristor circuit compares genotype specification against phenotype actualization. High free energy persistence triggers restructuring or reproduction by budding.',
    visual: <DnaHelix />,
  },
];

export default function ArchitectureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current?.children || [],
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.2,
          }
        );

        gsap.fromTo(
          card.querySelectorAll('.card-content'),
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.2 + 0.3,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="architecture"
      ref={sectionRef}
      style={{
        marginTop: 200,
        background: 'linear-gradient(180deg, var(--base-void) 0%, #0A1520 50%, var(--base-void) 100%)',
        padding: '100px 0',
      }}
    >
      <div
        className="mx-auto text-center"
        style={{
          maxWidth: 720,
          padding: '0 clamp(20px, 5vw, 80px)',
        }}
      >
        <div ref={headerRef}>
          <div className="section-label" style={{ marginBottom: 48 }}>
            03 / ARCHITECTURE
          </div>

          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              color: 'var(--text-primary)',
            }}
          >
            Triploblastic structure
          </h2>

          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 15,
              lineHeight: 1.7,
              color: 'var(--text-secondary)',
              marginTop: 24,
            }}
          >
            The substrate organizes into three functional layers — ectoderm for
            perception-action, mesoderm for world-self modeling, and endoderm
            for self-reference and evolution.
          </p>
        </div>
      </div>

      {/* Layer Cards */}
      <div
        className="mx-auto"
        style={{
          maxWidth: 1200,
          padding: '0 clamp(20px, 5vw, 80px)',
          marginTop: 64,
          display: 'flex',
          flexDirection: 'column',
          gap: 48,
        }}
      >
        {layers.map((layer, i) => (
          <div
            key={i}
            ref={el => { cardsRef.current[i] = el; }}
            className="grid grid-cols-1 lg:grid-cols-12"
            style={{ gap: 0, alignItems: 'stretch' }}
          >
            {/* Layer number */}
            <div
              className="lg:col-span-2 flex items-start justify-start lg:justify-end"
              style={{ padding: '48px 24px 0 0' }}
            >
              <span
                className="mono"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: 'var(--accent-cyan)',
                  letterSpacing: '0.08em',
                }}
              >
                {layer.num}
              </span>
            </div>

            {/* Card */}
            <div
              className="lg:col-span-10 card-content"
              style={{
                background: 'var(--base-surface)',
                border: '1px solid rgba(77, 208, 225, 0.15)',
                borderRadius: 8,
                padding: 48,
              }}
            >
              <h3
                className="card-content"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: '1.75rem',
                  color: 'var(--text-primary)',
                }}
              >
                {layer.title}
              </h3>
              <div
                className="card-content"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 14,
                  color: 'var(--text-secondary)',
                  marginTop: 4,
                }}
              >
                {layer.subtitle}
              </div>
              <p
                className="card-content"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                  marginTop: 16,
                  maxWidth: 700,
                }}
              >
                {layer.desc}
              </p>
              <div className="card-content">{layer.visual}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
