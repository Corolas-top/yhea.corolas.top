import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FlareCylinder from '../effects/FlareCylinder';

gsap.registerPlugin(ScrollTrigger);

/* ─── SVG Icons ─── */
function LockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ChainIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

const panels = [
  {
    icon: <LockIcon />,
    title: 'Counterfactual Lock',
    phases: [
      'Hypothesis: Layer 2 generates prediction, tagged with Ca²⁺ microdomain marker',
      'Intervention: Cilia activation within 50ms — physical enforcement of acting over watching',
      'Verification: Prediction error calculation; STDP strengthens (|PE|<θ) or protease dissolves (|PE|>θ)',
    ],
  },
  {
    icon: <ChainIcon />,
    title: 'Causal Grounding',
    body: 'Effector activation carries lower metabolic cost than passive observation — physically enforcing intervention over observation. Dedicated memristor clusters track self-caused change versus environment-caused change. Edges in the causal graph only strengthen through Do-operations, blocking spurious correlations.',
  },
  {
    icon: <EyeIcon />,
    title: 'Openness Enforcement',
    submechanisms: [
      'Metastability: Thermal noise injection (+5°C) and creative destruction when superstability detected',
      'Novelty Bonus: dATP-X synthesis boost (+30%) for high-uncertainty exploration',
      'Social Epistemics: 3-instance consensus with dissent bonus for correct divergent predictions',
    ],
  },
];

export default function SafeguardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      gsap.fromTo(
        panelsRef.current.filter(Boolean),
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: panelsRef.current[0],
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="safeguards"
      ref={sectionRef}
      className="relative"
      style={{ marginTop: 200, minHeight: '80vh' }}
    >
      {/* Flare Cylinder Background */}
      <FlareCylinder />

      {/* Content overlay */}
      <div
        className="relative mx-auto"
        style={{
          maxWidth: 1200,
          padding: '100px clamp(20px, 5vw, 80px)',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div ref={headerRef} className="text-center" style={{ maxWidth: 720, margin: '0 auto 64px' }}>
          <div className="section-label" style={{ marginBottom: 48 }}>
            04 / SAFEGUARDS
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
            Epistemic validation
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
            Three mechanisms prevent the substrate from becoming trapped in false
            beliefs, zombie states, or causal illusions.
          </p>
        </div>

        {/* Panels */}
        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 24 }}>
          {panels.map((panel, i) => (
            <div
              key={i}
              ref={el => { panelsRef.current[i] = el; }}
              className="gel-glass"
              style={{
                border: '1px solid rgba(232, 220, 200, 0.08)',
                borderRadius: 12,
                padding: 40,
                minHeight: 320,
              }}
            >
              <div style={{ marginBottom: 16 }}>{panel.icon}</div>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: '1.25rem',
                  color: 'var(--text-primary)',
                  marginBottom: 16,
                }}
              >
                {panel.title}
              </h3>

              {panel.phases && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {panel.phases.map((phase, j) => (
                    <div key={j}>
                      <span
                        className="mono"
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 10,
                          color: 'var(--accent-amber)',
                          marginRight: 8,
                        }}
                      >
                        {String(j + 1).padStart(2, '0')}
                      </span>
                      <span
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 13,
                          lineHeight: 1.5,
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {phase}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {panel.body && (
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {panel.body}
                </p>
              )}

              {panel.submechanisms && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {panel.submechanisms.map((sm, j) => (
                    <p
                      key={j}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 13,
                        lineHeight: 1.5,
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {sm}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
