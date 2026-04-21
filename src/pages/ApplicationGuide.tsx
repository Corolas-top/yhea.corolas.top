import { useState } from 'react';
import { useUniversities } from '@/hooks/useStore';
import {
  ClipboardList, Globe, FileText, Calendar, CheckCircle2,
  BookOpen, GraduationCap, PenLine, Plane
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const countryMeta: Record<string, { flag: string; color: string; icon: React.ElementType }> = {
  USA: { flag: '🇺🇸', color: 'bg-blue-100 text-blue-700', icon: GraduationCap },
  UK: { flag: '🇬🇧', color: 'bg-red-100 text-red-700', icon: BookOpen },
  Canada: { flag: '🇨🇦', color: 'bg-red-100 text-red-600', icon: Plane },
};

const sectionIcons: Record<string, React.ElementType> = {
  overview: BookOpen,
  timelines: Calendar,
  essays: PenLine,
  testing: FileText,
};

export default function ApplicationGuide() {
  const { getGuides } = useUniversities();
  const [activeCountry, setActiveCountry] = useState('USA');
  const guides = getGuides(activeCountry);

  const grouped = guides.reduce((acc, g) => {
    if (!acc[g.section]) acc[g.section] = [];
    acc[g.section].push(g);
    return acc;
  }, {} as Record<string, typeof guides>);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2"><ClipboardList className="w-6 h-6" /> Application Guide</h2>
        <p className="text-gray-500 mt-1">Step-by-step guidance for university applications worldwide</p>
      </div>

      {/* Country Selector */}
      <div className="flex gap-3">
        {Object.entries(countryMeta).map(([country, meta]) => {
          const Icon = meta.icon;
          return (
            <button
              key={country}
              onClick={() => setActiveCountry(country)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-colors ${
                activeCountry === country
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{country}</span>
            </button>
          );
        })}
      </div>

      {/* Guide Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5" />
            {activeCountry} Application Process
          </CardTitle>
        </CardHeader>
        <CardContent>
          {Object.entries(grouped).map(([section, items]) => {
            const SectionIcon = sectionIcons[section] || FileText;
            return (
              <div key={section} className="mb-6 last:mb-0">
                <h3 className="font-bold text-lg flex items-center gap-2 mb-3 capitalize">
                  <SectionIcon className="w-5 h-5 text-blue-600" />
                  {section}
                </h3>
                <div className="space-y-3">
                  {items.map(g => (
                    <div key={g.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h4 className="font-medium mb-2">{g.title}</h4>
                      <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-line leading-relaxed">
                        {g.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {guides.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <ClipboardList className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No guides available for this country yet.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Checklist */}
      <Card>
        <CardHeader><CardTitle className="text-lg flex items-center gap-2"><CheckCircle2 className="w-5 h-5" />Application Checklist</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              'Research target universities (10-12 schools)',
              'Register for SAT/ACT/TOEFL',
              'Request recommendation letters',
              'Draft personal statement / essays',
              'Fill out application forms',
              'Submit by deadline (ED/EA/RD)',
              'Complete financial aid applications',
              'Prepare for interviews (if required)',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
