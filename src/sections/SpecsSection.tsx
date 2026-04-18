import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const physicalParams = [
  { label: 'Ionic conductivity', value: '0.1–1 S/m' },
  { label: 'Electrochemical window', value: '>4V' },
  { label: 'Memristor on/off ratio', value: '10⁴:1' },
  { label: 'Switching energy', value: '<1 pJ' },
  { label: 'CNT diameter', value: '1–2 nm' },
  { label: 'Porosity', value: '60–70%' },
  { label: 'Mechanical modulus', value: '10–100 kPa' },
  { label: 'dATP-X ΔG', value: '≈ -45 kJ/mol' },
  { label: 'Memristor density', value: '10⁶ units/mm³' },
];

const cognitiveParams = [
  { label: 'Hypervector dimensions', value: '10,000' },
  { label: 'Spike timing precision', value: '0.1 ms' },
  { label: 'STDP window (LTP)', value: 'Δt < 20 ms' },
  { label: 'STDP window (LTD)', value: 'Δt > 20 ms' },
  { label: 'Intervention deadline', value: '50 ms' },
  { label: 'Verification window', value: '100 ms' },
  { label: 'Cilia displacement', value: '±10 μm' },
  { label: 'Chemical sensitivity', value: 'nM' },
  { label: 'Mutation rate', value: '~10⁻⁶' },
];

function ParamRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex items-center justify-between"
      style={{
        padding: '10px 0',
        borderBottom: '1px dotted rgba(13, 27, 42, 0.8)',
      }}
    >
      <span
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: 'var(--text-secondary)',
        }}
      >
        {label}
      </span>
      <span
        className="mono"
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 13,
          color: 'var(--text-primary)',
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default function SpecsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      );

      [leftPanelRef, rightPanelRef].forEach((ref, i) => {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.1,
          }
        );

        const rows = ref.current?.querySelectorAll('.param-row');
        if (rows) {
          gsap.fromTo(
            rows,
            { opacity: 0, x: -10 },
            {
              opacity: 1, x: 0, duration: 0.5, stagger: 0.03, ease: 'power2.out',
              scrollTrigger: {
                trigger: ref.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
              delay: 0.3 + i * 0.1,
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="specs"
      ref={sectionRef}
      style={{ marginTop: 200, paddingBottom: 100 }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: 1200,
          padding: '0 clamp(20px, 5vw, 80px)',
        }}
      >
        {/* Header */}
        <div ref={headerRef} style={{ marginBottom: 64 }}>
          <div className="section-label" style={{ marginBottom: 48 }}>
            06 / SPECIFICATIONS
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
            Technical parameters
          </h2>
        </div>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 32 }}>
          {/* Physical */}
          <div
            ref={leftPanelRef}
            className="gel-glass-light"
            style={{
              borderRadius: 8,
              padding: 40,
            }}
          >
            <div
              className="mono"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: 'var(--accent-cyan)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 24,
              }}
            >
              Physical
            </div>
            {physicalParams.map((p, i) => (
              <div key={i} className="param-row">
                <ParamRow label={p.label} value={p.value} />
              </div>
            ))}
          </div>

          {/* Cognitive */}
          <div
            ref={rightPanelRef}
            className="gel-glass-light"
            style={{
              borderRadius: 8,
              padding: 40,
            }}
          >
            <div
              className="mono"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12,
                color: 'var(--accent-cyan)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 24,
              }}
            >
              Cognitive
            </div>
            {cognitiveParams.map((p, i) => (
              <div key={i} className="param-row">
                <ParamRow label={p.label} value={p.value} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
