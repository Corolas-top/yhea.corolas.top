import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { GraduationCap, Mail, Lock, User, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Login() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (mode === 'signup' && !agreed) { setError('Please read and agree to the Privacy Policy'); return; }
    setLoading(true);
    if (mode === 'signin') {
      const { error } = await signIn(email, password);
      if (error) setError(error); else navigate('/dashboard');
    } else {
      if (!name.trim()) { setError('Name is required'); setLoading(false); return; }
      const { error } = await signUp(email, password, name);
      if (error) setError(error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#1e293b] border border-white/10 rounded-2xl shadow-2xl p-8">
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-3">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome to Yhea</h1>
            <p className="text-gray-400 text-sm mt-1">Platform of International Education</p>
          </div>

          <div className="flex bg-[#0f172a] rounded-lg p-1 mb-5">
            <button onClick={() => setMode('signin')} className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${mode === 'signin' ? 'bg-[#1e293b] text-white shadow' : 'text-gray-500'}`}>Sign In</button>
            <button onClick={() => setMode('signup')} className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${mode === 'signup' ? 'bg-[#1e293b] text-white shadow' : 'text-gray-500'}`}>New Account</button>
          </div>

          {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === 'signup' && (
              <div className="relative"><User className="absolute left-3 top-3 w-5 h-5 text-gray-500" /><Input placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} className="pl-10 bg-[#0f172a] border-white/10" /></div>
            )}
            <div className="relative"><Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" /><Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="pl-10 bg-[#0f172a] border-white/10" required /></div>
            <div className="relative"><Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" /><Input type="password" placeholder="Password (min 6 chars)" value={password} onChange={e => setPassword(e.target.value)} className="pl-10 bg-[#0f172a] border-white/10" required minLength={6} /></div>

            {mode === 'signup' && (
              <div className="flex items-start gap-2">
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-1 w-4 h-4 rounded border-white/20 bg-[#0f172a]" />
                <p className="text-xs text-gray-400">
                  I have read and agree to the <button type="button" onClick={() => setShowPrivacy(true)} className="text-blue-400 hover:underline">Privacy Policy</button>. Yhea collects data for service improvement only and will never share or sell your information.
                </p>
              </div>
            )}

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? 'Loading...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="relative my-5"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10" /></div><div className="relative flex justify-center text-xs"><span className="bg-[#1e293b] px-2 text-gray-500">or</span></div></div>

          <Button variant="outline" className="w-full border-white/10 hover:bg-white/5" onClick={signInWithGoogle}>
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Continue with Google
          </Button>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4" onClick={() => setShowPrivacy(false)}>
          <div className="bg-[#1e293b] border border-white/10 rounded-xl max-w-lg max-h-[80vh] overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-4"><Shield className="w-5 h-5 text-blue-400" /><h2 className="text-lg font-bold">Privacy Policy</h2></div>
            <div className="text-sm text-gray-300 space-y-3">
              <p><strong className="text-white">Data Collection:</strong> We collect your email, name, academic information (curriculum, subjects, scores), and usage data to provide personalized learning services.</p>
              <p><strong className="text-white">Data Usage:</strong> Your data is used solely for improving your learning experience, generating personalized study plans, and providing AI tutoring. We use anonymized usage patterns for product improvement.</p>
              <p><strong className="text-white">Data Protection:</strong> We never sell, share, or publicly disclose your personal information. All data is stored securely with industry-standard encryption.</p>
              <p><strong className="text-white">Your Rights:</strong> You can request deletion of your account and associated data at any time by contacting us.</p>
              <p><strong className="text-white">Chat Privacy:</strong> Conversations with Yhea Agents are private and not shared with third parties. Mental health conversations are especially protected.</p>
              <p><strong className="text-white">People Chat:</strong> Social messages are stored for 7 days only and then automatically deleted to protect your privacy.</p>
              <p className="text-gray-500 text-xs">Last updated: 2026-04-21</p>
            </div>
            <Button className="w-full mt-4" onClick={() => setShowPrivacy(false)}>I Understand</Button>
          </div>
        </div>
      )}
    </div>
  );
}
