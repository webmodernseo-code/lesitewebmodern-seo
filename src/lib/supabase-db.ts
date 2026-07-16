import { supabase, isSupabaseConfigured } from './supabase';
import { sql, isNeonConfigured } from './neon';
import { 
  ContentItem, 
  Project, 
  ProjectPhase, 
  ProjectTask, 
  ContentType, 
  ContentStatus,
  ProjectStatus,
  TaskPriority
} from '@/types';

// Interface pour les Leads
export interface Lead {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
  status?: 'new' | 'contacted' | 'closed';
  created_at?: string;
}

// ==========================================
// SEED DATA POUR LE FALLBACK LOCALSTORAGE
// ==========================================

const INITIAL_CONTENT_ITEMS: ContentItem[] = [
  {
    id: 1,
    type: 'blog',
    title: 'Comment optimiser votre SEO local en 2026',
    brief: 'Rédiger un article complet sur le SEO local, les fiches Google Business Profile et le netlinking de proximité.',
    focus_keyword: 'SEO local 2026',
    content: `
      <h2 style="color:#000000; border-bottom:2px solid #ff4d00; padding-bottom:8px; margin-top:24px; font-weight:700;">1. L'importance cruciale de la recherche locale</h2>
      <p style="margin:16px 0; line-height:1.7;">La recherche locale est devenue le canal d'acquisition prioritaire pour les commerces physiques et prestataires de services régionaux. Plus de 46% de toutes les recherches Google ont une intention locale.</p>
      
      <div style="background:#F5E6D3; border-left:4px solid #ff4d00; padding:20px; border-radius:8px; margin:24px 0; color:#000000;">
        <strong>À retenir :</strong> Optimiser sa visibilité de proximité n'est plus une option, c'est le pilier de votre croissance physique et digitale combinées.
      </div>
      
      <h2 style="color:#000000; border-bottom:2px solid #ff4d00; padding-bottom:8px; margin-top:24px; font-weight:700;">2. Google Business Profile : Le pivot de votre SEO local</h2>
      <p style="margin:16px 0; line-height:1.7;">Votre fiche GBP est votre nouvelle page d'accueil de proximité. Pour la sur-optimiser, vous devez remplir chaque section avec soin et récolter des avis de façon hebdomadaire.</p>
      
      <blockquote style="border-left:4px solid #ff4d00; padding-left:16px; color:#000000; font-style:italic; margin:24px 0;">
        "Les entreprises qui répondent régulièrement aux avis génèrent en moyenne 15% de clics en plus vers leur site web."
      </blockquote>
      
      <a href="https://webmodernseo.local/contact" style="display:inline-block; background:#ff4d00; color:#FFFFFF; padding:14px 28px; border-radius:8px; font-weight:600; text-decoration:none; margin:16px 0;">Prendre rendez-vous avec un expert</a>
    `,
    status: 'published',
    seo_score: 98,
    channel_score: 0,
    seo_details: {
      keywordInTitle: true,
      titleLength: true,
      metaLength: true,
      keywordInFirstParagraph: true,
      densityOk: true,
      h2Count: true,
      wordCount: true,
      slugOk: true,
      imageAlt: true,
      internalLinks: true,
      externalLinks: true,
      readability: true
    },
    featured_image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
    image_source: 'uploaded',
    meta_description: 'Découvrez nos conseils d\'experts et notre guide complet pour optimiser votre SEO local et sur-optimiser votre fiche Google Business Profile.',
    published_at: '2026-07-01T10:00:00Z',
    wp_post_id: 101,
    created_at: '2026-07-01T09:00:00Z',
    updated_at: '2026-07-01T10:00:00Z'
  },
  {
    id: 2,
    type: 'linkedin',
    title: '5 stratégies LinkedIn pour doubler votre taux d\'engagement',
    brief: 'Créer un post accrocheur présentant des conseils concrets de copywriting pour LinkedIn.',
    content: `Le reach organique de LinkedIn baisse, mais l'engagement qualitatif explose. 📈

Voici 5 leviers immédiats pour capter l'attention de votre cible :

1. Le hook de 3 lignes : Votre première phrase doit piquer la curiosité. Ne dites pas "Nous avons fait ceci", dites "Pourquoi 90% des entreprises échouent sur...".
2. Sautez des lignes : L'aération est la clé de la lecture sur mobile.
3. Donnez de la valeur brute : Pas de jargon, pas de blabla. Des chiffres et des actions.
4. Aucun lien externe dans le post : Insérez le lien dans le premier commentaire pour ne pas pénaliser votre reach.
5. Terminez par une question ouverte pour susciter les commentaires.

Lequel de ces conseils allez-vous tester sur votre prochain post ? 👇`,
    hashtags: ['copywriting', 'linkedin', 'marketingdigital'],
    status: 'published',
    seo_score: 0,
    channel_score: 92,
    published_at: '2026-07-02T08:30:00Z',
    created_at: '2026-07-02T08:00:00Z',
    updated_at: '2026-07-02T08:30:00Z'
  }
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Refonte Site Vitrine - Cabinet Dentaire Dr. Laurent',
    client: 'Dr. Jean-Marc Laurent',
    deadline: '2026-08-30',
    status: 'in_progress',
    created_at: '2026-07-10T10:00:00Z',
    updated_at: '2026-07-10T10:00:00Z'
  }
];

const INITIAL_PHASES: ProjectPhase[] = [
  {
    id: 'ph1',
    project_id: 'p1',
    name: 'Phase 1 : Stratégie & Wireframes',
    position: 0,
    created_at: '2026-07-10T10:05:00Z'
  },
  {
    id: 'ph2',
    project_id: 'p1',
    name: 'Phase 2 : Design & Charte graphique',
    position: 1,
    created_at: '2026-07-10T10:06:00Z'
  },
  {
    id: 'ph3',
    project_id: 'p1',
    name: 'Phase 3 : Intégration WordPress & SEO',
    position: 2,
    created_at: '2026-07-10T10:07:00Z'
  }
];

const INITIAL_TASKS: ProjectTask[] = [
  {
    id: 't1',
    phase_id: 'ph1',
    title: 'Audit SEO concurrentiel',
    description: 'Analyser les mots-clés des 3 principaux cabinets dentaires de la région.',
    priority: 'high',
    is_completed: true,
    deadline: '2026-07-15',
    position: 0,
    created_at: '2026-07-10T10:10:00Z',
    updated_at: '2026-07-15T15:00:00Z'
  },
  {
    id: 't2',
    phase_id: 'ph1',
    title: 'Validation de l\'arborescence du site',
    description: 'Faire valider les pages principales (Accueil, Tarifs, Équipe, Contact) par le client.',
    priority: 'medium',
    is_completed: true,
    deadline: '2026-07-18',
    position: 1,
    created_at: '2026-07-10T10:11:00Z',
    updated_at: '2026-07-16T12:00:00Z'
  },
  {
    id: 't3',
    phase_id: 'ph2',
    title: 'Maquettes UI Mobile-first',
    description: 'Conception des maquettes de la page d\'accueil et de réservation sous Figma.',
    priority: 'high',
    is_completed: false,
    deadline: '2026-07-28',
    position: 0,
    created_at: '2026-07-10T10:12:00Z',
    updated_at: '2026-07-10T10:12:00Z'
  },
  {
    id: 't4',
    phase_id: 'ph3',
    title: 'Développement du thème sur-mesure',
    description: 'Intégration Gutenberg de la structure sémantique.',
    priority: 'high',
    is_completed: false,
    deadline: '2026-08-15',
    position: 0,
    created_at: '2026-07-10T10:13:00Z',
    updated_at: '2026-07-10T10:13:00Z'
  }
];

const storage = typeof window !== 'undefined' ? window.localStorage : {
  getItem: (key: string) => {
    if (key === 'wm_content_items') return JSON.stringify(INITIAL_CONTENT_ITEMS);
    if (key === 'wm_projects') return JSON.stringify(INITIAL_PROJECTS);
    if (key === 'wm_phases') return JSON.stringify(INITIAL_PHASES);
    if (key === 'wm_tasks') return JSON.stringify(INITIAL_TASKS);
    return null;
  },
  setItem: () => {},
  removeItem: () => {},
  clear: () => {}
};

const initLocalStorage = () => {
  if (typeof window === 'undefined') return;
  if (!storage.getItem('wm_content_items')) {
    storage.setItem('wm_content_items', JSON.stringify(INITIAL_CONTENT_ITEMS));
  }
  if (!storage.getItem('wm_projects')) {
    storage.setItem('wm_projects', JSON.stringify(INITIAL_PROJECTS));
  }
  if (!storage.getItem('wm_phases')) {
    storage.setItem('wm_phases', JSON.stringify(INITIAL_PHASES));
  }
  if (!storage.getItem('wm_tasks')) {
    storage.setItem('wm_tasks', JSON.stringify(INITIAL_TASKS));
  }
  if (!storage.getItem('wm_leads')) {
    storage.setItem('wm_leads', JSON.stringify([]));
  }
};

// ==========================================
// DB SERVICE WRAPPER (NEON POSTGRESQL / LOCALSTORAGE FALLBACK)
// ==========================================

export const dbService = {
  // SERVICES DE CONTENUS IA
  async getContentItems(): Promise<ContentItem[]> {
    if (isNeonConfigured) {
      try {
        const data = await sql`SELECT * FROM content_items ORDER BY created_at DESC`;
        return data as ContentItem[];
      } catch (err) {
        console.error("Neon query error:", err);
        return [];
      }
    } else {
      initLocalStorage();
      const items = JSON.parse(storage.getItem('wm_content_items') || '[]');
      return items.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  },

  async getContentItemById(id: number): Promise<ContentItem | null> {
    if (isNeonConfigured) {
      try {
        const data = await sql`SELECT * FROM content_items WHERE id = ${id}`;
        return (data[0] as ContentItem) || null;
      } catch (err) {
        console.error("Neon query error:", err);
        return null;
      }
    } else {
      initLocalStorage();
      const items = JSON.parse(storage.getItem('wm_content_items') || '[]');
      return items.find((i: ContentItem) => i.id === id) || null;
    }
  },

  async createContentItem(item: Partial<ContentItem>): Promise<ContentItem> {
    if (isNeonConfigured) {
      try {
        const rows = await sql`
          INSERT INTO content_items (
            type, title, brief, focus_keyword, content, hashtags, status, seo_score, 
            channel_score, seo_details, featured_image, image_source, meta_description, 
            scheduled_at, published_at, wp_post_id
          ) VALUES (
            ${item.type || 'blog'}, ${item.title || ''}, ${item.brief || ''}, ${item.focus_keyword || ''}, 
            ${item.content || ''}, ${item.hashtags || []}, ${item.status || 'draft'}, 
            ${item.seo_score || 0}, ${item.channel_score || 0}, ${JSON.stringify(item.seo_details || {})}, 
            ${item.featured_image || ''}, ${item.image_source || 'generated'}, ${item.meta_description || ''}, 
            ${item.scheduled_at || null}, ${item.published_at || null}, ${item.wp_post_id || null}
          ) RETURNING *;
        `;
        return rows[0] as ContentItem;
      } catch (err) {
        console.error("Neon query error:", err);
        throw err;
      }
    } else {
      initLocalStorage();
      const items = JSON.parse(storage.getItem('wm_content_items') || '[]');
      const newItem: ContentItem = {
        id: items.length > 0 ? Math.max(...items.map((i: any) => i.id)) + 1 : 1,
        type: item.type || 'blog',
        title: item.title || '',
        brief: item.brief || '',
        focus_keyword: item.focus_keyword || '',
        content: item.content || '',
        hashtags: item.hashtags || [],
        status: item.status || 'draft',
        seo_score: item.seo_score || 0,
        channel_score: item.channel_score || 0,
        seo_details: item.seo_details || {
          keywordInTitle: false,
          titleLength: false,
          metaLength: false,
          keywordInFirstParagraph: false,
          densityOk: false,
          h2Count: false,
          wordCount: false,
          slugOk: false,
          imageAlt: false,
          internalLinks: false,
          externalLinks: false,
          readability: false
        },
        featured_image: item.featured_image || '',
        image_source: item.image_source || 'generated',
        meta_description: item.meta_description || '',
        scheduled_at: item.scheduled_at,
        published_at: item.published_at,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      items.push(newItem);
      storage.setItem('wm_content_items', JSON.stringify(items));
      return newItem;
    }
  },

  async updateContentItem(id: number, item: Partial<ContentItem>): Promise<ContentItem> {
    if (isNeonConfigured) {
      try {
        const existing = await this.getContentItemById(id);
        if (!existing) throw new Error('Item not found');
        const updated = { ...existing, ...item };
        const rows = await sql`
          UPDATE content_items SET
            type = ${updated.type},
            title = ${updated.title},
            brief = ${updated.brief},
            focus_keyword = ${updated.focus_keyword},
            content = ${updated.content},
            hashtags = ${updated.hashtags},
            status = ${updated.status},
            seo_score = ${updated.seo_score},
            channel_score = ${updated.channel_score},
            seo_details = ${JSON.stringify(updated.seo_details)},
            featured_image = ${updated.featured_image},
            image_source = ${updated.image_source},
            meta_description = ${updated.meta_description},
            scheduled_at = ${updated.scheduled_at || null},
            published_at = ${updated.published_at || null},
            wp_post_id = ${updated.wp_post_id || null},
            updated_at = now()
          WHERE id = ${id}
          RETURNING *;
        `;
        return rows[0] as ContentItem;
      } catch (err) {
        console.error("Neon query error:", err);
        throw err;
      }
    } else {
      initLocalStorage();
      const items = JSON.parse(storage.getItem('wm_content_items') || '[]');
      const index = items.findIndex((i: ContentItem) => i.id === id);
      if (index === -1) throw new Error('Content item not found');
      
      const updated = {
        ...items[index],
        ...item,
        updated_at: new Date().toISOString()
      };
      items[index] = updated;
      storage.setItem('wm_content_items', JSON.stringify(items));
      return updated;
    }
  },

  async deleteContentItem(id: number): Promise<void> {
    if (isNeonConfigured) {
      try {
        await sql`DELETE FROM content_items WHERE id = ${id}`;
      } catch (err) {
        console.error("Neon query error:", err);
        throw err;
      }
    } else {
      initLocalStorage();
      const items = JSON.parse(storage.getItem('wm_content_items') || '[]');
      const filtered = items.filter((i: ContentItem) => i.id !== id);
      storage.setItem('wm_content_items', JSON.stringify(filtered));
    }
  },

  // SERVICES DE PLANIFICATION PROJETS
  async getProjects(): Promise<Project[]> {
    if (isNeonConfigured) {
      try {
        const data = await sql`SELECT * FROM projects ORDER BY created_at DESC`;
        return data as Project[];
      } catch (err) {
        console.error("Neon query error:", err);
        return [];
      }
    } else {
      initLocalStorage();
      return JSON.parse(storage.getItem('wm_projects') || '[]');
    }
  },

  async getProjectById(id: string): Promise<Project | null> {
    if (isNeonConfigured) {
      try {
        const rows = await sql`SELECT * FROM projects WHERE id = ${id}`;
        const project = rows[0] as Project;
        if (!project) return null;

        const phases = await sql`SELECT * FROM project_phases WHERE project_id = ${id} ORDER BY position ASC`;
        const projectPhases = await Promise.all(phases.map(async (ph: any) => {
          const tasks = await sql`SELECT * FROM project_tasks WHERE phase_id = ${ph.id} ORDER BY position ASC`;
          return { ...ph, tasks };
        }));

        return { ...project, phases: projectPhases };
      } catch (err) {
        console.error("Neon query error:", err);
        return null;
      }
    } else {
      initLocalStorage();
      const projects = JSON.parse(storage.getItem('wm_projects') || '[]');
      const project = projects.find((p: Project) => p.id === id) || null;
      if (!project) return null;

      const phases = JSON.parse(storage.getItem('wm_phases') || '[]');
      const tasks = JSON.parse(storage.getItem('wm_tasks') || '[]');

      const projectPhases = phases
        .filter((ph: ProjectPhase) => ph.project_id === id)
        .sort((a: any, b: any) => a.position - b.position)
        .map((ph: ProjectPhase) => {
          const phaseTasks = tasks
            .filter((t: ProjectTask) => t.phase_id === ph.id)
            .sort((a: any, b: any) => a.position - b.position);
          return { ...ph, tasks: phaseTasks };
        });

      return { ...project, phases: projectPhases };
    }
  },

  async createProject(project: Partial<Project>): Promise<Project> {
    if (isNeonConfigured) {
      try {
        const rows = await sql`
          INSERT INTO projects (name, client, deadline, status)
          VALUES (${project.name || ''}, ${project.client || ''}, ${project.deadline || null}, ${project.status || 'in_progress'})
          RETURNING *;
        `;
        return rows[0] as Project;
      } catch (err) {
        console.error("Neon query error:", err);
        throw err;
      }
    } else {
      initLocalStorage();
      const projects = JSON.parse(storage.getItem('wm_projects') || '[]');
      const newProj: Project = {
        id: 'p_' + Math.random().toString(36).substr(2, 9),
        name: project.name || '',
        client: project.client || '',
        deadline: project.deadline,
        status: project.status || 'in_progress',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      projects.push(newProj);
      storage.setItem('wm_projects', JSON.stringify(projects));
      return newProj;
    }
  },

  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    if (isNeonConfigured) {
      try {
        const existing = await sql`SELECT * FROM projects WHERE id = ${id}`;
        if (existing.length === 0) throw new Error('Project not found');
        const updated = { ...existing[0], ...project };
        const rows = await sql`
          UPDATE projects SET
            name = ${updated.name},
            client = ${updated.client},
            deadline = ${updated.deadline || null},
            status = ${updated.status},
            updated_at = now()
          WHERE id = ${id}
          RETURNING *;
        `;
        return rows[0] as Project;
      } catch (err) {
        console.error("Neon query error:", err);
        throw err;
      }
    } else {
      initLocalStorage();
      const projects = JSON.parse(storage.getItem('wm_projects') || '[]');
      const index = projects.findIndex((p: Project) => p.id === id);
      if (index === -1) throw new Error('Project not found');

      const updated = {
        ...projects[index],
        ...project,
        updated_at: new Date().toISOString()
      };
      projects[index] = updated;
      storage.setItem('wm_projects', JSON.stringify(projects));
      return updated;
    }
  },

  async deleteProject(id: string): Promise<void> {
    if (isNeonConfigured) {
      try {
        await sql`DELETE FROM projects WHERE id = ${id}`;
      } catch (err) {
        console.error("Neon query error:", err);
        throw err;
      }
    } else {
      initLocalStorage();
      const projects = JSON.parse(storage.getItem('wm_projects') || '[]');
      const filteredProjs = projects.filter((p: Project) => p.id !== id);
      storage.setItem('wm_projects', JSON.stringify(filteredProjs));

      // Cascade delete phases and tasks locally
      const phases = JSON.parse(storage.getItem('wm_phases') || '[]');
      const pIds = phases.filter((ph: ProjectPhase) => ph.project_id === id).map((ph: any) => ph.id);
      
      const filteredPhases = phases.filter((ph: ProjectPhase) => ph.project_id !== id);
      storage.setItem('wm_phases', JSON.stringify(filteredPhases));

      const tasks = JSON.parse(storage.getItem('wm_tasks') || '[]');
      const filteredTasks = tasks.filter((t: ProjectTask) => !pIds.includes(t.phase_id));
      storage.setItem('wm_tasks', JSON.stringify(filteredTasks));
    }
  },

  // SERVICES DE PHASES (project_phases)
  async getProjectPhases(projectId: string): Promise<ProjectPhase[]> {
    if (isNeonConfigured) {
      try {
        const data = await sql`SELECT * FROM project_phases WHERE project_id = ${projectId} ORDER BY position ASC`;
        return data as ProjectPhase[];
      } catch (err) {
        console.error("Neon query error:", err);
        return [];
      }
    } else {
      initLocalStorage();
      const phases = JSON.parse(storage.getItem('wm_phases') || '[]');
      return phases
        .filter((ph: ProjectPhase) => ph.project_id === projectId)
        .sort((a: any, b: any) => a.position - b.position);
    }
  },

  async createProjectPhase(phase: Partial<ProjectPhase>): Promise<ProjectPhase> {
    if (isNeonConfigured) {
      try {
        const projectPhases = await this.getProjectPhases(phase.project_id || '');
        const rows = await sql`
          INSERT INTO project_phases (project_id, name, position)
          VALUES (${phase.project_id}, ${phase.name || ''}, ${phase.position !== undefined ? phase.position : projectPhases.length})
          RETURNING *;
        `;
        return rows[0] as ProjectPhase;
      } catch (err) {
        console.error("Neon query error:", err);
        throw err;
      }
    } else {
      initLocalStorage();
      const phases = JSON.parse(storage.getItem('wm_phases') || '[]');
      const projectPhases = phases.filter((p: any) => p.project_id === phase.project_id);
      
      const newPhase: ProjectPhase = {
        id: 'ph_' + Math.random().toString(36).substr(2, 9),
        project_id: phase.project_id || '',
        name: phase.name || '',
        position: phase.position !== undefined ? phase.position : projectPhases.length,
        created_at: new Date().toISOString()
      };
      phases.push(newPhase);
      storage.setItem('wm_phases', JSON.stringify(phases));
      return newPhase;
    }
  },

  async updateProjectPhase(id: string, phase: Partial<ProjectPhase>): Promise<ProjectPhase> {
    if (isNeonConfigured) {
      try {
        const existing = await sql`SELECT * FROM project_phases WHERE id = ${id}`;
        if (existing.length === 0) throw new Error('Phase not found');
        const updated = { ...existing[0], ...phase };
        const rows = await sql`
          UPDATE project_phases SET
            name = ${updated.name},
            position = ${updated.position}
          WHERE id = ${id}
          RETURNING *;
        `;
        return rows[0] as ProjectPhase;
      } catch (err) {
        console.error("Neon query error:", err);
        throw err;
      }
    } else {
      initLocalStorage();
      const phases = JSON.parse(storage.getItem('wm_phases') || '[]');
      const index = phases.findIndex((ph: ProjectPhase) => ph.id === id);
      if (index === -1) throw new Error('Phase not found');

      const updated = { ...phases[index], ...phase };
      phases[index] = updated;
      storage.setItem('wm_phases', JSON.stringify(phases));
      return updated;
    }
  },

  async deleteProjectPhase(id: string): Promise<void> {
    if (isNeonConfigured) {
      try {
        await sql`DELETE FROM project_phases WHERE id = ${id}`;
      } catch (err) {
        console.error("Neon query error:", err);
        throw err;
      }
    } else {
      initLocalStorage();
      const phases = JSON.parse(storage.getItem('wm_phases') || '[]');
      const filtered = phases.filter((ph: ProjectPhase) => ph.id !== id);
      storage.setItem('wm_phases', JSON.stringify(filtered));

      // Cascade delete tasks locally
      const tasks = JSON.parse(storage.getItem('wm_tasks') || '[]');
      const filteredTasks = tasks.filter((t: ProjectTask) => t.phase_id !== id);
      storage.setItem('wm_tasks', JSON.stringify(filteredTasks));
    }
  },

  // SERVICES DE TÂCHES (project_tasks)
  async getPhaseTasks(phaseId: string): Promise<ProjectTask[]> {
    if (isNeonConfigured) {
      try {
        const data = await sql`SELECT * FROM project_tasks WHERE phase_id = ${phaseId} ORDER BY position ASC`;
        return data as ProjectTask[];
      } catch (err) {
        console.error("Neon query error:", err);
        return [];
      }
    } else {
      initLocalStorage();
      const tasks = JSON.parse(storage.getItem('wm_tasks') || '[]');
      return tasks
        .filter((t: ProjectTask) => t.phase_id === phaseId)
        .sort((a: any, b: any) => a.position - b.position);
    }
  },

  async createProjectTask(task: Partial<ProjectTask>): Promise<ProjectTask> {
    if (isNeonConfigured) {
      try {
        const phaseTasks = await this.getPhaseTasks(task.phase_id || '');
        const rows = await sql`
          INSERT INTO project_tasks (phase_id, title, description, priority, is_completed, deadline, position)
          VALUES (
            ${task.phase_id}, ${task.title || ''}, ${task.description || ''}, 
            ${task.priority || 'medium'}, ${task.is_completed || false}, 
            ${task.deadline || null}, ${task.position !== undefined ? task.position : phaseTasks.length}
          ) RETURNING *;
        `;
        return rows[0] as ProjectTask;
      } catch (err) {
        console.error("Neon query error:", err);
        throw err;
      }
    } else {
      initLocalStorage();
      const tasks = JSON.parse(storage.getItem('wm_tasks') || '[]');
      const phaseTasks = tasks.filter((t: any) => t.phase_id === task.phase_id);

      const newTask: ProjectTask = {
        id: 't_' + Math.random().toString(36).substr(2, 9),
        phase_id: task.phase_id || '',
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        is_completed: task.is_completed || false,
        deadline: task.deadline,
        position: task.position !== undefined ? task.position : phaseTasks.length,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      tasks.push(newTask);
      storage.setItem('wm_tasks', JSON.stringify(tasks));
      return newTask;
    }
  },

  async updateProjectTask(id: string, task: Partial<ProjectTask>): Promise<ProjectTask> {
    if (isNeonConfigured) {
      try {
        const existing = await sql`SELECT * FROM project_tasks WHERE id = ${id}`;
        if (existing.length === 0) throw new Error('Task not found');
        const updated = { ...existing[0], ...task };
        const rows = await sql`
          UPDATE project_tasks SET
            title = ${updated.title},
            description = ${updated.description},
            priority = ${updated.priority},
            is_completed = ${updated.is_completed},
            deadline = ${updated.deadline || null},
            position = ${updated.position},
            updated_at = now()
          WHERE id = ${id}
          RETURNING *;
        `;
        return rows[0] as ProjectTask;
      } catch (err) {
        console.error("Neon query error:", err);
        throw err;
      }
    } else {
      initLocalStorage();
      const tasks = JSON.parse(storage.getItem('wm_tasks') || '[]');
      const index = tasks.findIndex((t: ProjectTask) => t.id === id);
      if (index === -1) throw new Error('Task not found');

      const updated = {
        ...tasks[index],
        ...task,
        updated_at: new Date().toISOString()
      };
      tasks[index] = updated;
      storage.setItem('wm_tasks', JSON.stringify(tasks));
      return updated;
    }
  },

  async deleteProjectTask(id: string): Promise<void> {
    if (isNeonConfigured) {
      try {
        await sql`DELETE FROM project_tasks WHERE id = ${id}`;
      } catch (err) {
        console.error("Neon query error:", err);
        throw err;
      }
    } else {
      initLocalStorage();
      const tasks = JSON.parse(storage.getItem('wm_tasks') || '[]');
      const filtered = tasks.filter((t: ProjectTask) => t.id !== id);
      storage.setItem('wm_tasks', JSON.stringify(filtered));
    }
  },

  // SERVICES DE CONTACT (Leads)
  async getLeads(): Promise<Lead[]> {
    if (isNeonConfigured) {
      try {
        const data = await sql`SELECT * FROM leads ORDER BY created_at DESC`;
        return data as Lead[];
      } catch (err) {
        console.error("Neon query error:", err);
        return [];
      }
    } else {
      initLocalStorage();
      return JSON.parse(storage.getItem('wm_leads') || '[]');
    }
  },

  async createLead(lead: Partial<Lead>): Promise<Lead> {
    if (isNeonConfigured) {
      try {
        const rows = await sql`
          INSERT INTO leads (name, email, phone, company, message, status)
          VALUES (${lead.name || ''}, ${lead.email || ''}, ${lead.phone || null}, ${lead.company || null}, ${lead.message || null}, ${lead.status || 'new'})
          RETURNING *;
        `;
        return rows[0] as Lead;
      } catch (err) {
        console.error("Neon query error:", err);
        throw err;
      }
    } else {
      initLocalStorage();
      const leads = JSON.parse(storage.getItem('wm_leads') || '[]');
      const newLead: Lead = {
        id: leads.length > 0 ? Math.max(...leads.map((l: any) => l.id)) + 1 : 1,
        name: lead.name || '',
        email: lead.email || '',
        phone: lead.phone || '',
        company: lead.company || '',
        message: lead.message || '',
        status: lead.status || 'new',
        created_at: new Date().toISOString()
      };
      leads.push(newLead);
      storage.setItem('wm_leads', JSON.stringify(leads));
      return newLead;
    }
  },

  async updateLeadStatus(id: number, status: 'new' | 'contacted' | 'closed'): Promise<Lead> {
    if (isNeonConfigured) {
      try {
        const rows = await sql`
          UPDATE leads SET status = ${status} WHERE id = ${id} RETURNING *;
        `;
        return rows[0] as Lead;
      } catch (err) {
        console.error("Neon query error:", err);
        throw err;
      }
    } else {
      initLocalStorage();
      const leads = JSON.parse(storage.getItem('wm_leads') || '[]');
      const index = leads.findIndex((l: Lead) => l.id === id);
      if (index === -1) throw new Error('Lead not found');

      const updated = {
        ...leads[index],
        status
      };
      leads[index] = updated;
      storage.setItem('wm_leads', JSON.stringify(leads));
      return updated;
    }
  }
};
