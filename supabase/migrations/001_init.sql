-- ============================================================
-- Yhea Database Schema Migration v1.0
-- Run this in Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- Users (managed by Supabase Auth, extended here)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    avatar_url TEXT,
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Student Profiles
-- ============================================================
CREATE TABLE IF NOT EXISTS public.student_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    curriculum TEXT NOT NULL CHECK (curriculum IN ('AP', 'A-Level', 'IB')),
    year INT NOT NULL CHECK (year BETWEEN 1 AND 4),
    subjects JSONB DEFAULT '[]',
    target_universities JSONB DEFAULT '[]',
    target_scores JSONB DEFAULT '{}',
    learning_style TEXT,
    timezone TEXT DEFAULT 'Asia/Shanghai',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- ============================================================
-- M1: Courses / Units / Knowledge Nodes
-- ============================================================
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    curriculum TEXT NOT NULL CHECK (curriculum IN ('AP', 'A-Level', 'IB')),
    subject_code TEXT NOT NULL,
    subject_name TEXT NOT NULL,
    full_name TEXT NOT NULL,
    description TEXT,
    total_units INT NOT NULL,
    estimated_hours INT,
    official_guide_url TEXT,
    is_active BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(curriculum, subject_code)
);

CREATE TABLE IF NOT EXISTS public.course_units (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    unit_number INT NOT NULL,
    unit_title TEXT NOT NULL,
    description TEXT,
    estimated_hours INT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(course_id, unit_number)
);

CREATE TABLE IF NOT EXISTS public.knowledge_nodes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    unit_id UUID REFERENCES public.course_units(id) ON DELETE CASCADE,
    parent_node_id UUID REFERENCES public.knowledge_nodes(id),
    level INT NOT NULL CHECK (level IN (1, 2)),
    node_number TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    content_summary TEXT,
    key_concepts JSONB DEFAULT '[]',
    key_formulas JSONB DEFAULT '[]',
    common_mistakes JSONB DEFAULT '[]',
    source_document TEXT NOT NULL,
    source_page TEXT,
    source_url TEXT,
    prerequisites UUID[] DEFAULT '{}',
    related_nodes UUID[] DEFAULT '{}',
    linked_exercises UUID[] DEFAULT '{}',
    difficulty INT CHECK (difficulty BETWEEN 1 AND 5),
    estimated_minutes INT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- M2: Universities / Majors / Admission Stats
-- ============================================================
CREATE TABLE IF NOT EXISTS public.universities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    short_name TEXT NOT NULL,
    country TEXT NOT NULL,
    region TEXT,
    type TEXT CHECK (type IN ('public', 'private')),
    ranking_us_news INT,
    ranking_qs INT,
    ranking_the INT,
    website TEXT,
    logo_url TEXT,
    description TEXT,
    campus_info TEXT,
    tuition_range TEXT,
    acceptance_rate FLOAT,
    student_population INT,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS public.university_majors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    university_id UUID REFERENCES public.universities(id),
    major_name TEXT NOT NULL,
    major_code TEXT,
    college TEXT,
    description TEXT,
    degree_type TEXT,
    duration_years INT,
    requirements TEXT,
    career_paths JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS public.admission_stats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    university_id UUID REFERENCES public.universities(id),
    major_id UUID REFERENCES public.university_majors(id),
    year INT NOT NULL,
    total_applicants INT,
    total_admitted INT,
    admit_rate FLOAT,
    avg_ib_score FLOAT,
    avg_ap_score FLOAT,
    source TEXT NOT NULL,
    confidence TEXT CHECK (confidence IN ('high', 'medium', 'low'))
);

-- ============================================================
-- Application Guides
-- ============================================================
CREATE TABLE IF NOT EXISTS public.application_guides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    country TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    section TEXT NOT NULL DEFAULT 'overview',
    order_index INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

-- ============================================================
-- M3: Chat Sessions / Messages / Agent Memories
-- ============================================================
CREATE TABLE IF NOT EXISTS public.chat_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT,
    subject TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived')),
    message_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    tool_calls JSONB,
    rag_sources JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.agent_memories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    memory_type TEXT NOT NULL CHECK (memory_type IN ('weak_point', 'strong_point', 'learning_style', 'goal', 'event', 'preference', 'emotion')),
    content TEXT NOT NULL,
    confidence FLOAT DEFAULT 0.5,
    frequency INT DEFAULT 1,
    last_seen_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- M4: Notes
-- ============================================================
CREATE TABLE IF NOT EXISTS public.notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content_json JSONB NOT NULL DEFAULT '{}',
    content_text TEXT,
    course_id UUID REFERENCES public.courses(id),
    node_ids UUID[] DEFAULT '{}',
    topic_tags TEXT[] DEFAULT '{}',
    cover_image TEXT,
    visibility TEXT NOT NULL DEFAULT 'private' CHECK (visibility IN ('draft', 'private', 'published')),
    heat_score INT DEFAULT 0,
    quality_score INT,
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    bookmarks_count INT DEFAULT 0,
    views_count INT DEFAULT 0,
    source_type TEXT CHECK (source_type IN ('manual', 'agent_import', 'exercise_review')),
    source_session_id UUID,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS public.note_interactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    note_id UUID REFERENCES public.notes(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('like', 'bookmark', 'comment')),
    comment_text TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(note_id, user_id, type)
);

-- ============================================================
-- M5: Points / Credits
-- ============================================================
CREATE TABLE IF NOT EXISTS public.point_balances (
    user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    balance INT NOT NULL DEFAULT 0 CHECK (balance >= 0),
    lifetime_earned INT DEFAULT 0,
    lifetime_spent INT DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.point_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    type TEXT NOT NULL CHECK (type IN ('earn', 'spend', 'refund', 'penalty')),
    amount INT NOT NULL CHECK (amount > 0),
    source TEXT NOT NULL,
    source_id UUID,
    description TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.ai_usage_quotas (
    user_id UUID PRIMARY KEY REFERENCES public.users(id) ON DELETE CASCADE,
    base_daily_limit INT NOT NULL DEFAULT 10,
    base_remaining INT NOT NULL DEFAULT 10,
    bonus_from_points INT DEFAULT 0,
    bonus_remaining INT DEFAULT 0,
    total_used_lifetime INT DEFAULT 0,
    last_reset_date DATE NOT NULL DEFAULT CURRENT_DATE,
    is_new_user BOOLEAN DEFAULT TRUE,
    new_user_bonus INT DEFAULT 5
);

-- ============================================================
-- M6: Tasks
-- ============================================================
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    source TEXT NOT NULL DEFAULT 'manual' CHECK (source IN ('manual', 'agent', 'learning_engine', 'planning_center', 'system')),
    title TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL DEFAULT 'study' CHECK (type IN ('study', 'assignment', 'exam', 'application_deadline', 'reminder')),
    course_id UUID REFERENCES public.courses(id),
    node_id UUID REFERENCES public.knowledge_nodes(id),
    due_date TIMESTAMPTZ,
    estimated_minutes INT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'overdue', 'cancelled')),
    priority INT DEFAULT 2 CHECK (priority BETWEEN 1 AND 3),
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Indexes
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_notes_author ON public.notes(author_id);
CREATE INDEX IF NOT EXISTS idx_notes_visibility ON public.notes(visibility);
CREATE INDEX IF NOT EXISTS idx_knowledge_nodes_course ON public.knowledge_nodes(course_id);
CREATE INDEX IF NOT EXISTS idx_knowledge_nodes_unit ON public.knowledge_nodes(unit_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON public.chat_messages(session_id, created_at);
CREATE INDEX IF NOT EXISTS idx_tasks_user ON public.tasks(user_id, status);

-- ============================================================
-- RLS Policies (basic)
-- ============================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.point_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_usage_quotas ENABLE ROW LEVEL SECURITY;

-- Users can read their own data
CREATE POLICY "Users can read own profile" ON public.student_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.student_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can read own notes" ON public.notes FOR SELECT USING (auth.uid() = author_id);
CREATE POLICY "Users can create notes" ON public.notes FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Users can read published notes" ON public.notes FOR SELECT USING (visibility = 'published');

-- ============================================================
-- Trigger: Auto-create user profile on signup
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, name, role)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', NEW.email), 'student');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
