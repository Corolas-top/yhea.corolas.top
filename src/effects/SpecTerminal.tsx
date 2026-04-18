interface SpecTerminalProps {
  lines?: { label: string; value: string }[];
  variant?: 'hero' | 'footer';
}

const defaultHeroLines = [
  { label: 'dATP-X', value: '847.2 mM' },
  { label: 'Free Energy', value: '4.2 x 10^-3 J' },
  { label: 'Density', value: '10^6 units/mm^3' },
];

const defaultFooterLines = [
  { label: 'SYSTEM', value: 'STABLE' },
  { label: 'BELIEFS', value: 'VERIFIED' },
  { label: 'STATUS', value: 'OBSERVING' },
];

export default function SpecTerminal({ lines, variant = 'hero' }: SpecTerminalProps) {
  const data = lines || (variant === 'hero' ? defaultHeroLines : defaultFooterLines);
  const isHero = variant === 'hero';

  return (
    <div
      className="gel-glass-light"
      style={{
        border: '1px solid rgba(77, 208, 225, 0.2)',
        borderRadius: 4,
        padding: 12,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11,
        lineHeight: 1.8,
        color: 'var(--text-secondary)',
        width: isHero ? 180 : 160,
        position: 'relative',
      }}
    >
      {data.map((line, i) => (
        <div
          key={i}
          style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            position: 'relative',
            height: '1.6em',
            opacity: 0.7,
          }}
        >
          <span style={{ color: 'var(--accent-cyan)', opacity: 0.5, marginRight: 4 }}>&gt;</span>
          <span
            style={{
              display: 'inline-block',
              position: 'absolute',
              left: '1.2em',
              color: 'var(--text-primary)',
              animation: `specType 4s steps(25) infinite`,
              animationDelay: `${i * 1.5}s`,
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              width: 0,
            }}
          >
            {line.label}: {line.value}
          </span>
        </div>
      ))}
    </div>
  );
}
