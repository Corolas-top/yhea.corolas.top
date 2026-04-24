import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import {
  LayoutDashboard, Bot, BookOpen, CalendarDays, GraduationCap, FileEdit,
  StickyNote, Users, Video, Coffee, LogOut, ChevronLeft, ChevronRight,
  Target, Compass, Layers, Award,
  FolderHeart, UserCircle, Zap
} from 'lucide-react';
interface NavItem {
  label: string;
  icon: any;
  path?: string;
  children?: { label: string; path: string; badge?: string }[];
  badge?: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  {
    label: 'Yhea Agents', icon: Bot, badge: 'AI',
    children: [
      { label: 'Admission Advisor', path: '/agent/admission' },
      { label: 'Course Teacher', path: '/agent/teacher' },
      { label: 'Essay Assistant', path: '/agent/essay' },
      { label: 'Free Agent', path: '/agent/free' },
    ],
  },
  {
    label: 'Study Resources', icon: BookOpen,
    children: [
      { label: 'Curriculum', path: '/resources/curriculum', badge: 'AP/IB/AL' },
      { label: 'Standardized Tests', path: '/resources/tests', badge: 'TOEFL/SAT' },
      { label: 'Competitions', path: '/resources/competitions' },
      { label: 'Certificates', path: '/resources/certificates' },
      { label: 'Admission Tests', path: '/resources/admission-tests', badge: 'STEP/MAT' },
    ],
  },
  { label: 'Planning', icon: Target, path: '/planning' },
  { label: 'Calendar', icon: CalendarDays, path: '/calendar' },
  {
    label: 'Universities', icon: GraduationCap,
    children: [
      { label: 'Rankings', path: '/universities/rankings' },
      { label: 'My Universities', path: '/universities/my' },
    ],
  },
  {
    label: 'Application', icon: FileEdit,
    children: [
      { label: 'Guidelines', path: '/apply/guide' },
      { label: 'My Essays', path: '/apply/essays' },
    ],
  },
  {
    label: 'Background', icon: Award,
    children: [
      { label: 'Resources', path: '/background/resources' },
      { label: 'My Background', path: '/background/my' },
    ],
  },
  { label: 'Flashcards', icon: Layers, path: '/flashcards' },
  { label: 'Notes', icon: StickyNote, path: '/notes' },
  { label: 'Plaza', icon: Compass, path: '/plaza' },
  { label: 'People', icon: Users, path: '/people' },
  { label: 'Meeting', icon: Video, path: '/meeting' },
  { label: 'Saved', icon: FolderHeart, path: '/saved' },
  { label: 'My Profile', icon: UserCircle, path: '/profile' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [agentQuota, setAgentQuota] = useState(4);
  const location = useLocation();
  const { user, signOut } = useAuth();

  useEffect(() => {
    if (user) fetchQuota();
  }, [user]);

  const fetchQuota = async () => {
    const { data } = await supabase.from('ai_usage_quotas').select('*').eq('user_id', user!.id).single();
    if (data) {
      const total = data.base_remaining + data.bonus_remaining;
      setAgentQuota(total);
    }
  };

  const isActive = (path: string) => location.pathname === path;
  const isParentActive = (item: NavItem) => {
    if (item.path) return isActive(item.path);
    return item.children?.some(c => location.pathname.startsWith(c.path)) || false;
  };

  return (
    <div className="flex h-screen bg-[#0f172a] text-white">
      {/* Sidebar */}
      <aside className={`${collapsed ? 'w-16' : 'w-60'} bg-[#0f172a] border-r border-white/10 flex flex-col transition-all duration-300 flex-shrink-0`}>
        {/* Logo */}
        <div className="h-14 flex items-center justify-between px-3 border-b border-white/10">
          {!collapsed && <Link to="/dashboard" className="flex items-center gap-2"><img src="/Yhea-logo.png" className="h-8 w-auto" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} alt="Yhea" /><span className="font-bold text-lg text-blue-400">Yhea</span></Link>}
          <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 hover:bg-white/5 rounded-lg transition-colors">
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* AI Quota Badge */}
        {!collapsed && (
          <div className="mx-3 mt-3 p-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-500/20">
            <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-blue-400" /><span className="text-xs font-medium">Agent Uses: {agentQuota}</span></div>
          </div>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-2 space-y-0.5">
          {NAV_ITEMS.map(item => (
            <div key={item.label}>
              {item.path ? (
                <Link to={item.path} className={`flex items-center gap-2.5 px-3 py-2 mx-2 rounded-lg text-sm transition-colors ${isActive(item.path) ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}`}>
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                  {!collapsed && item.badge && <span className="ml-auto text-[10px] px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded-full">{item.badge}</span>}
                </Link>
              ) : (
                <>
                  <button onClick={() => setExpanded(p => ({ ...p, [item.label]: !p[item.label] }))}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 mx-2 rounded-lg text-sm transition-colors ${isParentActive(item) ? 'bg-white/5 text-gray-200' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}`}>
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    {!collapsed && <><span className="truncate flex-1 text-left">{item.label}</span><span className="text-gray-600 text-xs">{expanded[item.label] ? '−' : '+'}</span></>}
                  </button>
                  {!collapsed && expanded[item.label] && item.children && (
                    <div className="ml-6 space-y-0.5">
                      {item.children.map(child => (
                        <Link key={child.path} to={child.path} className={`flex items-center gap-2 px-3 py-1.5 mx-2 rounded-lg text-xs transition-colors ${isActive(child.path) ? 'bg-blue-600/20 text-blue-400' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'}`}>
                          <span className="truncate">{child.label}</span>
                          {child.badge && <span className="ml-auto text-[9px] px-1 py-0.5 bg-white/5 rounded">{child.badge}</span>}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-2 border-t border-white/10 space-y-1">
          <Link to="/donate" className="flex items-center gap-2.5 px-3 py-2 mx-2 rounded-lg text-sm text-amber-400 hover:bg-amber-500/10 transition-colors">
            <Coffee className="w-4 h-4" />{!collapsed && <span>Buy Me a Coffee</span>}
          </Link>
          <button onClick={signOut} className="w-full flex items-center gap-2.5 px-3 py-2 mx-2 rounded-lg text-sm text-gray-400 hover:bg-white/5 transition-colors">
            <LogOut className="w-4 h-4" />{!collapsed && <span>Logout</span>}
          </button>
          {user && !collapsed && <div className="px-3 py-2 text-xs text-gray-500 truncate">{user.name || user.email}</div>}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
