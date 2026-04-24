-- ============================================================
-- Yhea v3.0 Standardized & Admission Tests Data
-- ============================================================

INSERT INTO public.standardized_tests (code, name, category, description, max_score, duration, sections, registration_url, exam_dates, prep_resources) VALUES
('TOEFL', 'Test of English as a Foreign Language', 'Language', 'Measures English language proficiency for non-native speakers in academic settings.', '120', '~3 hours', '[{"name":"Reading","score":"30","time":"54-72 min"},{"name":"Listening","score":"30","time":"41-57 min"},{"name":"Speaking","score":"30","time":"17 min"},{"name":"Writing","score":"30","time":"50 min"}]', 'https://www.ets.org/toefl', '["2026-01-11","2026-02-15","2026-03-07","2026-04-11","2026-05-16","2026-06-13","2026-07-11","2026-08-08","2026-09-12","2026-10-17","2026-11-14","2026-12-12"]', '[{"title":"TOEFL Official Guide","url":"https://www.ets.org/toefl/test-takers/ibt/prepare"},{"title":"Khan Academy","url":"https://www.khanacademy.org/test-prep"},{"title":"Magoosh TOEFL","url":"https://magoosh.com/toefl/"}]')
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sections = EXCLUDED.sections;

INSERT INTO public.standardized_tests (code, name, category, description, max_score, duration, sections, registration_url, exam_dates, prep_resources) VALUES
('IELTS', 'International English Language Testing System', 'Language', 'Measures English language proficiency for education, migration, and work.', '9.0', '2 hours 45 minutes', '[{"name":"Listening","score":"9","time":"30 min"},{"name":"Reading","score":"9","time":"60 min"},{"name":"Writing","score":"9","time":"60 min"},{"name":"Speaking","score":"9","time":"11-14 min"}]', 'https://www.ielts.org', '["2026-01-09","2026-02-13","2026-03-06","2026-04-10","2026-05-15","2026-06-12","2026-07-10","2026-08-14","2026-09-11","2026-10-16","2026-11-13","2026-12-11"]', '[{"title":"British Council IELTS Prep","url":"https://www.britishcouncil.org/exam/ielts"},{"title":"IDP IELTS","url":"https://www.ielts.idp.com/prepare"},{"title":"Cambridge IELTS Books","url":"https://www.cambridge.org/gb/cambridgeenglish/exam-preparation"}]')
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sections = EXCLUDED.sections;

INSERT INTO public.standardized_tests (code, name, category, description, max_score, duration, sections, registration_url, exam_dates, prep_resources) VALUES
('Duolingo', 'Duolingo English Test', 'Language', 'Affordable online English proficiency test accepted by many universities.', '160', '1 hour', '[{"name":"Literacy","score":"160","time":"~20 min"},{"name":"Conversation","score":"160","time":"~20 min"},{"name":"Comprehension","score":"160","time":"~20 min"},{"name":"Production","score":"160","time":"~20 min"}]', 'https://englishtest.duolingo.com', '["On-demand - take anytime"]', '[{"title":"Duolingo Practice Test","url":"https://englishtest.duolingo.com/quick"},{"title":"Official Guide","url":"https://englishtest.duolingo.com/readiness"}]')
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sections = EXCLUDED.sections;

INSERT INTO public.standardized_tests (code, name, category, description, max_score, duration, sections, registration_url, exam_dates, prep_resources) VALUES
('SAT', 'Scholastic Assessment Test', 'Standardized', 'College admissions test measuring reading, writing, and math skills.', '1600', '2 hours 14 minutes', '[{"name":"Reading and Writing","score":"800","time":"64 min"},{"name":"Math","score":"800","time":"70 min"}]', 'https://satsuite.collegeboard.org/sat', '["2026-03-14","2026-05-02","2026-06-06","2026-08-29","2026-10-03","2026-11-07","2026-12-05"]', '[{"title":"Bluebook App","url":"https://satsuite.collegeboard.org/digital"},{"title":"Khan Academy SAT","url":"https://www.khanacademy.org/test-prep/sat"},{"title":"College Board Official","url":"https://satsuite.collegeboard.org/practice"}]')
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sections = EXCLUDED.sections;

INSERT INTO public.standardized_tests (code, name, category, description, max_score, duration, sections, registration_url, exam_dates, prep_resources) VALUES
('ACT', 'American College Testing', 'Standardized', 'College admissions test measuring English, math, reading, science, and optional writing.', '36', '2 hours 55 minutes (+40 min optional writing)', '[{"name":"English","score":"36","time":"45 min"},{"name":"Math","score":"36","time":"60 min"},{"name":"Reading","score":"36","time":"35 min"},{"name":"Science","score":"36","time":"35 min"},{"name":"Writing (optional)","score":"12","time":"40 min"}]', 'https://www.act.org', '["2026-02-07","2026-04-04","2026-06-13","2026-07-11","2026-09-12","2026-10-24","2026-12-12"]', '[{"title":"ACT Official Prep","url":"https://www.act.org/content/act/en/products-and-services/the-act-test-preparation.html"},{"title":"Princeton Review","url":"https://www.princetonreview.com/college/act-test-prep"},{"title":"Kaplan ACT","url":"https://www.kaptest.com/act"}]')
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  sections = EXCLUDED.sections;

INSERT INTO public.admission_tests (code, name, target_universities, description, syllabus, exam_format, duration, max_score, registration_url, exam_dates, sections, prep_resources) VALUES
('TMUA', 'Test of Mathematics for University Admission', '["Cambridge","Imperial","LSE","Durham","Warwick","Bath","Southampton","Sheffield"]', 'Mathematical thinking and reasoning test for undergraduate mathematics and related courses.', 'Mathematical knowledge: algebra, geometry, calculus, logic, problem solving. Papers 1 and 2.', 'Two 75-minute multiple-choice papers', '7.5', '9.0', 'https://www.admissionstesting.org/for-test-takers/test-of-mathematics-for-university-admission/', '["2025-10-16/17","2026-01-08/09"]', '[{"name":"Mathematical Thinking","score":"9.0"},{"name":"Mathematical Reasoning","score":"9.0"}]', '[{"title":"TMUA Past Papers","url":"https://www.admissionstesting.org/for-test-takers/test-of-mathematics-for-university-admission/preparation/"},{"title":"Underground Maths","url":"https://undergroundmathematics.org/"}]')
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.admission_tests (code, name, target_universities, description, syllabus, exam_format, duration, max_score, registration_url, exam_dates, sections, prep_resources) VALUES
('ESAT', 'Engineering and Science Admissions Test', '["Cambridge","Imperial"]', 'Subject-specific admissions test for engineering and science courses.', 'Mathematics, Physics, Chemistry, Biology modules. Choose relevant modules for your course.', 'Multiple-choice, 40 minutes per module', '9.0', '9.0', 'https://www.admissionstesting.org/for-test-takers/engineering-and-science-admissions-test/', '["2025-10-16/17","2026-01-08/09"]', '[{"name":"Mathematics 1","score":"9.0"},{"name":"Mathematics 2","score":"9.0"},{"name":"Physics","score":"9.0"},{"name":"Chemistry","score":"9.0"},{"name":"Biology","score":"9.0"}]', '[{"title":"ESAT Specification","url":"https://www.admissionstesting.org/for-test-takers/engineering-and-science-admissions-test/"},{"title":"Isaac Physics","url":"https://isaacphysics.org/"}]')
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.admission_tests (code, name, target_universities, description, syllabus, exam_format, duration, max_score, registration_url, exam_dates, sections, prep_resources) VALUES
('TARA', 'Test of Academic Reasoning and Aptitude', '["Oxford","Cambridge"]', 'Aptitude test measuring critical thinking, problem solving, and academic potential.', 'Critical thinking, problem solving, data analysis, and academic reasoning skills.', 'Multiple sections, timed assessment', 'N/A', 'N/A', 'https://www.admissionstesting.org/', '["2025-10","2026-01"]', '[{"name":"Critical Thinking","score":"N/A"},{"name":"Problem Solving","score":"N/A"}]', '[{"title":"TARA Specimen","url":"https://www.admissionstesting.org/"}]')
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.admission_tests (code, name, target_universities, description, syllabus, exam_format, duration, max_score, registration_url, exam_dates, sections, prep_resources) VALUES
('MAT', 'Mathematics Admissions Test', '["Oxford","Imperial","Warwick"]', 'Mathematics admissions test for undergraduate mathematics and joint honours degrees.', 'Syllabus based on A-Level Mathematics (C1, C2), with some AS-Level Further Mathematics content.', '2 hours 30 minutes, written paper', '100', '100', 'https://www.mat.ox.ac.uk/', '["2025-10-30"]', '[{"name":"Mathematics","score":"100"}]', '[{"title":"MAT Past Papers","url":"https://www.mat.ox.ac.uk/"},{"title":"STEP Support Programme","url":"https://maths.org/step/"}]')
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.admission_tests (code, name, target_universities, description, syllabus, exam_format, duration, max_score, registration_url, exam_dates, sections, prep_resources) VALUES
('STEP', 'Sixth Term Examination Paper', '["Cambridge","Warwick","Imperial","Bath","UCL"]', 'Advanced mathematics examination used primarily for Cambridge mathematics admissions.', 'Based on A-Level Mathematics and Further Mathematics. Papers 2 and 3 for different levels.', '3 hours per paper', '20', '20', 'https://www.admissionstesting.org/for-test-takers/sixth-term-examination-paper/', '["2026-06"]', '[{"name":"STEP 2","score":"20"},{"name":"STEP 3","score":"20"}]', '[{"title":"STEP Support Programme","url":"https://maths.org/step/"},{"title":"STEP Past Papers","url":"https://www.admissionstesting.org/for-test-takers/sixth-term-examination-paper/preparation/"}]')
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.admission_tests (code, name, target_universities, description, syllabus, exam_format, duration, max_score, registration_url, exam_dates, sections, prep_resources) VALUES
('LNAT', 'National Admissions Test for Law', '["Oxford","Cambridge","LSE","UCL","KCL","Bristol","Durham","Glasgow","Nottingham","SOAS"]', 'Aptitude test for law degree applicants at certain UK universities.', 'Comprehension, interpretation, analysis, synthesis, induction, deduction. Essay writing.', '2 hours 15 minutes (95 min MCQ + 40 min essay)', '42', '42', 'https://www.lnat.ac.uk/', '["2025-09-01 to 2026-01-20"]', '[{"name":"Multiple Choice","score":"42"},{"name":"Essay","score":"Not scored"}]', '[{"title":"LNAT Practice","url":"https://www.lnat.ac.uk/preparing-for-the-lnat/"},{"title":"Law Practice Questions","url":"https://www.lnat.ac.uk/preparing-for-the-lnat/practice-tests/"}]')
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.admission_tests (code, name, target_universities, description, syllabus, exam_format, duration, max_score, registration_url, exam_dates, sections, prep_resources) VALUES
('BMSAT', 'Biomedical Sciences Admissions Test', '["Oxford","Imperial","UCL"]', 'Subject-specific test for biomedical sciences courses.', 'Biology, Chemistry, Mathematics, and Physics at A-Level standard.', '2 hours, multiple-choice', '60', '60', 'https://www.admissionstesting.org/', '["2025-10"]', '[{"name":"Biology","score":"15"},{"name":"Chemistry","score":"15"},{"name":"Mathematics","score":"15"},{"name":"Physics","score":"15"}]', '[{"title":"BMSAT Specimen","url":"https://www.admissionstesting.org/"}]')
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.admission_tests (code, name, target_universities, description, syllabus, exam_format, duration, max_score, registration_url, exam_dates, sections, prep_resources) VALUES
('UCAT', 'University Clinical Aptitude Test', '["UK Medical Schools","UK Dental Schools"]', 'Aptitude test used by UK medical and dental schools for admissions.', 'Verbal reasoning, decision making, quantitative reasoning, abstract reasoning, situational judgement.', '2 hours', '3600', '3600', 'https://www.ucat.ac.uk/', '["2025-07-07 to 2025-09-26","2026-07 to 2026-09"]', '[{"name":"Verbal Reasoning","score":"900"},{"name":"Decision Making","score":"900"},{"name":"Quantitative Reasoning","score":"900"},{"name":"Abstract Reasoning","score":"900"},{"name":"Situational Judgement","score":"Band 1-4"}]', '[{"title":"UCAT Official","url":"https://www.ucat.ac.uk/ucat/practice-tests/"},{"title":"Medify UCAT","url":"https://www.medify.co.uk/"}]')
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.admission_tests (code, name, target_universities, description, syllabus, exam_format, duration, max_score, registration_url, exam_dates, sections, prep_resources) VALUES
('PAT', 'Physics Aptitude Test', '["Oxford"]', 'Physics admissions test for Oxford engineering and physics courses.', 'Physics and mathematics at A-Level and AS-Level standard.', '2 hours', '100', '100', 'https://www.physics.ox.ac.uk/study/undergraduates/how-apply/physics-aptitude-test-pat', '["2025-10-30"]', '[{"name":"Physics and Mathematics","score":"100"}]', '[{"title":"PAT Past Papers","url":"https://www.physics.ox.ac.uk/study/undergraduates/how-apply/physics-aptitude-test-pat"},{"title":"Isaac Physics","url":"https://isaacphysics.org/"}]')
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.admission_tests (code, name, target_universities, description, syllabus, exam_format, duration, max_score, registration_url, exam_dates, sections, prep_resources) VALUES
('TSA', 'Thinking Skills Assessment', '["Oxford","Cambridge","UCL"]', 'Critical thinking and problem-solving test for social sciences and PPE.', 'Problem solving (numerical and spatial reasoning) and critical thinking (understanding arguments, reasoning).', '2 hours (90 min MCQ + 30 min essay for Oxford)', '100', '100', 'https://www.admissionstesting.org/for-test-takers/thinking-skills-assessment/', '["2025-10-30"]', '[{"name":"Problem Solving","score":"50"},{"name":"Critical Thinking","score":"50"}]', '[{"title":"TSA Practice","url":"https://www.admissionstesting.org/for-test-takers/thinking-skills-assessment/preparation/"}]')
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.admission_tests (code, name, target_universities, description, syllabus, exam_format, duration, max_score, registration_url, exam_dates, sections, prep_resources) VALUES
('HAA', 'History Admissions Assessment', '["Cambridge"]', 'History admissions test for Cambridge history courses.', 'Source analysis, historical argumentation, essay writing.', '2 hours', 'N/A', 'N/A', 'https://www.undergraduate.study.cam.ac.uk/application-process/admissions-assessments', '["2025-10"]', '[{"name":"Source Analysis","score":"N/A"},{"name":"Essay","score":"N/A"}]', '[{"title":"Cambridge Admissions","url":"https://www.undergraduate.study.cam.ac.uk/application-process/admissions-assessments"}]')
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.admission_tests (code, name, target_universities, description, syllabus, exam_format, duration, max_score, registration_url, exam_dates, sections, prep_resources) VALUES
('ELAT', 'English Literature Admissions Test', '["Oxford"]', 'Admissions test for English Literature and joint schools at Oxford.', 'Close reading, comparative analysis of unseen texts.', '90 minutes', '60', '60', 'https://www.ox.ac.uk/admissions/undergraduate/applying-to-oxford/guide/admissions-tests', '["2025-10-30"]', '[{"name":"Close Reading","score":"60"}]', '[{"title":"ELAT Past Papers","url":"https://www.ox.ac.uk/admissions/undergraduate/applying-to-oxford/guide/admissions-tests"}]')
ON CONFLICT (code) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

