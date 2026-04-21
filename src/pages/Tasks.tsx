import { useState } from 'react';
import { useTasks } from '@/hooks/useStore';
import {
  Trophy, CheckCircle2, Circle, AlertCircle, Clock, Plus,
  Calendar, TrendingUp, BookOpen, Compass
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const typeIcons: Record<string, React.ElementType> = {
  study: BookOpen,
  exam: AlertCircle,
  assignment: Compass,
  application_deadline: Calendar,
};

const priorityColors: Record<number, string> = {
  1: 'bg-red-100 text-red-700',
  2: 'bg-amber-100 text-amber-700',
  3: 'bg-green-100 text-green-700',
};

export default function Tasks() {
  const { tasks, toggleTask } = useTasks();
  const [filter] = useState('all');

  const filtered = tasks.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'pending') return t.status === 'pending' || t.status === 'in_progress';
    if (filter === 'completed') return t.status === 'completed';
    return true;
  });

  const completedCount = tasks.filter(t => t.status === 'completed').length;
  const completionRate = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2"><Trophy className="w-6 h-6" /> Tasks</h2>
          <p className="text-gray-500 mt-1">Stay organized and earn credits for completing tasks</p>
        </div>
        <Button><Plus className="w-4 h-4 mr-2" />Add Task</Button>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="font-bold text-lg">{completionRate}% Complete</p>
                <p className="text-sm text-gray-500">{completedCount} of {tasks.length} tasks done</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-amber-600">+{completedCount * 2}</p>
              <p className="text-xs text-gray-500">YC earned today</p>
            </div>
          </div>
          <Progress value={completionRate} className="h-3" />
        </CardContent>
      </Card>

      {/* Task List */}
      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All ({tasks.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({tasks.filter(t => t.status !== 'completed').length})</TabsTrigger>
            <TabsTrigger value="completed">Done ({completedCount})</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-4 space-y-2">
          {filtered.map(task => {
            const Icon = typeIcons[task.type] || Circle;
            return (
              <Card key={task.id} className={`transition-all ${task.status === 'completed' ? 'opacity-60' : ''}`}>
                <CardContent className="p-4 flex items-center gap-4">
                  <button onClick={() => toggleTask(task.id)} className="flex-shrink-0">
                    {task.status === 'completed' ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-300 hover:text-blue-500 transition-colors" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-400' : ''}`}>{task.title}</p>
                      <Badge className={`${priorityColors[task.priority]} text-xs`}>
                        {task.priority === 1 ? 'High' : task.priority === 2 ? 'Medium' : 'Low'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Icon className="w-3 h-3" />{task.type}</span>
                      {task.due_date && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{new Date(task.due_date).toLocaleDateString()}</span>}
                      {task.estimated_minutes && <span>{task.estimated_minutes} min</span>}
                    </div>
                  </div>

                  <div className="flex-shrink-0 text-right">
                    {task.status !== 'completed' && (
                      <Badge variant="outline" className="text-xs">+2 YC</Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="pending" className="mt-4 space-y-2">
          {filtered.filter(t => t.status !== 'completed').map(task => (
            <Card key={task.id}>
              <CardContent className="p-4 flex items-center gap-4">
                <button onClick={() => toggleTask(task.id)}><Circle className="w-6 h-6 text-gray-300 hover:text-blue-500" /></button>
                <div className="flex-1"><p className="font-medium">{task.title}</p><p className="text-xs text-gray-500">{task.due_date && new Date(task.due_date).toLocaleDateString()}</p></div>
                <Badge variant="outline" className="text-xs">+2 YC</Badge>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="mt-4 space-y-2">
          {filtered.filter(t => t.status === 'completed').map(task => (
            <Card key={task.id} className="opacity-60">
              <CardContent className="p-4 flex items-center gap-4">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
                <p className="font-medium line-through text-gray-400">{task.title}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
