import { useEffect, useRef } from 'react';
import SubstrateCanvas from '../effects/SubstrateCanvas';
import SpecTerminal from '../effects/SpecTerminal';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animations
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(labelRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )
      .fromTo(line1Ref.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        0.5
      )
      .fromTo(line2Ref.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        0.65
      )
      .fromTo(line3Ref.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        0.8
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        1.0
      )
      .fromTo(terminalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        1.4
      );

      // Scroll-driven fade out
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=50vh',
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const fadeStart = 0;
          const fadeEnd = 0.5;
          const textOpacity = progress < fadeStart ? 1 :
            progress > fadeEnd ? 0 :
            1 - (progress - fadeStart) / (fadeEnd - fadeStart);

          if (labelRef.current) labelRef.current.style.opacity = String(textOpacity);
          if (line1Ref.current) line1Ref.current.style.opacity = String(textOpacity);
          if (line2Ref.current) line2Ref.current.style.opacity = String(textOpacity);
          if (line3Ref.current) line3Ref.current.style.opacity = String(textOpacity);
          if (subtitleRef.current) subtitleRef.current.style.opacity = String(textOpacity);
          if (terminalRef.current) {
            terminalRef.current.style.opacity = String(textOpacity);
            terminalRef.current.style.transform = `translateY(${progress * 100}px)`;
          }
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', background: 'var(--base-void)' }}
    >
      <SubstrateCanvas />

      {/* Content overlay */}
      <div
        className="relative flex flex-col justify-center h-full"
        style={{
          zIndex: 1,
          paddingLeft: 'clamp(20px, 5vw, 80px)',
          paddingRight: 'clamp(20px, 5vw, 80px)',
          maxWidth: 1200,
        }}
      >
        {/* Top-left label */}
        <div
          ref={labelRef}
          className="absolute mono"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11,
            color: 'var(--accent-cyan)',
            letterSpacing: '0.15em',
            top: 100,
            left: 'clamp(20px, 5vw, 80px)',
            opacity: 0,
          }}
        >
          PROJECT ΣΟΦΙΑ
          <div
            style={{
              display: 'inline-block',
              width: 60,
              height: 1,
              background: 'rgba(77, 208, 225, 0.4)',
              marginLeft: 12,
              verticalAlign: 'middle',
            }}
          />
        </div>

        {/* Main heading */}
        <div style={{ marginTop: -40 }}>
          <div
            ref={line1Ref}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              color: 'var(--text-primary)',
              opacity: 0,
            }}
          >
            Epistemic
          </div>
          <div
            ref={line2Ref}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
              color: 'var(--accent-amber)',
              opacity: 0,
            }}
          >
            Cognitive Substrate
          </div>
          <div
            ref={line3Ref}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              fontSize: '1.5rem',
              color: 'var(--text-secondary)',
              marginTop: 8,
              opacity: 0,
            }}
          >
            v3.0
          </div>
        </div>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 18,
            color: 'var(--text-secondary)',
            maxWidth: 480,
            marginTop: 32,
            lineHeight: 1.6,
            opacity: 0,
          }}
        >
          Self-organizing ionic gel architecture with counterfactual validation.
          A physical substrate that metabolizes, predicts, and learns.
        </p>

        {/* Terminal - bottom right */}
        <div
          ref={terminalRef}
          className="absolute"
          style={{
            bottom: 48,
            right: 'clamp(20px, 5vw, 80px)',
            opacity: 0,
          }}
        >
          <SpecTerminal variant="hero" />
        </div>
      </div>
    </section>
  );
}
