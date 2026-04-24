import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import Login from '@/pages/Login';
import Onboarding from '@/pages/Onboarding';
import Dashboard from '@/pages/Dashboard';
import AgentChat from '@/pages/AgentChat';
import Learning from '@/pages/Learning';
import Flashcards from '@/pages/Flashcards';
import Planning from '@/pages/Planning';
import CalendarPage from '@/pages/CalendarPage';
import Universities from '@/pages/Universities';
import UniversityDetail from '@/pages/UniversityDetail';
import UniversityRankings from '@/pages/UniversityRankings';
import MyUniversities from '@/pages/MyUniversities';
import ApplyGuide from '@/pages/ApplyGuide';
import Essays from '@/pages/Essays';
import BackgroundPage from '@/pages/Background';
import Notes from '@/pages/Notes';
import Plaza from '@/pages/Plaza';
import People from '@/pages/People';
import Meeting from '@/pages/Meeting';
import ProfilePage from '@/pages/ProfilePage';
import Donate from '@/pages/Donate';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import Tasks from '@/pages/Tasks';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading, needsOnboarding } = useAuth();
  if (isLoading) return <div className="min-h-screen bg-[#0f172a] flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" /></div>;
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

      {/* Main routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      
      {/* Agents */}
      <Route path="/agent/:agentType" element={<ProtectedRoute><AgentChat /></ProtectedRoute>} />
      
      {/* Study Resources */}
      <Route path="/resources/curriculum" element={<ProtectedRoute><Learning /></ProtectedRoute>} />
      <Route path="/resources/tests" element={<ProtectedRoute><Learning /></ProtectedRoute>} />
      <Route path="/resources/competitions" element={<ProtectedRoute><BackgroundPage /></ProtectedRoute>} />
      <Route path="/resources/certificates" element={<ProtectedRoute><div className="text-gray-400">Certificates - Coming Soon</div></ProtectedRoute>} />
      <Route path="/resources/admission-tests" element={<ProtectedRoute><div className="text-gray-400">Admission Tests - Coming Soon</div></ProtectedRoute>} />
      
      {/* Planning */}
      <Route path="/planning" element={<ProtectedRoute><Planning /></ProtectedRoute>} />
      
      {/* Calendar */}
      <Route path="/calendar" element={<ProtectedRoute><CalendarPage /></ProtectedRoute>} />
      
      {/* Universities */}
      <Route path="/universities" element={<ProtectedRoute><Universities /></ProtectedRoute>} />
      <Route path="/universities/:id" element={<ProtectedRoute><UniversityDetail /></ProtectedRoute>} />
      <Route path="/universities/rankings" element={<ProtectedRoute><UniversityRankings /></ProtectedRoute>} />
      <Route path="/universities/my" element={<ProtectedRoute><MyUniversities /></ProtectedRoute>} />
      
      {/* Application */}
      <Route path="/apply/guide" element={<ProtectedRoute><ApplyGuide /></ProtectedRoute>} />
      <Route path="/apply/essays" element={<ProtectedRoute><Essays /></ProtectedRoute>} />
      <Route path="/essays" element={<ProtectedRoute><Essays /></ProtectedRoute>} />
      
      {/* Background */}
      <Route path="/background/resources" element={<ProtectedRoute><BackgroundPage /></ProtectedRoute>} />
      <Route path="/background/my" element={<ProtectedRoute><BackgroundPage /></ProtectedRoute>} />
      
      {/* Flashcards */}
      <Route path="/flashcards" element={<ProtectedRoute><Flashcards /></ProtectedRoute>} />
      
      {/* Notes */}
      <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
      
      {/* Plaza */}
      <Route path="/plaza" element={<ProtectedRoute><Plaza /></ProtectedRoute>} />
      
      {/* People */}
      <Route path="/people" element={<ProtectedRoute><People /></ProtectedRoute>} />
      
      {/* Meeting */}
      <Route path="/meeting" element={<ProtectedRoute><Meeting /></ProtectedRoute>} />
      
      {/* Saved */}
      <Route path="/saved" element={<ProtectedRoute><div className="text-gray-400">Saved & Following - Coming Soon</div></ProtectedRoute>} />
      
      {/* Profile */}
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      
      {/* Legacy routes */}
      <Route path="/learning" element={<ProtectedRoute><Learning /></ProtectedRoute>} />
      <Route path="/learning/:courseId/:unitId" element={<ProtectedRoute><Learning /></ProtectedRoute>} />
      <Route path="/agent-hub" element={<ProtectedRoute><Navigate to="/agent/admission" replace /></ProtectedRoute>} />
      <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
      
      {/* Donate */}
      <Route path="/donate" element={<ProtectedRoute><Donate /></ProtectedRoute>} />
    </Routes>
  );
}
