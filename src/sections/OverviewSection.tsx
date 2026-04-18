import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: '10,000', label: 'cilia sensors' },
  { value: '10⁶', label: 'memristors/mm³' },
  { value: '<1 pJ', label: 'per switch' },
];

export default function OverviewSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      });

      tl.fromTo(labelRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }
      )
      .fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        0.1
      )
      .fromTo(bodyRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        0.2
      )
      .fromTo(metricsRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
        0.3
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="overview"
      ref={sectionRef}
      className="mx-auto"
      style={{
        maxWidth: 720,
        padding: '200px clamp(20px, 5vw, 80px) 0',
      }}
    >
      <div ref={labelRef} className="section-label" style={{ marginBottom: 48 }}>
        01 / OVERVIEW
      </div>

      <h2
        ref={headingRef}
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 600,
          fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
          letterSpacing: '-0.02em',
          lineHeight: 1.05,
          color: 'var(--text-primary)',
        }}
      >
        A material that thinks
      </h2>

      <p
        ref={bodyRef}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 15,
          lineHeight: 1.7,
          color: 'var(--text-secondary)',
          maxWidth: 640,
          marginTop: 32,
        }}
      >
        Σοφία is a triphasic ionic gel composite — ionic liquid, carbon nanotube
        network, and graphene scaffold — that performs computation through
        electrochemical dynamics rather than digital logic. It metabolizes a
        modified ATP analogue (dATP-X) to power memristive switching, learns
        through spike-timing-dependent plasticity, and validates its own
        hypotheses through physical intervention.
      </p>

      <div
        ref={metricsRef}
        className="flex items-center justify-center"
        style={{ marginTop: 64, gap: 0 }}
      >
        {metrics.map((m, i) => (
          <div key={i} className="flex items-center">
            <div className="text-center" style={{ padding: '0 40px' }}>
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: '2.5rem',
                  color: 'var(--accent-amber)',
                  lineHeight: 1,
                }}
              >
                {m.value}
              </div>
              <div
                className="mono"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: 'var(--text-secondary)',
                  marginTop: 8,
                  letterSpacing: '0.02em',
                }}
              >
                {m.label}
              </div>
            </div>
            {i < metrics.length - 1 && (
              <div
                style={{
                  width: 1,
                  height: 40,
                  background: 'var(--base-surface)',
                }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
