import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import {
  LayoutDashboard, Bot, BookOpen, MapPin, FileEdit,
  Award, StickyNote, Heart, Users, Video, CalendarDays,
  Coffee, LogOut, ChevronLeft, ChevronRight,
  ClipboardList, Target, Layers, MessageCircle, Zap, Trophy
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/agent', label: 'Agent', icon: Bot },
  { path: '/learning', label: 'Learning', icon: BookOpen },
  { path: '/planning', label: 'Planning', icon: Target },
  { path: '/calendar', label: 'Calendar', icon: CalendarDays },
  { path: '/universities', label: 'Universities', icon: MapPin },
  { path: '/apply-guide', label: 'Apply Guide', icon: ClipboardList },
  { path: '/essays', label: 'Essays', icon: FileEdit },
  { path: '/background', label: 'Background', icon: Award },
  { path: '/flashcards', label: 'Flashcards', icon: Layers },
  { path: '/notes', label: 'Notes', icon: StickyNote },
  { path: '/plaza', label: 'Plaza', icon: Heart },
  { path: '/people', label: 'People', icon: Users },
  { path: '/meeting', label: 'Meeting', icon: Video },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <div className="flex h-screen bg-[#0f172a] text-white">
      {/* Sidebar */}
      <aside className={`flex flex-col bg-[#1e293b] border-r border-white/10 transition-all duration-300 ${collapsed ? 'w-16' : 'w-56'}`}>
        {/* Logo */}
        <div className="flex items-center h-14 px-3 border-b border-white/10">
          <img src="/Yhea-logo.png" alt="Yhea" className="w-8 h-8 rounded-lg" />
          {!collapsed && <span className="ml-2 font-bold text-lg tracking-tight">Yhea</span>}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
          {navItems.map(item => (
            <Link key={item.path} to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive(item.path) ? 'bg-blue-600/20 text-blue-400' : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}>
              <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-2 border-t border-white/10 space-y-0.5">
          <Link to="/donate" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-amber-400/80 hover:bg-amber-500/10 transition-colors">
            <Coffee className="w-[18px] h-[18px]" />
            {!collapsed && <span>Buy Coffee</span>}
          </Link>
          <button onClick={() => setCollapsed(!collapsed)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-white hover:bg-white/5 transition-colors w-full">
            {collapsed ? <ChevronRight className="w-[18px] h-[18px]" /> : <ChevronLeft className="w-[18px] h-[18px]" />}
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="h-14 bg-[#1e293b] border-b border-white/10 flex items-center justify-between px-5">
          <h1 className="text-sm font-semibold text-gray-300">
            {navItems.find(n => isActive(n.path))?.label || 'Yhea'}
          </h1>
          <div className="flex items-center gap-4">
            <Link to="/people" className="relative"><MessageCircle className="w-5 h-5 text-gray-400 hover:text-white" /></Link>
            <div className="flex items-center gap-2 bg-blue-500/10 px-2.5 py-1 rounded-full text-xs font-medium text-blue-400">
              <Zap className="w-3.5 h-3.5" />7/10
            </div>
            <div className="flex items-center gap-2 bg-amber-500/10 px-2.5 py-1 rounded-full text-xs font-medium text-amber-400">
              <Trophy className="w-3.5 h-3.5" />128 YC
            </div>
            <button onClick={() => navigate('/profile')} className="flex items-center gap-2 hover:bg-white/5 px-2 py-1 rounded-lg transition-colors">
              {user?.avatar_url ? (
                <img src={user.avatar_url} className="w-7 h-7 rounded-full object-cover" />
              ) : (
                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">{user?.name?.[0] || 'Y'}</div>
              )}
              <span className="text-sm font-medium">{user?.name}</span>
            </button>
            <button onClick={signOut} className="text-gray-500 hover:text-red-400 transition-colors"><LogOut className="w-4 h-4" /></button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
