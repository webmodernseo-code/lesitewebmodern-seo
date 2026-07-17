-- Schéma de base de données pour le Cockpit IA et la Planification de Projets

-- ==========================================
-- 1. Table pour les Contenus IA (Blog + LinkedIn)
-- ==========================================
CREATE TABLE IF NOT EXISTS content_items (
  id SERIAL PRIMARY KEY,
  type TEXT DEFAULT 'blog', -- 'blog' / 'linkedin'
  title TEXT NOT NULL,
  brief TEXT, -- Instructions ou notes pour l'IA
  focus_keyword TEXT, -- Mot-clé principal pour le SEO (blog)
  content TEXT, -- HTML stylé (blog) ou texte brut (LinkedIn)
  hashtags TEXT[], -- Hashtags (LinkedIn)
  status TEXT DEFAULT 'draft', -- 'draft' / 'scheduled' / 'published' / 'failed'
  seo_score INTEGER DEFAULT 0, -- Score SEO (seuil >= 95)
  channel_score INTEGER DEFAULT 0, -- Score d'engagement LinkedIn (seuil >= 90)
  seo_details JSONB, -- Critères détaillés du score (ex: {"keyword_in_title": true, ...})
  featured_image TEXT, -- URL de l'image (locale ou WordPress)
  image_source TEXT, -- 'generated' / 'uploaded'
  meta_description TEXT,
  scheduled_at TIMESTAMP WITH TIME ZONE,
  published_at TIMESTAMP WITH TIME ZONE,
  wp_post_id INTEGER, -- ID de l'article sur WordPress
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_scheduled ON content_items (status, scheduled_at);
CREATE INDEX IF NOT EXISTS idx_type ON content_items (type);

-- ==========================================
-- 2. Table pour la Planification de Projets (Manuel)
-- ==========================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  client TEXT,
  deadline DATE,
  status TEXT DEFAULT 'in_progress', -- 'in_progress' / 'completed' / 'archived' / 'on_hold'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- ==========================================
-- 3. Table pour les Étapes (Phases) de Projets
-- ==========================================
CREATE TABLE IF NOT EXISTS project_phases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  position INTEGER NOT NULL, -- Ordre d'affichage
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_phases_project ON project_phases (project_id);

-- ==========================================
-- 4. Table pour les Tâches de chaque Étape
-- ==========================================
CREATE TABLE IF NOT EXISTS project_tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phase_id UUID REFERENCES project_phases(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium', -- 'low' / 'medium' / 'high'
  is_completed BOOLEAN DEFAULT false,
  deadline DATE,
  position INTEGER NOT NULL, -- Ordre d'affichage dans la phase
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tasks_phase ON project_tasks (phase_id);

-- ==========================================
-- 5. Table pour les Leads (Formulaire de contact)
-- ==========================================
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT,
  status TEXT DEFAULT 'new', -- 'new' / 'contacted' / 'closed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
