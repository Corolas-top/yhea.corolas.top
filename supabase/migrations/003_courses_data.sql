-- ============================================================
-- Yhea v3.0 Courses Data (AP / IB / A-Level)
-- ============================================================

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'CALC_AB', 'Calculus AB', 'AP Calculus AB', 'Differential and integral calculus of single-variable functions, limits, continuity, differentiation, integration.', 'Limits, derivatives, integrals, fundamental theorem of calculus', 8, 'May', '3 hours 15 minutes', 'https://apstudents.collegeboard.org/courses/ap-calculus-ab')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'CALC_BC', 'Calculus BC', 'AP Calculus BC', 'Extension of Calculus AB including parametric, polar, vector functions, series, and advanced integration techniques.', 'Parametric/polar/vector, series, Taylor/Maclaurin, advanced integration', 10, 'May', '3 hours 15 minutes', 'https://apstudents.collegeboard.org/courses/ap-calculus-bc')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'STAT', 'Statistics', 'AP Statistics', 'Collecting, analyzing, and drawing conclusions from data. Probability, sampling distributions, inference.', 'Exploring data, sampling, probability, inference, regression', 9, 'May', '3 hours', 'https://apstudents.collegeboard.org/courses/ap-statistics')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'CSA', 'Computer Science A', 'AP Computer Science A', 'Object-oriented programming in Java, data structures, algorithms, software engineering.', 'Java OOP, arrays, ArrayList, recursion, searching/sorting', 8, 'May', '3 hours', 'https://apstudents.collegeboard.org/courses/ap-computer-science-a')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'CSP', 'Computer Science Principles', 'AP Computer Science Principles', 'Fundamentals of computing, programming, data analysis, internet, global impact.', 'Computational thinking, programming basics, data, internet, impact', 6, 'May', '2 hours', 'https://apstudents.collegeboard.org/courses/ap-computer-science-principles')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'PHYS1', 'Physics 1', 'AP Physics 1', 'Algebra-based mechanics: kinematics, dynamics, energy, momentum, rotation, oscillations.', 'Kinematics, Newton''s laws, energy, momentum, rotation, waves', 8, 'May', '3 hours', 'https://apstudents.collegeboard.org/courses/ap-physics-1')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'PHYS2', 'Physics 2', 'AP Physics 2', 'Algebra-based electricity, magnetism, thermodynamics, fluids, optics, modern physics.', 'Thermodynamics, electrostatics, circuits, magnetism, optics, quantum', 8, 'May', '3 hours', 'https://apstudents.collegeboard.org/courses/ap-physics-2')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'PHYSC', 'Physics C: Mechanics', 'AP Physics C: Mechanics', 'Calculus-based mechanics: kinematics, dynamics, energy, momentum, rotation.', 'Calculus-based kinematics, Newton''s laws, energy, rotation', 7, 'May', '1 hour 30 minutes', 'https://apstudents.collegeboard.org/courses/ap-physics-c-mechanics')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'PHYSE', 'Physics C: E&M', 'AP Physics C: Electricity and Magnetism', 'Calculus-based electricity, magnetism, circuits, and Maxwell''s equations.', 'Electrostatics, conductors, circuits, magnetism, induction', 7, 'May', '1 hour 30 minutes', 'https://apstudents.collegeboard.org/courses/ap-physics-c-electricity-and-magnetism')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'CHEM', 'Chemistry', 'AP Chemistry', 'Atomic structure, bonding, reactions, kinetics, thermodynamics, equilibrium, electrochemistry.', 'Atomic theory, bonding, stoichiometry, kinetics, equilibrium, electrochemistry', 9, 'May', '3 hours 15 minutes', 'https://apstudents.collegeboard.org/courses/ap-chemistry')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'BIO', 'Biology', 'AP Biology', 'Evolution, cellular processes, genetics, ecology, molecular biology, biotechnology.', 'Evolution, cells, genetics, ecology, molecular biology, physiology', 9, 'May', '3 hours', 'https://apstudents.collegeboard.org/courses/ap-biology')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'ES', 'Environmental Science', 'AP Environmental Science', 'Interdisciplinary study of ecosystems, biodiversity, pollution, sustainability, earth systems.', 'Ecosystems, biodiversity, populations, earth systems, pollution, sustainability', 7, 'May', '2 hours 40 minutes', 'https://apstudents.collegeboard.org/courses/ap-environmental-science')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'WH', 'World History: Modern', 'AP World History: Modern', 'Global history from 1200 to present, focusing on networks of exchange, empires, and globalization.', 'Global trade, empires, revolutions, industrialization, globalization', 6, 'May', '3 hours 15 minutes', 'https://apstudents.collegeboard.org/courses/ap-world-history')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'USH', 'US History', 'AP United States History', 'American history from pre-Columbian societies to present, political, social, economic development.', 'Colonial America, revolution, Civil War, industrialization, civil rights, modern era', 9, 'May', '3 hours 15 minutes', 'https://apstudents.collegeboard.org/courses/ap-united-states-history')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'EURO', 'European History', 'AP European History', 'European history from Renaissance to present, political, cultural, economic, social developments.', 'Renaissance, Reformation, absolutism, enlightenment, revolutions, WWI/WWII', 8, 'May', '3 hours 15 minutes', 'https://apstudents.collegeboard.org/courses/ap-european-history')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'GOV', 'US Government', 'AP United States Government and Politics', 'Constitutional foundations, political beliefs, institutions, public policy, civil rights.', 'Constitution, federalism, branches, civil liberties, public policy', 5, 'May', '2 hours 45 minutes', 'https://apstudents.collegeboard.org/courses/ap-us-government-and-politics')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'COMPGOV', 'Comparative Government', 'AP Comparative Government and Politics', 'Comparison of political systems: UK, Russia, China, Iran, Mexico, Nigeria.', 'Political systems, regimes, institutions, policy, change in six countries', 5, 'May', '2 hours 30 minutes', 'https://apstudents.collegeboard.org/courses/ap-comparative-government-and-politics')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'HUG', 'Human Geography', 'AP Human Geography', 'Patterns and processes that shape human understanding and use of Earth.', 'Population, migration, culture, politics, agriculture, urbanization, development', 7, 'May', '2 hours 15 minutes', 'https://apstudents.collegeboard.org/courses/ap-human-geography')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'LANG', 'English Language', 'AP English Language and Composition', 'Rhetoric, argumentation, synthesis, reading and writing nonfiction prose.', 'Rhetoric, argument, synthesis, style, audience, purpose', 6, 'May', '3 hours 15 minutes', 'https://apstudents.collegeboard.org/courses/ap-english-language-and-composition')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'LIT', 'English Literature', 'AP English Literature and Composition', 'Critical reading and analysis of literary works, poetry, prose, drama.', 'Poetry, prose, drama, literary analysis, argumentation, synthesis', 6, 'May', '3 hours', 'https://apstudents.collegeboard.org/courses/ap-english-literature-and-composition')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'PSY', 'Psychology', 'AP Psychology', 'Scientific study of behavior and mental processes: biology, cognition, development, social psychology.', 'Biological bases, sensation, learning, cognition, development, personality, disorders', 9, 'May', '2 hours', 'https://apstudents.collegeboard.org/courses/ap-psychology')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'ECON_MICRO', 'Microeconomics', 'AP Microeconomics', 'Principles of economics applying to individual decision-makers: consumers, firms, markets.', 'Supply/demand, elasticity, market structures, factor markets, market failure', 6, 'May', '2 hours 10 minutes', 'https://apstudents.collegeboard.org/courses/ap-microeconomics')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'ECON_MACRO', 'Macroeconomics', 'AP Macroeconomics', 'Principles of economics applying to the economy as a whole: national income, inflation, growth.', 'GDP, inflation, unemployment, fiscal/monetary policy, international trade', 6, 'May', '2 hours 10 minutes', 'https://apstudents.collegeboard.org/courses/ap-macroeconomics')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'ART2D', 'Art and Design: 2D', 'AP 2D Art and Design', 'Development of 2D artwork addressing design issues: graphic design, photography, collage.', 'Inquiry, practice, revision, 2D design principles, portfolio', 0, 'May', 'Portfolio', 'https://apstudents.collegeboard.org/courses/ap-2d-art-and-design')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'ART3D', 'Art and Design: 3D', 'AP 3D Art and Design', 'Development of 3D artwork addressing sculptural issues.', 'Inquiry, practice, revision, 3D design principles, sculpture', 0, 'May', 'Portfolio', 'https://apstudents.collegeboard.org/courses/ap-3d-art-and-design')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'DRAW', 'Drawing', 'AP Drawing', 'Development of portfolio demonstrating mastery of drawing issues.', 'Inquiry, practice, revision, drawing techniques, portfolio', 0, 'May', 'Portfolio', 'https://apstudents.collegeboard.org/courses/ap-drawing')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'MUSIC', 'Music Theory', 'AP Music Theory', 'Fundamentals of music theory, harmony, ear training, composition, analysis.', 'Pitch, rhythm, harmony, form, ear training, sight-singing, composition', 8, 'May', '2 hours 40 minutes', 'https://apstudents.collegeboard.org/courses/ap-music-theory')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'RESEARCH', 'Research', 'AP Research', 'Academic research project on student-chosen topic, methodology, argument, defense.', 'Research question, methodology, analysis, argument, defense', 0, 'May', 'Presentation', 'https://apstudents.collegeboard.org/courses/ap-research')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'SEMINAR', 'Seminar', 'AP Seminar', 'Team project, individual research, presentation on real-world issues.', 'Investigation, research, collaboration, presentation, reflection', 0, 'May', 'Presentation', 'https://apstudents.collegeboard.org/courses/ap-seminar')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'AFRAM', 'African American Studies', 'AP African American Studies', 'Interdisciplinary study of African American history, culture, literature, politics.', 'Diaspora, resistance, culture, politics, identity, contemporary issues', 6, 'May', '3 hours', 'https://apstudents.collegeboard.org/courses/ap-african-american-studies')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'CHINESE', 'Chinese Language', 'AP Chinese Language and Culture', 'Mandarin Chinese language skills and cultural understanding.', 'Listening, reading, speaking, writing, Chinese culture', 0, 'May', '2 hours 15 minutes', 'https://apstudents.collegeboard.org/courses/ap-chinese-language-and-culture')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'FRENCH', 'French Language', 'AP French Language and Culture', 'French language skills and francophone cultural understanding.', 'Listening, reading, speaking, writing, francophone culture', 0, 'May', '3 hours', 'https://apstudents.collegeboard.org/courses/ap-french-language-and-culture')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'GERMAN', 'German Language', 'AP German Language and Culture', 'German language skills and cultural understanding.', 'Listening, reading, speaking, writing, German culture', 0, 'May', '3 hours', 'https://apstudents.collegeboard.org/courses/ap-german-language-and-culture')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'JAPANESE', 'Japanese Language', 'AP Japanese Language and Culture', 'Japanese language skills and cultural understanding.', 'Listening, reading, speaking, writing, Japanese culture', 0, 'May', '2 hours 15 minutes', 'https://apstudents.collegeboard.org/courses/ap-japanese-language-and-culture')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'LATIN', 'Latin', 'AP Latin', 'Reading and translating Latin literature: Caesar and Vergil.', 'Caesar, Vergil, grammar, syntax, literary analysis, culture', 0, 'May', '3 hours', 'https://apstudents.collegeboard.org/courses/ap-latin')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'SPANISH', 'Spanish Language', 'AP Spanish Language and Culture', 'Spanish language skills and hispanophone cultural understanding.', 'Listening, reading, speaking, writing, hispanophone culture', 0, 'May', '3 hours', 'https://apstudents.collegeboard.org/courses/ap-spanish-language-and-culture')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'SPANLIT', 'Spanish Literature', 'AP Spanish Literature and Culture', 'Reading and analysis of Spanish, Latin American, and US Hispanic literature.', 'Literary analysis, poetry, prose, drama, cultural contexts', 0, 'May', '3 hours', 'https://apstudents.collegeboard.org/courses/ap-spanish-literature-and-culture')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('AP', 'ITALIAN', 'Italian Language', 'AP Italian Language and Culture', 'Italian language skills and cultural understanding.', 'Listening, reading, speaking, writing, Italian culture', 0, 'May', '3 hours', 'https://apstudents.collegeboard.org/courses/ap-italian-language-and-culture')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'ENG_A_LIT', 'English A: Literature', 'IB English A: Literature', 'Study of literary works from different genres, periods, and cultures. Close reading, analysis, and interpretation.', 'Close reading, literary analysis, written commentary, oral commentary, essay', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/language-and-literature/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'ENG_A_LL', 'English A: Lang & Lit', 'IB English A: Language and Literature', 'Study of non-literary and literary texts, exploring how meaning is constructed.', 'Textual analysis, media literacy, essay, oral commentary', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/language-and-literature/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'CHI_A_LIT', 'Chinese A: Literature', 'IB Chinese A: Literature', 'Study of Chinese literary works from different genres, periods, and cultures.', 'Close reading, literary analysis, written commentary, oral commentary', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/language-and-literature/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'CHI_A_LL', 'Chinese A: Lang & Lit', 'IB Chinese A: Language and Literature', 'Study of Chinese non-literary and literary texts.', 'Textual analysis, media literacy, essay, oral commentary', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/language-and-literature/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'ENG_B', 'English B', 'IB English B', 'Development of language skills for non-native speakers: reading, writing, listening, speaking.', 'Communication, media, global issues, social relationships, assessment', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/language-acquisition/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'CHI_B', 'Chinese B', 'IB Chinese B', 'Development of Chinese language skills for non-native speakers.', 'Communication, media, global issues, social relationships', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/language-acquisition/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'FRE_B', 'French B', 'IB French B', 'Development of French language skills for non-native speakers.', 'Communication, media, global issues, social relationships', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/language-acquisition/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'SPA_B', 'Spanish B', 'IB Spanish B', 'Development of Spanish language skills for non-native speakers.', 'Communication, media, global issues, social relationships', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/language-acquisition/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'SPA_AB', 'Spanish ab initio', 'IB Spanish ab initio', 'Beginner Spanish for students with little or no previous experience.', 'Basic communication, everyday situations, cultural awareness', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/language-acquisition/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'FRE_AB', 'French ab initio', 'IB French ab initio', 'Beginner French for students with little or no previous experience.', 'Basic communication, everyday situations, cultural awareness', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/language-acquisition/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'CHI_AB', 'Chinese ab initio', 'IB Chinese ab initio', 'Beginner Chinese for students with little or no previous experience.', 'Basic communication, everyday situations, cultural awareness', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/language-acquisition/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'BM', 'Business Management', 'IB Business Management', 'Business organizations, decision-making, marketing, operations, finance, human resources, strategy.', 'Business tools, marketing, operations, finance, strategy, case studies', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'ECON', 'Economics', 'IB Economics', 'Microeconomics, macroeconomics, international economics, development economics.', 'Supply/demand, market failure, macro indicators, trade, development', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'GEO', 'Geography', 'IB Geography', 'Physical and human geography, global interactions, environmental sustainability.', 'Physical geography, human geography, global interactions, fieldwork', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'HIST', 'History', 'IB History', '20th century world history, regional studies, historiography, source analysis.', 'Causes/effects/consequences, authoritarian states, Cold War, regional', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'PSY', 'Psychology', 'IB Psychology', 'Biological, cognitive, sociocultural approaches to behavior, research methods, options.', 'Biological, cognitive, sociocultural, research methods, options', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'PHIL', 'Philosophy', 'IB Philosophy', 'Core themes, optional themes, prescribed text, exploration of philosophical concepts.', 'Person, mind, identity, knowledge, ethics, political philosophy', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'GP', 'Global Politics', 'IB Global Politics', 'Power, sovereignty, human rights, development, peace and conflict.', 'Power, human rights, development, peace/conflict, case studies', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'ANTHRO', 'Social Anthropology', 'IB Social and Cultural Anthropology', 'Human societies, cultures, social structures, comparison, fieldwork.', 'Social life, kinship, belief, political organization, economic relations', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'ITGS', 'ITGS', 'IB Information Technology in a Global Society', 'Social and ethical implications of IT, application to scenarios, systems life cycle.', 'IT systems, social/ethical issues, scenarios, project', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'DS', 'Digital Society', 'IB Digital Society', 'Exploration of digital technologies and their impact on society, culture, politics.', 'Digital technologies, society, culture, politics, ethics', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/individuals-and-societies/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'BIO', 'Biology', 'IB Biology', 'Cell biology, molecular biology, genetics, ecology, evolution, human physiology.', 'Cells, biochemistry, genetics, ecology, evolution, physiology', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/sciences/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'CHEM', 'Chemistry', 'IB Chemistry', 'Atomic structure, bonding, energetics, kinetics, equilibrium, organic chemistry.', 'Stoichiometry, atomic theory, bonding, thermodynamics, kinetics, organic', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/sciences/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'PHY', 'Physics', 'IB Physics', 'Measurements, mechanics, thermal physics, waves, electricity, magnetism, atomic physics.', 'Measurements, mechanics, waves, electricity, atomic/nuclear, energy', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/sciences/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'CS', 'Computer Science', 'IB Computer Science', 'System fundamentals, computational thinking, programming, abstract data structures, resource management.', 'Systems, algorithms, programming, data structures, resource management', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/sciences/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'DT', 'Design Technology', 'IB Design Technology', 'Human factors, resource management, modeling, innovation, commercial production.', 'Human factors, modeling, innovation, production, sustainability', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/sciences/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'SEHS', 'Sports Science', 'IB Sports, Exercise and Health Science', 'Anatomy, physiology, biomechanics, psychology, nutrition, training.', 'Anatomy, physiology, biomechanics, psychology, nutrition', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/sciences/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'ESS', 'Environmental Systems', 'IB Environmental Systems and Societies', 'Interdisciplinary study of ecosystems, biodiversity, sustainability, human impact.', 'Ecosystems, biodiversity, conservation, pollution, sustainability', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/sciences/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'MATH_AA_HL', 'Math AA HL', 'IB Mathematics: Analysis and Approaches HL', 'Rigorous mathematics: algebra, functions, calculus, vectors, probability, statistics.', 'Algebra, functions, geometry, calculus, vectors, probability, statistics', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/mathematics/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'MATH_AA_SL', 'Math AA SL', 'IB Mathematics: Analysis and Approaches SL', 'Mathematics for students with strong analytical skills, less depth than HL.', 'Algebra, functions, geometry, calculus, vectors, probability, statistics', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/mathematics/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'MATH_AI_HL', 'Math AI HL', 'IB Mathematics: Applications and Interpretation HL', 'Mathematics emphasizing modeling, statistics, technology, real-world applications.', 'Number/algebra, functions, geometry, statistics, calculus, discrete', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/mathematics/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'MATH_AI_SL', 'Math AI SL', 'IB Mathematics: Applications and Interpretation SL', 'Mathematics for practical applications, modeling, and technology.', 'Number/algebra, functions, geometry, statistics, calculus', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/mathematics/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'VIS_ART', 'Visual Arts', 'IB Visual Arts', 'Studio work, investigation, and reflection on art making.', 'Studio, investigation, reflection, comparative study, process portfolio', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/the-arts/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'THEATRE', 'Theatre', 'IB Theatre', 'Theatre theory, practice, creation, world theatre traditions.', 'Theatre theory, performance, creation, world theatre, research', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/the-arts/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'MUSIC', 'Music', 'IB Music', 'Listening, analysis, composition, performance, musical cultures.', 'Listening, analysis, composition, performance, musical cultures', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/the-arts/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'FILM', 'Film', 'IB Film', 'Film analysis, film theory, film production, collaborative project.', 'Film analysis, theory, production, collaborative project', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/the-arts/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'DANCE', 'Dance', 'IB Dance', 'Dance composition, analysis, performance, world dance.', 'Composition, analysis, performance, world dance', 0, 'May/November', 'Internal + External', 'https://www.ibo.org/programmes/diploma-programme/curriculum/the-arts/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'TOK', 'Theory of Knowledge', 'IB Theory of Knowledge', 'Critical thinking about knowledge itself: ways of knowing, areas of knowledge.', 'Ways of knowing, areas of knowledge, knowledge questions, essay, exhibition', 0, 'May/November', 'Essay + Exhibition', 'https://www.ibo.org/programmes/diploma-programme/curriculum/theory-of-knowledge/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'EE', 'Extended Essay', 'IB Extended Essay', 'Independent research essay of 4000 words on a topic of student''s choice.', 'Research question, methodology, argument, reflection, viva voce', 0, 'May/November', '4000-word essay', 'https://www.ibo.org/programmes/diploma-programme/curriculum/extended-essay/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('IB', 'CAS', 'CAS', 'IB Creativity, Activity, Service', 'Experiential learning through creative, physical, and service activities.', 'Creativity, activity, service, reflection, outcomes, portfolio', 0, 'Ongoing', 'Portfolio', 'https://www.ibo.org/programmes/diploma-programme/curriculum/creativity-activity-and-service/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('A-Level', 'MATH', 'Mathematics', 'A-Level Mathematics (9709)', 'Pure mathematics, mechanics, and probability/statistics. Core foundation for STEM.', 'Quadratics, functions, coordinate geometry, circular measure, trigonometry, series, differentiation, integration', 6, 'June/November', 'Paper 1-4', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-mathematics-9709/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('A-Level', 'FURTHER_MATH', 'Further Mathematics', 'A-Level Further Mathematics (9231)', 'Advanced pure mathematics, mechanics, and probability/statistics beyond standard A-Level.', 'Roots of equations, rational functions, summation of series, matrices, polar coordinates, vectors, complex numbers', 6, 'June/November', 'Paper 1-4', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-further-mathematics-9231/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('A-Level', 'PHYS', 'Physics', 'A-Level Physics (9702)', 'Physical quantities, mechanics, waves, electricity, magnetism, modern physics, practical skills.', 'Physical quantities, kinematics, dynamics, waves, electricity, magnetism, nuclear physics, practical', 6, 'June/November', 'Paper 1-5', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-physics-9702/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('A-Level', 'CHEM', 'Chemistry', 'A-Level Chemistry (9701)', 'Atomic structure, bonding, energetics, kinetics, equilibrium, organic chemistry, analytical techniques.', 'Atomic structure, bonding, energetics, kinetics, equilibrium, organic, inorganic, analytical', 6, 'June/November', 'Paper 1-5', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-chemistry-9701/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('A-Level', 'BIO', 'Biology', 'A-Level Biology (9700)', 'Cell biology, biochemistry, genetics, ecology, physiology, evolution, practical skills.', 'Cells, biological molecules, enzymes, genetics, transport, diseases, immunity, ecology', 6, 'June/November', 'Paper 1-5', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-biology-9700/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('A-Level', 'CS', 'Computer Science', 'A-Level Computer Science (9618)', 'Theory fundamentals, fundamental problem-solving, programming, data representation, hardware, software.', 'Information representation, communication, hardware, software, security, ethics, computational thinking, programming', 6, 'June/November', 'Paper 1-4', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-computer-science-9618/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('A-Level', 'DT', 'Design & Technology', 'A-Level Design & Technology (9705)', 'Product design, materials, manufacturing, sustainability, electronics, systems.', 'Design, materials, manufacturing, electronics, systems, sustainability', 0, 'June/November', 'Coursework + Exam', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-design-and-technology-9705/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('A-Level', 'HIST', 'History', 'A-Level History (9389)', 'Modern European history, international history, and depth studies.', 'Modern Europe, international relations, depth studies, source analysis', 0, 'June/November', 'Paper 1-4', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-history-9389/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('A-Level', 'GEO', 'Geography', 'A-Level Geography (9696)', 'Physical and human geography, environmental management, global issues.', 'Physical geography, human geography, environmental management, fieldwork', 0, 'June/November', 'Paper 1-4', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-geography-9696/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('A-Level', 'ENG_LANG', 'English Language', 'A-Level English Language (9093)', 'Language analysis, language change, child language acquisition, text production.', 'Text analysis, language change, acquisition, discourse, writing', 0, 'June/November', 'Paper 1-4', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-english-language-9093/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('A-Level', 'ENG_LIT', 'English Literature', 'A-Level English Literature (9695)', 'Shakespeare, poetry, prose, drama, literary criticism.', 'Shakespeare, poetry, prose, drama, criticism, comparison', 0, 'June/November', 'Paper 1-4', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-english-literature-9695/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('A-Level', 'CHI', 'Chinese', 'A-Level Chinese Language and Literature (9715)', 'Chinese language, literature, and cultural studies.', 'Language, literature, culture, text analysis, writing', 0, 'June/November', 'Paper 1-4', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-chinese-language-and-literature-9715/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('A-Level', 'FRE', 'French', 'A-Level French Language (9716)', 'French language, literature, and cultural studies.', 'Language, literature, culture, text analysis, writing', 0, 'June/November', 'Paper 1-4', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-french-language-and-literature-9716/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('A-Level', 'SPA', 'Spanish', 'A-Level Spanish Language (9717)', 'Spanish language, literature, and cultural studies.', 'Language, literature, culture, text analysis, writing', 0, 'June/November', 'Paper 1-4', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-spanish-language-and-literature-9717/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('A-Level', 'GER', 'German', 'A-Level German Language (9717 variant)', 'German language, literature, and cultural studies.', 'Language, literature, culture, text analysis, writing', 0, 'June/November', 'Paper 1-4', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-german-language-and-literature-9719/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('A-Level', 'ECON', 'Economics', 'A-Level Economics (9708)', 'Microeconomics, macroeconomics, international economics, development economics.', 'Supply/demand, market failure, national income, money, trade, development', 0, 'June/November', 'Paper 1-4', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-economics-9708/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('A-Level', 'BUS', 'Business', 'A-Level Business (9609)', 'Business and environment, human resource management, marketing, operations, finance, strategic management.', 'Business environment, HR, marketing, operations, finance, strategy', 0, 'June/November', 'Paper 1-4', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-business-9609/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('A-Level', 'ACC', 'Accounting', 'A-Level Accounting (9706)', 'Financial accounting, cost and management accounting, financial analysis.', 'Financial statements, manufacturing, cost accounting, management accounting', 0, 'June/November', 'Paper 1-4', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-accounting-9706/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('A-Level', 'SOC', 'Sociology', 'A-Level Sociology (9699)', 'Social structures, processes, and issues: family, education, religion, crime.', 'Socialization, family, education, religion, crime, inequality, theory', 0, 'June/November', 'Paper 1-4', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-sociology-9699/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('A-Level', 'PSY', 'Psychology', 'A-Level Psychology (9990)', 'Cognitive, social, developmental, physiological psychology, abnormality, research methods.', 'Memory, attachment, stress, abnormality, social influence, research methods', 0, 'June/November', 'Paper 1-4', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-psychology-9990/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('A-Level', 'ART', 'Art & Design', 'A-Level Art & Design (9479)', 'Fine art, graphic communication, three-dimensional design, textile design, photography.', 'Fine art, graphic, 3D, textiles, photography, portfolio, coursework', 0, 'June/November', 'Component 1-2', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-art-and-design-9479/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('A-Level', 'MUSIC', 'Music', 'A-Level Music (9483)', 'Listening, performing, composing, music history, theory.', 'Listening, performing, composing, history, theory, analysis', 0, 'June/November', 'Component 1-4', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-music-9483/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('A-Level', 'DRAMA', 'Drama', 'A-Level Drama (9482)', 'Theatre theory, performance, devising, text in performance.', 'Theatre theory, devising, text performance, analysis, evaluation', 0, 'June/November', 'Component 1-3', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-drama-9482/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('A-Level', 'MEDIA', 'Media Studies', 'A-Level Media Studies (9607)', 'Media language, representation, industries, audiences, practical production.', 'Media language, representation, industries, audiences, production', 0, 'June/November', 'Component 1-2', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-media-studies-9607/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('A-Level', 'MARINE', 'Marine Science', 'A-Level Marine Science (9693)', 'Oceanography, marine ecosystems, marine resources, human impact on oceans.', 'Oceanography, ecosystems, resources, conservation, human impact', 0, 'June/November', 'Paper 1-2', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-marine-science-9693/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('A-Level', 'TRAVEL', 'Travel & Tourism', 'A-Level Travel & Tourism (9395)', 'Travel and tourism industry, destinations, marketing, sustainability.', 'Industry, destinations, marketing, sustainability, customer service', 0, 'June/November', 'Paper 1-4', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-travel-and-tourism-9395/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

INSERT INTO public.courses (curriculum, subject_code, subject_name, full_name, description, syllabus, total_units, exam_date, exam_format, official_guide_url) VALUES
('A-Level', 'FOOD', 'Food Studies', 'A-Level Food Studies (9336)', 'Nutrition, food science, food preparation, food safety, consumer education.', 'Nutrition, food science, preparation, safety, consumer education', 0, 'June/November', 'Paper 1-4', 'https://www.cambridgeinternational.org/programmes-and-qualifications/cambridge-international-as-and-a-level-food-studies-9336/')
ON CONFLICT (curriculum, subject_code) DO UPDATE SET
  subject_name = EXCLUDED.subject_name,
  full_name = EXCLUDED.full_name,
  description = EXCLUDED.description,
  syllabus = EXCLUDED.syllabus;

