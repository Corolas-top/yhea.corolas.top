import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'OVERVIEW', target: '#overview' },
  { label: 'SUBSTRATE', target: '#substrate' },
  { label: 'ARCHITECTURE', target: '#architecture' },
  { label: 'SAFEGUARDS', target: '#safeguards' },
  { label: 'DEVELOPMENT', target: '#development' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Scroll spy
    const sections = navLinks.map(l => l.target.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-100px 0px' }
    );

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (target: string) => {
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(13, 27, 42, 0.6)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
      }}
    >
      <div
        className="flex items-center justify-between mx-auto"
        style={{
          maxWidth: 1200,
          padding: '16px clamp(20px, 5vw, 80px)',
        }}
      >
        {/* Left: Logo */}
        <div
          className="mono"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            color: 'var(--text-primary)',
            letterSpacing: '0.02em',
          }}
        >
          Σοφία v3.0
        </div>

        {/* Center: Links */}
        <div className="hidden md:flex items-center" style={{ gap: 32 }}>
          {navLinks.map(link => (
            <button
              key={link.target}
              onClick={() => scrollTo(link.target)}
              className="transition-colors duration-200"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: 13,
                textTransform: 'uppercase',
                color: activeSection === link.target.slice(1)
                  ? 'var(--accent-cyan)'
                  : 'var(--text-secondary)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.04em',
              }}
              onMouseEnter={e => {
                if (activeSection !== link.target.slice(1)) {
                  (e.target as HTMLElement).style.color = 'var(--accent-cyan)';
                }
              }}
              onMouseLeave={e => {
                if (activeSection !== link.target.slice(1)) {
                  (e.target as HTMLElement).style.color = 'var(--text-secondary)';
                }
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Right: Status */}
        <div className="flex items-center" style={{ gap: 8 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--accent-amber)',
              animation: 'pulse-glow 2s ease-in-out infinite',
            }}
          />
          <span
            className="mono hidden sm:inline"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: 'var(--text-secondary)',
              letterSpacing: '0.02em',
            }}
          >
            LIVE OBSERVATION
          </span>
        </div>
      </div>
    </nav>
  );
}
