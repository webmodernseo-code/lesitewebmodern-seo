import { supabase, isSupabaseConfigured } from './supabase';
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
      <h2 style="color:#0A0A0A; border-bottom:2px solid #F97316; padding-bottom:8px; margin-top:24px; font-weight:700;">1. L'importance cruciale de la recherche locale</h2>
      <p style="margin:16px 0; line-height:1.7;">La recherche locale est devenue le canal d'acquisition prioritaire pour les commerces physiques et prestataires de services régionaux. Plus de 46% de toutes les recherches Google ont une intention locale.</p>
      
      <div style="background:#F5E6D3; border-left:4px solid #F97316; padding:20px; border-radius:8px; margin:24px 0; color:#0A0A0A;">
        <strong>À retenir :</strong> Optimiser sa visibilité de proximité n'est plus une option, c'est le pilier de votre croissance physique et digitale combinées.
      </div>
      
      <h2 style="color:#0A0A0A; border-bottom:2px solid #F97316; padding-bottom:8px; margin-top:24px; font-weight:700;">2. Google Business Profile : Le pivot de votre SEO local</h2>
      <p style="margin:16px 0; line-height:1.7;">Votre fiche GBP est votre nouvelle page d'accueil de proximité. Pour la sur-optimiser, vous devez remplir chaque section avec soin et récolter des avis de façon hebdomadaire.</p>
      
      <blockquote style="border-left:4px solid #F97316; padding-left:16px; color:#0A0A0A; font-style:italic; margin:24px 0;">
        "Les entreprises qui répondent régulièrement aux avis génèrent en moyenne 15% de clics en plus vers leur site web."
      </blockquote>
      
      <a href="https://webmodernseo.local/contact" style="display:inline-block; background:#F97316; color:#FFFFFF; padding:14px 28px; border-radius:8px; font-weight:600; text-decoration:none; margin:16px 0;">Prendre rendez-vous avec un expert</a>
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
  },
  {
    id: 3,
    type: 'blog',
    title: 'L\'impact de l\'IA sur la rédaction de contenu web',
    brief: 'Rédiger un article de fond sur l\'intelligence artificielle générative et son alliance avec l\'expertise humaine en SEO.',
    focus_keyword: 'IA rédaction contenu web',
    content: `
      <h2 style="color:#0A0A0A; border-bottom:2px solid #F97316; padding-bottom:8px; margin-top:24px; font-weight:700;">1. L'évolution de la rédaction automatisée</h2>
      <p style="margin:16px 0; line-height:1.7;">L'arrivée des grands modèles de langage a transformé la vitesse de production des contenus. Mais la quantité ne remplace pas la qualité sémantique et l'expertise terrain.</p>
      
      <div style="background:#F5E6D3; border-left:4px solid #F97316; padding:20px; border-radius:8px; margin:24px 0; color:#0A0A0A;">
        <strong>À retenir :</strong> L'IA est un excellent assistant rédactionnel, mais la valeur ajoutée humaine (avis d'expert, cas concrets) reste le critère EEAT numéro 1 pour Google.
      </div>
    `,
    status: 'scheduled',
    seo_score: 96,
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
    featured_image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=60',
    image_source: 'generated',
    meta_description: 'Comment concilier intelligence artificielle et rédaction SEO humaine ? Décryptage des critères EEAT de Google.',
    scheduled_at: '2026-07-05T09:00:00Z',
    created_at: '2026-07-03T10:00:00Z',
    updated_at: '2026-07-03T10:30:00Z'
  }
];

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Refonte Site - Cabinet Legis',
    client: 'Cabinet Legis Avocats',
    deadline: '2026-08-30',
    status: 'in_progress',
    created_at: '2026-07-01T10:00:00Z',
    updated_at: '2026-07-01T10:00:00Z'
  },
  {
    id: 'p2',
    name: 'Campagne SEO Mensuelle',
    client: 'Shop Bio-Nature',
    deadline: '2026-07-31',
    status: 'in_progress',
    created_at: '2026-07-02T11:00:00Z',
    updated_at: '2026-07-02T11:00:00Z'
  }
];

const INITIAL_PHASES: ProjectPhase[] = [
  {
    id: 'ph1',
    project_id: 'p1',
    name: 'Cadrage & Design',
    position: 0,
    created_at: '2026-07-01T10:05:00Z'
  },
  {
    id: 'ph2',
    project_id: 'p1',
    name: 'Développement Next.js',
    position: 1,
    created_at: '2026-07-01T10:06:00Z'
  },
  {
    id: 'ph3',
    project_id: 'p1',
    name: 'Contenu & SEO',
    position: 2,
    created_at: '2026-07-01T10:07:00Z'
  },
  {
    id: 'ph4',
    project_id: 'p2',
    name: 'Audit & Technique',
    position: 0,
    created_at: '2026-07-02T11:05:00Z'
  },
  {
    id: 'ph5',
    project_id: 'p2',
    name: 'Optimisations Mensuelles',
    position: 1,
    created_at: '2026-07-02T11:06:00Z'
  }
];

const INITIAL_TASKS: ProjectTask[] = [
  {
    id: 't1',
    phase_id: 'ph1',
    title: 'Définir l\'arborescence globale',
    description: 'Cartographie des pages principales et du cocon sémantique.',
    priority: 'high',
    is_completed: true,
    deadline: '2026-07-10',
    position: 0,
    created_at: '2026-07-01T10:10:00Z',
    updated_at: '2026-07-01T10:15:00Z'
  },
  {
    id: 't2',
    phase_id: 'ph1',
    title: 'Créer les maquettes Figma',
    description: 'Design de la page d\'accueil et des gabarits intérieurs.',
    priority: 'high',
    is_completed: true,
    deadline: '2026-07-20',
    position: 1,
    created_at: '2026-07-01T10:11:00Z',
    updated_at: '2026-07-01T10:25:00Z'
  },
  {
    id: 't3',
    phase_id: 'ph1',
    title: 'Validation client des designs',
    description: 'Réunion de présentation et ajustements.',
    priority: 'medium',
    is_completed: false,
    deadline: '2026-07-25',
    position: 2,
    created_at: '2026-07-01T10:12:00Z',
    updated_at: '2026-07-01T10:12:00Z'
  },
  {
    id: 't4',
    phase_id: 'ph2',
    title: 'Initialisation du dépôt Git & Next.js',
    description: 'Structure App Router, configuration de Tailwind CSS.',
    priority: 'high',
    is_completed: false,
    deadline: '2026-08-05',
    position: 0,
    created_at: '2026-07-01T10:13:00Z',
    updated_at: '2026-07-01T10:13:00Z'
  },
  {
    id: 't5',
    phase_id: 'ph3',
    title: 'Rdaction des pages de services',
    description: 'Optimisation SEO des pages Avocats, Droit social, Droit pénal.',
    priority: 'medium',
    is_completed: false,
    deadline: '2026-08-15',
    position: 0,
    created_at: '2026-07-01T10:14:00Z',
    updated_at: '2026-07-01T10:14:00Z'
  },
  {
    id: 't6',
    phase_id: 'ph4',
    title: 'Audit Technique de la Search Console',
    description: 'Identifier les erreurs de crawl et liens cassés.',
    priority: 'high',
    is_completed: true,
    deadline: '2026-07-05',
    position: 0,
    created_at: '2026-07-02T11:10:00Z',
    updated_at: '2026-07-02T11:12:00Z'
  },
  {
    id: 't7',
    phase_id: 'ph4',
    title: 'Analyse de la vitesse de chargement',
    description: 'Mesures des Core Web Vitals.',
    priority: 'medium',
    is_completed: false,
    deadline: '2026-07-15',
    position: 1,
    created_at: '2026-07-02T11:11:00Z',
    updated_at: '2026-07-02T11:11:00Z'
  }
];

// Initialise le LocalStorage si nécessaire
const initLocalStorage = () => {
  if (typeof window === 'undefined') return;
  
  if (!localStorage.getItem('wm_content_items')) {
    localStorage.setItem('wm_content_items', JSON.stringify(INITIAL_CONTENT_ITEMS));
  }
  if (!localStorage.getItem('wm_projects')) {
    localStorage.setItem('wm_projects', JSON.stringify(INITIAL_PROJECTS));
  }
  if (!localStorage.getItem('wm_phases')) {
    localStorage.setItem('wm_phases', JSON.stringify(INITIAL_PHASES));
  }
  if (!localStorage.getItem('wm_tasks')) {
    localStorage.setItem('wm_tasks', JSON.stringify(INITIAL_TASKS));
  }
};

// ==========================================
// DB SERVICE WRAPPER (SUPABASE / LOCALSTORAGE FALLBACK)
// ==========================================

export const dbService = {
  // SERVICES DE CONTENUS IA
  async getContentItems(): Promise<ContentItem[]> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('content_items')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } else {
      initLocalStorage();
      const items = JSON.parse(localStorage.getItem('wm_content_items') || '[]');
      return items.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }
  },

  async getContentItemById(id: number): Promise<ContentItem | null> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('content_items')
        .select('*')
        .eq('id', id)
        .single();
      if (error) return null;
      return data;
    } else {
      initLocalStorage();
      const items = JSON.parse(localStorage.getItem('wm_content_items') || '[]');
      return items.find((i: ContentItem) => i.id === id) || null;
    }
  },

  async createContentItem(item: Partial<ContentItem>): Promise<ContentItem> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('content_items')
        .insert([item])
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      initLocalStorage();
      const items = JSON.parse(localStorage.getItem('wm_content_items') || '[]');
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
      localStorage.setItem('wm_content_items', JSON.stringify(items));
      return newItem;
    }
  },

  async updateContentItem(id: number, item: Partial<ContentItem>): Promise<ContentItem> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('content_items')
        .update({ ...item, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      initLocalStorage();
      const items = JSON.parse(localStorage.getItem('wm_content_items') || '[]');
      const index = items.findIndex((i: ContentItem) => i.id === id);
      if (index === -1) throw new Error('Content item not found');
      
      const updated = {
        ...items[index],
        ...item,
        updated_at: new Date().toISOString()
      };
      items[index] = updated;
      localStorage.setItem('wm_content_items', JSON.stringify(items));
      return updated;
    }
  },

  async deleteContentItem(id: number): Promise<void> {
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('content_items')
        .delete()
        .eq('id', id);
      if (error) throw error;
    } else {
      initLocalStorage();
      const items = JSON.parse(localStorage.getItem('wm_content_items') || '[]');
      const filtered = items.filter((i: ContentItem) => i.id !== id);
      localStorage.setItem('wm_content_items', JSON.stringify(filtered));
    }
  },

  // SERVICES DE PLANIFICATION PROJETS
  async getProjects(): Promise<Project[]> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } else {
      initLocalStorage();
      return JSON.parse(localStorage.getItem('wm_projects') || '[]');
    }
  },

  async getProjectById(id: string): Promise<Project | null> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('projects')
        .select('*, project_phases(*, project_tasks(*))')
        .eq('id', id)
        .single();
      if (error) return null;
      
      if (data && data.project_phases) {
        data.project_phases.sort((a: any, b: any) => a.position - b.position);
        data.project_phases.forEach((phase: any) => {
          if (phase.project_tasks) {
            phase.project_tasks.sort((a: any, b: any) => a.position - b.position);
          }
        });
      }
      return data;
    } else {
      initLocalStorage();
      const projects = JSON.parse(localStorage.getItem('wm_projects') || '[]');
      const project = projects.find((p: Project) => p.id === id) || null;
      if (!project) return null;

      const phases = JSON.parse(localStorage.getItem('wm_phases') || '[]');
      const tasks = JSON.parse(localStorage.getItem('wm_tasks') || '[]');

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
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('projects')
        .insert([project])
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      initLocalStorage();
      const projects = JSON.parse(localStorage.getItem('wm_projects') || '[]');
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
      localStorage.setItem('wm_projects', JSON.stringify(projects));
      return newProj;
    }
  },

  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('projects')
        .update({ ...project, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      initLocalStorage();
      const projects = JSON.parse(localStorage.getItem('wm_projects') || '[]');
      const index = projects.findIndex((p: Project) => p.id === id);
      if (index === -1) throw new Error('Project not found');

      const updated = {
        ...projects[index],
        ...project,
        updated_at: new Date().toISOString()
      };
      projects[index] = updated;
      localStorage.setItem('wm_projects', JSON.stringify(projects));
      return updated;
    }
  },

  async deleteProject(id: string): Promise<void> {
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      if (error) throw error;
    } else {
      initLocalStorage();
      const projects = JSON.parse(localStorage.getItem('wm_projects') || '[]');
      const filteredProjs = projects.filter((p: Project) => p.id !== id);
      localStorage.setItem('wm_projects', JSON.stringify(filteredProjs));

      // Cascade delete phases and tasks locally
      const phases = JSON.parse(localStorage.getItem('wm_phases') || '[]');
      const pIds = phases.filter((ph: ProjectPhase) => ph.project_id === id).map((ph: any) => ph.id);
      
      const filteredPhases = phases.filter((ph: ProjectPhase) => ph.project_id !== id);
      localStorage.setItem('wm_phases', JSON.stringify(filteredPhases));

      const tasks = JSON.parse(localStorage.getItem('wm_tasks') || '[]');
      const filteredTasks = tasks.filter((t: ProjectTask) => !pIds.includes(t.phase_id));
      localStorage.setItem('wm_tasks', JSON.stringify(filteredTasks));
    }
  },

  // SERVICES DE PHASES (project_phases)
  async getProjectPhases(projectId: string): Promise<ProjectPhase[]> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('project_phases')
        .select('*')
        .eq('project_id', projectId)
        .order('position', { ascending: true });
      if (error) throw error;
      return data || [];
    } else {
      initLocalStorage();
      const phases = JSON.parse(localStorage.getItem('wm_phases') || '[]');
      return phases
        .filter((ph: ProjectPhase) => ph.project_id === projectId)
        .sort((a: any, b: any) => a.position - b.position);
    }
  },

  async createProjectPhase(phase: Partial<ProjectPhase>): Promise<ProjectPhase> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('project_phases')
        .insert([phase])
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      initLocalStorage();
      const phases = JSON.parse(localStorage.getItem('wm_phases') || '[]');
      const projectPhases = phases.filter((p: any) => p.project_id === phase.project_id);
      
      const newPhase: ProjectPhase = {
        id: 'ph_' + Math.random().toString(36).substr(2, 9),
        project_id: phase.project_id || '',
        name: phase.name || '',
        position: phase.position !== undefined ? phase.position : projectPhases.length,
        created_at: new Date().toISOString()
      };
      phases.push(newPhase);
      localStorage.setItem('wm_phases', JSON.stringify(phases));
      return newPhase;
    }
  },

  async updateProjectPhase(id: string, phase: Partial<ProjectPhase>): Promise<ProjectPhase> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('project_phases')
        .update(phase)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      initLocalStorage();
      const phases = JSON.parse(localStorage.getItem('wm_phases') || '[]');
      const index = phases.findIndex((ph: ProjectPhase) => ph.id === id);
      if (index === -1) throw new Error('Phase not found');

      const updated = { ...phases[index], ...phase };
      phases[index] = updated;
      localStorage.setItem('wm_phases', JSON.stringify(phases));
      return updated;
    }
  },

  async deleteProjectPhase(id: string): Promise<void> {
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('project_phases')
        .delete()
        .eq('id', id);
      if (error) throw error;
    } else {
      initLocalStorage();
      const phases = JSON.parse(localStorage.getItem('wm_phases') || '[]');
      const filtered = phases.filter((ph: ProjectPhase) => ph.id !== id);
      localStorage.setItem('wm_phases', JSON.stringify(filtered));

      // Cascade delete tasks locally
      const tasks = JSON.parse(localStorage.getItem('wm_tasks') || '[]');
      const filteredTasks = tasks.filter((t: ProjectTask) => t.phase_id !== id);
      localStorage.setItem('wm_tasks', JSON.stringify(filteredTasks));
    }
  },

  // SERVICES DE TÂCHES (project_tasks)
  async getPhaseTasks(phaseId: string): Promise<ProjectTask[]> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('project_tasks')
        .select('*')
        .eq('phase_id', phaseId)
        .order('position', { ascending: true });
      if (error) throw error;
      return data || [];
    } else {
      initLocalStorage();
      const tasks = JSON.parse(localStorage.getItem('wm_tasks') || '[]');
      return tasks
        .filter((t: ProjectTask) => t.phase_id === phaseId)
        .sort((a: any, b: any) => a.position - b.position);
    }
  },

  async createProjectTask(task: Partial<ProjectTask>): Promise<ProjectTask> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('project_tasks')
        .insert([task])
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      initLocalStorage();
      const tasks = JSON.parse(localStorage.getItem('wm_tasks') || '[]');
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
      localStorage.setItem('wm_tasks', JSON.stringify(tasks));
      return newTask;
    }
  },

  async updateProjectTask(id: string, task: Partial<ProjectTask>): Promise<ProjectTask> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('project_tasks')
        .update({ ...task, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    } else {
      initLocalStorage();
      const tasks = JSON.parse(localStorage.getItem('wm_tasks') || '[]');
      const index = tasks.findIndex((t: ProjectTask) => t.id === id);
      if (index === -1) throw new Error('Task not found');

      const updated = {
        ...tasks[index],
        ...task,
        updated_at: new Date().toISOString()
      };
      tasks[index] = updated;
      localStorage.setItem('wm_tasks', JSON.stringify(tasks));
      return updated;
    }
  },

  async deleteProjectTask(id: string): Promise<void> {
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('project_tasks')
        .delete()
        .eq('id', id);
      if (error) throw error;
    } else {
      initLocalStorage();
      const tasks = JSON.parse(localStorage.getItem('wm_tasks') || '[]');
      const filtered = tasks.filter((t: ProjectTask) => t.id !== id);
      localStorage.setItem('wm_tasks', JSON.stringify(filtered));
    }
  }
};
