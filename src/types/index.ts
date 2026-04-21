// ============================================================
// Yhea Core Types
// ============================================================

export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  role: 'student' | 'admin';
  created_at: string;
}

export interface StudentProfile {
  id: string;
  user_id: string;
  curriculum: 'AP' | 'A-Level' | 'IB';
  year: number;
  subjects: Subject[];
  target_universities: string[];
  target_scores: Record<string, number>;
  learning_style?: string;
  timezone: string;
  created_at: string;
  updated_at: string;
}

export interface Subject {
  code: string;
  name: string;
  level?: string;
}

// ============================================================
// M1: Learning Engine
// ============================================================

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

export interface Exercise {
  id: string;
  course_id: string;
  unit_id: string;
  node_ids: string[];
  question_text: string;
  question_type: 'mcq' | 'frq' | 'structured' | 'essay' | 'calculation';
  options?: Array<{ label: string; text: string; is_correct?: boolean }>;
  solution?: string;
  mark_scheme?: Array<{ point: string; marks: number }>;
  difficulty?: number;
  year?: number;
  exam_session?: string;
  paper_reference?: string;
  question_number?: string;
  source?: string;
  is_past_paper: boolean;
}

export interface StudentProgress {
  id: string;
  student_id: string;
  node_id: string;
  understanding_level: number;
  application_level: number;
  analysis_level: number;
  status: 'not_started' | 'learning' | 'practicing' | 'mastered' | 'needs_review';
  times_studied: number;
  times_exercised: number;
  times_correct: number;
  total_attempts: number;
  last_studied_at?: string;
  next_review_at?: string;
}

export interface LearningPathItem {
  unit: string;
  node: KnowledgeNode;
  reason: string;
  estimated_minutes: number;
  recommended_exercises: number;
}

// ============================================================
// M2: Planning + Universities + Application Guide
// ============================================================

export interface University {
  id: string;
  name: string;
  short_name: string;
  country: string;
  region?: string;
  type?: 'public' | 'private';
  ranking_us_news?: number;
  ranking_qs?: number;
  ranking_the?: number;
  website?: string;
  logo_url?: string;
  description?: string;
  campus_info?: string;
  tuition_range?: string;
  acceptance_rate?: number;
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
  tuition_per_year?: string;
  requirements?: string;
  career_paths?: string[];
  is_active: boolean;
}

export interface AdmissionStat {
  id: string;
  university_id: string;
  major_id?: string;
  year: number;
  data_type: 'overall' | 'by_curriculum';
  curriculum?: string;
  total_applicants?: number;
  total_admitted?: number;
  total_enrolled?: number;
  admit_rate?: number;
  avg_ib_score?: number;
  min_ib_score?: number;
  avg_ap_count?: number;
  avg_ap_score?: number;
  sat_mid_50?: { low: number; high: number };
  source: string;
  confidence: 'high' | 'medium' | 'low';
}

export interface ApplicationDeadline {
  id: string;
  university_id: string;
  admission_plan: string;
  deadline_type: string;
  deadline_date: string;
  requirements?: Record<string, unknown>;
  year: number;
}

export interface ApplicationGuide {
  id: string;
  country: string;
  university_id?: string;
  title: string;
  content: string;
  section: string;
  order_index: number;
  is_active: boolean;
}

export interface StudentUniversityTarget {
  id: string;
  student_id: string;
  university_id: string;
  major_id?: string;
  category: 'reach' | 'match' | 'safety';
  preference_rank?: number;
  status: string;
  notes?: string;
}

// ============================================================
// M3: Agent
// ============================================================

export interface ChatSession {
  id: string;
  student_id: string;
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
  tool_calls?: Array<{
    name: string;
    params: Record<string, unknown>;
    result?: Record<string, unknown>;
    latency_ms?: number;
  }>;
  rag_sources?: Array<{
    node_id: string;
    title: string;
    content_snippet: string;
    similarity: number;
  }>;
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
}

// ============================================================
// M4: Notes
// ============================================================

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
  author?: User;
}

export interface NoteInteraction {
  id: string;
  note_id: string;
  user_id: string;
  type: 'like' | 'bookmark' | 'comment';
  comment_text?: string;
  created_at: string;
}

// ============================================================
// M5: Credits / Points
// ============================================================

export interface PointBalance {
  user_id: string;
  balance: number;
  lifetime_earned: number;
  lifetime_spent: number;
}

export interface PointTransaction {
  id: string;
  user_id: string;
  type: 'earn' | 'spend' | 'refund' | 'penalty';
  amount: number;
  source: string;
  source_id?: string;
  description: string;
  created_at: string;
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

// ============================================================
// M6: Tasks
// ============================================================

export interface Task {
  id: string;
  user_id: string;
  source: 'manual' | 'agent' | 'learning_engine' | 'planning_center' | 'system';
  source_id?: string;
  title: string;
  description?: string;
  type: 'study' | 'assignment' | 'exam' | 'application_deadline' | 'reminder';
  course_id?: string;
  node_id?: string;
  due_date?: string;
  due_time?: string;
  estimated_minutes?: number;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue' | 'cancelled';
  priority: 1 | 2 | 3;
  completed_at?: string;
  remind_at?: string;
  created_at: string;
}

export interface FocusSession {
  id: string;
  user_id: string;
  task_id?: string;
  started_at: string;
  ended_at?: string;
  planned_duration: number;
  actual_duration?: number;
  was_completed: boolean;
  interruption_reason?: string;
  subject?: string;
  notes?: string;
  points_earned: number;
}

// ============================================================
// Activity Log (M7 Data)
// ============================================================

export interface ActivityLog {
  id: string;
  user_id: string;
  activity_type: string;
  source_module: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface WeeklyReport {
  user_id: string;
  week: string;
  study_sessions: number;
  agent_interactions: number;
  exercises_done: number;
  focus_sessions: number;
  notes_created: number;
  total_focus_minutes: number;
}
