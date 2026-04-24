// ============================================================
// Yhea v3.0 Type Definitions — Aligned with SQL Schema
// ============================================================

// --- 1. Auth ---
export interface User {
  id: string;
  email: string;
  name: string;
  avatar_url?: string;
  bio?: string;
  tags?: string[];
  role: 'student' | 'admin';
  agent_quota: number;
  agent_quota_used: number;
  created_at: string;
}

// --- 2. Profile ---
export interface StudentProfile {
  id: string;
  user_id: string;
  curriculum: string[];
  year: number;
  subjects: any;
  target_countries: string[];
  target_regions: string[];
  target_majors: string[];
  dream_schools: any;
  language_tests: any;
  standardized_tests: any;
  admission_tests: any;
  competitions: any;
  programs: any;
  activities: any;
  gpa?: string;
  learning_style?: string;
  timezone: string;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

// --- 3. Universities ---
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
  ranking_arwu?: number;
  website?: string;
  logo_url?: string;
  description?: string;
  campus_info?: string;
  location?: string;
  founded_year?: number;
  tuition_range?: string;
  student_population?: number;
  international_pct?: number;
  acceptance_rate?: number;
  application_requirements?: any;
  is_active: boolean;
}

export interface UniversityRanking {
  id: string;
  university_id: string;
  ranking_system: 'QS' | 'US News' | 'THE' | 'ARWU';
  category: string;
  rank_position: number;
  score?: number;
  year: number;
}

export interface UniversityMajor {
  id: string;
  university_id: string;
  major_name: string;
  major_code?: string;
  college?: string;
  department?: string;
  description?: string;
  degree_type?: string;
  duration_years?: number;
  requirements?: string;
  prerequisites?: string;
  career_paths?: any;
  is_active: boolean;
}

export interface StudentUniversityTarget {
  id: string;
  student_id: string;
  university_id: string;
  status: 'targeting' | 'reaching' | 'safety' | 'applying' | 'admitted' | 'rejected' | 'waitlisted';
  priority: number;
  notes?: string;
}

// --- 4. Courses (AP/IB/A-Level) ---
export interface Course {
  id: string;
  curriculum: 'AP' | 'IB' | 'A-Level';
  subject_code: string;
  subject_name: string;
  full_name: string;
  description?: string;
  syllabus?: string;
  total_units: number;
  estimated_hours?: number;
  exam_date?: string;
  exam_format?: string;
  official_guide_url?: string;
  is_active: boolean;
}

export interface CourseUnit {
  id: string;
  course_id: string;
  unit_number: number;
  unit_title: string;
  description?: string;
  content?: string;
  key_concepts?: any;
  practice_problems?: any;
  estimated_hours?: number;
}

// --- 5. Standardized Tests ---
export interface StandardizedTest {
  id: string;
  code: string;
  name: string;
  category: string;
  description?: string;
  max_score?: string;
  duration?: string;
  sections?: any;
  registration_url?: string;
  exam_dates?: any;
  prep_resources?: any;
  is_active: boolean;
}

// --- 6. Admission Tests ---
export interface AdmissionTest {
  id: string;
  code: string;
  name: string;
  target_universities: string[];
  description?: string;
  syllabus?: string;
  exam_format?: string;
  duration?: string;
  max_score?: string;
  registration_url?: string;
  exam_dates?: any;
  sections?: any;
  prep_resources?: any;
  is_active: boolean;
}

// --- 7. Background Resources ---
export interface BackgroundResource {
  id: string;
  name: string;
  category: 'competition' | 'program' | 'activity' | 'certificate';
  subcategory?: string;
  description?: string;
  eligibility?: string;
  deadline?: string;
  important_dates?: any;
  website_url?: string;
  difficulty?: number;
  time_commitment?: number;
  prestige_score?: number;
  five_dimensions?: any;
  study_resources?: any;
  reviews?: any;
  is_active: boolean;
}

export interface StudentBackgroundProject {
  id: string;
  student_id: string;
  resource_id?: string;
  custom_name?: string;
  category: string;
  description?: string;
  ranking?: string;
  start_date?: string;
  end_date?: string;
  lessons_learned?: string;
  five_dimensions?: any;
  prestige_score: number;
  is_custom: boolean;
}

// --- 8. Flashcards ---
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
}

export interface Flashcard {
  id: string;
  deck_id: string;
  front: string;
  back: string;
  tags?: string[];
  difficulty: number;
  review_count: number;
  next_review_at?: string;
}

// --- 9. Application Systems ---
export interface ApplicationSystem {
  id: string;
  name: string;
  slug: string;
  country: string;
  description?: string;
  website_url?: string;
  structure?: any;
  essay_prompts?: any;
  requirements?: any;
  deadlines?: any;
  is_active: boolean;
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

// --- 10. Essays ---
export interface Essay {
  id: string;
  user_id: string;
  system_id?: string;
  system_slug?: string;
  title: string;
  prompt?: string;
  question_label?: string;
  content: string;
  word_count: number;
  status: 'draft' | 'reviewing' | 'final';
  ai_feedback?: any;
  created_at: string;
  updated_at: string;
}

// --- 11. Notes ---
export interface Note {
  id: string;
  author_id: string;
  title: string;
  content: string;
  content_html?: string;
  course_id?: string;
  topic_tags?: string[];
  visibility: 'draft' | 'private' | 'published';
  heat_score: number;
  likes_count: number;
  comments_count: number;
  bookmarks_count: number;
  views_count: number;
  created_at: string;
  updated_at: string;
  published_at?: string;
  author?: { name?: string; avatar_url?: string };
}

export interface NoteInteraction {
  id: string;
  note_id: string;
  user_id: string;
  type: 'like' | 'bookmark' | 'comment';
  comment_text?: string;
}

// --- 12. Tasks ---
export interface Task {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  type: 'study' | 'assignment' | 'exam' | 'application_deadline' | 'reminder' | 'competition' | 'test';
  due_date?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  priority: number;
  source: 'manual' | 'agent' | 'planning';
  completed_at?: string;
}

// --- 13. Planning Logics ---
export interface PlanningLogic {
  id: string;
  user_id: string;
  persona?: string;
  strengths?: any;
  weaknesses?: any;
  strategy?: string;
  timeline?: any;
  agent_confirmed: boolean;
}

// --- 14. Calendar ---
export interface CalendarEvent {
  id: string;
  user_id: string;
  title: string;
  description?: string;
  event_type: 'task' | 'exam' | 'meeting' | 'deadline' | 'reminder' | 'competition';
  start_at: string;
  end_at?: string;
  all_day: boolean;
  location?: string;
}

// --- 15. Chat ---
export interface ChatSession {
  id: string;
  student_id: string;
  agent_type: 'admission' | 'teacher' | 'essay' | 'free';
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
  created_at: string;
}

export interface AgentMemory {
  id: string;
  student_id: string;
  agent_type?: string;
  memory_type: 'weak_point' | 'strong_point' | 'learning_style' | 'goal' | 'event' | 'preference';
  content: string;
  confidence: number;
}

// --- 16. Social ---
export interface Friendship {
  id: string;
  requester_id: string;
  addressee_id: string;
  status: 'pending' | 'accepted' | 'blocked';
  created_at: string;
}

export interface ChatGroup {
  id: string;
  name: string;
  description?: string;
  created_by: string;
  is_public: boolean;
  max_members: number;
}

export interface SocialMessage {
  id: string;
  sender_id: string;
  receiver_id?: string;
  group_id?: string;
  content: string;
  is_read: boolean;
  created_at: string;
  expires_at?: string;
}

// --- 17. Meetings ---
export interface Meeting {
  id: string;
  host_id: string;
  title: string;
  description?: string;
  meeting_type: 'class' | 'group' | 'world';
  meeting_url?: string;
  scheduled_at?: string;
  duration_minutes: number;
  status: 'scheduled' | 'ongoing' | 'ended' | 'cancelled';
  max_participants: number;
}

// --- 18. Saved ---
export interface SavedItem {
  id: string;
  user_id: string;
  item_type: 'note' | 'deck' | 'resource' | 'university';
  item_id: string;
}
