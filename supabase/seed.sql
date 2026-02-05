insert into public.programs
  (title, slug, category, focus, summary, duration, mode, highlights, is_active)
values
  (
    'N5 Evening Cohort',
    'n5-evening-cohort',
    'Language',
    'learn',
    'Beginner-friendly evening classes focused on N5 fundamentals and daily communication.',
    '12 weeks',
    'Hybrid',
    array['Hiragana & Katakana mastery', 'Daily phrases for work and travel', 'Uganda–Japan culture basics'],
    true
  ),
  (
    'N4 Evening Program',
    'n4-evening-program',
    'Language',
    'learn',
    'Build JLPT N4 confidence with structured listening, reading, and kanji practice.',
    '12 weeks',
    'Hybrid',
    array['JLPT-style mock exams', 'Listening and reading focus', 'Kanji foundations'],
    true
  ),
  (
    'N3 Career Track',
    'n3-career-track',
    'Language',
    'learn',
    'Prepare for work and study with N3-level Japanese used in real workplaces.',
    '16 weeks',
    'Hybrid',
    array['Industry vocabulary', 'Business email and etiquette', 'Interview simulations'],
    true
  ),
  (
    'Automotive & Manufacturing Associate',
    'automotive-manufacturing-associate',
    'Jobs',
    'jobs',
    'Pre-departure training for factory roles in Japan with safety and quality focus.',
    '3–6 months',
    'In-person',
    array['Assembly line basics', 'On-site safety training', 'Workplace communication'],
    true
  ),
  (
    'Elderly Care Assistant',
    'elderly-care-assistant',
    'Jobs',
    'jobs',
    'Caregiving track tailored for roles in elder care facilities in Japan.',
    '6–9 months',
    'Hybrid',
    array['Daily care routines', 'Respectful Japanese', 'Workplace etiquette'],
    true
  ),
  (
    'Language School → Vocational College',
    'language-school-to-vocational-college',
    'Study',
    'study',
    'A structured pathway from language school into vocational programs in Japan.',
    '2–3 years',
    'In-person',
    array['Intensive Japanese', 'Progression to vocational colleges', 'Support with part-time work'],
    true
  ),
  (
    'Language School → University',
    'language-school-to-university',
    'Study',
    'study',
    'Plan a full university pathway with EJU preparation and admissions support.',
    '3–5 years',
    'In-person',
    array['EJU preparation', 'Major selection guidance', 'Scholarship planning'],
    true
  );
