import { Coffee, Heart, Sparkles, GraduationCap, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

export default function Donate() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 dark:from-gray-950 dark:via-amber-950/20 dark:to-pink-950/20 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Back button */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <Card className="shadow-xl border-0 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-8 text-center text-white">
            <Coffee className="w-12 h-12 mx-auto mb-4" />
            <h1 className="text-2xl font-bold">Buy Me a Coffee</h1>
            <p className="text-amber-100 mt-2">Support Yhea's development</p>
          </div>

          <CardContent className="p-8 space-y-6">
            {/* Description */}
            <div className="text-center space-y-3">
              <p className="text-gray-600 dark:text-gray-400">
                Yhea is built with love for students worldwide. Your support helps us keep the servers running and the AI learning!
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <GraduationCap className="w-4 h-4" />
                <span>100% student-funded</span>
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            {/* Alipay QR Code */}
            <div className="text-center space-y-3">
              <p className="font-medium text-sm">Scan with Alipay to support</p>
              <div className="inline-block p-4 bg-white rounded-2xl shadow-lg">
                <img
                  src="/alipay-donate.jpg"
                  alt="Alipay QR Code"
                  className="w-56 h-56 object-contain"
                />
              </div>
              <p className="text-xs text-gray-500">天院(**杰)</p>
            </div>

            {/* Heart message */}
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span>Thank you for keeping Yhea alive!</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </div>

            {/* What support goes to */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Your support funds:</p>
              <div className="grid grid-cols-2 gap-2">
                {['AI API costs', 'Server hosting', 'New features', 'Content expansion'].map(item => (
                  <div key={item} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-xs">
                    <div className="w-2 h-2 bg-amber-500 rounded-full" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <Button variant="outline" className="w-full" onClick={() => navigate('/dashboard')}>
              <ArrowLeft className="w-4 h-4 mr-2" />Back to Yhea
            </Button>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-gray-400 mt-6">
          Yhea - AI Learning Companion · Built for students, by students
        </p>
      </div>
    </div>
  );
}
