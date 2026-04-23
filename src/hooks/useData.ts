// ============================================================
// Unified Data Layer - ALL Supabase CRUD operations
// Every function talks to the REAL database. No demo data.
// ============================================================
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';

// ─── Generic Fetch Hook ───
export function useSupabaseQuery<T>(
  table: string,
  options?: { columns?: string; filters?: Record<string, any>; order?: { column: string; ascending?: boolean }; limit?: number; enabled?: boolean }
) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(async () => {
    if (options?.enabled === false) { setLoading(false); return; }
    setLoading(true); setError(null);
    try {
      let q = supabase.from(table).select(options?.columns || '*');
      if (options?.filters) {
        Object.entries(options.filters).forEach(([k, v]) => { if (v !== undefined && v !== null) q = q.eq(k, v); });
      }
      if (options?.order) q = q.order(options.order.column, { ascending: options.order.ascending ?? false });
      if (options?.limit) q = q.limit(options.limit);
      const { data: d, error: e } = await q;
      if (e) throw e;
      setData((d || []) as T[]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [table, JSON.stringify(options)]);

  useEffect(() => { fetch(); }, [fetch]);

  const insert = useCallback(async (row: any) => {
    const { data: d, error: e } = await supabase.from(table).insert(row).select().single();
    if (e) throw e;
    setData(prev => [...prev, d as T]);
    return d as T;
  }, [table]);

  const update = useCallback(async (id: string, changes: any) => {
    const { data: d, error: e } = await supabase.from(table).update(changes).eq('id', id).select().single();
    if (e) throw e;
    setData(prev => prev.map(x => (x as any).id === id ? d as T : x));
    return d as T;
  }, [table]);

  const remove = useCallback(async (id: string) => {
    const { error: e } = await supabase.from(table).delete().eq('id', id);
    if (e) throw e;
    setData(prev => prev.filter(x => (x as any).id !== id));
  }, [table]);

  return { data, loading, error, refresh: fetch, insert, update, remove };
}

// ─── Auth User Hook ───
export function useCurrentUser() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        supabase.from('users').select('*').eq('id', session.user.id).single().then(({ data }) => {
          setUser(data || null);
          setLoading(false);
        });
      } else { setLoading(false); }
    });
  }, []);

  return { user, loading };
}

// ─── Tasks ───
export function useTasks() {
  return useSupabaseQuery<any>('tasks', { order: { column: 'created_at', ascending: false } });
}

// ─── Calendar Events ───
export function useCalendarEvents() {
  return useSupabaseQuery<any>('calendar_events', { order: { column: 'start_at', ascending: true } });
}

// ─── Notes ───
export function useNotes(visibility?: 'published' | 'private') {
  const filters: Record<string, any> = {};
  if (visibility) filters.visibility = visibility;
  return useSupabaseQuery<any>('notes', { filters, order: { column: 'updated_at', ascending: false } });
}

// ─── Flashcard Decks ───
export function useFlashcardDecks() {
  return useSupabaseQuery<any>('flashcard_decks', { order: { column: 'created_at', ascending: false } });
}

export function useFlashcards(deckId?: string) {
  const filters = deckId ? { deck_id: deckId } : {};
  return useSupabaseQuery<any>('flashcards', { filters, order: { column: 'created_at', ascending: true } });
}

// ─── Universities ───
export function useUniversities() {
  return useSupabaseQuery<any>('universities', { filters: { is_active: true }, order: { column: 'ranking_qs', ascending: true } });
}

export function useUniversityMajors(uniId?: string) {
  const filters: Record<string, any> = {};
  if (uniId) filters.university_id = uniId;
  return useSupabaseQuery<any>('university_majors', { filters });
}

export function useUniversityRankings(uniId?: string) {
  const filters: Record<string, any> = {};
  if (uniId) filters.university_id = uniId;
  return useSupabaseQuery<any>('university_rankings', { filters, order: { column: 'year', ascending: false } });
}

// ─── Application Systems & Guides ───
export function useApplicationSystems() {
  return useSupabaseQuery<any>('application_systems', { filters: { is_active: true } });
}

export function useApplicationGuides(systemId?: string) {
  const filters: Record<string, any> = {};
  if (systemId) filters.system_id = systemId;
  return useSupabaseQuery<any>('application_guides', { filters, order: { column: 'order_index', ascending: true } });
}

// ─── Essays ───
export function useEssays() {
  return useSupabaseQuery<any>('essays', { order: { column: 'updated_at', ascending: false } });
}

// ─── Competitions ───
export function useCompetitions() {
  return useSupabaseQuery<any>('competitions', { filters: { is_active: true } });
}

// ─── Background Projects ───
export function useBackgroundProjects() {
  return useSupabaseQuery<any>('background_projects', { order: { column: 'created_at', ascending: false } });
}

// ─── Friendships ───
export function useFriendships() {
  return useSupabaseQuery<any>('friendships', { order: { column: 'created_at', ascending: false } });
}

// ─── Chat Groups ───
export function useChatGroups() {
  return useSupabaseQuery<any>('chat_groups', { order: { column: 'created_at', ascending: false } });
}

// ─── Social Messages ───
export function useSocialMessages(friendId?: string, groupId?: string) {
  const filters: Record<string, any> = {};
  if (friendId) { filters.receiver_id = friendId; }
  if (groupId) { filters.group_id = groupId; }
  return useSupabaseQuery<any>('social_messages', { filters, order: { column: 'created_at', ascending: true }, limit: 100 });
}

// ─── Meetings ───
export function useMeetings() {
  return useSupabaseQuery<any>('meetings', { order: { column: 'scheduled_at', ascending: true } });
}

// ─── Courses ───
export function useCourses() {
  return useSupabaseQuery<any>('courses', { order: { column: 'created_at', ascending: true } });
}

export function useCourseUnits(courseId?: string) {
  const filters: Record<string, any> = {};
  if (courseId) filters.course_id = courseId;
  return useSupabaseQuery<any>('course_units', { filters, order: { column: 'unit_number', ascending: true } });
}

export function useKnowledgeNodes(unitId?: string) {
  const filters: Record<string, any> = {};
  if (unitId) filters.unit_id = unitId;
  return useSupabaseQuery<any>('knowledge_nodes', { filters, order: { column: 'node_number', ascending: true } });
}

// ─── Standardized Tests ───
export function useStandardizedTests() {
  return useSupabaseQuery<any>('standardized_tests', { filters: { is_active: true } });
}

// ─── Student Profile ───
export function useStudentProfile(userId?: string) {
  const filters: Record<string, any> = {};
  if (userId) filters.user_id = userId;
  return useSupabaseQuery<any>('student_profiles', { filters, limit: 1 });
}
