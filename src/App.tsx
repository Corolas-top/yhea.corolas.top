import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
import { Layout } from '@/components/Layout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import AgentChat from '@/pages/AgentChat';
import Learning from '@/pages/Learning';
import LearningUnit from '@/pages/LearningUnit';
import Planning from '@/pages/Planning';
import Universities from '@/pages/Universities';
import UniversityDetail from '@/pages/UniversityDetail';
import ApplicationGuide from '@/pages/ApplicationGuide';
import Notes from '@/pages/Notes';
import Plaza from '@/pages/Plaza';
import Tasks from '@/pages/Tasks';
import Admin from '@/pages/Admin';
import Donate from '@/pages/Donate';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, isLoading } = useAuth();
  if (isLoading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/donate" element={<Donate />} />
      <Route path="*" element={
        <ProtectedRoute>
          <Layout>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/agent" element={<AgentChat />} />
              <Route path="/agent/:sessionId" element={<AgentChat />} />
              <Route path="/learning" element={<Learning />} />
              <Route path="/learning/:courseId/:unitId" element={<LearningUnit />} />
              <Route path="/planning" element={<Planning />} />
              <Route path="/universities" element={<Universities />} />
              <Route path="/universities/:uniId" element={<UniversityDetail />} />
              <Route path="/application-guide" element={<ApplicationGuide />} />
              <Route path="/notes" element={<Notes />} />
              <Route path="/plaza" element={<Plaza />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
            </Routes>
          </Layout>
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
