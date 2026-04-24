-- ============================================================
-- Yhea v3.0 Background Resources Data
-- Competitions / Programs / Activities / Certificates
-- ============================================================

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('AMC 10/12', 'competition', 'Math', 'American Mathematics Competitions for high school students. Multiple-choice questions covering algebra, geometry, number theory, combinatorics.', 'High school students', 'November (AMC 10/12 A/B)', 3, 25, 5, '{"academic":5,"leadership":1,"creativity":2,"research":1,"service":0}', '[{"title":"AoPS Volume 1","url":"https://artofproblemsolving.com/store"},{"title":"AMC Past Papers","url":"https://artofproblemsolving.com/wiki/index.php/AMC_Problems_and_Solutions"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('AIME', 'competition', 'Math', 'American Invitational Mathematics Examination. 15 problems, 3 hours, integer answers. Invitation based on AMC scores.', 'AMC 10/12 qualifiers', 'February', 4, 180, 5, '{"academic":5,"leadership":1,"creativity":2,"research":1,"service":0}', '[{"title":"AIME Past Papers","url":"https://artofproblemsolving.com/wiki/index.php/AIME_Problems_and_Solutions"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('USAMO/USAJMO', 'competition', 'Math', 'USA Mathematical Olympiad. 6 proof-based problems over 2 days. Top AMC/AIME qualifiers.', 'AIME qualifiers', 'March', 5, 540, 5, '{"academic":5,"leadership":2,"creativity":3,"research":2,"service":0}', '[{"title":"USAMO Past Papers","url":"https://artofproblemsolving.com/wiki/index.php/USAMO_Problems_and_Solutions"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('IMO', 'competition', 'Math', 'International Mathematical Olympiad. Most prestigious mathematics competition for high school students worldwide.', 'National team selection', 'July', 5, 600, 5, '{"academic":5,"leadership":3,"creativity":3,"research":2,"service":0}', '[{"title":"IMO Official","url":"https://www.imo-official.org/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Physics Olympiad (USAPhO)', 'competition', 'Science', 'USA Physics Olympiad. Advanced physics problems for top high school students.', 'F=ma qualifiers', 'March-April', 4, 300, 5, '{"academic":5,"leadership":2,"creativity":3,"research":2,"service":0}', '[{"title":"USAPhO Resources","url":"https://www.aapt.org/physicsteam/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Chemistry Olympiad (USNCO)', 'competition', 'Science', 'USA National Chemistry Olympiad. Multiple stages from local to national.', 'High school chemistry students', 'March-June', 4, 200, 5, '{"academic":5,"leadership":2,"creativity":2,"research":2,"service":0}', '[{"title":"USNCO","url":"https://www.acs.org/education/olympiad.html"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Biology Olympiad (USABO)', 'competition', 'Science', 'USA Biology Olympiad. Open exam, semifinal, and national final stages.', 'High school biology students', 'February-June', 4, 200, 5, '{"academic":5,"leadership":2,"creativity":2,"research":2,"service":0}', '[{"title":"USABO","url":"https://www.usabo-trc.org/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('IOI', 'competition', 'CS', 'International Olympiad in Informatics. Competitive programming for high school students.', 'National team selection', 'August-September', 5, 400, 5, '{"academic":5,"leadership":2,"creativity":4,"research":2,"service":0}', '[{"title":"USACO Guide","url":"https://usaco.guide/"},{"title":"IOI Official","url":"https://ioinformatics.org/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('USACO', 'competition', 'CS', 'USA Computing Olympiad. Monthly online contests in Bronze, Silver, Gold, Platinum divisions.', 'All students', 'December-March', 4, 120, 5, '{"academic":4,"leadership":2,"creativity":4,"research":2,"service":0}', '[{"title":"USACO Guide","url":"https://usaco.guide/"},{"title":"USACO Official","url":"http://www.usaco.org/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Regeneron ISEF', 'competition', 'Science', 'International Science and Engineering Fair. Largest international pre-college science competition.', 'High school students with research projects', 'May', 5, 400, 5, '{"academic":5,"leadership":3,"creativity":4,"research":5,"service":0}', '[{"title":"ISEF Guidelines","url":"https://www.societyforscience.org/isef/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Regeneron STS', 'competition', 'Science', 'Science Talent Search. Most prestigious US science competition for high school seniors.', 'US high school seniors', 'November-January', 5, 300, 5, '{"academic":5,"leadership":3,"creativity":4,"research":5,"service":0}', '[{"title":"STS Official","url":"https://www.societyforscience.org/regeneron-sts/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Google Science Fair', 'competition', 'Science', 'Global online science competition for students ages 13-18.', 'Ages 13-18', 'May-September', 3, 150, 4, '{"academic":4,"leadership":2,"creativity":4,"research":4,"service":0}', '[{"title":"Google Science Fair","url":"https://www.googlesciencefair.com/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Conrad Challenge', 'competition', 'Entrepreneurship', 'Innovation and entrepreneurship competition for students ages 13-18.', 'Ages 13-18', 'September-April', 3, 200, 4, '{"academic":3,"leadership":4,"creativity":5,"research":3,"service":1}', '[{"title":"Conrad Challenge","url":"https://www.conradchallenge.org/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Diamond Challenge', 'competition', 'Entrepreneurship', 'Global entrepreneurship competition for high school students.', 'High school students', 'September-April', 3, 180, 4, '{"academic":3,"leadership":4,"creativity":5,"research":3,"service":1}', '[{"title":"Diamond Challenge","url":"https://diamondchallenge.org/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('DECA', 'competition', 'Business', 'Student organization preparing emerging leaders in marketing, finance, hospitality, and management.', 'High school/college students', 'November-April', 2, 100, 3, '{"academic":3,"leadership":4,"creativity":3,"research":2,"service":1}', '[{"title":"DECA","url":"https://www.deca.org/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('FBLA', 'competition', 'Business', 'Future Business Leaders of America. Business and career-related competitions.', 'High school students', 'February-June', 2, 100, 3, '{"academic":3,"leadership":4,"creativity":3,"research":2,"service":1}', '[{"title":"FBLA","url":"https://www.fbla.org/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('NHD', 'competition', 'History', 'National History Day. Research project competition on historical topics.', 'Grades 6-12', 'September-June', 2, 150, 3, '{"academic":4,"leadership":2,"creativity":3,"research":4,"service":0}', '[{"title":"NHD","url":"https://www.nhd.org/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('World Scholar''s Cup', 'competition', 'Academic', 'International academic competition covering science, literature, history, art, and more.', 'Middle/High school', 'Year-round', 2, 80, 3, '{"academic":4,"leadership":2,"creativity":3,"research":3,"service":0}', '[{"title":"WSC","url":"https://www.scholars-cup.com/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Harvard-MIT Math Tournament', 'competition', 'Math', 'Prestigious mathematics competition for high school students.', 'High school students', 'February', 4, 120, 5, '{"academic":5,"leadership":2,"creativity":3,"research":2,"service":0}', '[{"title":"HMMT","url":"https://www.hmmt.co/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('ARML', 'competition', 'Math', 'American Regions Math League. Team-based mathematics competition.', 'High school students', 'June', 3, 120, 4, '{"academic":5,"leadership":3,"creativity":2,"research":1,"service":0}', '[{"title":"ARML","url":"https://www.arml.com/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('PUMaC', 'competition', 'Math', 'Princeton University Math Competition. Individual and team rounds.', 'High school students', 'November', 4, 120, 5, '{"academic":5,"leadership":2,"creativity":3,"research":2,"service":0}', '[{"title":"PUMaC","url":"https://pumac.princeton.edu/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('UKMT Senior Challenge', 'competition', 'Math', 'UK Mathematics Trust Senior Mathematical Challenge.', 'UK students under 19', 'October', 3, 90, 4, '{"academic":4,"leadership":1,"creativity":2,"research":1,"service":0}', '[{"title":"UKMT","url":"https://www.ukmt.org.uk/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('BPhO Round 1', 'competition', 'Science', 'British Physics Olympiad Round 1. A-Level standard physics problems.', 'UK students', 'November', 4, 165, 4, '{"academic":5,"leadership":2,"creativity":3,"research":2,"service":0}', '[{"title":"BPhO","url":"https://www.bpho.org.uk/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('BMO Round 1', 'competition', 'Math', 'British Mathematical Olympiad Round 1. Follows UKMT Senior Challenge.', 'UKMT qualifiers', 'November', 4, 210, 5, '{"academic":5,"leadership":2,"creativity":3,"research":2,"service":0}', '[{"title":"BMO","url":"https://www.ukmt.org.uk/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Euclid Contest', 'competition', 'Math', 'University of Waterloo Euclid Mathematics Contest.', 'Grade 12 students', 'April', 3, 150, 4, '{"academic":4,"leadership":1,"creativity":2,"research":1,"service":0}', '[{"title":"CEMC","url":"https://www.cemc.uwaterloo.ca/contests/euclid.html"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('COMC', 'competition', 'Math', 'Canadian Open Mathematics Challenge.', 'All students', 'October', 3, 150, 4, '{"academic":4,"leadership":1,"creativity":2,"research":1,"service":0}', '[{"title":"CMS","url":"https://cms.math.ca/competitions/comc/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Cayley/Fermat/Hypatia', 'competition', 'Math', 'University of Waterloo mathematics contests for grades 9-11.', 'Grades 9-11', 'February', 2, 75, 3, '{"academic":3,"leadership":1,"creativity":2,"research":1,"service":0}', '[{"title":"CEMC","url":"https://www.cemc.uwaterloo.ca/contests/pcf.html"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('MIT RSI', 'program', 'STEM', 'Research Science Institute. 6-week summer research program at MIT for top high school students.', 'High school juniors', 'January application', 5, 1008, 5, '{"academic":5,"leadership":3,"creativity":4,"research":5,"service":0}', '[{"title":"RSI","url":"https://www.cee.org/programs/research-science-institute"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('SSP', 'program', 'STEM', 'Summer Science Program. 39-day immersive research program in astrophysics, biochemistry, or genomics.', 'High school juniors/seniors', 'December-January', 5, 936, 5, '{"academic":5,"leadership":3,"creativity":4,"research":5,"service":0}', '[{"title":"SSP","url":"https://summerscience.org/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('TASP/TASS', 'program', 'Humanities', 'Telluride Association Summer Programs. Free 6-week seminars in humanities for high school juniors.', 'High school juniors', 'January', 5, 1008, 5, '{"academic":5,"leadership":4,"creativity":4,"research":3,"service":2}', '[{"title":"TASP","url":"https://www.tellurideassociation.org/programs/high-school-students/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('YYGS', 'program', 'Academic', 'Yale Young Global Scholars. 2-week academic enrichment program at Yale University.', 'High school students', 'November-January', 3, 336, 4, '{"academic":4,"leadership":3,"creativity":3,"research":2,"service":1}', '[{"title":"YYGS","url":"https://globalscholars.yale.edu/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('LaunchX', 'program', 'Entrepreneurship', 'MIT LaunchX. Summer entrepreneurship program for high school students.', 'High school students', 'December-February', 3, 336, 4, '{"academic":3,"leadership":4,"creativity":5,"research":2,"service":1}', '[{"title":"LaunchX","url":"https://www.launchx.com/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('SIP Stanford', 'program', 'STEM', 'Stanford Institutes of Medicine Summer Research Program. 8-week biomedical research.', 'High school juniors/seniors', 'February', 5, 1344, 5, '{"academic":5,"leadership":3,"creativity":4,"research":5,"service":0}', '[{"title":"SIP","url":"https://sip.stanford.edu/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('JHU CTY', 'program', 'Academic', 'Johns Hopkins Center for Talented Youth. Summer and online programs for gifted students.', 'Grades 2-12', 'Rolling', 2, 168, 3, '{"academic":4,"leadership":1,"creativity":3,"research":1,"service":0}', '[{"title":"CTY","url":"https://cty.jhu.edu/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('PROMYS', 'program', 'Math', 'Program in Mathematics for Young Scientists. 6-week number theory program at Boston University.', 'High school students', 'March', 5, 1008, 5, '{"academic":5,"leadership":2,"creativity":4,"research":3,"service":0}', '[{"title":"PROMYS","url":"https://promys.org/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('ROSS', 'program', 'Math', 'Ross Mathematics Program. 6-week intensive number theory program.', 'High school students', 'March', 5, 1008, 5, '{"academic":5,"leadership":2,"creativity":4,"research":3,"service":0}', '[{"title":"ROSS","url":"https://rossprogram.org/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Canada/USA Mathcamp', 'program', 'Math', '5-week summer program for mathematically talented high school students.', 'Ages 13-18', 'March-April', 4, 840, 5, '{"academic":5,"leadership":2,"creativity":4,"research":3,"service":0}', '[{"title":"Mathcamp","url":"https://www.mathcamp.org/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Girls Who Code SIP', 'program', 'CS', 'Girls Who Code Summer Immersion Program. Free 2-week virtual program.', 'Female students', 'March-April', 2, 80, 4, '{"academic":4,"leadership":3,"creativity":3,"research":1,"service":2}', '[{"title":"GWC","url":"https://girlswhocode.com/programs/summer-immersion-program"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Microsoft High School Internship', 'program', 'Tech', 'Microsoft high school internship program in various locations.', 'High school juniors/seniors', 'Rolling', 4, 480, 4, '{"academic":3,"leadership":3,"creativity":3,"research":2,"service":1}', '[{"title":"Microsoft Careers","url":"https://careers.microsoft.com/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('NASA Internships', 'program', 'STEM', 'NASA internships for high school and college students in various fields.', 'High school juniors+', 'Rolling', 4, 480, 5, '{"academic":5,"leadership":3,"creativity":4,"research":4,"service":0}', '[{"title":"NASA OSSI","url":"https://intern.nasa.gov/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Bank of America Student Leaders', 'program', 'Leadership', '8-week paid summer internship with local nonprofits.', 'High school juniors/seniors', 'January-February', 3, 320, 4, '{"academic":3,"leadership":5,"creativity":2,"research":1,"service":4}', '[{"title":"BofA","url":"https://about.bankofamerica.com/en/making-an-impact/student-leaders"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Leadership Enterprise', 'program', 'Leadership', 'LEAD programs at top business schools for underrepresented students.', 'High school students', 'Winter-Spring', 3, 200, 4, '{"academic":3,"leadership":5,"creativity":3,"research":1,"service":2}', '[{"title":"LEAD","url":"https://www.leadprogram.org/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Carnegie Mellon SAMS', 'program', 'STEM', 'Summer Academy for Math and Science. 6-week program for underrepresented minorities.', 'High school juniors', 'March', 4, 1008, 5, '{"academic":5,"leadership":3,"creativity":3,"research":3,"service":1}', '[{"title":"SAMS","url":"https://www.cmu.edu/admission/special-academic-programs/sams.html"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('UPenn LSM', 'program', 'STEM', 'Penn Summer Prep and Leadership in the Business World programs.', 'High school students', 'Rolling', 3, 336, 4, '{"academic":4,"leadership":3,"creativity":3,"research":2,"service":1}', '[{"title":"Penn Summer","url":"https://summer.sas.upenn.edu/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Stanford Pre-Collegiate', 'program', 'Academic', 'Stanford Pre-Collegiate Studies. Various summer and online programs.', 'Grades 8-11', 'Rolling', 3, 168, 4, '{"academic":4,"leadership":2,"creativity":3,"research":2,"service":0}', '[{"title":"Stanford PCS","url":"https://spcs.stanford.edu/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Brown Pre-College', 'program', 'Academic', 'Brown University Pre-College Programs. 2-7 week summer courses.', 'Ages 15-18', 'Rolling', 2, 168, 4, '{"academic":4,"leadership":2,"creativity":3,"research":2,"service":0}', '[{"title":"Brown","url":"https://precollege.brown.edu/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Columbia SHP', 'program', 'Academic', 'Columbia University Science Honors Program. Saturday morning classes for NYC high schoolers.', 'NYC high school students', 'September', 3, 120, 4, '{"academic":5,"leadership":1,"creativity":3,"research":2,"service":0}', '[{"title":"Columbia SHP","url":"https://www.columbia.edu/content/science-honors-program"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Student Government', 'activity', 'Leadership', 'Lead student body, organize events, represent student interests to administration.', 'Elected by peers', 'Year-round', 2, 200, 3, '{"academic":1,"leadership":5,"creativity":2,"research":0,"service":3}', '[{"title":"NASC","url":"https://nasc.us/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Model UN', 'activity', 'Debate', 'Simulate United Nations proceedings, debate global issues, develop diplomatic skills.', 'Open to all', 'Year-round', 2, 150, 3, '{"academic":4,"leadership":4,"creativity":3,"research":3,"service":1}', '[{"title":"UNA-USA","url":"https://www.unausa.org/model-un"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Debate Club', 'activity', 'Debate', 'Competitive debate in various formats: Lincoln-Douglas, Public Forum, Policy.', 'Open to all', 'Year-round', 2, 120, 3, '{"academic":4,"leadership":3,"creativity":3,"research":3,"service":0}', '[{"title":"NSDA","url":"https://www.speechanddebate.org/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Robotics Team (FRC)', 'activity', 'STEM', 'FIRST Robotics Competition. Design, build, program robots in 6-week build season.', 'Open to all', 'September-April', 3, 300, 4, '{"academic":4,"leadership":4,"creativity":5,"research":2,"service":1}', '[{"title":"FIRST","url":"https://www.firstinspires.org/robotics/frc"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('VEX Robotics', 'activity', 'STEM', 'VEX Robotics Competition. Design and build robots for annual game challenge.', 'Open to all', 'Year-round', 2, 200, 3, '{"academic":3,"leadership":3,"creativity":4,"research":1,"service":0}', '[{"title":"VEX","url":"https://www.vexrobotics.com/competition"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Science Club', 'activity', 'Science', 'Conduct experiments, science fairs, outreach, guest speakers, field trips.', 'Open to all', 'Year-round', 1, 80, 2, '{"academic":4,"leadership":2,"creativity":3,"research":2,"service":1}', '[]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Chess Club', 'activity', 'Game', 'Competitive chess, tournaments, strategy analysis, casual play.', 'Open to all', 'Year-round', 1, 80, 2, '{"academic":3,"leadership":2,"creativity":3,"research":0,"service":0}', '[{"title":"USCF","url":"https://new.uschess.org/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('School Newspaper', 'activity', 'Media', 'Write, edit, and publish school newspaper or magazine. Journalism skills.', 'Open to all', 'Year-round', 2, 150, 3, '{"academic":3,"leadership":3,"creativity":4,"research":3,"service":0}', '[]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Yearbook Staff', 'activity', 'Media', 'Design, photograph, and produce school yearbook. Layout, editing, photography.', 'Open to all', 'Year-round', 2, 150, 2, '{"academic":1,"leadership":2,"creativity":4,"research":0,"service":0}', '[]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Drama Club/Theatre', 'activity', 'Arts', 'Act, direct, design sets, produce plays and musicals.', 'Open to all', 'Year-round', 2, 200, 3, '{"academic":1,"leadership":3,"creativity":5,"research":0,"service":0}', '[]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Choir/Orchestra', 'activity', 'Arts', 'Sing or play in school music ensembles. Performances, competitions.', 'Open to all', 'Year-round', 1, 150, 2, '{"academic":1,"leadership":2,"creativity":4,"research":0,"service":0}', '[]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Sports Teams', 'activity', 'Athletics', 'Competitive school sports: soccer, basketball, tennis, swimming, track, etc.', 'Tryouts', 'Seasonal', 2, 200, 2, '{"academic":0,"leadership":3,"creativity":1,"research":0,"service":0}', '[]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Community Service/Volunteering', 'activity', 'Service', 'Volunteer at local nonprofits, hospitals, shelters, tutoring programs.', 'Open to all', 'Year-round', 1, 100, 2, '{"academic":1,"leadership":2,"creativity":1,"research":0,"service":5}', '[]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Peer Tutoring', 'activity', 'Service', 'Tutor fellow students in academic subjects. Develop teaching and communication skills.', 'Selected students', 'Year-round', 1, 100, 2, '{"academic":4,"leadership":2,"creativity":1,"research":0,"service":4}', '[]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Key Club', 'activity', 'Service', 'Student-led service organization. Community service projects and leadership.', 'Open to all', 'Year-round', 1, 80, 2, '{"academic":1,"leadership":3,"creativity":2,"research":0,"service":5}', '[{"title":"Key Club","url":"https://www.keyclub.org/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Red Cross Club', 'activity', 'Service', 'American Red Cross youth programs. Disaster preparedness, blood drives, first aid.', 'Open to all', 'Year-round', 1, 80, 2, '{"academic":2,"leadership":3,"creativity":1,"research":0,"service":5}', '[{"title":"Red Cross","url":"https://www.redcross.org/volunteer/youth-and-young-adult-volunteers.html"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Habitat for Humanity', 'activity', 'Service', 'Build homes for families in need. Construction, fundraising, advocacy.', 'Open to all', 'Year-round', 2, 120, 3, '{"academic":1,"leadership":3,"creativity":1,"research":0,"service":5}', '[{"title":"Habitat","url":"https://www.habitat.org/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('TED-Ed Club', 'activity', 'Leadership', 'Develop and deliver TED-style talks. Public speaking and idea sharing.', 'Open to all', 'Year-round', 2, 100, 3, '{"academic":2,"leadership":4,"creativity":4,"research":2,"service":1}', '[{"title":"TED-Ed","url":"https://ed.ted.com/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Coding Club', 'activity', 'CS', 'Learn programming, build projects, prepare for competitions, hackathons.', 'Open to all', 'Year-round', 1, 100, 3, '{"academic":4,"leadership":2,"creativity":4,"research":1,"service":0}', '[{"title":"Codecademy","url":"https://www.codecademy.com/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Hackathons', 'activity', 'CS', 'Intensive 24-48 hour coding events. Build projects, learn new technologies.', 'Open to all', 'Year-round', 2, 48, 3, '{"academic":3,"leadership":3,"creativity":5,"research":1,"service":0}', '[{"title":"MLH","url":"https://mlh.io/"}]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Research Assistant', 'activity', 'Research', 'Assist professors or researchers with ongoing projects. Lab work, data analysis.', 'Varies', 'Year-round', 3, 200, 4, '{"academic":5,"leadership":2,"creativity":3,"research":5,"service":0}', '[]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Independent Research Project', 'activity', 'Research', 'Self-directed research project with mentor guidance. Write paper, present findings.', 'Self-directed', 'Year-round', 4, 300, 4, '{"academic":5,"leadership":2,"creativity":4,"research":5,"service":0}', '[]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Internship (General)', 'activity', 'Career', 'Work experience in professional setting. Gain skills, network, explore career.', 'Varies', 'Summer/Year-round', 3, 320, 3, '{"academic":2,"leadership":3,"creativity":2,"research":1,"service":0}', '[]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Startup/Entrepreneurship', 'activity', 'Business', 'Found or join a startup. Product development, marketing, fundraising.', 'Self-directed', 'Year-round', 4, 400, 4, '{"academic":2,"leadership":5,"creativity":5,"research":2,"service":1}', '[]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('YouTube/Content Creation', 'activity', 'Media', 'Create educational or entertainment content. Video production, editing, marketing.', 'Self-directed', 'Year-round', 2, 200, 2, '{"academic":1,"leadership":2,"creativity":5,"research":1,"service":0}', '[]')
ON CONFLICT DO NOTHING;

INSERT INTO public.background_resources (name, category, subcategory, description, eligibility, deadline, difficulty, time_commitment, prestige_score, five_dimensions, study_resources) VALUES
('Open Source Contributions', 'activity', 'CS', 'Contribute to open source software projects. Code reviews, bug fixes, features.', 'Open to all', 'Year-round', 3, 200, 4, '{"academic":4,"leadership":3,"creativity":4,"research":1,"service":2}', '[{"title":"GitHub","url":"https://github.com/explore"}]')
ON CONFLICT DO NOTHING;

