import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUniversities } from '@/hooks/useStore';
import {
  University, Search, MapPin, TrendingUp, Users,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Universities() {
  const navigate = useNavigate();
  const { universities } = useUniversities();
  const [search, setSearch] = useState('');
  const [countryFilter, setCountryFilter] = useState('all');

  const filtered = universities.filter(u => {
    const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.short_name.toLowerCase().includes(search.toLowerCase());
    const matchCountry = countryFilter === 'all' || u.country === countryFilter;
    return matchSearch && matchCountry;
  });

  const countries = ['all', ...Array.from(new Set(universities.map(u => u.country)))];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold flex items-center gap-2"><University className="w-6 h-6" /> University Database</h2>
        <p className="text-gray-500 mt-1">Explore universities worldwide with rankings, majors, and admission data</p>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input placeholder="Search universities..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <select value={countryFilter} onChange={e => setCountryFilter(e.target.value)} className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm">
          {countries.map(c => <option key={c} value={c}>{c === 'all' ? 'All Countries' : c}</option>)}
        </select>
      </div>

      {/* Rankings Quick View */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {['QS Ranking', 'US News', 'THE Ranking', 'Acceptance Rate'].map((label) => (
          <Card key={label} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardContent className="p-3 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium">{label}</span>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* University List */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({filtered.length})</TabsTrigger>
          <TabsTrigger value="usa">USA</TabsTrigger>
          <TabsTrigger value="uk">UK</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4 space-y-3">
          {filtered.map(uni => (
            <Card key={uni.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/universities/${uni.id}`)}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center text-xl font-bold text-blue-700">
                      {uni.short_name[0]}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{uni.name}</h3>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{uni.country}{uni.region ? `, ${uni.region}` : ''}</span>
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{uni.student_population?.toLocaleString()} students</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        {uni.ranking_qs && <Badge variant="outline" className="text-xs">QS #{uni.ranking_qs}</Badge>}
                        {uni.ranking_us_news && <Badge variant="outline" className="text-xs">US News #{uni.ranking_us_news}</Badge>}
                        {uni.acceptance_rate && <Badge variant="outline" className="text-xs">{(uni.acceptance_rate * 100).toFixed(0)}% admit</Badge>}
                        <Badge variant={uni.type === 'private' ? 'default' : 'secondary'} className="text-xs">{uni.type}</Badge>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
          {filtered.length === 0 && <div className="text-center py-12 text-gray-500">No universities match your search</div>}
        </TabsContent>

        <TabsContent value="usa" className="mt-4 space-y-3">
          {filtered.filter(u => u.country === 'USA').map(uni => (
            <Card key={uni.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/universities/${uni.id}`)}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-100 to-blue-100 rounded-xl flex items-center justify-center text-xl font-bold">{uni.short_name[0]}</div>
                    <div>
                      <h3 className="font-bold">{uni.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {uni.ranking_us_news && <Badge variant="outline">US News #{uni.ranking_us_news}</Badge>}
                        {uni.acceptance_rate && <Badge variant="outline">{(uni.acceptance_rate * 100).toFixed(0)}% admit</Badge>}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="uk" className="mt-4 space-y-3">
          {filtered.filter(u => u.country === 'UK').map(uni => (
            <Card key={uni.id} className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/universities/${uni.id}`)}>
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-red-100 rounded-xl flex items-center justify-center text-xl font-bold">{uni.short_name[0]}</div>
                    <div>
                      <h3 className="font-bold">{uni.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        {uni.ranking_qs && <Badge variant="outline">QS #{uni.ranking_qs}</Badge>}
                        {uni.acceptance_rate && <Badge variant="outline">{(uni.acceptance_rate * 100).toFixed(0)}% admit</Badge>}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
