-- ============================================================
-- Yhea v2.0 Complete Database Schema
-- Tables: 33 | RLS: All enabled | Triggers: Auto-setup
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. Users (extends Supabase Auth)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    tags TEXT[] DEFAULT '{}',
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 2. Student Profiles
-- ============================================================
CREATE TABLE IF NOT EXISTS public.student_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    curriculum TEXT NOT NULL CHECK (curriculum IN ('AP', 'A-Level', 'IB')),
    year INT NOT NULL CHECK (year BETWEEN 1 AND 4),
    subjects JSONB DEFAULT '[]',
    target_universities JSONB DEFAULT '[]',
    target_scores JSONB DEFAULT '{}',
    language_tests TEXT[] DEFAULT '{}',
    language_target_scores JSONB DEFAULT '{}',
    standardized_tests TEXT[] DEFAULT '{}',
    standardized_target_scores JSONB DEFAULT '{}',
    target_countries TEXT[] DEFAULT '{}',
    learning_style TEXT,
    timezone TEXT DEFAULT 'Asia/Shanghai',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- ============================================================
-- 3. Courses / Units / Knowledge Nodes
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
-- 4. Universities / Majors / Rankings
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

CREATE TABLE IF NOT EXISTS public.university_rankings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    university_id UUID REFERENCES public.universities(id) ON DELETE CASCADE,
    ranking_system TEXT NOT NULL CHECK (ranking_system IN ('QS', 'US News', 'THE')),
    category TEXT NOT NULL DEFAULT 'Overall',
    rank_position INT NOT NULL,
    year INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
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

CREATE TABLE IF NOT EXISTS public.student_university_targets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    university_id UUID REFERENCES public.universities(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'targeting' CHECK (status IN ('targeting', 'reaching', 'applying', 'admitted', 'rejected')),
    priority INT DEFAULT 1 CHECK (priority BETWEEN 1 AND 3),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, university_id)
);

-- ============================================================
-- 5. Standardized Tests (TOEFL / IELTS / SAT / ACT)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.standardized_tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('language', 'academic')),
    description TEXT,
    max_score TEXT,
    duration TEXT,
    registration_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.standardized_test_sections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    test_id UUID REFERENCES public.standardized_tests(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    question_count TEXT,
    duration TEXT NOT NULL,
    score_range TEXT NOT NULL,
    order_index INT DEFAULT 0
);

-- ============================================================
-- 6. Flashcards
-- ============================================================
CREATE TABLE IF NOT EXISTS public.flashcard_decks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL DEFAULT 'General',
    course_id UUID REFERENCES public.courses(id),
    test_id UUID REFERENCES public.standardized_tests(id),
    is_public BOOLEAN DEFAULT FALSE,
    card_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.flashcards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deck_id UUID REFERENCES public.flashcard_decks(id) ON DELETE CASCADE,
    front TEXT NOT NULL,
    back TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    difficulty INT DEFAULT 2 CHECK (difficulty BETWEEN 1 AND 5),
    review_count INT DEFAULT 0,
    next_review_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 7. Application Systems (Common App / UCAS / etc)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.application_systems (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    country TEXT NOT NULL,
    description TEXT,
    website_url TEXT,
    deadline_info TEXT,
    requirements JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.application_guides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    system_id UUID REFERENCES public.application_systems(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    section TEXT NOT NULL DEFAULT 'overview',
    order_index INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

-- ============================================================
-- 8. Essays
-- ============================================================
CREATE TABLE IF NOT EXISTS public.essays (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    system_id UUID REFERENCES public.application_systems(id),
    title TEXT NOT NULL,
    prompt TEXT,
    content TEXT DEFAULT '',
    word_count INT DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'reviewing', 'final')),
    ai_feedback JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 9. Background (Competitions + Projects)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.competitions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    difficulty_level INT CHECK (difficulty_level BETWEEN 1 AND 5),
    subject_tags TEXT[] DEFAULT '{}',
    eligibility TEXT,
    website_url TEXT,
    deadline_month TEXT,
    prestige_score INT DEFAULT 3,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.background_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL DEFAULT 'academic',
    start_date DATE,
    end_date DATE,
    status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('planned', 'in_progress', 'completed', 'paused')),
    impact_level INT DEFAULT 3,
    skills_gained TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 10. Chat Sessions / Messages / Agent Memories
-- ============================================================
CREATE TABLE IF NOT EXISTS public.chat_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    agent_type TEXT NOT NULL DEFAULT 'teaching',
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
-- 11. Notes & Plaza
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
-- 12. Points & AI Quota
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
-- 13. Tasks & Calendar
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

CREATE TABLE IF NOT EXISTS public.calendar_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    event_type TEXT NOT NULL DEFAULT 'task' CHECK (event_type IN ('task', 'exam', 'meeting', 'deadline', 'reminder')),
    related_task_id UUID REFERENCES public.tasks(id),
    start_at TIMESTAMPTZ NOT NULL,
    end_at TIMESTAMPTZ,
    all_day BOOLEAN DEFAULT FALSE,
    location TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 14. Social (Friends / Groups / Messages)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.friendships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requester_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    addressee_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'blocked')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(requester_id, addressee_id),
    CHECK (requester_id != addressee_id)
);

CREATE TABLE IF NOT EXISTS public.chat_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    created_by UUID REFERENCES public.users(id),
    is_public BOOLEAN DEFAULT FALSE,
    max_members INT DEFAULT 100,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.group_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID REFERENCES public.chat_groups(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(group_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.social_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    group_id UUID REFERENCES public.chat_groups(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'),
    CHECK (
        (receiver_id IS NOT NULL AND group_id IS NULL) OR
        (receiver_id IS NULL AND group_id IS NOT NULL)
    )
);

-- ============================================================
-- 15. Meetings
-- ============================================================
CREATE TABLE IF NOT EXISTS public.meetings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    host_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    meeting_type TEXT NOT NULL DEFAULT 'group' CHECK (meeting_type IN ('class', 'group', 'world')),
    course_id UUID REFERENCES public.courses(id),
    group_id UUID REFERENCES public.chat_groups(id),
    meeting_url TEXT,
    scheduled_at TIMESTAMPTZ,
    duration_minutes INT DEFAULT 60,
    status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'ongoing', 'ended', 'cancelled')),
    max_participants INT DEFAULT 50,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 16. Activity Logs & Gamification
-- ============================================================
CREATE TABLE IF NOT EXISTS public.focus_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    course_id UUID REFERENCES public.courses(id),
    start_at TIMESTAMPTZ NOT NULL,
    end_at TIMESTAMPTZ,
    duration_minutes INT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    entity_type TEXT,
    entity_id UUID,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.daily_checkins (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    checkin_date DATE NOT NULL DEFAULT CURRENT_DATE,
    streak_count INT DEFAULT 1,
    points_earned INT DEFAULT 0,
    UNIQUE(user_id, checkin_date)
);

CREATE TABLE IF NOT EXISTS public.achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    condition_type TEXT NOT NULL,
    condition_value INT DEFAULT 1,
    points_reward INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS public.user_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    achievement_id UUID REFERENCES public.achievements(id),
    earned_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, achievement_id)
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
CREATE INDEX IF NOT EXISTS idx_flashcards_deck ON public.flashcards(deck_id);
CREATE INDEX IF NOT EXISTS idx_social_messages_sender ON public.social_messages(sender_id, created_at);
CREATE INDEX IF NOT EXISTS idx_social_messages_receiver ON public.social_messages(receiver_id, created_at);
CREATE INDEX IF NOT EXISTS idx_friendships_requester ON public.friendships(requester_id);
CREATE INDEX IF NOT EXISTS idx_friendships_addressee ON public.friendships(addressee_id);
CREATE INDEX IF NOT EXISTS idx_calendar_events_user ON public.calendar_events(user_id, start_at);
CREATE INDEX IF NOT EXISTS idx_essays_user ON public.essays(user_id);
CREATE INDEX IF NOT EXISTS idx_meetings_host ON public.meetings(host_id, scheduled_at);

-- ============================================================
-- RLS Policies - ALL TABLES
-- ============================================================

-- 1. users
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users readable by all authenticated" ON public.users FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users can update own" ON public.users FOR UPDATE USING (auth.uid() = id);

-- 2. student_profiles
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own profile readable" ON public.student_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Own profile insertable" ON public.student_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own profile updatable" ON public.student_profiles FOR UPDATE USING (auth.uid() = user_id);

-- 3. courses / course_units / knowledge_nodes (readable by all)
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_nodes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Courses public readable" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Units public readable" ON public.course_units FOR SELECT USING (true);
CREATE POLICY "Nodes public readable" ON public.knowledge_nodes FOR SELECT USING (true);

-- 4. universities / majors / rankings (readable by all)
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.university_majors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.university_rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admission_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_university_targets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Universities public readable" ON public.universities FOR SELECT USING (true);
CREATE POLICY "Majors public readable" ON public.university_majors FOR SELECT USING (true);
CREATE POLICY "Rankings public readable" ON public.university_rankings FOR SELECT USING (true);
CREATE POLICY "Stats public readable" ON public.admission_stats FOR SELECT USING (true);
CREATE POLICY "Own targets readable" ON public.student_university_targets FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Own targets insertable" ON public.student_university_targets FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Own targets deletable" ON public.student_university_targets FOR DELETE USING (auth.uid() = student_id);

-- 5. standardized_tests / sections (readable by all)
ALTER TABLE public.standardized_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.standardized_test_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Tests public readable" ON public.standardized_tests FOR SELECT USING (true);
CREATE POLICY "Test sections public readable" ON public.standardized_test_sections FOR SELECT USING (true);

-- 6. flashcard_decks / flashcards
ALTER TABLE public.flashcard_decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public decks readable" ON public.flashcard_decks FOR SELECT USING (is_public = true);
CREATE POLICY "Own decks readable" ON public.flashcard_decks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Own decks insertable" ON public.flashcard_decks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own decks updatable" ON public.flashcard_decks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Own decks deletable" ON public.flashcard_decks FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Flashcards via deck" ON public.flashcards FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.flashcard_decks fd
        WHERE fd.id = flashcards.deck_id
        AND (fd.is_public = true OR fd.user_id = auth.uid())
    )
);
CREATE POLICY "Own flashcards insertable" ON public.flashcards FOR INSERT WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.flashcard_decks fd
        WHERE fd.id = flashcards.deck_id AND fd.user_id = auth.uid()
    )
);

-- 7. application_systems / guides (readable by all)
ALTER TABLE public.application_systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_guides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "App systems public readable" ON public.application_systems FOR SELECT USING (true);
CREATE POLICY "App guides public readable" ON public.application_guides FOR SELECT USING (true);

-- 8. essays
ALTER TABLE public.essays ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own essays readable" ON public.essays FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Own essays insertable" ON public.essays FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own essays updatable" ON public.essays FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Own essays deletable" ON public.essays FOR DELETE USING (auth.uid() = user_id);

-- 9. competitions (readable by all)
ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Competitions public readable" ON public.competitions FOR SELECT USING (true);

-- 10. background_projects
ALTER TABLE public.background_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own projects readable" ON public.background_projects FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Own projects insertable" ON public.background_projects FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own projects updatable" ON public.background_projects FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Own projects deletable" ON public.background_projects FOR DELETE USING (auth.uid() = user_id);

-- 11. chat_sessions / messages
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own sessions readable" ON public.chat_sessions FOR SELECT USING (auth.uid() = student_id);
CREATE POLICY "Own sessions insertable" ON public.chat_sessions FOR INSERT WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Own messages readable" ON public.chat_messages FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM public.chat_sessions s WHERE s.id = chat_messages.session_id AND s.student_id = auth.uid()
    )
);
CREATE POLICY "Own messages insertable" ON public.chat_messages FOR INSERT WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.chat_sessions s WHERE s.id = chat_messages.session_id AND s.student_id = auth.uid()
    )
);

-- 12. agent_memories
ALTER TABLE public.agent_memories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own memories readable" ON public.agent_memories FOR SELECT USING (auth.uid() = student_id);

-- 13. notes / note_interactions
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.note_interactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own notes readable" ON public.notes FOR SELECT USING (auth.uid() = author_id);
CREATE POLICY "Own notes insertable" ON public.notes FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Own notes updatable" ON public.notes FOR UPDATE USING (auth.uid() = author_id);
CREATE POLICY "Own notes deletable" ON public.notes FOR DELETE USING (auth.uid() = author_id);
CREATE POLICY "Published notes readable by all" ON public.notes FOR SELECT USING (visibility = 'published');
CREATE POLICY "Interactions own" ON public.note_interactions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Interactions insertable" ON public.note_interactions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Interactions deletable own" ON public.note_interactions FOR DELETE USING (auth.uid() = user_id);

-- 14. point_balances / transactions
ALTER TABLE public.point_balances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.point_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own balance readable" ON public.point_balances FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Own transactions readable" ON public.point_transactions FOR SELECT USING (auth.uid() = user_id);

-- 15. ai_usage_quotas
ALTER TABLE public.ai_usage_quotas ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own quota readable" ON public.ai_usage_quotas FOR SELECT USING (auth.uid() = user_id);

-- 16. tasks
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own tasks readable" ON public.tasks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Own tasks insertable" ON public.tasks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own tasks updatable" ON public.tasks FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Own tasks deletable" ON public.tasks FOR DELETE USING (auth.uid() = user_id);

-- 17. calendar_events
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own events readable" ON public.calendar_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Own events insertable" ON public.calendar_events FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Own events updatable" ON public.calendar_events FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Own events deletable" ON public.calendar_events FOR DELETE USING (auth.uid() = user_id);

-- 18. friendships
ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Involved friendships readable" ON public.friendships FOR SELECT USING (
    auth.uid() = requester_id OR auth.uid() = addressee_id
);
CREATE POLICY "Friendships insertable" ON public.friendships FOR INSERT WITH CHECK (auth.uid() = requester_id);
CREATE POLICY "Involved updatable" ON public.friendships FOR UPDATE USING (
    auth.uid() = requester_id OR auth.uid() = addressee_id
);

-- 19. chat_groups (public + own)
ALTER TABLE public.chat_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public groups readable" ON public.chat_groups FOR SELECT USING (is_public = true);
CREATE POLICY "Own groups readable" ON public.chat_groups FOR SELECT USING (created_by = auth.uid());
CREATE POLICY "Groups insertable" ON public.chat_groups FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Own groups updatable" ON public.chat_groups FOR UPDATE USING (created_by = auth.uid());
CREATE POLICY "Group members readable" ON public.group_members FOR SELECT USING (
    EXISTS (SELECT 1 FROM public.chat_groups g WHERE g.id = group_members.group_id AND (g.is_public = true OR g.created_by = auth.uid()))
);
CREATE POLICY "Group members insertable" ON public.group_members FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM public.chat_groups g WHERE g.id = group_members.group_id AND g.created_by = auth.uid())
    OR group_members.user_id = auth.uid()
);

-- 20. social_messages
ALTER TABLE public.social_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own messages readable" ON public.social_messages FOR SELECT USING (
    auth.uid() = sender_id OR auth.uid() = receiver_id OR
    EXISTS (
        SELECT 1 FROM public.group_members gm
        WHERE gm.group_id = social_messages.group_id AND gm.user_id = auth.uid()
    )
);
CREATE POLICY "Messages insertable" ON public.social_messages FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- 21. meetings
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own meetings readable" ON public.meetings FOR SELECT USING (auth.uid() = host_id);
CREATE POLICY "Public meetings readable" ON public.meetings FOR SELECT USING (meeting_type = 'world');
CREATE POLICY "Meetings insertable" ON public.meetings FOR INSERT WITH CHECK (auth.uid() = host_id);
CREATE POLICY "Own meetings updatable" ON public.meetings FOR UPDATE USING (auth.uid() = host_id);

-- 22. focus_sessions / activity_logs / checkins
ALTER TABLE public.focus_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_checkins ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own focus sessions" ON public.focus_sessions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Own activity logs" ON public.activity_logs FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Own checkins" ON public.daily_checkins FOR ALL USING (auth.uid() = user_id);

-- 23. achievements / user_achievements
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Achievements public readable" ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Own achievements readable" ON public.user_achievements FOR SELECT USING (auth.uid() = user_id);

-- ============================================================
-- Functions & Triggers
-- ============================================================

-- 1. Auto-create user profile on signup
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

-- 2. Auto-create student profile after user created
CREATE OR REPLACE FUNCTION public.handle_new_student_profile()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.student_profiles (user_id, curriculum, year, subjects)
    VALUES (NEW.id, 'AP', 1, '[]');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_user_created ON public.users;
CREATE TRIGGER on_user_created
    AFTER INSERT ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_student_profile();

-- 3. Auto-create point balance
CREATE OR REPLACE FUNCTION public.handle_new_point_balance()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.point_balances (user_id, balance, lifetime_earned, lifetime_spent)
    VALUES (NEW.id, 0, 0, 0);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_user_points ON public.users;
CREATE TRIGGER on_user_points
    AFTER INSERT ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_point_balance();

-- 4. Auto-create AI usage quota
CREATE OR REPLACE FUNCTION public.handle_new_ai_quota()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.ai_usage_quotas (
        user_id, base_daily_limit, base_remaining, bonus_from_points,
        bonus_remaining, total_used_lifetime, last_reset_date,
        is_new_user, new_user_bonus
    ) VALUES (NEW.id, 10, 10, 0, 0, 0, CURRENT_DATE, true, 5);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_user_quota ON public.users;
CREATE TRIGGER on_user_quota
    AFTER INSERT ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_ai_quota();

-- 5. Auto-update note heat_score on interaction
CREATE OR REPLACE FUNCTION public.update_note_heat_score()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.notes
        SET heat_score = heat_score + CASE
            WHEN NEW.type = 'like' THEN 5
            WHEN NEW.type = 'bookmark' THEN 8
            WHEN NEW.type = 'comment' THEN 10
            ELSE 0
        END,
        likes_count = likes_count + CASE WHEN NEW.type = 'like' THEN 1 ELSE 0 END,
        bookmarks_count = bookmarks_count + CASE WHEN NEW.type = 'bookmark' THEN 1 ELSE 0 END,
        comments_count = comments_count + CASE WHEN NEW.type = 'comment' THEN 1 ELSE 0 END
        WHERE id = NEW.note_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.notes
        SET heat_score = heat_score + CASE
            WHEN OLD.type = 'like' THEN -5
            WHEN OLD.type = 'bookmark' THEN -8
            WHEN OLD.type = 'comment' THEN -10
            ELSE 0
        END,
        likes_count = likes_count + CASE WHEN OLD.type = 'like' THEN -1 ELSE 0 END,
        bookmarks_count = bookmarks_count + CASE WHEN OLD.type = 'bookmark' THEN -1 ELSE 0 END,
        comments_count = comments_count + CASE WHEN OLD.type = 'comment' THEN -1 ELSE 0 END
        WHERE id = OLD.note_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_note_interaction ON public.note_interactions;
CREATE TRIGGER on_note_interaction
    AFTER INSERT OR DELETE ON public.note_interactions
    FOR EACH ROW EXECUTE FUNCTION public.update_note_heat_score();

-- 6. Auto-update views_count on note view
CREATE OR REPLACE FUNCTION public.increment_note_views()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.notes SET views_count = views_count + 1 WHERE id = NEW.id;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Auto-update flashcard deck card count
CREATE OR REPLACE FUNCTION public.update_deck_card_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.flashcard_decks SET card_count = card_count + 1 WHERE id = NEW.deck_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.flashcard_decks SET card_count = card_count - 1 WHERE id = OLD.deck_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_flashcard_change ON public.flashcards;
CREATE TRIGGER on_flashcard_change
    AFTER INSERT OR DELETE ON public.flashcards
    FOR EACH ROW EXECUTE FUNCTION public.update_deck_card_count();

-- 8. Auto-update essay word_count
CREATE OR REPLACE FUNCTION public.update_essay_word_count()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.content IS DISTINCT FROM OLD.content THEN
        NEW.word_count := array_length(regexp_split_to_array(trim(NEW.content), '\s+'), 1);
        IF NEW.word_count IS NULL THEN NEW.word_count := 0; END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_essay_update ON public.essays;
CREATE TRIGGER on_essay_update
    BEFORE UPDATE ON public.essays
    FOR EACH ROW EXECUTE FUNCTION public.update_essay_word_count();


-- ============================================================
-- 17. Storage Buckets
-- ============================================================
-- Create the 'yhea' bucket for avatars and uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('yhea', 'yhea', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO NOTHING;

-- RLS for storage: users can only upload to their own folder
CREATE POLICY "Users can upload own avatars" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'yhea' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Users can read yhea bucket" ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'yhea');

CREATE POLICY "Users can delete own avatars" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'yhea' AND (storage.foldername(name))[1] = auth.uid()::text);
