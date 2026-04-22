import { useState } from 'react';
import { ClipboardList, CheckCircle2, PenLine, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const applicationSystems = [
  {
    id: 'common-app', name: 'Common Application', country: 'USA',
    desc: 'Used by 1000+ US universities. One application for multiple schools.',
    essays: [
      { prompt: 'Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.', words: 650, required: false },
      { prompt: 'The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?', words: 650, required: false },
      { prompt: 'Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?', words: 650, required: false },
      { prompt: 'Reflect on something that someone has done for you that has made you happy or thankful in a surprising way. How has this gratitude affected or motivated you?', words: 650, required: false },
      { prompt: 'Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others.', words: 650, required: false },
      { prompt: 'Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?', words: 650, required: false },
      { prompt: 'Share an essay on any topic of your choice. It can be one you\'ve already written, one that responds to a different prompt, or one of your own design.', words: 650, required: false },
    ],
    deadlines: { early: 'Nov 1', regular: 'Jan 1-15' }, website: 'https://www.commonapp.org',
  },
  {
    id: 'coalition', name: 'Coalition Application', country: 'USA',
    desc: 'Used by 170+ member schools. Emphasizes access and affordability.',
    essays: [
      { prompt: 'Tell a story from your life, describing an experience that either demonstrates your character or helped to shape it.', words: 550, required: true },
      { prompt: 'What interests or excites you? How does it shape who you are now or who you might become in the future?', words: 550, required: false },
      { prompt: 'Describe a time when you had a positive impact on others. What were the challenges? What were the rewards?', words: 550, required: false },
      { prompt: 'Has there been a time when an idea or belief of yours was questioned? How did you respond? What did you learn?', words: 550, required: false },
      { prompt: 'What success have you achieved or challenge have you faced? What advice would you give a sibling or friend going through a similar experience?', words: 550, required: false },
    ],
    deadlines: { early: 'Nov 1', regular: 'Jan 1-15' }, website: 'https://www.coalitionforcollegeaccess.org',
  },
  {
    id: 'uc-app', name: 'UC Application', country: 'USA',
    desc: 'University of California system. 9 campuses, one application.',
    essays: [
      { prompt: 'Describe an example of your leadership experience in which you have positively influenced others, helped resolve disputes or contributed to group efforts over time.', words: 350, required: true },
      { prompt: 'Every person has a creative side, and it can be expressed in many ways: problem solving, original and innovative thinking, and artistically, to name a few. Describe how you express your creative side.', words: 350, required: true },
      { prompt: 'What would you say is your greatest talent or skill? How have you developed and demonstrated that talent over time?', words: 350, required: true },
      { prompt: 'Describe how you have taken advantage of a significant educational opportunity or worked to overcome an educational barrier you have faced.', words: 350, required: true },
      { prompt: 'Describe the most significant challenge you have faced and the steps you have taken to overcome this challenge. How has this challenge affected your academic achievement?', words: 350, required: true },
      { prompt: 'Think about an academic subject that inspires you. Describe how you have furthered this interest inside and/or outside of the classroom.', words: 350, required: true },
      { prompt: 'What have you done to make your school or your community a better place?', words: 350, required: true },
      { prompt: 'Beyond what has already been shared in your application, what do you believe makes you a strong candidate for admissions to the University of California?', words: 350, required: true },
    ],
    deadlines: { regular: 'Nov 30' }, website: 'https://apply.universityofcalifornia.edu',
  },
  {
    id: 'ucas', name: 'UCAS', country: 'UK',
    desc: 'All UK university applications. Up to 5 course choices.',
    essays: [
      { prompt: 'Why do you want to study this subject? What sparked your interest and how have you explored it further? (Personal Statement - 2026 format)', words: 4000, required: true },
    ],
    deadlines: { early: 'Oct 15 (Oxbridge/Medicine)', regular: 'Jan 14' }, website: 'https://www.ucas.com',
  },
  {
    id: 'mit-app', name: 'MIT Application', country: 'USA',
    desc: 'MIT uses its own independent application system.',
    essays: [
      { prompt: 'What field of study appeals to you the most right now? Tell us more about why this field of study at MIT appeals to you.', words: 100, required: true },
      { prompt: 'We know you lead a busy life, full of activities, many of which are required of you. Tell us about something you do simply for the pleasure of it.', words: 250, required: true },
      { prompt: 'While some reach their goals following well-trodden paths, others blaze their own trails achieving the unexpected. In what ways have you done something differently than what was expected?', words: 250, required: true },
      { prompt: 'MIT brings people with diverse backgrounds together to collaborate. Describe a time when you contributed to a team or community.', words: 250, required: true },
    ],
    deadlines: { early: 'Nov 1 (EA)', regular: 'Jan 6 (RA)' }, website: 'https://apply.mit.edu',
  },
  {
    id: 'ouac', name: 'OUAC', country: 'Canada',
    desc: 'Ontario Universities Application Centre. Ontario public universities.',
    essays: [{ prompt: 'Supplemental applications vary by university (UofT, Waterloo, McMaster, etc.)', words: 0, required: false }],
    deadlines: { regular: 'Jan 15' }, website: 'https://www.ouac.on.ca',
  },
];

const checklist = [
  'Research target universities', 'Register for standardized tests', 'Request recommendation letters',
  'Draft personal statement/essays', 'Fill out application forms', 'Submit by deadline',
  'Complete financial aid applications', 'Prepare for interviews',
];

export default function ApplyGuide() {
  const [activeSystem, setActiveSystem] = useState('common-app');
  const navigate = useNavigate();
  const system = applicationSystems.find(s => s.id === activeSystem);

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div><h2 className="text-2xl font-bold flex items-center gap-2"><ClipboardList className="w-6 h-6 text-blue-400" />Apply Guide</h2><p className="text-gray-400 mt-1">Step-by-step guidance by application system</p></div>
        <Button size="sm" className="bg-emerald-600" onClick={() => navigate('/essays')}><PenLine className="w-4 h-4 mr-1" />Write Essays</Button>
      </div>

      {/* System Selector */}
      <div className="flex flex-wrap gap-2">
        {applicationSystems.map(s => (
          <button key={s.id} onClick={() => setActiveSystem(s.id)}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all border ${activeSystem === s.id ? 'bg-blue-600/20 border-blue-500 text-blue-400' : 'bg-[#1e293b] border-white/10 text-gray-400 hover:border-white/20'}`}>
            {s.country === 'USA' && <span className="mr-1">🇺🇸</span>}
            {s.country === 'UK' && <span className="mr-1">🇬🇧</span>}
            {s.country === 'Canada' && <span className="mr-1">🇨🇦</span>}
            {s.name}
          </button>
        ))}
      </div>

      {system && (
        <div className="space-y-4">
          {/* System Overview */}
          <Card className="bg-[#1e293b] border-white/10"><CardContent className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div><h3 className="text-xl font-bold">{system.name}</h3><p className="text-sm text-gray-400 mt-1">{system.desc}</p></div>
              {system.website && <a href={system.website} target="_blank" className="text-blue-400 hover:text-blue-300"><ExternalLink className="w-5 h-5" /></a>}
            </div>
            <div className="flex flex-wrap gap-2">
              {system.deadlines.early && <Badge className="bg-amber-500/20 text-amber-400">Early: {system.deadlines.early}</Badge>}
              <Badge className="bg-blue-500/20 text-blue-400">Regular: {system.deadlines.regular}</Badge>
              <Badge variant="outline" className="border-white/10">{system.essays.filter(e => e.required).length} required essays</Badge>
            </div>
          </CardContent></Card>

          {/* Essays */}
          <Card className="bg-[#1e293b] border-white/10"><CardHeader><CardTitle className="text-lg flex items-center gap-2"><PenLine className="w-5 h-5" />Essay Prompts</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {system.essays.map((essay, i) => (
                <div key={i} className="p-4 bg-[#0f172a] rounded-lg border border-white/5">
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs text-gray-500">Essay {i + 1}{essay.required ? ' (Required)' : ' (Optional)'}</span>
                    {essay.words > 0 && <Badge variant="outline" className="text-xs border-white/10">{essay.words} words max</Badge>}
                  </div>
                  <p className="text-sm text-gray-300">{essay.prompt}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Checklist */}
      <Card className="bg-[#1e293b] border-white/10"><CardHeader><CardTitle className="text-lg flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400" />Application Checklist</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {checklist.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 border border-white/5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                <div className="w-5 h-5 border-2 border-gray-600 rounded flex-shrink-0" />
                <span className="text-sm text-gray-300">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
