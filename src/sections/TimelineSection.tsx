import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const phases = [
  {
    id: 'alpha',
    title: 'Phase α',
    subtitle: 'Protoplasm',
    description: 'Boundary-internal distinction via lipid self-assembly. Gel contracts to spherical topology — first self-perception through membrane tension sensing.',
    duration: '0–1 week',
    image: '/phase-alpha.jpg',
    gradient: 'radial-gradient(circle at center, rgba(255,184,0,0.1) 0%, transparent 70%)',
  },
  {
    id: 'beta',
    title: 'Phase β',
    subtitle: 'Protist',
    description: 'Chemotaxis in response to dATP-X gradients. Physical encoding of source locations in memristor conductance gradients. Memory formation begins.',
    duration: '1–4 weeks',
    image: '/phase-beta.jpg',
    gradient: 'radial-gradient(ellipse at 30% 50%, rgba(77,208,225,0.1) 0%, transparent 60%)',
  },
  {
    id: 'gamma',
    title: 'Phase γ',
    subtitle: 'Neurula',
    description: 'Functional differentiation through environmental specialization. Activity-dependent plasticity: high-frequency paths strengthen, low-frequency paths dissolve.',
    duration: '1–3 months',
    image: '/phase-gamma.jpg',
    gradient: 'radial-gradient(circle at 70% 30%, rgba(255,184,0,0.08) 0%, transparent 60%)',
  },
  {
    id: 'delta',
    title: 'Phase δ',
    subtitle: 'Cognizer',
    description: 'Feedforward connections enable temporal sequence learning. Parallel ionic states are maintained in bistable circuits — the emergence of "what if" simulation.',
    duration: '3–6 months',
    image: '/phase-delta.jpg',
    gradient: 'radial-gradient(ellipse at 50% 50%, rgba(77,208,225,0.12) 0%, transparent 70%)',
  },
];

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      itemsRef.current.forEach((item, i) => {
        if (!item) return;

        // Image parallax
        const img = item.querySelector('.timeline-image') as HTMLElement;
        if (img) {
          gsap.fromTo(img,
            { scale: 1.1, y: 30 },
            {
              scale: 1, y: -30, ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              }
            }
          );
        }

        // Item entrance
        gsap.fromTo(
          item,
          { opacity: 0, y: 80 },
          {
            opacity: 1, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="development"
      ref={sectionRef}
      style={{ marginTop: 200 }}
    >
      {/* Header */}
      <div
        className="mx-auto text-center"
        style={{
          maxWidth: 720,
          padding: '0 clamp(20px, 5vw, 80px)',
          marginBottom: 80,
        }}
      >
        <div ref={headerRef}>
          <div className="section-label" style={{ marginBottom: 48 }}>
            05 / DEVELOPMENT
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
            Ontogenetic trajectory
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
            The substrate develops through four stages — from boundary formation
            to counterfactual reasoning — without explicit training.
            Self-organization driven by environmental gradients.
          </p>
        </div>
      </div>

      {/* Timeline Items */}
      <div
        className="mx-auto"
        style={{
          maxWidth: 1000,
          padding: '0 clamp(20px, 5vw, 80px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 120,
        }}
      >
        {phases.map((phase, i) => (
          <div
            key={phase.id}
            ref={el => { itemsRef.current[i] = el; }}
            className="grid grid-cols-1 md:grid-cols-2"
            style={{
              gap: 48,
              alignItems: 'center',
              direction: i % 2 === 1 ? 'rtl' : 'ltr',
            }}
          >
            {/* Image */}
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: 12,
                aspectRatio: '4/5',
                maxHeight: 500,
                direction: 'ltr',
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: phase.gradient,
                  zIndex: 1,
                  borderRadius: 12,
                }}
              />
              <img
                className="timeline-image"
                src={phase.image}
                alt={phase.subtitle}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            {/* Text */}
            <div style={{ direction: 'ltr', padding: '24px 0' }}>
              {/* Duration badge */}
              <div
                className="mono inline-block"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: 'var(--accent-cyan)',
                  background: 'var(--base-surface)',
                  padding: '4px 12px',
                  borderRadius: 100,
                  marginBottom: 24,
                  letterSpacing: '0.02em',
                }}
              >
                {phase.duration}
              </div>

              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: '2.5rem',
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                }}
              >
                {phase.title}
              </h3>

              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                  fontSize: '1.25rem',
                  color: 'var(--accent-amber)',
                  marginTop: 8,
                }}
              >
                {phase.subtitle}
              </div>

              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                  marginTop: 16,
                }}
              >
                {phase.description}
              </p>

              {/* Decorative line */}
              <div
                style={{
                  width: 60,
                  height: 2,
                  background: 'var(--accent-cyan)',
                  marginTop: 32,
                  opacity: 0.4,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
