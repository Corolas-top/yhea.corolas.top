import { Coffee, Heart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Donate() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-white mb-6"><ArrowLeft className="w-4 h-4" />Back</button>
        <Card className="bg-[#1e293b] border-white/10 shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-8 text-center text-white">
            <Coffee className="w-12 h-12 mx-auto mb-4" />
            <h1 className="text-2xl font-bold">Buy Me a Coffee</h1>
            <p className="text-amber-100 mt-2">Support Yhea&apos;s development</p>
          </div>
          <CardContent className="p-8 space-y-6">
            <p className="text-gray-400 text-center">Yhea is built with love for students worldwide. Your support helps keep the servers running and the AI learning!</p>
            <div className="text-center space-y-3">
              <p className="font-medium text-sm">Scan with Alipay</p>
              <div className="inline-block p-4 bg-white rounded-2xl shadow-lg">
                <img src="/alipay-donate.jpg" alt="Alipay QR" className="w-56 h-56 object-contain" />
              </div>
              <p className="text-xs text-gray-500">天院(**杰)</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" /><span>Thank you for keeping Yhea alive!</span><Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['AI API costs', 'Server hosting', 'New features', 'Content expansion'].map(item => (
                <div key={item} className="flex items-center gap-2 p-2 bg-[#0f172a] rounded-lg text-xs text-gray-400"><div className="w-2 h-2 bg-amber-500 rounded-full" />{item}</div>
              ))}
            </div>
            <Button variant="outline" className="w-full border-white/10" onClick={() => navigate('/dashboard')}><ArrowLeft className="w-4 h-4 mr-2" />Back to Yhea</Button>
          </CardContent>
        </Card>
        <p className="text-center text-xs text-gray-600 mt-6">Yhea - AI Learning Companion · Built for students, by students</p>
      </div>
    </div>
  );
}
