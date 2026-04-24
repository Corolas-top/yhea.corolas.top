import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import Login from '@/pages/Login';
import Onboarding from '@/pages/Onboarding';
import Dashboard from '@/pages/Dashboard';
import AgentHub from '@/pages/AgentHub';
import AgentChat from '@/pages/AgentChat';
import StudyResources from '@/pages/StudyResources';
import Curriculum from '@/pages/Curriculum';
import StdTests from '@/pages/StdTests';
import AdmissionTests from '@/pages/AdmissionTests';
import Planning from '@/pages/Planning';
import CalendarPage from '@/pages/CalendarPage';
import UniversityRankings from '@/pages/UniversityRankings';
import MyUniversities from '@/pages/MyUniversities';
import UniversityDetail from '@/pages/UniversityDetail';
import ApplyGuide from '@/pages/ApplyGuide';
import Essays from '@/pages/Essays';
import BackgroundPage from '@/pages/BackgroundPage';
import Flashcards from '@/pages/Flashcards';
import Notes from '@/pages/Notes';
import Plaza from '@/pages/Plaza';
import People from '@/pages/People';
import Meeting from '@/pages/Meeting';
import ProfilePage from '@/pages/ProfilePage';
import Donate from '@/pages/Donate';
import PrivacyPolicy from '@/pages/PrivacyPolicy';

function Protected({ children }: { children: React.ReactNode }) {
  const { user, isLoading, needsOnboarding } = useAuth();
  if (isLoading) return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
      <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
    </div>
  );
  if (!user) return <Navigate to="/login" replace />;
  if (needsOnboarding) return <Navigate to="/onboarding" replace />;
  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Core */}
      <Route path="/dashboard" element={<Protected><Dashboard /></Protected>} />
      
      {/* Agents */}
      <Route path="/agents" element={<Protected><AgentHub /></Protected>} />
      <Route path="/agent/:agentType" element={<Protected><AgentChat /></Protected>} />
      
      {/* Study Resources */}
      <Route path="/resources" element={<Protected><StudyResources /></Protected>} />
      <Route path="/resources/curriculum" element={<Protected><Curriculum /></Protected>} />
      <Route path="/resources/curriculum/:curriculum" element={<Protected><Curriculum /></Protected>} />
      <Route path="/resources/tests" element={<Protected><StdTests /></Protected>} />
      <Route path="/resources/admission-tests" element={<Protected><AdmissionTests /></Protected>} />
      <Route path="/resources/competitions" element={<Protected><StudyResources /></Protected>} />
      <Route path="/resources/certificates" element={<Protected><StudyResources /></Protected>} />
      
      {/* Planning */}
      <Route path="/planning" element={<Protected><Planning /></Protected>} />
      
      {/* Calendar */}
      <Route path="/calendar" element={<Protected><CalendarPage /></Protected>} />
      
      {/* Universities */}
      <Route path="/universities/rankings" element={<Protected><UniversityRankings /></Protected>} />
      <Route path="/universities/my" element={<Protected><MyUniversities /></Protected>} />
      <Route path="/universities/:id" element={<Protected><UniversityDetail /></Protected>} />
      
      {/* Application */}
      <Route path="/apply/guide" element={<Protected><ApplyGuide /></Protected>} />
      <Route path="/apply/essays" element={<Protected><Essays /></Protected>} />
      
      {/* Background */}
      <Route path="/background" element={<Protected><BackgroundPage /></Protected>} />
      <Route path="/background/resources" element={<Protected><BackgroundPage /></Protected>} />
      <Route path="/background/my" element={<Protected><BackgroundPage /></Protected>} />
      
      {/* Flashcards */}
      <Route path="/flashcards" element={<Protected><Flashcards /></Protected>} />
      
      {/* Notes + Plaza */}
      <Route path="/notes" element={<Protected><Notes /></Protected>} />
      <Route path="/plaza" element={<Protected><Plaza /></Protected>} />
      
      {/* Social */}
      <Route path="/people" element={<Protected><People /></Protected>} />
      <Route path="/meeting" element={<Protected><Meeting /></Protected>} />
      
      {/* Profile */}
      <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
      
      {/* Donate */}
      <Route path="/donate" element={<Protected><Donate /></Protected>} />
      
      {/* Legacy redirects */}
      <Route path="/learning" element={<Navigate to="/resources/curriculum" replace />} />
      <Route path="/agent-hub" element={<Navigate to="/agents" replace />} />
    </Routes>
  );
}
