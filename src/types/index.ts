// ============================================================
// Yhea v2.0 - Complete Type Definitions
// ============================================================

// --- Auth & User ---
export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  bio?: string;
  tags?: string[];
  role: 'student' | 'admin';
  created_at: string;
}

export interface Profile {
  id: string;
  user_id: string;
  curriculum: 'AP' | 'A-Level' | 'IB';
  year: number;
  subjects: string[];
  target_universities: string[];
  target_scores: Record<string, number>;
  learning_style?: string;
  language_tests: string[];
  language_target_scores: Record<string, number>;
  standardized_tests: string[];
  standardized_target_scores: Record<string, number>;
  target_countries: string[];
  timezone: string;
  created_at: string;
  updated_at: string;
}

// --- Learning: Subject Courses ---
export interface Course {
  id: string;
  curriculum: 'AP' | 'A-Level' | 'IB';
  subject_code: string;
  subject_name: string;
  full_name: string;
  description?: string;
  total_units: number;
  estimated_hours?: number;
  official_guide_url?: string;
  is_active: boolean;
}

export interface CourseUnit {
  id: string;
  course_id: string;
  unit_number: number;
  unit_title: string;
  description?: string;
  estimated_hours?: number;
}

export interface KnowledgeNode {
  id: string;
  course_id: string;
  unit_id: string;
  parent_node_id?: string;
  level: 1 | 2;
  node_number: string;
  title: string;
  content: string;
  content_summary?: string;
  key_concepts: string[];
  key_formulas: Array<{ formula: string; description: string }>;
  common_mistakes: Array<{ mistake: string; correction: string }>;
  source_document: string;
  source_page?: string;
  source_url?: string;
  prerequisites: string[];
  related_nodes: string[];
  linked_exercises: string[];
  difficulty?: number;
  estimated_minutes?: number;
}

// --- Learning: Standardized Tests ---
export interface StandardizedTest {
  id: string;
  code: string;
  name: string;
  category: 'language' | 'academic';
  description: string;
  max_score: string;
  duration: string;
  sections: TestSection[];
  registration_url?: string;
  is_active: boolean;
}

export interface TestSection {
  id: string;
  test_id: string;
  name: string;
  description: string;
  question_count?: string;
  duration: string;
  score_range: string;
  order_index: number;
}

// --- Flashcards ---
export interface FlashcardDeck {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  category: string;
  course_id?: string;
  test_id?: string;
  is_public: boolean;
  card_count: number;
  created_at: string;
}

export interface Flashcard {
  id: string;
  deck_id: string;
  front: string;
  back: string;
  tags: string[];
  difficulty: number;
  review_count: number;
  next_review_at?: string;
  created_at: string;
}

// --- Universities ---
export interface University {
  id: string;
  name: string;
  short_name: string;
  country: string;
  region?: string;
  type?: 'public' | 'private';
  ranking_qs?: number;
  ranking_us_news?: number;
  ranking_the?: number;
  website?: string;
  logo_url?: string;
  description?: string;
  campus_info?: string;
  tuition_range?: string;
  student_population?: number;
  is_active: boolean;
}

export interface UniversityMajor {
  id: string;
  university_id: string;
  major_name: string;
  major_code?: string;
  college?: string;
  description?: string;
  degree_type?: string;
  duration_years?: number;
  requirements?: string;
  career_paths?: string[];
  is_active: boolean;
}

export interface UniversityRanking {
  id: string;
  university_id: string;
  ranking_name: 'QS' | 'US News' | 'THE';
  subject_category: string;
  subject_subcategory?: string;
  rank?: number;
  year: number;
}

// --- Apply Guide & Essays ---
export interface ApplicationSystem {
  id: string;
  name: string;
  country: string;
  description: string;
  essay_count: number;
  essay_prompts: Array<{ prompt: string; word_limit: number; required: boolean }>;
  deadline_regular?: string;
  deadline_early?: string;
  website?: string;
  is_active: boolean;
}

export interface Essay {
  id: string;
  user_id: string;
  application_system_id?: string;
  university_id?: string;
  prompt?: string;
  title: string;
  content: string;
  word_count: number;
  status: 'draft' | 'reviewing' | 'final';
  ai_feedback?: string;
  created_at: string;
  updated_at: string;
}

// --- Background (Competitions & Projects) ---
export interface Competition {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  description: string;
  eligibility: string;
  timeline: string;
  website?: string;
  scoring_difficulty: number;
  scoring_commitment: number;
  scoring_prestige: number;
  scoring_quality: number;
  scoring_experience: number;
  yhea_score: number;
  is_active: boolean;
}

export interface BackgroundProject {
  id: string;
  user_id: string;
  title: string;
  description: string;
  status: 'planning' | 'in_progress' | 'completed';
  start_date?: string;
  end_date?: string;
  skills: string[];
  links?: string[];
  is_public: boolean;
  created_at: string;
}

// --- Agents ---
export interface AgentConfig {
  id: string;
  agent_type: 'planning' | 'teaching' | 'schedule' | 'mental';
  name: string;
  description: string;
  system_prompt: string;
  icon: string;
  is_active: boolean;
}

export interface ChatSession {
  id: string;
  student_id: string;
  agent_type: string;
  title?: string;
  subject?: string;
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
  tool_calls?: any[];
  rag_sources?: any[];
  created_at: string;
}

// --- Notes & Plaza ---
export interface Note {
  id: string;
  author_id: string;
  title: string;
  content_json: Record<string, unknown>;
  content_text?: string;
  course_id?: string;
  node_ids: string[];
  topic_tags: string[];
  cover_image?: string;
  visibility: 'draft' | 'private' | 'published';
  heat_score: number;
  quality_score?: number;
  likes_count: number;
  comments_count: number;
  bookmarks_count: number;
  views_count: number;
  source_type: 'manual' | 'agent_import' | 'exercise_review';
  source_session_id?: string;
  created_at: string;
  updated_at: string;
  published_at?: string;
  author?: { id: string; email?: string; name: string; avatar_url?: string; role?: string; created_at?: string };
}

// --- Points & AI Quota ---
export interface PointBalance {
  user_id: string;
  balance: number;
  lifetime_earned: number;
  lifetime_spent: number;
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

// --- Tasks & Calendar ---
export interface Task {
  id: string;
  user_id: string;
  source: string;
  title: string;
  description?: string;
  type: string;
  course_id?: string;
  node_id?: string;
  due_date?: string;
  estimated_minutes?: number;
  status: string;
  priority: number;
  completed_at?: string;
  created_at: string;
}

export interface CalendarEvent {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  event_type: string;
  start_time: string;
  end_time?: string;
  color?: string;
  related_task_id?: string;
  created_at: string;
}

// --- People (Social) ---
export interface Friend {
  id: string;
  user_id: string;
  friend_id: string;
  status: 'pending' | 'accepted';
  created_at: string;
}

export interface ChatGroup {
  id: string;
  name: string;
  description?: string;
  avatar_url?: string;
  created_by: string;
  member_count: number;
  created_at: string;
}

export interface SocialMessage {
  id: string;
  sender_id: string;
  receiver_id?: string;
  group_id?: string;
  content: string;
  created_at: string;
}

// --- Meeting ---
export interface Meeting {
  id: string;
  host_id: string;
  title: string;
  description?: string;
  meeting_type: 'class' | 'group' | 'world';
  meeting_url: string;
  meeting_id?: string;
  password?: string;
  platform: 'zoom' | 'teams' | 'google_meet' | 'other';
  scheduled_at?: string;
  duration_minutes?: number;
  max_participants?: number;
  course_id?: string;
  group_id?: string;
  is_active: boolean;
  created_at: string;
}

// --- Admin ---
export interface ActivityLog {
  id: string;
  user_id: string;
  activity_type: string;
  source_module: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}
