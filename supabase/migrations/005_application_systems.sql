-- ============================================================
-- Yhea v3.0 Application Systems Data
-- ============================================================

INSERT INTO public.application_systems (name, slug, country, description, website_url, structure, essay_prompts, requirements, deadlines) VALUES
('Common App', 'common-app', 'USA', 'The most widely used college application platform in the United States, accepted by over 1000 colleges.', 'https://www.commonapp.org', '[{"section":"Profile","description":"Demographics, family, languages"},{"section":"Family","description":"Household and parent information"},{"section":"Education","description":"Schools, grades, coursework, honors"},{"section":"Testing","description":"Self-reported test scores"},{"section":"Activities","description":"10 activities with descriptions"},{"section":"Writing","description":"Personal essay (650 words) + optional COVID essay"}]', '[{"prompt":"Background, identity, interest, or talent that is meaningful"},{"prompt":"Lessons from obstacles, challenges, setbacks, or failures"},{"prompt":"Questioning or challenging a belief or idea"},{"prompt":"Gratitude - something someone did that made you happy or thankful"},{"prompt":"Accomplishment, event, or realization that sparked personal growth"},{"prompt":"Topic, idea, or concept that captivates you"},{"prompt":"Essay on any topic of your choice"}]', '[{"item":"Personal Essay (650 words)","required":true},{"item":"Activities List (10 max)","required":true},{"item":"Counselor Recommendation","required":true},{"item":"Teacher Recommendations (2)","required":true},{"item":"Transcript","required":true},{"item":"Test Scores (optional)","required":false}]', '[{"name":"Early Decision/Action","date":"2025-11-01"},{"name":"Regular Decision","date":"2026-01-01"},{"name":"Rolling Admission","date":"Varies"}]')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  structure = EXCLUDED.structure,
  essay_prompts = EXCLUDED.essay_prompts,
  requirements = EXCLUDED.requirements,
  deadlines = EXCLUDED.deadlines;

INSERT INTO public.application_systems (name, slug, country, description, website_url, structure, essay_prompts, requirements, deadlines) VALUES
('UCAS', 'ucas', 'UK', 'The Universities and Colleges Admissions Service for all UK undergraduate university applications.', 'https://www.ucas.com', '[{"section":"Personal Details","description":"Name, contact, residency, support"},{"section":"Choices","description":"Up to 5 course choices"},{"section":"Education","description":"Qualifications, pending, completed"},{"section":"Employment","description":"Paid work history"},{"section":"Personal Statement","description":"4000 characters, 3 questions (2026 entry)"}]', '[{"prompt":"Why do you want to study this course or subject?"},{"prompt":"How have your qualifications and studies helped you to prepare?"},{"prompt":"What else have you done to prepare outside of education?"}]', '[{"item":"Personal Statement (4000 chars, 3 questions)","required":true},{"item":"Academic Reference","required":true},{"item":"Predicted Grades","required":true},{"item":"GCSE/IGCSE Results","required":true},{"item":"A-Level/IB Results","required":true}]', '[{"name":"Oxbridge/Medicine/Vet/Dentistry","date":"2025-10-15"},{"name":"Most Other Courses","date":"2026-01-31"},{"name":"Art/Design Courses","date":"2026-03-24"}]')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  structure = EXCLUDED.structure,
  essay_prompts = EXCLUDED.essay_prompts,
  requirements = EXCLUDED.requirements,
  deadlines = EXCLUDED.deadlines;

INSERT INTO public.application_systems (name, slug, country, description, website_url, structure, essay_prompts, requirements, deadlines) VALUES
('Coalition Application', 'coalition', 'USA', 'College application platform focused on access, affordability, and success for underrepresented students.', 'https://www.coalitionforcollegeaccess.org', '[{"section":"Profile","description":"Personal and demographic information"},{"section":"Academic","description":"Coursework, testing, activities"},{"section":"Locker","description":"Portfolio of work and achievements"},{"section":"Essays","description":"Personal statement"}]', '[{"prompt":"Tell a story from your life describing an experience that demonstrates your character"},{"prompt":"Describe a time when you made a meaningful contribution to others"},{"prompt":"Has there been a time when your belief was challenged?"},{"prompt":"What is the hardest and best part of being a student?"},{"prompt":"Submit an essay on a topic of your choice"}]', '[{"item":"Personal Essay","required":true},{"item":"Locker Items","required":false},{"item":"Recommendation Letters","required":true},{"item":"Transcript","required":true}]', '[{"name":"Early Action","date":"2025-11-01"},{"name":"Regular Decision","date":"2026-01-15"}]')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  structure = EXCLUDED.structure,
  essay_prompts = EXCLUDED.essay_prompts,
  requirements = EXCLUDED.requirements,
  deadlines = EXCLUDED.deadlines;

INSERT INTO public.application_systems (name, slug, country, description, website_url, structure, essay_prompts, requirements, deadlines) VALUES
('University of California', 'uc-application', 'USA', 'Application system for all 9 University of California campuses.', 'https://apply.universityofcalifornia.edu', '[{"section":"About You","description":"Personal, demographics, family"},{"section":"Campuses & Majors","description":"Select up to 9 UC campuses"},{"section":"Academic History","description":"Transcript entry, test scores"},{"section":"Activities & Awards","description":"20 activities and awards"},{"section":"Personal Insight Questions","description":"4 of 8 questions (350 words each)"}]', '[{"prompt":"Describe an example of your leadership experience"},{"prompt":"Every person has a creative side - describe yours"},{"prompt":"What is your greatest talent or skill?"},{"prompt":"Describe an educational opportunity or barrier you faced"},{"prompt":"Describe the most significant challenge you have faced"},{"prompt":"Think about an academic subject that inspires you"},{"prompt":"What have you done to make your community better?"},{"prompt":"What makes you a strong candidate for UC?"}]', '[{"item":"4 Personal Insight Questions","required":true},{"item":"Activities & Awards (20)","required":true},{"item":"Transcript","required":true},{"item":"No Letters of Recommendation","required":false}]', '[{"name":"UC Application","date":"2025-11-30"}]')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  structure = EXCLUDED.structure,
  essay_prompts = EXCLUDED.essay_prompts,
  requirements = EXCLUDED.requirements,
  deadlines = EXCLUDED.deadlines;

INSERT INTO public.application_systems (name, slug, country, description, website_url, structure, essay_prompts, requirements, deadlines) VALUES
('MIT Application', 'mit', 'USA', 'Massachusetts Institute of Technology independent application system.', 'https://apply.mitadmissions.org', '[{"section":"Biographical","description":"Personal information"},{"section":"Academics","description":"Grades, test scores, coursework"},{"section":"Activities","description":"Extracurricular activities and work"},{"section":"Essays","description":"Several short essays and one long essay"},{"section":"Recommendations","description":"Math/science teacher, humanities teacher, counselor"}]', '[{"prompt":"What field of study appeals to you most at MIT?"},{"prompt":"Tell us about something you do for pleasure"},{"prompt":"Describe how you have contributed to your community"},{"prompt":"Describe the world you come from and how it shaped your dreams"},{"prompt":"Tell us about the most significant challenge you have faced"}]', '[{"item":"Short Essays (5)","required":true},{"item":"Activities List","required":true},{"item":"Math/Science Teacher Rec","required":true},{"item":"Humanities Teacher Rec","required":true},{"item":"Counselor Rec","required":true},{"item":"Interview","required":false}]', '[{"name":"Early Action","date":"2025-11-01"},{"name":"Regular Action","date":"2026-01-06"}]')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  structure = EXCLUDED.structure,
  essay_prompts = EXCLUDED.essay_prompts,
  requirements = EXCLUDED.requirements,
  deadlines = EXCLUDED.deadlines;

INSERT INTO public.application_systems (name, slug, country, description, website_url, structure, essay_prompts, requirements, deadlines) VALUES
('OUAC', 'ouac', 'Canada', 'Ontario Universities Application Centre for Ontario university applications.', 'https://www.ouac.on.ca', '[{"section":"Personal Information","description":"Demographics, contact"},{"section":"Academic Background","description":"Schools, courses, grades"},{"section":"Program Choices","description":"Up to 3 program choices per university"},{"section":"Activities","description":"Employment, volunteer, extracurriculars"},{"section":"Supplementals","description":"Some programs require additional information"}]', '[{"prompt":"Program-specific supplementary applications vary by university and program"}]', '[{"item":"Transcript","required":true},{"item":"Program Choices","required":true},{"item":"Supplementary Application (if required)","required":false},{"item":"English Proficiency (if applicable)","required":false}]', '[{"name":"Equal Consideration","date":"2026-01-15"},{"name":"Rolling","date":"Varies by program"}]')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  structure = EXCLUDED.structure,
  essay_prompts = EXCLUDED.essay_prompts,
  requirements = EXCLUDED.requirements,
  deadlines = EXCLUDED.deadlines;

INSERT INTO public.application_systems (name, slug, country, description, website_url, structure, essay_prompts, requirements, deadlines) VALUES
('Cal State Apply', 'calstate', 'USA', 'Application system for all 23 California State University campuses.', 'https://www2.calstate.edu/apply', '[{"section":"Personal Information","description":"Demographics, background"},{"section":"Campus Selection","description":"Choose Cal State campuses"},{"section":"Academic History","description":"Coursework, grades, test scores"},{"section":"Income & Housing","description":"Financial and living information"},{"section":"Review & Submit","description":"Final review and payment"}]', '[{"prompt":"No essays required for most programs. Some impacted majors may require additional information"}]', '[{"item":"High School Transcript","required":true},{"item":"Test Scores (optional)","required":false},{"item":"No Essays","required":false},{"item":"No Recommendations","required":false}]', '[{"name":"Fall Term","date":"2025-11-30"}]')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  structure = EXCLUDED.structure,
  essay_prompts = EXCLUDED.essay_prompts,
  requirements = EXCLUDED.requirements,
  deadlines = EXCLUDED.deadlines;

