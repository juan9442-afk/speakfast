-- Banco de preguntas semilla por categoría de rol. Contenido real (no mock):
-- estas son las preguntas que "Sarah" usa como 1ª de cada entrevista y las que
-- aparecen en la pestaña "Preguntas clave". Idempotente por (role_category, text_en).

create unique index if not exists questions_role_text_uniq
  on public.questions (role_category, text_en);

insert into public.questions (role_category, role_specific, text_en, difficulty, category, is_active) values
-- ── TECH ─────────────────────────────────────────────────────────────────
('tech', '{}', 'Tell me about a challenging project you worked on recently.', 2, 'behavioral', true),
('tech', '{}', 'Walk me through how you debug a production issue.', 3, 'technical', true),
('tech', '{}', 'How do you handle disagreements with a teammate about a technical decision?', 2, 'behavioral', true),
('tech', '{}', 'What is your experience with performance optimization?', 3, 'technical', true),
('tech', '{}', 'Describe a time you had to learn a new technology fast.', 2, 'behavioral', true),
('tech', '{}', 'How do you approach code reviews?', 2, 'behavioral', true),
('tech', '{}', 'Tell me about a mistake you made and what you learned from it.', 2, 'behavioral', true),
('tech', '{}', 'Why do you want to work remotely for a company abroad?', 1, 'hr', true),
('tech', '{}', 'How do you keep your skills up to date?', 1, 'hr', true),
('tech', '{}', 'Where do you see yourself in three years?', 1, 'hr', true),
-- ── MARKETING ────────────────────────────────────────────────────────────
('marketing', '{}', 'Tell me about a campaign you led and its results.', 2, 'behavioral', true),
('marketing', '{}', 'How do you decide which channel to invest in with a limited budget?', 3, 'technical', true),
('marketing', '{}', 'Describe a campaign that underperformed and what you changed.', 2, 'behavioral', true),
('marketing', '{}', 'How do you measure the success of a content strategy?', 2, 'technical', true),
('marketing', '{}', 'Walk me through how you would launch a product in a new market.', 3, 'technical', true),
('marketing', '{}', 'How do you work with a sales team to align on goals?', 2, 'behavioral', true),
('marketing', '{}', 'Tell me about a time you used data to change a decision.', 2, 'behavioral', true),
('marketing', '{}', 'Why do you want to work remotely for a company abroad?', 1, 'hr', true),
('marketing', '{}', 'How do you stay current with marketing trends?', 1, 'hr', true),
('marketing', '{}', 'Where do you see yourself in three years?', 1, 'hr', true),
-- ── VENTAS ───────────────────────────────────────────────────────────────
('ventas', '{}', 'Walk me through how you closed a difficult deal.', 2, 'behavioral', true),
('ventas', '{}', 'How do you handle an objection about price?', 2, 'technical', true),
('ventas', '{}', 'Describe your sales process from first contact to close.', 3, 'technical', true),
('ventas', '{}', 'Tell me about a time you lost a deal and what you learned.', 2, 'behavioral', true),
('ventas', '{}', 'How do you prioritize your pipeline?', 2, 'technical', true),
('ventas', '{}', 'How do you build trust with a prospect quickly?', 2, 'behavioral', true),
('ventas', '{}', 'Tell me about a time you exceeded your quota.', 1, 'behavioral', true),
('ventas', '{}', 'Why do you want to work remotely for a company abroad?', 1, 'hr', true),
('ventas', '{}', 'How do you handle rejection?', 1, 'hr', true),
('ventas', '{}', 'Where do you see yourself in three years?', 1, 'hr', true),
-- ── FINANZAS ─────────────────────────────────────────────────────────────
('finanzas', '{}', 'Walk me through how you build a financial model.', 3, 'technical', true),
('finanzas', '{}', 'Tell me about a time your analysis changed a business decision.', 2, 'behavioral', true),
('finanzas', '{}', 'How do you explain a complex financial result to a non-finance team?', 2, 'behavioral', true),
('finanzas', '{}', 'Describe how you would investigate an unexpected variance in the budget.', 3, 'technical', true),
('finanzas', '{}', 'How do you ensure accuracy when working under a tight deadline?', 2, 'behavioral', true),
('finanzas', '{}', 'Tell me about a process you improved or automated.', 2, 'behavioral', true),
('finanzas', '{}', 'What is your experience with forecasting?', 2, 'technical', true),
('finanzas', '{}', 'Why do you want to work remotely for a company abroad?', 1, 'hr', true),
('finanzas', '{}', 'How do you keep up with changes in regulations or standards?', 1, 'hr', true),
('finanzas', '{}', 'Where do you see yourself in three years?', 1, 'hr', true),
-- ── PRODUCTO / DISEÑO ────────────────────────────────────────────────────
('producto', '{}', 'Tell me about a product or feature you shipped end to end.', 2, 'behavioral', true),
('producto', '{}', 'How do you decide what to build next?', 3, 'technical', true),
('producto', '{}', 'Describe a time you cut scope to hit a deadline.', 2, 'behavioral', true),
('producto', '{}', 'How do you handle a disagreement between engineering and stakeholders?', 2, 'behavioral', true),
('producto', '{}', 'Walk me through how you would improve the onboarding of an app.', 3, 'technical', true),
('producto', '{}', 'How do you measure whether a feature was successful?', 2, 'technical', true),
('producto', '{}', 'Tell me about a decision you got wrong and how you noticed.', 2, 'behavioral', true),
('producto', '{}', 'Why do you want to work remotely for a company abroad?', 1, 'hr', true),
('producto', '{}', 'How do you gather user feedback?', 1, 'hr', true),
('producto', '{}', 'Where do you see yourself in three years?', 1, 'hr', true),
-- ── OTRA ─────────────────────────────────────────────────────────────────
('otra', '{}', 'Tell me about a challenging project you worked on recently.', 2, 'behavioral', true),
('otra', '{}', 'How do you handle a disagreement with a colleague?', 2, 'behavioral', true),
('otra', '{}', 'Describe a time you had to learn something new quickly.', 2, 'behavioral', true),
('otra', '{}', 'Tell me about a mistake you made and what you learned.', 2, 'behavioral', true),
('otra', '{}', 'How do you organize your work when you have competing priorities?', 2, 'behavioral', true),
('otra', '{}', 'Tell me about a time you went beyond what was asked.', 1, 'behavioral', true),
('otra', '{}', 'Why do you want to work remotely for a company abroad?', 1, 'hr', true),
('otra', '{}', 'What motivates you at work?', 1, 'hr', true),
('otra', '{}', 'Where do you see yourself in three years?', 1, 'hr', true)
on conflict (role_category, text_en) do nothing;
