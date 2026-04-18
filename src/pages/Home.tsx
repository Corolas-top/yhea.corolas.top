import Navigation from '../sections/Navigation';
import HeroSection from '../sections/HeroSection';
import OverviewSection from '../sections/OverviewSection';
import SubstrateSection from '../sections/SubstrateSection';
import ArchitectureSection from '../sections/ArchitectureSection';
import SafeguardsSection from '../sections/SafeguardsSection';
import TimelineSection from '../sections/TimelineSection';
import SpecsSection from '../sections/SpecsSection';
import FooterSection from '../sections/FooterSection';

export default function Home() {
  return (
    <div style={{ background: 'var(--base-void)', minHeight: '100vh' }}>
      <Navigation />
      <HeroSection />
      <OverviewSection />
      <SubstrateSection />
      <ArchitectureSection />
      <SafeguardsSection />
      <TimelineSection />
      <SpecsSection />
      <FooterSection />
    </div>
  );
}
