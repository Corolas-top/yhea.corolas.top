import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Bot, BookOpen, Target, CalendarDays, GraduationCap, FileEdit, Award, Layers, StickyNote, Compass, Users, Video, Coffee, LogOut, ChevronLeft, UserCircle, FolderHeart } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface NavItem {
  label: string;
  icon: any;
  path?: string;
  children?: { label: string; path: string; badge?: string }[];
  badge?: string;
}

const NAV: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Yhea Agents', icon: Bot, badge: 'AI', path: '/agents' },
  { label: 'Study Resources', icon: BookOpen, children: [
    { label: 'Curriculum (AP/IB/AL)', path: '/resources/curriculum' },
    { label: 'Standardized Tests', path: '/resources/tests', badge: 'TOEFL/SAT' },
    { label: 'Admission Tests', path: '/resources/admission-tests', badge: 'STEP/MAT' },
    { label: 'Competitions', path: '/resources/competitions' },
    { label: 'Certificates', path: '/resources/certificates' },
  ]},
  { label: 'Planning', icon: Target, path: '/planning' },
  { label: 'Calendar', icon: CalendarDays, path: '/calendar' },
  { label: 'Universities', icon: GraduationCap, children: [
    { label: 'Rankings', path: '/universities/rankings' },
    { label: 'My Universities', path: '/universities/my' },
  ]},
  { label: 'Application', icon: FileEdit, children: [
    { label: 'Guidelines', path: '/apply/guide' },
    { label: 'My Essays', path: '/apply/essays' },
  ]},
  { label: 'Background', icon: Award, children: [
    { label: 'Resources', path: '/background/resources' },
    { label: 'My Background', path: '/background/my' },
  ]},
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
  const loc = useLocation();
  const { user, signOut } = useAuth();

  const isActive = (p: string) => loc.pathname === p || loc.pathname.startsWith(p + '/');
  const isParentActive = (item: NavItem) => item.children?.some(c => isActive(c.path)) || false;

  return (
    <div className="flex h-screen bg-[#0f172a] text-white">
      <aside className={`${collapsed ? 'w-16' : 'w-56'} bg-[#0f172a] border-r border-white/10 flex flex-col transition-all flex-shrink-0`}>
        <div className="h-14 flex items-center justify-between px-3 border-b border-white/10">
          {!collapsed && <Link to="/dashboard" className="flex items-center gap-2"><span className="font-bold text-lg text-blue-400">Yhea</span></Link>}
          <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 hover:bg-white/5 rounded-lg"><ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} /></button>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          {NAV.map(item => (
            <div key={item.label}>
              {item.path ? (
                <Link to={item.path} className={`flex items-center gap-2.5 px-3 py-2 mx-2 rounded-lg text-sm transition-colors ${isActive(item.path) ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}`}>
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {!collapsed && <><span className="truncate">{item.label}</span>{item.badge && <span className="ml-auto text-[10px] px-1.5 py-0.5 bg-blue-500/20 text-blue-400 rounded-full">{item.badge}</span>}</>}
                </Link>
              ) : (
                <>
                  <button onClick={() => setExpanded(p => ({ ...p, [item.label]: !p[item.label] }))} className={`w-full flex items-center gap-2.5 px-3 py-2 mx-2 rounded-lg text-sm transition-colors ${isParentActive(item) ? 'bg-white/5 text-gray-200' : 'text-gray-400 hover:bg-white/5'}`}>
                    <item.icon className="w-4 h-4 flex-shrink-0" />
                    {!collapsed && <><span className="truncate flex-1 text-left">{item.label}</span><span className="text-gray-600 text-xs">{expanded[item.label] ? '−' : '+'}</span></>}
                  </button>
                  {!collapsed && expanded[item.label] && item.children && (
                    <div className="ml-5 space-y-0.5">
                      {item.children.map(c => (
                        <Link key={c.path} to={c.path} className={`flex items-center gap-2 px-3 py-1.5 mx-2 rounded-lg text-xs transition-colors ${isActive(c.path) ? 'bg-blue-600/20 text-blue-400' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'}`}>
                          <span className="truncate">{c.label}</span>{c.badge && <span className="ml-auto text-[9px] px-1 py-0.5 bg-white/5 rounded">{c.badge}</span>}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </nav>
        <div className="p-2 border-t border-white/10 space-y-1">
          <Link to="/donate" className="flex items-center gap-2.5 px-3 py-2 mx-2 rounded-lg text-sm text-amber-400 hover:bg-amber-500/10 transition-colors">
            <Coffee className="w-4 h-4" />{!collapsed && <span>Buy Me a Coffee</span>}
          </Link>
          <button onClick={signOut} className="w-full flex items-center gap-2.5 px-3 py-2 mx-2 rounded-lg text-sm text-gray-400 hover:bg-white/5 transition-colors">
            <LogOut className="w-4 h-4" />{!collapsed && <span>Logout</span>}
          </button>
          {user && !collapsed && <div className="px-3 py-1 text-[11px] text-gray-600 truncate">{user.name || user.email}</div>}
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
