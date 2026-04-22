import { Shield, ArrowLeft, Lock, Eye, Database, Trash2, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-white"><ArrowLeft className="w-4 h-4" />Back</button>

        <div className="text-center py-6">
          <Shield className="w-16 h-16 text-blue-400 mx-auto mb-4" />
          <h1 className="text-3xl font-bold">Privacy Policy</h1>
          <p className="text-gray-400 mt-2">Last updated: April 21, 2026</p>
        </div>

        {[
          { icon: Database, title: 'Data We Collect', content: 'We collect your email, name, academic information (curriculum, subjects, test scores, target universities), and usage data (chat messages, notes, tasks). This data is used solely to provide personalized learning services through our AI agents and platform features.' },
          { icon: Eye, title: 'How We Use Your Data', content: 'Your data is used to generate personalized study plans, provide subject-specific tutoring, track your academic progress, and recommend relevant content. We use anonymized usage patterns for product improvement. We do not use your data for advertising purposes.' },
          { icon: Lock, title: 'Data Protection', content: 'We never sell, share, or publicly disclose your personal information to third parties. All data is stored securely using industry-standard encryption (AES-256 at rest, TLS 1.3 in transit). Access is restricted to authenticated users only through Row Level Security (RLS) policies.' },
          { icon: MessageCircle, title: 'Chat Privacy', content: 'Conversations with Yhea Agents are private and confidential. They are not shared between different agents or with other users. Mental health conversations receive additional protection. Social chat messages (People feature) are automatically deleted after 7 days.' },
          { icon: Trash2, title: 'Your Rights', content: 'You can request deletion of your account and all associated data at any time. Upon deletion, all personal data is permanently removed from our systems within 30 days. You can also export your data (notes, essays) before deletion.' },
        ].map(section => (
          <Card key={section.title} className="bg-[#1e293b] border-white/10"><CardContent className="p-6">
            <div className="flex items-center gap-3 mb-3"><section.icon className="w-5 h-5 text-blue-400" /><h2 className="text-lg font-bold">{section.title}</h2></div>
            <p className="text-sm text-gray-400 leading-relaxed">{section.content}</p>
          </CardContent></Card>
        ))}

        <p className="text-center text-xs text-gray-600 py-4">Yhea - AI Learning Companion · Built for students, by students · corolas-team@yhea.app</p>
      </div>
    </div>
  );
}
