import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { GraduationCap, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CURRICULA = ['AP', 'A-Level', 'IB'];
const YEARS = [1, 2, 3, 4];

const AP_SUBJECTS = ['Calculus BC', 'Calculus AB', 'Physics C: Mechanics', 'Physics C: E&M', 'Physics 1', 'Chemistry', 'Biology', 'Computer Science A', 'Statistics', 'Macroeconomics', 'Microeconomics', 'Psychology', 'English Literature', 'English Language', 'US History', 'World History'];
const IB_SUBJECTS = ['Math AA HL', 'Math AA SL', 'Math AI HL', 'Math AI SL', 'Physics HL', 'Physics SL', 'Chemistry HL', 'Chemistry SL', 'Biology HL', 'Biology SL', 'Computer Science HL', 'Computer Science SL', 'Economics HL', 'Economics SL', 'Psychology HL', 'Psychology SL', 'English A HL', 'English A SL'];
const ALEVEL_SUBJECTS = ['Mathematics', 'Further Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Economics', 'Psychology', 'English Literature'];

const LANG_TESTS = ['TOEFL iBT', 'IELTS Academic', 'Duolingo English Test', 'PTE Academic'];
const STD_TESTS = ['SAT', 'ACT'];
const COUNTRIES = ['USA', 'UK', 'Canada', 'Australia', 'Singapore', 'Hong Kong', 'Other'];

export default function Onboarding() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [curriculum, setCurriculum] = useState('');
  const [year, setYear] = useState(0);
  const [subjects, setSubjects] = useState<string[]>([]);
  const [langTests, setLangTests] = useState<string[]>([]);
  const [langScores, setLangScores] = useState<Record<string, number>>({});
  const [stdTests, setStdTests] = useState<string[]>([]);
  const [stdScores, setStdScores] = useState<Record<string, number>>({});
  const [targetCountries, setTargetCountries] = useState<string[]>([]);
  const [bio, setBio] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);

  const subjectList = curriculum === 'AP' ? AP_SUBJECTS : curriculum === 'IB' ? IB_SUBJECTS : ALEVEL_SUBJECTS;

  const toggleSubject = (s: string) => setSubjects(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);
  const toggleLang = (t: string) => setLangTests(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  const toggleStd = (t: string) => setStdTests(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);
  const toggleCountry = (c: string) => setTargetCountries(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    await (supabase.from('profiles') as any).insert({
      user_id: user.id, curriculum, year, subjects,
      language_tests: langTests, language_target_scores: langScores,
      standardized_tests: stdTests, standardized_target_scores: stdScores,
      target_countries: targetCountries,
    });
    await (supabase.from('users') as any).update({ bio, tags: tags.split(',').map(t => t.trim()).filter(Boolean) }).eq('id', user.id);
    setLoading(false);
    navigate('/dashboard');
  };

  const steps = [
    { title: 'Welcome!', desc: 'Let\'s set up your learning profile' },
    { title: 'Your Curriculum', desc: 'What program are you in?' },
    { title: 'Your Subjects', desc: 'What courses are you taking?' },
    { title: 'Language Tests', desc: 'Any English proficiency tests?' },
    { title: 'Standardized Tests', desc: 'SAT, ACT, or others?' },
    { title: 'Goals', desc: 'Where do you want to study?' },
    { title: 'About You', desc: 'Tell us a bit about yourself' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-[#1e293b] border border-white/10 rounded-2xl p-8">
          {/* Progress */}
          <div className="mb-6">
            <div className="flex gap-1 mb-3">
              {steps.map((_, i) => (
                <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-blue-500' : 'bg-white/10'}`} />
              ))}
            </div>
            <h2 className="text-xl font-bold">{steps[step].title}</h2>
            <p className="text-gray-400 text-sm">{steps[step].desc}</p>
          </div>

          {/* Step 0: Welcome */}
          {step === 0 && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4"><GraduationCap className="w-12 h-12 text-white" /></div>
              <h3 className="text-2xl font-bold mb-2">Welcome to Yhea!</h3>
              <p className="text-gray-400 mb-6">We\'ll help you set up your learning profile so we can personalize your experience.</p>
              <Button className="w-full bg-blue-600" onClick={() => setStep(1)}>Get Started<ChevronRight className="w-4 h-4 ml-2" /></Button>
            </div>
          )}

          {/* Step 1: Curriculum + Year */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Curriculum</label>
                <div className="grid grid-cols-3 gap-2">
                  {CURRICULA.map(c => (
                    <button key={c} onClick={() => setCurriculum(c)} className={`p-3 rounded-lg text-sm font-medium transition-colors border ${curriculum === c ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-[#0f172a] border-white/10 text-gray-400 hover:border-white/20'}`}>{c}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Year</label>
                <div className="grid grid-cols-4 gap-2">
                  {YEARS.map(y => (
                    <button key={y} onClick={() => setYear(y)} className={`p-3 rounded-lg text-sm font-medium transition-colors border ${year === y ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-[#0f172a] border-white/10 text-gray-400 hover:border-white/20'}`}>Year {y}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Subjects */}
          {step === 2 && (
            <div>
              <p className="text-sm text-gray-400 mb-3">Select all subjects you are taking:</p>
              <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-1">
                {subjectList.map(s => (
                  <button key={s} onClick={() => toggleSubject(s)} className={`p-2.5 rounded-lg text-xs font-medium text-left transition-colors border ${subjects.includes(s) ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-[#0f172a] border-white/10 text-gray-400 hover:border-white/20'}`}>
                    {s}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">{subjects.length} selected</p>
            </div>
          )}

          {/* Step 3: Language Tests */}
          {step === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-400">Select tests you plan to take:</p>
              <div className="grid grid-cols-2 gap-2">
                {LANG_TESTS.map(t => (
                  <button key={t} onClick={() => toggleLang(t)} className={`p-3 rounded-lg text-sm font-medium transition-colors border ${langTests.includes(t) ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-[#0f172a] border-white/10 text-gray-400'}`}>{t}</button>
                ))}
              </div>
              {langTests.length > 0 && (
                <div className="space-y-2 mt-4">
                  <p className="text-sm font-medium text-gray-300">Target Scores:</p>
                  {langTests.map(t => (
                    <div key={t} className="flex items-center gap-3"><span className="text-sm text-gray-400 w-32">{t}</span><Input type="number" placeholder="Target score" value={langScores[t] || ''} onChange={e => setLangScores({ ...langScores, [t]: parseInt(e.target.value) || 0 })} className="bg-[#0f172a] border-white/10" /></div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 4: Standardized Tests */}
          {step === 4 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-400">Select tests you plan to take:</p>
              <div className="grid grid-cols-2 gap-2">
                {STD_TESTS.map(t => (
                  <button key={t} onClick={() => toggleStd(t)} className={`p-3 rounded-lg text-sm font-medium transition-colors border ${stdTests.includes(t) ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-[#0f172a] border-white/10 text-gray-400'}`}>{t}</button>
                ))}
              </div>
              {stdTests.length > 0 && (
                <div className="space-y-2 mt-4">
                  <p className="text-sm font-medium text-gray-300">Target Scores:</p>
                  {stdTests.map(t => (
                    <div key={t} className="flex items-center gap-3"><span className="text-sm text-gray-400 w-16">{t}</span><Input type="number" placeholder="Target" value={stdScores[t] || ''} onChange={e => setStdScores({ ...stdScores, [t]: parseInt(e.target.value) || 0 })} className="bg-[#0f172a] border-white/10" /></div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 5: Target Countries */}
          {step === 5 && (
            <div>
              <p className="text-sm text-gray-400 mb-3">Where do you want to study? (Select all)</p>
              <div className="grid grid-cols-2 gap-2">
                {COUNTRIES.map(c => (
                  <button key={c} onClick={() => toggleCountry(c)} className={`p-3 rounded-lg text-sm font-medium transition-colors border ${targetCountries.includes(c) ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-[#0f172a] border-white/10 text-gray-400'}`}>{c}</button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Bio + Tags */}
          {step === 6 && (
            <div className="space-y-4">
              <div><label className="text-sm font-medium text-gray-300 mb-2 block">Bio (optional)</label><Input placeholder="A short intro about yourself" value={bio} onChange={e => setBio(e.target.value)} className="bg-[#0f172a] border-white/10" /></div>
              <div><label className="text-sm font-medium text-gray-300 mb-2 block">Tags (comma separated)</label><Input placeholder="e.g. Math Lover, Aspiring Engineer" value={tags} onChange={e => setTags(e.target.value)} className="bg-[#0f172a] border-white/10" /></div>
              <p className="text-xs text-gray-500">You can always edit these later in Profile.</p>
            </div>
          )}

          {/* Navigation buttons */}
          {step > 0 && (
            <div className="flex gap-3 mt-6">
              {step > 0 && <Button variant="outline" className="border-white/10 hover:bg-white/5" onClick={() => setStep(step - 1)}><ChevronLeft className="w-4 h-4 mr-1" />Back</Button>}
              {step < 6 ? (
                <Button className="flex-1 bg-blue-600" onClick={() => setStep(step + 1)} disabled={step === 1 && (!curriculum || !year)}>Next<ChevronRight className="w-4 h-4 ml-1" /></Button>
              ) : (
                <Button className="flex-1 bg-blue-600" onClick={handleSave} disabled={loading}>{loading ? 'Saving...' : 'Complete Setup'}</Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
