import { useState, useEffect, useCallback } from 'react';
import type { Course, University, Note, Task, PointBalance, AIUsageQuota } from '@/types';
import { seedCourses, seedUniversities, seedMajors, seedUnits, seedNodes, seedApplicationGuides } from '@/lib/seed-data';

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // For demo: use seed data
    setCourses(seedCourses);
    setLoading(false);
  }, []);

  return { courses, loading };
}

export function useCourseDetail(courseId: string) {
  const units = seedUnits[courseId] || [];
  const nodes = seedNodes;

  const getNodesForUnit = useCallback((unitId: string) => {
    return (seedNodes[unitId] || []) as any[];
  }, []);

  return { units, nodes, getNodesForUnit };
}

export function useUniversities() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setUniversities(seedUniversities);
    setLoading(false);
  }, []);

  const getMajors = useCallback((uniId: string) => {
    return seedMajors.filter(m => m.university_id === uniId);
  }, []);

  const getGuides = useCallback((country: string) => {
    return seedApplicationGuides.filter(g => g.country === country);
  }, []);

  return { universities, loading, getMajors, getGuides };
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    // In production: fetch from Supabase
    // For demo: start with sample notes
    setNotes([
      {
        id: 'n1', author_id: 'demo', title: 'AP Calc BC: Chain Rule Summary', content_json: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'The Chain Rule is crucial for differentiating composite functions.' }] }] }, content_text: 'The Chain Rule is crucial...', course_id: 'ap-calc-bc', node_ids: ['n3-1'], topic_tags: ['calculus', 'chain-rule', 'derivatives'], visibility: 'published', heat_score: 120, quality_score: 85, likes_count: 15, comments_count: 4, bookmarks_count: 8, views_count: 156, source_type: 'manual', created_at: '2026-04-15T10:00:00Z', updated_at: '2026-04-15T10:00:00Z', published_at: '2026-04-15T10:00:00Z', author: { id: 'demo', email: 'demo@yhea.com', name: 'Yhea Learner', role: 'student', created_at: '2026-04-01' } },
      {
        id: 'n2', author_id: 'demo2', title: 'Integration by Parts: My Method', content_json: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'LIATE rule for choosing u and dv.' }] }] }, content_text: 'LIATE rule...', course_id: 'ap-calc-bc', node_ids: [], topic_tags: ['integration', 'by-parts'], visibility: 'published', heat_score: 85, quality_score: 78, likes_count: 12, comments_count: 3, bookmarks_count: 5, views_count: 98, source_type: 'manual', created_at: '2026-04-16T08:00:00Z', updated_at: '2026-04-16T08:00:00Z', published_at: '2026-04-16T08:00:00Z', author: { id: 'demo2', email: 'demo2@yhea.com', name: 'Calc Master', role: 'student', created_at: '2026-04-01' } },
      {
        id: 'n3', author_id: 'demo3', title: 'US vs UK Application: Key Differences', content_json: { type: 'doc', content: [{ type: 'paragraph', content: [{ type: 'text', text: 'US: holistic, essays matter. UK: academic focus, personal statement.' }] }] }, content_text: 'US: holistic...', course_id: undefined, node_ids: [], topic_tags: ['application', 'comparison'], visibility: 'published', heat_score: 200, quality_score: 92, likes_count: 28, comments_count: 7, bookmarks_count: 15, views_count: 312, source_type: 'manual', created_at: '2026-04-17T14:00:00Z', updated_at: '2026-04-17T14:00:00Z', published_at: '2026-04-17T14:00:00Z', author: { id: 'demo3', email: 'demo3@yhea.com', name: 'App Guru', role: 'student', created_at: '2026-04-01' } },
    ]);
  }, []);

  const createNote = useCallback(async (note: Partial<Note>) => {
    const newNote: Note = {
      id: `n${Date.now()}`,
      author_id: 'demo',
      title: note.title || 'Untitled',
      content_json: note.content_json || {},
      content_text: note.content_text || '',
      course_id: note.course_id,
      node_ids: note.node_ids || [],
      topic_tags: note.topic_tags || [],
      visibility: note.visibility || 'private',
      heat_score: 0, likes_count: 0, comments_count: 0, bookmarks_count: 0, views_count: 0,
      source_type: note.source_type || 'manual',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    setNotes(prev => [newNote, ...prev]);
    return newNote;
  }, []);

  return { notes, createNote };
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks([
      { id: 't1', user_id: 'demo', source: 'learning_engine', title: 'Study Unit 1.2: Defining Limits', type: 'study', status: 'pending', priority: 2, course_id: 'ap-calc-bc', node_id: 'n1-2', due_date: '2026-04-22T23:59:00Z', estimated_minutes: 20, created_at: '2026-04-20' },
      { id: 't2', user_id: 'demo', source: 'agent', title: 'Review Chain Rule exercises', type: 'study', status: 'in_progress', priority: 1, course_id: 'ap-calc-bc', node_id: 'n3-1', due_date: '2026-04-21T23:59:00Z', estimated_minutes: 30, created_at: '2026-04-20' },
      { id: 't3', user_id: 'demo', source: 'planning_center', title: 'SAT Registration Deadline', type: 'exam', status: 'pending', priority: 1, due_date: '2026-05-01T23:59:00Z', created_at: '2026-04-15' },
      { id: 't4', user_id: 'demo', source: 'manual', title: 'Write Physics Lab Report', type: 'assignment', status: 'pending', priority: 2, due_date: '2026-04-25T23:59:00Z', created_at: '2026-04-18' },
    ]);
  }, []);

  const toggleTask = useCallback((taskId: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: t.status === 'completed' ? 'pending' : 'completed' as any } : t));
  }, []);

  return { tasks, toggleTask };
}

export function usePoints() {
  const [balance] = useState<PointBalance>({
    user_id: 'demo', balance: 128, lifetime_earned: 350, lifetime_spent: 222
  });

  const [quota, setQuota] = useState<AIUsageQuota>({
    user_id: 'demo', base_daily_limit: 10, base_remaining: 7,
    bonus_from_points: 0, bonus_remaining: 0,
    total_used_lifetime: 45, last_reset_date: '2026-04-21',
    is_new_user: false, new_user_bonus: 0
  });

  const deductAIUse = useCallback(() => {
    setQuota(prev => ({
      ...prev,
      base_remaining: Math.max(0, prev.base_remaining - 1),
      total_used_lifetime: prev.total_used_lifetime + 1
    }));
  }, []);

  return { balance, quota, deductAIUse };
}

export function useChat() {
  const [sessions] = useState([
    { id: 's1', student_id: 'demo', title: 'Chain Rule Help', subject: 'AP Calc BC', message_count: 8, created_at: '2026-04-21T08:00:00Z', updated_at: '2026-04-21T09:30:00Z' },
    { id: 's2', student_id: 'demo', title: 'US Application Strategy', subject: 'Planning', message_count: 5, created_at: '2026-04-20T14:00:00Z', updated_at: '2026-04-20T15:00:00Z' },
    { id: 's3', student_id: 'demo', title: 'Integration by Parts', subject: 'AP Calc BC', message_count: 12, created_at: '2026-04-19T10:00:00Z', updated_at: '2026-04-19T11:30:00Z' },
  ]);

  const activeMessages = [
    { id: 'm1', session_id: 's1', role: 'user' as const, content: 'I\'m struggling with the Chain Rule. Can you explain it like I\'m 15?', created_at: '2026-04-21T08:05:00Z' },
    { id: 'm2', session_id: 's1', role: 'assistant' as const, content: 'Hey! Think of the Chain Rule like peeling an onion 🧅 — you have to deal with the outer layer first, then work your way inside.\n\nIf you have y = (3x² + 1)⁵, the "outer" function is "something raised to the 5th power" and the "inner" function is "3x² + 1".\n\n**Step 1**: Differentiate the outer (power rule): 5·(stuff)⁴\n**Step 2**: Differentiate the inner: 6x\n**Step 3**: Multiply them: 5(3x²+1)⁴ · 6x\n\nWant me to walk through another example?', created_at: '2026-04-21T08:06:00Z' },
    { id: 'm3', session_id: 's1', role: 'user' as const, content: 'That onion analogy actually helped! Give me a harder one.', created_at: '2026-04-21T08:10:00Z' },
    { id: 'm4', session_id: 's1', role: 'assistant' as const, content: 'Awesome! Let\'s try y = sin(x³ + 2x).\n\n**Outer**: sin(something) → derivative is cos(something)\n**Inner**: x³ + 2x → derivative is 3x² + 2\n\nSo: dy/dx = cos(x³ + 2x) · (3x² + 2)\n\nThe key trick: always ask "what\'s the last operation?" That\'s your outer function.\n\n📚 *Source: AP Calculus Course Description 2024, Unit 3, Topic 3.1*\n\nWant to try one yourself? I can give you hints! 🎯', created_at: '2026-04-21T08:11:00Z' },
  ];

  return { sessions, activeMessages };
}
