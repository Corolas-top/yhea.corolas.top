import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { Layout } from '@/components/Layout';
import Login from '@/pages/Login';
import Onboarding from '@/pages/Onboarding';
import Dashboard from '@/pages/Dashboard';
import AgentHub from '@/pages/AgentHub';
import AgentChat from '@/pages/AgentChat';
import Learning from '@/pages/Learning';
import LearningUnit from '@/pages/LearningUnit';
import Flashcards from '@/pages/Flashcards';
import Planning from '@/pages/Planning';
import CalendarPage from '@/pages/CalendarPage';
import Universities from '@/pages/Universities';
import UniversityDetail from '@/pages/UniversityDetail';
import ApplyGuide from '@/pages/ApplyGuide';
import Essays from '@/pages/Essays';
import Background from '@/pages/Background';
import Notes from '@/pages/Notes';
import Plaza from '@/pages/Plaza';
import People from '@/pages/People';
import Meeting from '@/pages/Meeting';
import ProfilePage from '@/pages/ProfilePage';
import Admin from '@/pages/Admin';
import Donate from '@/pages/Donate';
import PrivacyPolicy from '@/pages/PrivacyPolicy';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading, needsOnboarding } = useAuth();
  if (isLoading) return <div className="flex items-center justify-center h-screen"><div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"/></div>;
  if (!user) return <Navigate to="/login" replace />;
  if (needsOnboarding) return <Navigate to="/onboarding" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="*" element={
          <ProtectedRoute>
            <Layout>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/agent" element={<AgentHub />} />
                <Route path="/agent/:agentType" element={<AgentChat />} />
                <Route path="/learning" element={<Learning />} />
                <Route path="/learning/:courseId/:unitId" element={<LearningUnit />} />
                <Route path="/flashcards" element={<Flashcards />} />
                <Route path="/planning" element={<Planning />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/universities" element={<Universities />} />
                <Route path="/universities/:uniId" element={<UniversityDetail />} />
                <Route path="/apply-guide" element={<ApplyGuide />} />
                <Route path="/essays" element={<Essays />} />
                <Route path="/background" element={<Background />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/plaza" element={<Plaza />} />
                <Route path="/people" element={<People />} />
                <Route path="/meeting" element={<Meeting />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/admin" element={<Admin />} />
              </Routes>
            </Layout>
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}
