import { Coffee, Zap, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Donate() {
  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <Coffee className="w-12 h-12 text-amber-400 mx-auto mb-3" />
        <h2 className="text-2xl font-bold">Buy Me a Coffee</h2>
        <p className="text-gray-400 mt-2">Support Yhea and get more AI Agent uses!</p>
      </div>
      <Card className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20">
        <CardContent className="p-6 text-center">
          <Zap className="w-10 h-10 text-amber-400 mx-auto mb-3" />
          <p className="text-lg font-bold mb-1">5 RMB = 1 Agent Use</p>
          <p className="text-sm text-gray-400 mb-4">Scan Alipay QR, then add our WeChat Work</p>
          <div className="w-48 h-48 mx-auto bg-white rounded-xl p-3 mb-4">
            <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs text-center">
              <div><MessageCircle className="w-8 h-8 mx-auto mb-1 text-gray-300" /><p>Enterprise WeChat QR</p></div>
            </div>
          </div>
          <p className="text-xs text-gray-500">Replace with your actual QR code image</p>
        </CardContent>
      </Card>
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-[#1e293b] border-white/10 text-center"><CardContent className="p-4"><p className="text-2xl font-bold text-amber-400">5 RMB</p><p className="text-sm text-gray-400">1 Use</p></CardContent></Card>
        <Card className="bg-[#1e293b] border-white/10 text-center"><CardContent className="p-4"><p className="text-2xl font-bold text-amber-400">25 RMB</p><p className="text-sm text-gray-400">5 Uses</p></CardContent></Card>
        <Card className="bg-[#1e293b] border-white/10 text-center"><CardContent className="p-4"><p className="text-2xl font-bold text-amber-400">50 RMB</p><p className="text-sm text-gray-400">10 Uses</p></CardContent></Card>
      </div>
      <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-4 text-center text-sm text-gray-400">After payment, add our enterprise WeChat for manual credit top-up.</CardContent></Card>
    </div>
  );
}
