import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const universities = [
  { id: 'mit', name: 'Massachusetts Institute of Technology', short_name: 'MIT', country: 'USA', region: 'Massachusetts', type: 'private' as const, ranking_qs: 1, ranking_us_news: 2, ranking_the: 3, website: 'https://web.mit.edu', description: 'World-renowned for engineering, physical sciences, and technology.', logo: '/logos/mit.png', student_population: 11500, tuition_range: '$59,750/year', is_active: true },
  { id: 'stanford', name: 'Stanford University', short_name: 'Stanford', country: 'USA', region: 'California', type: 'private' as const, ranking_qs: 3, ranking_us_news: 3, ranking_the: 2, website: 'https://www.stanford.edu', description: 'Known for entrepreneurial culture and proximity to Silicon Valley.', logo: '/logos/stanford.png', student_population: 17000, tuition_range: '$62,484/year', is_active: true },
  { id: 'harvard', name: 'Harvard University', short_name: 'Harvard', country: 'USA', region: 'Massachusetts', type: 'private' as const, ranking_qs: 4, ranking_us_news: 3, ranking_the: 4, website: 'https://www.harvard.edu', description: 'Oldest institution of higher learning in the US.', logo: '/logos/harvard.png', student_population: 23000, tuition_range: '$59,076/year', is_active: true },
  { id: 'cmu', name: 'Carnegie Mellon University', short_name: 'CMU', country: 'USA', region: 'Pennsylvania', type: 'private' as const, ranking_qs: 51, ranking_us_news: 24, ranking_the: 24, website: 'https://www.cmu.edu', description: 'World-renowned for computer science, robotics, and fine arts.', logo: '/logos/cmu.png', student_population: 15000, tuition_range: '$63,829/year', is_active: true },
  { id: 'ucla', name: 'University of California, Los Angeles', short_name: 'UCLA', country: 'USA', region: 'California', type: 'public' as const, ranking_qs: 29, ranking_us_news: 15, ranking_the: 18, website: 'https://www.ucla.edu', description: 'The most applied-to university in the US.', logo: '/logos/ucla.png', student_population: 46000, tuition_range: '$44,524/year', is_active: true },
  { id: 'cambridge', name: 'University of Cambridge', short_name: 'Cambridge', country: 'UK', region: 'Cambridgeshire', type: 'public' as const, ranking_qs: 2, ranking_the: 5, website: 'https://www.cam.ac.uk', description: 'Collegiate research university, founded in 1209.', logo: '/logos/cambridge.png', student_population: 21000, tuition_range: '£25,734-£39,162/year', is_active: true },
  { id: 'oxford', name: 'University of Oxford', short_name: 'Oxford', country: 'UK', region: 'Oxfordshire', type: 'public' as const, ranking_qs: 3, ranking_the: 1, website: 'https://www.ox.ac.uk', description: 'Oldest university in the English-speaking world.', logo: '/logos/oxford.png', student_population: 24000, tuition_range: '£28,950-£44,240/year', is_active: true },
  { id: 'imperial', name: 'Imperial College London', short_name: 'Imperial', country: 'UK', region: 'London', type: 'public' as const, ranking_qs: 6, ranking_the: 8, website: 'https://www.imperial.ac.uk', description: 'Focuses exclusively on science, engineering, medicine, and business.', logo: '/logos/imperial.png', student_population: 20000, tuition_range: '£37,900-£41,650/year', is_active: true },
];

export default function Universities() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');

  const filtered = universities.filter(u => {
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.short_name.toLowerCase().includes(search.toLowerCase());
    const matchCountry = countryFilter === 'all' || u.country === countryFilter;
    return matchSearch && matchCountry;
  });

  return (
    <div className="space-y-6">
      <div><h2 className="text-2xl font-bold flex items-center gap-2"><MapPin className="w-6 h-6 text-blue-400" />University Database</h2><p className="text-gray-400 mt-1">Explore universities worldwide with rankings and majors</p></div>

      <div className="flex gap-3">
        <div className="relative flex-1"><Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" /><Input placeholder="Search universities..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-[#1e293b] border-white/10" /></div>
        <select value={countryFilter} onChange={e => setCountryFilter(e.target.value)} className="px-4 py-2 rounded-lg border border-white/10 bg-[#1e293b] text-sm text-gray-300">
          <option value="all">All Countries</option><option value="USA">USA</option><option value="UK">UK</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {['QS Ranking', 'US News', 'THE Ranking', 'Majors'].map(label => (
          <Card key={label} className="bg-[#1e293b] border-white/10"><CardContent className="p-3 flex items-center gap-2"><TrendingUp className="w-5 h-5 text-blue-400" /><span className="text-sm font-medium">{label}</span></CardContent></Card>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(uni => (
          <Card key={uni.id} className="bg-[#1e293b] border-white/10 hover:border-blue-500/30 transition-all cursor-pointer" onClick={() => navigate(`/universities/${uni.id}`)}>
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center text-xl font-bold text-blue-800 flex-shrink-0 overflow-hidden">
                  {uni.logo ? <img src={uni.logo} alt={uni.short_name} className="w-full h-full object-contain" onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }} /> : uni.short_name[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold">{uni.name}</h3>
                    <Badge variant={uni.type === 'private' ? 'default' : 'secondary'} className="text-xs">{uni.type}</Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{uni.country}{uni.region ? `, ${uni.region}` : ''}</span>
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{uni.student_population?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    {uni.ranking_qs && <Badge variant="outline" className="text-xs border-white/10">QS #{uni.ranking_qs}</Badge>}
                    {uni.ranking_us_news && <Badge variant="outline" className="text-xs border-white/10">US News #{uni.ranking_us_news}</Badge>}
                    {uni.ranking_the && <Badge variant="outline" className="text-xs border-white/10">THE #{uni.ranking_the}</Badge>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
