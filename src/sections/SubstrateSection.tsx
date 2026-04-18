import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    label: 'Ionic Liquid [EMIM][TFSI]',
    body: 'The continuous phase. Electrochemical window exceeding 4V, ionic conductivity 0.1–1 S/m at 25°C. Forms the electrical double layer at CNT interfaces for ion-electron transduction.',
  },
  {
    label: 'CNT-MoS₂ Network',
    body: 'Single-walled carbon nanotubes (1–2nm diameter, carboxyl-functionalized) interwoven with MoS₂ memristor nanosheets. Percolation threshold at 0.5 wt%. The functional heart of computation.',
  },
  {
    label: 'rGO Scaffold',
    body: 'Reduced graphene oxide flakes providing 60–70% porosity for ion permeability. Tissue-like mechanical compliance (10–100 kPa). The skeleton that holds it all.',
  },
];

export default function SubstrateSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column stagger
      gsap.fromTo(
        leftRef.current?.children || [],
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          }
        }
      );

      // Right column diagram
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1, scale: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="substrate"
      ref={sectionRef}
      className="mx-auto"
      style={{
        maxWidth: 1200,
        padding: '200px clamp(20px, 5vw, 80px) 0',
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 64 }}>
        {/* Left column */}
        <div ref={leftRef}>
          <div className="section-label" style={{ marginBottom: 48 }}>
            02 / SUBSTRATE
          </div>

          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              color: 'var(--text-primary)',
              marginBottom: 48,
            }}
          >
            Triphasic composite
          </h2>

          {phases.map((phase, i) => (
            <div key={i} style={{ marginBottom: 32 }}>
              <div
                className="mono"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  textTransform: 'uppercase',
                  color: 'var(--accent-cyan)',
                  letterSpacing: '0.08em',
                  marginBottom: 8,
                }}
              >
                {phase.label}
              </div>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                }}
              >
                {phase.body}
              </p>
            </div>
          ))}
        </div>

        {/* Right column: Composition diagram */}
        <div ref={rightRef} className="flex items-center justify-center">
          <div
            className="relative"
            style={{
              width: 300,
              height: 300,
              perspective: 800,
            }}
          >
            {/* rGO Scaffold (bottom) */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                  linear-gradient(90deg, rgba(26,26,46,0.6) 1px, transparent 1px),
                  linear-gradient(rgba(26,26,46,0.6) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px',
                borderRadius: 8,
                opacity: 0.4,
                transform: 'rotateX(15deg) rotateY(-10deg) translateZ(-30px)',
                border: '1px solid rgba(77, 208, 225, 0.1)',
              }}
            />

            {/* CNT Network (middle) */}
            <div
              className="absolute inset-0"
              style={{
                borderRadius: 8,
                opacity: 0.6,
                transform: 'rotateX(15deg) rotateY(-10deg) translateZ(0px)',
                border: '1px solid rgba(255, 184, 0, 0.3)',
                background: 'radial-gradient(circle at 30% 40%, rgba(255,184,0,0.15) 0%, transparent 60%), radial-gradient(circle at 70% 60%, rgba(255,184,0,0.1) 0%, transparent 50%)',
              }}
            >
              {/* Animated particles */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{
                    width: 3,
                    height: 3,
                    borderRadius: '50%',
                    background: 'var(--accent-amber)',
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    opacity: 0.5 + Math.random() * 0.5,
                    animation: `pulse-glow ${2 + Math.random() * 3}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>

            {/* Ionic Liquid (top) */}
            <div
              className="absolute inset-0"
              style={{
                borderRadius: 8,
                opacity: 0.3,
                transform: 'rotateX(15deg) rotateY(-10deg) translateZ(30px)',
                border: '1px solid rgba(77, 208, 225, 0.2)',
                background: 'radial-gradient(ellipse at center, transparent 30%, rgba(77,208,225,0.15) 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
