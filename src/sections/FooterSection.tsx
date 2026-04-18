import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SpecTerminal from '../effects/SpecTerminal';

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        watermarkRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 0.08, scale: 1, duration: 1.5, ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          }
        }
      );

      gsap.fromTo(
        contentRef.current?.children || [],
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
          delay: 0.2,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      style={{
        background: 'var(--base-surface)',
        minHeight: '40vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="flex flex-col items-center justify-center"
        style={{
          padding: '80px clamp(20px, 5vw, 80px)',
          minHeight: '40vh',
        }}
      >
        {/* Watermark */}
        <div
          ref={watermarkRef}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(4rem, 12vw, 10rem)',
            color: 'var(--text-primary)',
            opacity: 0,
            position: 'absolute',
            letterSpacing: '-0.03em',
            lineHeight: 0.9,
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          ΣΟΦΙΑ
        </div>

        {/* Content */}
        <div ref={contentRef} className="relative text-center" style={{ zIndex: 1 }}>
          <div
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: '1.25rem',
              color: 'var(--text-primary)',
              marginBottom: 8,
            }}
          >
            Epistemic Cognitive Substrate v3.0
          </div>

          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14,
              color: 'var(--text-secondary)',
              marginBottom: 32,
            }}
          >
            Technical Specification — Draft for Review
          </div>

          <SpecTerminal
            variant="footer"
            lines={[
              { label: 'SYSTEM', value: 'STABLE' },
              { label: 'BELIEFS', value: 'VERIFIED' },
              { label: 'STATUS', value: 'OBSERVING' },
            ]}
          />
        </div>

        {/* Bottom bar */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            borderTop: '1px solid var(--base-surface)',
            padding: '20px clamp(20px, 5vw, 80px)',
          }}
        >
          <div
            className="mx-auto flex items-center justify-between"
            style={{ maxWidth: 1200 }}
          >
            <span
              className="mono"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: 'var(--text-secondary)',
              }}
            >
              &copy; 2026 Project Σοφία
            </span>

            <div className="flex items-center" style={{ gap: 24 }}>
              {['Protocol', 'Metrics', 'Safety'].map(link => (
                <a
                  key={link}
                  href="#"
                  className="transition-colors duration-200"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => {
                    (e.target as HTMLElement).style.color = 'var(--accent-cyan)';
                  }}
                  onMouseLeave={e => {
                    (e.target as HTMLElement).style.color = 'var(--text-secondary)';
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
