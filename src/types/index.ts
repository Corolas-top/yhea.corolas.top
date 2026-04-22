// ============================================================
// Yhea v2.0 - Type Definitions (aligned with SQL Schema)
// ============================================================

// --- 1. Auth & User (table: users) ---
export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string | null;
  bio?: string | null;
  tags?: string[] | null;
  role: 'student' | 'admin';
  created_at: string;
}

// --- 2. Student Profile (table: student_profiles) ---
export interface Profile {
  id: string;
  user_id: string;
  curriculum: 'AP' | 'A-Level' | 'IB';
  year: number;
  subjects: any; // JSONB in SQL
  target_universities?: any; // JSONB
  target_scores?: Record<string, number> | null;
  language_tests?: string[] | null;
  language_target_scores?: Record<string, number> | null;
  standardized_tests?: string[] | null;
  standardized_target_scores?: Record<string, number> | null;
  target_countries?: string[] | null;
  learning_style?: string | null;
  timezone?: string;
  created_at: string;
  updated_at: string;
}

// --- 3. Courses / Units / Knowledge Nodes ---
export interface Course {
  id: string;
  curriculum: 'AP' | 'A-Level' | 'IB';
  subject_code: string;
  subject_name: string;
  full_name: string;
  description?: string | null;
  total_units: number;
  estimated_hours?: number | null;
  official_guide_url?: string | null;
  is_active: boolean;
  created_at?: string;
}

export interface CourseUnit {
  id: string;
  course_id: string;
  unit_number: number;
  unit_title: string;
  description?: string | null;
  estimated_hours?: number | null;
  created_at?: string;
}

export interface KnowledgeNode {
  id: string;
  course_id: string;
  unit_id: string;
  parent_node_id?: string | null;
  level: 1 | 2;
  node_number: string;
  title: string;
  content: string;
  content_summary?: string | null;
  key_concepts: any; // JSONB in SQL
  key_formulas: any; // JSONB
  common_mistakes: any; // JSONB
  source_document: string;
  source_page?: string | null;
  source_url?: string | null;
  prerequisites: string[] | any;
  related_nodes: string[] | any;
  linked_exercises: string[] | any;
  difficulty?: number | null;
  estimated_minutes?: number | null;
  created_at?: string;
  updated_at?: string;
}

// --- 4. Standardized Tests (TOEFL/IELTS/SAT/ACT) ---
export interface StandardizedTest {
  id: string;
  code: string;
  name: string;
  category: 'language' | 'academic';
  description?: string | null;
  max_score?: string | null;
  duration?: string | null;
  registration_url?: string | null;
  is_active: boolean;
  created_at?: string;
}

export interface TestSection {
  id: string;
  test_id: string;
  name: string;
  description?: string | null;
  question_count?: string | null;
  duration: string;
  score_range: string;
  order_index: number;
}

// --- 5. Flashcards ---
export interface FlashcardDeck {
  id: string;
  user_id: string;
  title: string;
  description?: string | null;
  category: string;
  course_id?: string | null;
  test_id?: string | null;
  is_public: boolean;
  card_count: number;
  created_at?: string;
}

export interface Flashcard {
  id: string;
  deck_id: string;
  front: string;
  back: string;
  tags: string[] | any;
  difficulty: number;
  review_count: number;
  next_review_at?: string | null;
  created_at?: string;
}

// --- 6. Universities / Majors / Rankings ---
export interface University {
  id: string;
  name: string;
  short_name: string;
  country: string;
  region?: string | null;
  type?: 'public' | 'private' | null;
  ranking_us_news?: number | null;
  ranking_qs?: number | null;
  ranking_the?: number | null;
  website?: string | null;
  logo_url?: string | null;
  description?: string | null;
  campus_info?: string | null;
  tuition_range?: string | null;
  student_population?: number | null;
  is_active: boolean;
}

export interface UniversityMajor {
  id: string;
  university_id: string;
  major_name: string;
  major_code?: string | null;
  college?: string | null;
  description?: string | null;
  degree_type?: string | null;
  duration_years?: number | null;
  requirements?: string | null;
  career_paths?: any; // JSONB
  is_active: boolean;
}

export interface UniversityRanking {
  id: string;
  university_id: string;
  ranking_system: 'QS' | 'US News' | 'THE';
  category: string;
  rank_position: number;
  year: number;
  created_at?: string;
}

export interface StudentUniversityTarget {
  id: string;
  student_id: string;
  university_id: string;
  status: 'targeting' | 'reaching' | 'applying' | 'admitted' | 'rejected';
  priority: number;
  created_at?: string;
}

// --- 7. Application Systems & Guides ---
export interface ApplicationSystem {
  id: string;
  name: string;
  slug: string;
  country: string;
  description?: string | null;
  website_url?: string | null;
  deadline_info?: string | null;
  requirements?: any; // JSONB
  is_active: boolean;
  created_at?: string;
}

export interface ApplicationGuide {
  id: string;
  system_id: string;
  title: string;
  content: string;
  section: string;
  order_index: number;
  is_active: boolean;
}

// --- 8. Essays ---
export interface Essay {
  id: string;
  user_id: string;
  system_id?: string | null;
  title: string;
  prompt?: string | null;
  content: string;
  word_count: number;
  status: 'draft' | 'reviewing' | 'final';
  ai_feedback?: any; // JSONB in SQL
  created_at: string;
  updated_at: string;
}

// --- 9. Background (Competitions + Projects) ---
export interface Competition {
  id: string;
  name: string;
  category: string;
  description?: string | null;
  difficulty_level?: number | null;
  subject_tags?: string[] | any;
  eligibility?: string | null;
  website_url?: string | null;
  deadline_month?: string | null;
  prestige_score?: number;
  is_active: boolean;
  created_at?: string;
}

export interface BackgroundProject {
  id: string;
  user_id: string;
  title: string;
  description?: string | null;
  category: string;
  start_date?: string | null;
  end_date?: string | null;
  status: 'planned' | 'in_progress' | 'completed' | 'paused';
  impact_level: number;
  skills_gained?: string[] | any;
  created_at?: string;
  updated_at?: string;
}

// --- 10. Agent Config ---
export interface AgentConfig {
  id: string;
  agent_type: 'planning' | 'teaching' | 'schedule' | 'mental';
  name: string;
  description: string;
  system_prompt: string;
  icon: string;
  is_active: boolean;
}

// --- 11. Chat Sessions / Messages / Memories ---
export interface ChatSession {
  id: string;
  student_id: string;
  agent_type: string;
  title?: string | null;
  subject?: string | null;
  status: 'active' | 'archived';
  message_count: number;
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  tool_calls?: any;
  rag_sources?: any;
  created_at: string;
}

export interface AgentMemory {
  id: string;
  student_id: string;
  memory_type: 'weak_point' | 'strong_point' | 'learning_style' | 'goal' | 'event' | 'preference' | 'emotion';
  content: string;
  confidence: number;
  frequency: number;
  last_seen_at: string;
  created_at: string;
}

// --- 12. Notes & Plaza ---
export interface Note {
  id: string;
  author_id: string;
  title: string;
  content_json: any; // JSONB
  content_text?: string | null;
  course_id?: string | null;
  node_ids: string[] | any;
  topic_tags: string[] | any;
  cover_image?: string | null;
  visibility: 'draft' | 'private' | 'published';
  heat_score: number;
  quality_score?: number | null;
  likes_count: number;
  comments_count: number;
  bookmarks_count: number;
  views_count: number;
  source_type?: 'manual' | 'agent_import' | 'exercise_review' | null;
  source_session_id?: string | null;
  created_at: string;
  updated_at: string;
  published_at?: string | null;
  author?: { id: string; email?: string; name: string; avatar_url?: string; role?: string; created_at?: string };
}

export interface NoteInteraction {
  id: string;
  note_id: string;
  user_id: string;
  type: 'like' | 'bookmark' | 'comment';
  comment_text?: string | null;
  created_at?: string;
}

// --- 13. Points & AI Quota ---
export interface PointBalance {
  user_id: string;
  balance: number;
  lifetime_earned: number;
  lifetime_spent: number;
  updated_at?: string;
}

export interface PointTransaction {
  id: string;
  user_id: string;
  type: 'earn' | 'spend' | 'refund' | 'penalty';
  amount: number;
  source: string;
  source_id?: string | null;
  description: string;
  created_at?: string;
}

export interface AIUsageQuota {
  user_id: string;
  base_daily_limit: number;
  base_remaining: number;
  bonus_from_points: number;
  bonus_remaining: number;
  total_used_lifetime: number;
  last_reset_date: string;
  is_new_user: boolean;
  new_user_bonus: number;
}

// --- 14. Tasks & Calendar ---
export interface Task {
  id: string;
  user_id: string;
  source: 'manual' | 'agent' | 'learning_engine' | 'planning_center' | 'system';
  title: string;
  description?: string | null;
  type: 'study' | 'assignment' | 'exam' | 'application_deadline' | 'reminder';
  course_id?: string | null;
  node_id?: string | null;
  due_date?: string | null;
  estimated_minutes?: number | null;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue' | 'cancelled';
  priority: number;
  completed_at?: string | null;
  created_at: string;
}

export interface CalendarEvent {
  id: string;
  user_id: string;
  title: string;
  description?: string | null;
  event_type: 'task' | 'exam' | 'meeting' | 'deadline' | 'reminder';
  related_task_id?: string | null;
  start_at: string;
  end_at?: string | null;
  all_day?: boolean;
  location?: string | null;
  created_at?: string;
}

// --- 15. Social (Friends / Groups / Messages) ---
export interface Friendship {
  id: string;
  requester_id: string;
  addressee_id: string;
  status: 'pending' | 'accepted' | 'blocked';
  created_at: string;
  updated_at: string;
}

export interface ChatGroup {
  id: string;
  name: string;
  description?: string | null;
  created_by: string;
  is_public: boolean;
  max_members: number;
  created_at?: string;
}

export interface GroupMember {
  id: string;
  group_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'member';
  joined_at?: string;
}

export interface SocialMessage {
  id: string;
  sender_id: string;
  receiver_id?: string | null;
  group_id?: string | null;
  content: string;
  is_read: boolean;
  created_at: string;
  expires_at?: string;
}

// --- 16. Meetings ---
export interface Meeting {
  id: string;
  host_id: string;
  title: string;
  description?: string | null;
  meeting_type: 'class' | 'group' | 'world';
  course_id?: string | null;
  group_id?: string | null;
  meeting_url?: string | null;
  scheduled_at?: string | null;
  duration_minutes: number;
  status: 'scheduled' | 'ongoing' | 'ended' | 'cancelled';
  max_participants: number;
  created_at?: string;
}

// --- 17. Activity & Gamification ---
export interface FocusSession {
  id: string;
  user_id: string;
  course_id?: string | null;
  start_at: string;
  end_at?: string | null;
  duration_minutes?: number | null;
  notes?: string | null;
  created_at?: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  entity_type?: string | null;
  entity_id?: string | null;
  metadata?: any;
  created_at?: string;
}

export interface DailyCheckin {
  id: string;
  user_id: string;
  checkin_date: string;
  streak_count: number;
  points_earned: number;
}

export interface Achievement {
  id: string;
  title: string;
  description?: string | null;
  icon?: string | null;
  condition_type: string;
  condition_value: number;
  points_reward: number;
  is_active: boolean;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  earned_at?: string;
}
