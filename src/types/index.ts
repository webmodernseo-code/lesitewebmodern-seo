// Définition des types pour le Cockpit IA & la Planification de Projets

// ==========================================
// 1. Types pour le Cockpit IA
// ==========================================

export type ContentType = 'blog' | 'linkedin';

export type ContentStatus = 'draft' | 'scheduled' | 'published' | 'failed';

export interface SEOCriteriaDetails {
  keywordInTitle: boolean;
  titleLength: boolean;
  metaLength: boolean;
  keywordInFirstParagraph: boolean;
  densityOk: boolean;
  h2Count: boolean;
  wordCount: boolean;
  slugOk: boolean;
  imageAlt: boolean;
  internalLinks: boolean;
  externalLinks: boolean;
  readability: boolean;
}

export interface ContentItem {
  id: number;
  type: ContentType;
  title: string;
  slug?: string;
  brief?: string;
  focus_keyword?: string;
  content?: string;
  hashtags?: string[];
  status: ContentStatus;
  seo_score: number;
  channel_score: number;
  seo_details?: SEOCriteriaDetails;
  featured_image?: string;
  image_source?: 'generated' | 'uploaded';
  meta_description?: string;
  scheduled_at?: string; // ISO date string
  published_at?: string; // ISO date string
  wp_post_id?: number;
  created_at: string;
  updated_at: string;
}

// ==========================================
// 2. Types pour la Planification de Projets (Manuel)
// ==========================================

export type ProjectStatus = 'in_progress' | 'completed' | 'archived' | 'on_hold';

export type TaskPriority = 'low' | 'medium' | 'high';

export interface Project {
  id: string; // UUID
  name: string;
  client?: string;
  deadline?: string; // YYYY-MM-DD
  status: ProjectStatus;
  created_at: string;
  updated_at: string;
  phases?: ProjectPhase[];
}

export interface ProjectPhase {
  id: string; // UUID
  project_id: string;
  name: string;
  position: number;
  created_at: string;
  tasks?: ProjectTask[];
}

export interface ProjectTask {
  id: string; // UUID
  phase_id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  is_completed: boolean;
  deadline?: string; // YYYY-MM-DD
  position: number;
  created_at: string;
  updated_at: string;
}
