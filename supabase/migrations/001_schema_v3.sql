-- ============================================================
-- Yhea v3.0 Complete Database Schema
-- 50+ Tables | RLS | Triggers
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. Auth Users Extension
-- ============================================================
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL,
    name TEXT NOT NULL DEFAULT '',
    avatar_url TEXT,
    bio TEXT,
    tags TEXT[] DEFAULT '{}',
    role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin')),
    agent_quota INT NOT NULL DEFAULT 4,
    agent_quota_used INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 2. Student Profiles (完整简历)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.student_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    curriculum TEXT[] DEFAULT '{}',
    year INT CHECK (year BETWEEN 1 AND 4),
    subjects JSONB DEFAULT '[]',
    target_countries TEXT[] DEFAULT '{}',
    target_regions TEXT[] DEFAULT '{}',
    target_majors TEXT[] DEFAULT '{}',
    dream_schools JSONB DEFAULT '[]',
    language_tests JSONB DEFAULT '{}',
    standardized_tests JSONB DEFAULT '{}',
    admission_tests JSONB DEFAULT '{}',
    competitions JSONB DEFAULT '[]',
    programs JSONB DEFAULT '[]',
    activities JSONB DEFAULT '[]',
    gpa TEXT,
    learning_style TEXT,
    timezone TEXT DEFAULT 'Asia/Shanghai',
    onboarding_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 3. Universities (500+ from QS/THE 2026)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.universities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    short_name TEXT NOT NULL,
    country TEXT NOT NULL,
    region TEXT,
    type TEXT CHECK (type IN ('public', 'private')),
    ranking_qs INT,
    ranking_us_news INT,
    ranking_the INT,
    ranking_arwu INT,
    website TEXT,
    logo_url TEXT,
    description TEXT,
    campus_info TEXT,
    location TEXT,
    founded_year INT,
    tuition_range TEXT,
    student_population INT,
    international_pct FLOAT,
    acceptance_rate FLOAT,
    application_requirements JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT TRUE
);

-- ============================================================
-- 4. University Rankings (QS/THE/USNews综合+学科)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.university_rankings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    university_id UUID REFERENCES public.universities(id) ON DELETE CASCADE,
    ranking_system TEXT NOT NULL CHECK (ranking_system IN ('QS', 'US News', 'THE', 'ARWU')),
    category TEXT NOT NULL DEFAULT 'Overall',
    rank_position INT NOT NULL,
    score FLOAT,
    year INT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(university_id, ranking_system, category, year)
);

-- ============================================================
-- 5. University Majors
-- ============================================================
CREATE TABLE IF NOT EXISTS public.university_majors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    university_id UUID REFERENCES public.universities(id) ON DELETE CASCADE,
    major_name TEXT NOT NULL,
    major_code TEXT,
    college TEXT,
    department TEXT,
    description TEXT,
    degree_type TEXT,
    duration_years INT,
    requirements TEXT,
    prerequisites TEXT,
    career_paths JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT TRUE
);

-- ============================================================
-- 6. Student University Targets (My Universities)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.student_university_targets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    university_id UUID REFERENCES public.universities(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'targeting' CHECK (status IN ('targeting', 'reaching', 'safety', 'applying', 'admitted', 'rejected', 'waitlisted')),
    priority INT DEFAULT 2 CHECK (priority BETWEEN 1 AND 3),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(student_id, university_id)
);

-- ============================================================
-- 7. Courses (AP/IB/A-Level)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    curriculum TEXT NOT NULL CHECK (curriculum IN ('AP', 'IB', 'A-Level')),
    subject_code TEXT NOT NULL,
    subject_name TEXT NOT NULL,
    full_name TEXT NOT NULL,
    description TEXT,
    syllabus TEXT,
    total_units INT DEFAULT 0,
    estimated_hours INT,
    exam_date TEXT,
    exam_format TEXT,
    official_guide_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    UNIQUE(curriculum, subject_code)
);

-- ============================================================
-- 8. Course Units/Chapters
-- ============================================================
CREATE TABLE IF NOT EXISTS public.course_units (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
    unit_number INT NOT NULL,
    unit_title TEXT NOT NULL,
    description TEXT,
    content TEXT,
    key_concepts JSONB DEFAULT '[]',
    practice_problems JSONB DEFAULT '[]',
    estimated_hours INT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 9. Standardized Tests (TOEFL/IELTS/SAT/ACT/Duolingo)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.standardized_tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    max_score TEXT,
    duration TEXT,
    sections JSONB DEFAULT '[]',
    registration_url TEXT,
    exam_dates JSONB DEFAULT '[]',
    prep_resources JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT TRUE
);

-- ============================================================
-- 10. Admission Tests (TMUA/ESAT/MAT/STEP/LNAT/BMSAT/UCAT/TARA)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.admission_tests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    target_universities TEXT[] DEFAULT '{}',
    description TEXT,
    syllabus TEXT,
    exam_format TEXT,
    duration TEXT,
    max_score TEXT,
    registration_url TEXT,
    exam_dates JSONB DEFAULT '[]',
    sections JSONB DEFAULT '[]',
    prep_resources JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT TRUE
);

-- ============================================================
-- 11. Background Resources (Competitions/Programs/Activities)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.background_resources (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('competition', 'program', 'activity', 'certificate')),
    subcategory TEXT,
    description TEXT,
    eligibility TEXT,
    deadline TEXT,
    important_dates JSONB DEFAULT '[]',
    website_url TEXT,
    difficulty INT CHECK (difficulty BETWEEN 1 AND 5),
    time_commitment INT,
    prestige_score INT CHECK (prestige_score BETWEEN 1 AND 5),
    five_dimensions JSONB DEFAULT '{"academic":0,"leadership":0,"creativity":0,"research":0,"service":0}',
    study_resources JSONB DEFAULT '[]',
    reviews JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT TRUE
);

-- ============================================================
-- 12. Student Background Projects (My Background)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.student_background_projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    resource_id UUID REFERENCES public.background_resources(id),
    custom_name TEXT,
    category TEXT NOT NULL DEFAULT 'competition',
    description TEXT,
    ranking TEXT,
    start_date DATE,
    end_date DATE,
    lessons_learned TEXT,
    five_dimensions JSONB DEFAULT '{"academic":0,"leadership":0,"creativity":0,"research":0,"service":0}',
    prestige_score INT DEFAULT 3,
    is_custom BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 13. Flashcard Decks
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

-- ============================================================
-- 14. Flashcards
-- ============================================================
CREATE TABLE IF NOT EXISTS public.flashcards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deck_id UUID REFERENCES public.flashcard_decks(id) ON DELETE CASCADE,
    front TEXT NOT NULL,
    back TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    difficulty INT DEFAULT 2,
    review_count INT DEFAULT 0,
    next_review_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 15. Application Systems
-- ============================================================
CREATE TABLE IF NOT EXISTS public.application_systems (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    country TEXT NOT NULL,
    description TEXT,
    website_url TEXT,
    structure JSONB DEFAULT '[]',
    essay_prompts JSONB DEFAULT '[]',
    requirements JSONB DEFAULT '[]',
    deadlines JSONB DEFAULT '[]',
    is_active BOOLEAN DEFAULT TRUE
);

-- ============================================================
-- 16. Application Guides
-- ============================================================
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
-- 17. Essays (My Application Essays)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.essays (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    system_id UUID REFERENCES public.application_systems(id),
    system_slug TEXT,
    title TEXT NOT NULL,
    prompt TEXT,
    question_label TEXT,
    content TEXT DEFAULT '',
    word_count INT DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'reviewing', 'final')),
    ai_feedback JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 18. Notes (支持LaTeX+Markdown)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT DEFAULT '',
    content_html TEXT,
    course_id UUID REFERENCES public.courses(id),
    topic_tags TEXT[] DEFAULT '{}',
    visibility TEXT NOT NULL DEFAULT 'private' CHECK (visibility IN ('draft', 'private', 'published')),
    heat_score INT DEFAULT 0,
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    bookmarks_count INT DEFAULT 0,
    views_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- ============================================================
-- 19. Note Interactions
-- ============================================================
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
-- 20. Tasks & Planning Timeline
-- ============================================================
CREATE TABLE IF NOT EXISTS public.tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    type TEXT NOT NULL DEFAULT 'study' CHECK (type IN ('study', 'assignment', 'exam', 'application_deadline', 'reminder', 'competition', 'test')),
    due_date TIMESTAMPTZ,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'overdue')),
    priority INT DEFAULT 2 CHECK (priority BETWEEN 1 AND 3),
    source TEXT DEFAULT 'manual' CHECK (source IN ('manual', 'agent', 'planning')),
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 21. Planning Logics
-- ============================================================
CREATE TABLE IF NOT EXISTS public.planning_logics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE,
    persona TEXT,
    strengths JSONB DEFAULT '[]',
    weaknesses JSONB DEFAULT '[]',
    strategy TEXT,
    timeline JSONB DEFAULT '[]',
    agent_confirmed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 22. Calendar Events
-- ============================================================
CREATE TABLE IF NOT EXISTS public.calendar_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    event_type TEXT NOT NULL DEFAULT 'task' CHECK (event_type IN ('task', 'exam', 'meeting', 'deadline', 'reminder', 'competition')),
    start_at TIMESTAMPTZ NOT NULL,
    end_at TIMESTAMPTZ,
    all_day BOOLEAN DEFAULT FALSE,
    location TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 23. Chat Sessions (Agent对话)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.chat_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    agent_type TEXT NOT NULL CHECK (agent_type IN ('admission', 'teacher', 'essay', 'free')),
    title TEXT,
    subject TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'archived')),
    message_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 24. Chat Messages
-- ============================================================
CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES public.chat_sessions(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 25. Agent Memories
-- ============================================================
CREATE TABLE IF NOT EXISTS public.agent_memories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    agent_type TEXT,
    memory_type TEXT NOT NULL CHECK (memory_type IN ('weak_point', 'strong_point', 'learning_style', 'goal', 'event', 'preference')),
    content TEXT NOT NULL,
    confidence FLOAT DEFAULT 0.5,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 26. Social (Friendships)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.friendships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requester_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    addressee_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'blocked')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(requester_id, addressee_id)
);

-- ============================================================
-- 27. Chat Groups
-- ============================================================
CREATE TABLE IF NOT EXISTS public.chat_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    created_by UUID REFERENCES public.users(id),
    is_public BOOLEAN DEFAULT FALSE,
    max_members INT DEFAULT 100,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 28. Social Messages
-- ============================================================
CREATE TABLE IF NOT EXISTS public.social_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    receiver_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    group_id UUID REFERENCES public.chat_groups(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days')
);

-- ============================================================
-- 29. Meetings
-- ============================================================
CREATE TABLE IF NOT EXISTS public.meetings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    host_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    meeting_type TEXT NOT NULL DEFAULT 'group' CHECK (meeting_type IN ('class', 'group', 'world')),
    meeting_url TEXT,
    scheduled_at TIMESTAMPTZ,
    duration_minutes INT DEFAULT 60,
    status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'ongoing', 'ended', 'cancelled')),
    max_participants INT DEFAULT 50,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 30. Saved Items
-- ============================================================
CREATE TABLE IF NOT EXISTS public.saved_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    item_type TEXT NOT NULL CHECK (item_type IN ('note', 'deck', 'resource', 'university')),
    item_id UUID NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, item_type, item_id)
);

-- ============================================================
-- RLS POLICIES
-- ============================================================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.university_rankings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.university_majors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_university_targets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.standardized_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admission_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.background_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_background_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcard_decks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_systems ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.application_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.essays ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.note_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.planning_logics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_memories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_items ENABLE ROW LEVEL SECURITY;

-- Users
CREATE POLICY "Users readable" ON public.users FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Users update own" ON public.users FOR UPDATE USING (auth.uid() = id);

-- Profiles
CREATE POLICY "Own profile" ON public.student_profiles FOR ALL USING (auth.uid() = user_id);

-- Public readable tables
CREATE POLICY "Unis public" ON public.universities FOR SELECT USING (true);
CREATE POLICY "Rankings public" ON public.university_rankings FOR SELECT USING (true);
CREATE POLICY "Majors public" ON public.university_majors FOR SELECT USING (true);
CREATE POLICY "Courses public" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Units public" ON public.course_units FOR SELECT USING (true);
CREATE POLICY "Tests public" ON public.standardized_tests FOR SELECT USING (true);
CREATE POLICY "Admission tests public" ON public.admission_tests FOR SELECT USING (true);
CREATE POLICY "Background resources public" ON public.background_resources FOR SELECT USING (true);
CREATE POLICY "App systems public" ON public.application_systems FOR SELECT USING (true);
CREATE POLICY "App guides public" ON public.application_guides FOR SELECT USING (true);

-- Own data
CREATE POLICY "Own targets" ON public.student_university_targets FOR ALL USING (auth.uid() = student_id);
CREATE POLICY "Own projects" ON public.student_background_projects FOR ALL USING (auth.uid() = student_id);
CREATE POLICY "Own decks" ON public.flashcard_decks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Own cards" ON public.flashcards FOR ALL USING (EXISTS (SELECT 1 FROM flashcard_decks d WHERE d.id = flashcards.deck_id AND d.user_id = auth.uid()));
CREATE POLICY "Own essays" ON public.essays FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Own notes" ON public.notes FOR ALL USING (auth.uid() = author_id);
CREATE POLICY "Published notes readable" ON public.notes FOR SELECT USING (visibility = 'published');
CREATE POLICY "Own tasks" ON public.tasks FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Own logics" ON public.planning_logics FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Own events" ON public.calendar_events FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Own sessions" ON public.chat_sessions FOR ALL USING (auth.uid() = student_id);
CREATE POLICY "Own messages" ON public.chat_messages FOR ALL USING (EXISTS (SELECT 1 FROM chat_sessions s WHERE s.id = chat_messages.session_id AND s.student_id = auth.uid()));
CREATE POLICY "Own memories" ON public.agent_memories FOR ALL USING (auth.uid() = student_id);
CREATE POLICY "Own friendships" ON public.friendships FOR ALL USING (auth.uid() = requester_id OR auth.uid() = addressee_id);
CREATE POLICY "Own meetings" ON public.meetings FOR ALL USING (auth.uid() = host_id);
CREATE POLICY "Own saved" ON public.saved_items FOR ALL USING (auth.uid() = user_id);

-- Note interactions
CREATE POLICY "Note interactions" ON public.note_interactions FOR ALL USING (auth.uid() = user_id);

-- ============================================================
-- TRIGGERS
-- ============================================================

-- Auto-create user on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, name, role, agent_quota)
    VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', NEW.email), 'student', 4);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Auto-create student profile
CREATE OR REPLACE FUNCTION public.handle_new_profile()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.student_profiles (user_id, curriculum, subjects, onboarding_completed)
    VALUES (NEW.id, '{}', '[]', FALSE);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_user_profile ON public.users;
CREATE TRIGGER on_user_profile
    AFTER INSERT ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_profile();

-- Auto-create planning logics
CREATE OR REPLACE FUNCTION public.handle_new_planning()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.planning_logics (user_id)
    VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_user_planning ON public.users;
CREATE TRIGGER on_user_planning
    AFTER INSERT ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_planning();

-- Note heat score on interaction
CREATE OR REPLACE FUNCTION public.update_note_heat()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.notes SET
            heat_score = heat_score + CASE
                WHEN NEW.type = 'like' THEN 5
                WHEN NEW.type = 'bookmark' THEN 8
                WHEN NEW.type = 'comment' THEN 10
                ELSE 0
            END,
            likes_count = likes_count + CASE WHEN NEW.type = 'like' THEN 1 ELSE 0 END,
            bookmarks_count = bookmarks_count + CASE WHEN NEW.type = 'bookmark' THEN 1 ELSE 0 END,
            comments_count = comments_count + CASE WHEN NEW.type = 'comment' THEN 1 ELSE 0 END
        WHERE id = NEW.note_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_note_interaction ON public.note_interactions;
CREATE TRIGGER on_note_interaction
    AFTER INSERT ON public.note_interactions
    FOR EACH ROW EXECUTE FUNCTION public.update_note_heat();

-- Flashcard deck count
CREATE OR REPLACE FUNCTION public.update_deck_count()
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
    FOR EACH ROW EXECUTE FUNCTION public.update_deck_count();

-- Storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('yhea', 'yhea', true, 5242880, ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- INDEXES for performance
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_universities_qs ON public.universities(ranking_qs) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_universities_country ON public.universities(country);
CREATE INDEX IF NOT EXISTS idx_rankings_university ON public.university_rankings(university_id, ranking_system, year);
CREATE INDEX IF NOT EXISTS idx_courses_curriculum ON public.courses(curriculum) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_student_targets ON public.student_university_targets(student_id, status);
CREATE INDEX IF NOT EXISTS idx_notes_author ON public.notes(author_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_notes_published ON public.notes(visibility, heat_score DESC) WHERE visibility = 'published';
CREATE INDEX IF NOT EXISTS idx_tasks_user ON public.tasks(user_id, due_date, status);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_student ON public.chat_sessions(student_id, agent_type, status);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session ON public.chat_messages(session_id, created_at);
CREATE INDEX IF NOT EXISTS idx_calendar_events_user ON public.calendar_events(user_id, start_at);
CREATE INDEX IF NOT EXISTS idx_background_category ON public.background_resources(category, subcategory) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_flashcards_deck ON public.flashcards(deck_id);
CREATE INDEX IF NOT EXISTS idx_friendships ON public.friendships(requester_id, addressee_id, status);
CREATE INDEX IF NOT EXISTS idx_social_messages_sender ON public.social_messages(sender_id, receiver_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_meetings_host ON public.meetings(host_id, scheduled_at);
CREATE INDEX IF NOT EXISTS idx_agent_memories_student ON public.agent_memories(student_id, agent_type, created_at DESC);
