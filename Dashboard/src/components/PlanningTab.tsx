import React, { useEffect, useState } from 'react';
import { 
  Plus, 
  Trash2, 
  X, 
  Check, 
  ChevronRight, 
  ArrowLeft, 
  Briefcase,
  Edit2,
  Calendar,
  CheckCircle,
  FileText
} from 'lucide-react';
import { dbService } from '@/lib/supabase-db';
import { Project, ProjectPhase, ProjectTask, ProjectStatus, TaskPriority } from '@/types';

interface PlanningTabProps {
  newTrigger?: number;
}

export const PlanningTab: React.FC<PlanningTabProps> = ({ newTrigger }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [projectSubTab, setProjectSubTab] = useState<'liste' | 'gantt'>('liste');
  
  // UI states for Project creation
  const [showAddProject, setShowAddProject] = useState(false);
  const [newProjName, setNewProjName] = useState('');
  const [newProjClient, setNewProjClient] = useState('');
  const [newProjDeadline, setNewProjDeadline] = useState('');

  // UI states for Phase creation/editing
  const [newPhaseName, setNewPhaseName] = useState('');
  const [editingPhaseId, setEditingPhaseId] = useState<string | null>(null);
  const [editPhaseName, setEditPhaseName] = useState('');
  
  // UI states for Task creation
  const [newTaskInputs, setNewTaskInputs] = useState<Record<string, string>>({});

  // Stats for listing
  const [projectStats, setProjectStats] = useState<Record<string, { total: number; completed: number; percent: number; currentPhase: string; phasesCount: number }>>({});

  useEffect(() => {
    loadProjects();
  }, []);

  // Listen to sidebar "+ Nouveau" clicks
  useEffect(() => {
    if (newTrigger && newTrigger > 0) {
      setSelectedProject(null);
      setShowAddProject(true);
    }
  }, [newTrigger]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const allProjects = await dbService.getProjects();
      setProjects(allProjects);

      // Compute stats for each project
      const statsMap: typeof projectStats = {};
      for (const p of allProjects) {
        const fullProj = await dbService.getProjectById(p.id);
        if (fullProj && fullProj.phases) {
          let total = 0;
          let completed = 0;
          let activePhaseName = 'Aucune étape';

          fullProj.phases.forEach((ph) => {
            if (ph.tasks) {
              total += ph.tasks.length;
              completed += ph.tasks.filter(t => t.is_completed).length;
              if (ph.tasks.some(t => !t.is_completed) && activePhaseName === 'Aucune étape') {
                activePhaseName = ph.name;
              }
            }
          });

          if (activePhaseName === 'Aucune étape' && fullProj.phases.length > 0) {
            activePhaseName = fullProj.phases[fullProj.phases.length - 1].name;
          }

          statsMap[p.id] = {
            total,
            completed,
            percent: total > 0 ? Math.round((completed / total) * 100) : 0,
            currentPhase: activePhaseName,
            phasesCount: fullProj.phases.length
          };
        }
      }
      setProjectStats(statsMap);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProject = async (project: Project) => {
    try {
      setLoading(true);
      const fullProj = await dbService.getProjectById(project.id);
      setSelectedProject(fullProj);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjName.trim()) return;

    try {
      setLoading(true);
      const newProj = await dbService.createProject({
        name: newProjName,
        client: newProjClient || undefined,
        deadline: newProjDeadline || undefined,
        status: 'in_progress'
      });

      // Default phases seeded
      const defaultPhases = ['Cadrage', 'Design', 'Développement'];
      for (let i = 0; i < defaultPhases.length; i++) {
        await dbService.createProjectPhase({
          project_id: newProj.id,
          name: defaultPhases[i],
          position: i
        });
      }

      setNewProjName('');
      setNewProjClient('');
      setNewProjDeadline('');
      setShowAddProject(false);
      await loadProjects();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Voulez-vous supprimer ce projet ?')) return;
    try {
      setLoading(true);
      await dbService.deleteProject(id);
      if (selectedProject?.id === id) {
        setSelectedProject(null);
      }
      await loadProjects();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Phase Operations
  const handleAddPhase = async () => {
    if (!selectedProject) return;
    const name = prompt('Entrez le nom de la nouvelle étape :');
    if (!name || !name.trim()) return;

    try {
      const position = selectedProject.phases?.length || 0;
      const newPhase = await dbService.createProjectPhase({
        project_id: selectedProject.id,
        name: name.trim(),
        position
      });

      setSelectedProject(prev => {
        if (!prev) return null;
        const phases = prev.phases ? [...prev.phases] : [];
        phases.push({ ...newPhase, tasks: [] });
        return { ...prev, phases };
      });
      await loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRenamePhase = async (phaseId: string, currentName: string) => {
    const name = prompt('Renommer l\'étape :', currentName);
    if (!name || !name.trim() || name === currentName) return;

    try {
      const updated = await dbService.updateProjectPhase(phaseId, { name: name.trim() });
      setSelectedProject(prev => {
        if (!prev || !prev.phases) return null;
        const phases = prev.phases.map(ph => ph.id === phaseId ? { ...ph, name: updated.name } : ph);
        return { ...prev, phases };
      });
      await loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePhase = async (phaseId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Supprimer cette étape ?')) return;
    try {
      await dbService.deleteProjectPhase(phaseId);
      setSelectedProject(prev => {
        if (!prev) return null;
        const phases = prev.phases ? prev.phases.filter(ph => ph.id !== phaseId) : [];
        return { ...prev, phases };
      });
      await loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  // Task Operations
  const handleAddTaskInline = async (phaseId: string, e: React.FormEvent) => {
    e.preventDefault();
    const taskTitle = newTaskInputs[phaseId] || '';
    if (!taskTitle.trim() || !selectedProject) return;

    try {
      const phase = selectedProject.phases?.find(ph => ph.id === phaseId);
      const position = phase?.tasks?.length || 0;

      const newTask = await dbService.createProjectTask({
        phase_id: phaseId,
        title: taskTitle.trim(),
        priority: 'medium',
        position
      });

      setSelectedProject(prev => {
        if (!prev || !prev.phases) return null;
        const phases = prev.phases.map(ph => {
          if (ph.id === phaseId) {
            const tasks = ph.tasks ? [...ph.tasks] : [];
            tasks.push(newTask);
            return { ...ph, tasks };
          }
          return ph;
        });
        return { ...prev, phases };
      });

      setNewTaskInputs(prev => ({ ...prev, [phaseId]: '' }));
      await loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleTask = async (task: ProjectTask) => {
    try {
      const updated = await dbService.updateProjectTask(task.id, {
        is_completed: !task.is_completed
      });

      setSelectedProject(prev => {
        if (!prev || !prev.phases) return null;
        const phases = prev.phases.map(ph => {
          if (ph.id === task.phase_id) {
            const tasks = ph.tasks ? ph.tasks.map(t => t.id === task.id ? updated : t) : [];
            return { ...ph, tasks };
          }
          return ph;
        });
        return { ...prev, phases };
      });
      await loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  // Helper to check if a phase has all tasks completed
  const isPhaseCompleted = (phase: ProjectPhase) => {
    if (!phase.tasks || phase.tasks.length === 0) return false;
    return phase.tasks.every(t => t.is_completed);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {selectedProject ? (
        // ==========================================
        // ÉCRAN 5 : DÉTAILS DU PROJET (Phases libres + Tâches)
        // ==========================================
        <div className="space-y-6 animate-fadeIn">
          {/* Header navigation */}
          <div className="flex items-center justify-between border-b border-brand-black/10 pb-4">
            <button
              onClick={() => setSelectedProject(null)}
              className="flex items-center gap-2 text-brand-black/60 hover:text-brand-black font-semibold text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux projets
            </button>
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-brand-black/45 uppercase tracking-wider">
                Progression :
              </span>
              <div className="flex items-center gap-3">
                <div className="w-40 h-2 bg-brand-black/5 rounded-full overflow-hidden border border-brand-black/5">
                  <div 
                    className="h-full bg-brand-orange transition-all duration-300"
                    style={{ width: `${projectStats[selectedProject.id]?.percent || 0}%` }}
                  />
                </div>
                <span className="text-sm font-extrabold text-brand-black">
                  {projectStats[selectedProject.id]?.percent || 0}%
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-brand-black tracking-tight">{selectedProject.name}</h2>
            {selectedProject.client && (
              <p className="text-xs text-brand-black/50 font-medium">Client : {selectedProject.client}</p>
            )}
          </div>

          {/* Accordion or stacked phases */}
          <div className="space-y-4">
            {selectedProject.phases?.map((phase, idx) => {
              const phaseDone = isPhaseCompleted(phase);
              return (
                <div 
                  key={phase.id}
                  className={`border border-brand-black/10 rounded-2xl p-6 transition-all ${
                    phaseDone ? 'bg-emerald-50/10 border-emerald-500/30' : 'bg-white shadow-sm'
                  }`}
                >
                  {/* Phase Title Row */}
                  <div className="flex items-center justify-between border-b border-brand-black/5 pb-3 mb-4">
                    <div className="flex items-center gap-3">
                      {phaseDone ? (
                        <div className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center shadow-sm">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-lg bg-brand-orange text-white flex items-center justify-center text-xs font-bold shadow-sm">
                          {idx + 1}
                        </div>
                      )}
                      <h4 className="font-bold text-sm text-brand-black flex items-center gap-2">
                        {phase.name}
                        <button
                          onClick={() => handleRenamePhase(phase.id, phase.name)}
                          className="text-brand-black/35 hover:text-brand-orange p-1 transition-colors"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                      </h4>
                    </div>

                    <button
                      onClick={(e) => handleDeletePhase(phase.id, e)}
                      className="text-brand-black/30 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Tasks List */}
                  <div className="space-y-2 mb-4">
                    {phase.tasks && phase.tasks.map(task => (
                      <div 
                        key={task.id}
                        className="flex items-center justify-between p-3 rounded-xl border border-brand-black/5 hover:border-brand-black/15 bg-[#FDFBF7] transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleToggleTask(task)}
                            className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${
                              task.is_completed
                                ? 'bg-emerald-500 border-emerald-500 text-white'
                                : 'bg-white border-brand-black/20 hover:border-brand-orange'
                            }`}
                          >
                            {task.is_completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </button>
                          <span className={`text-xs font-semibold ${
                            task.is_completed ? 'line-through text-brand-black/45' : 'text-brand-black'
                          }`}>
                            {task.title}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Inline Task Creation Form */}
                  <form 
                    onSubmit={(e) => handleAddTaskInline(phase.id, e)}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      required
                      placeholder="+ nouvelle tâche (Entrée)..."
                      value={newTaskInputs[phase.id] || ''}
                      onChange={(e) => setNewTaskInputs(prev => ({ ...prev, [phase.id]: e.target.value }))}
                      className="flex-1 bg-[#FDFBF7] border border-brand-black/10 rounded-lg px-4 py-2 text-xs focus:outline-none focus:border-brand-orange"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 border border-brand-black/10 hover:bg-brand-sable rounded-lg text-xs font-bold text-brand-black transition-all"
                    >
                      Ajouter
                    </button>
                  </form>
                </div>
              );
            })}

            {/* Add large step button */}
            <button
              onClick={handleAddPhase}
              className="w-full py-4 border border-dashed border-brand-black/20 hover:border-brand-orange hover:bg-brand-sable/20 rounded-2xl flex items-center justify-center gap-2 text-xs font-bold text-brand-black/50 hover:text-brand-orange transition-all duration-200 uppercase tracking-wider"
            >
              <Plus className="w-4 h-4" />
              Ajouter une grande étape (nom libre, réordonnable)
            </button>
          </div>

          <div className="pt-6 border-t border-brand-black/5 text-center">
            <span className="text-[10px] text-brand-black/35 font-bold uppercase tracking-widest">
              renommer au clic · X = supprimer · étapes 100% personnalisables
            </span>
          </div>
        </div>
      ) : (
        // ==========================================
        // VUE PROJETS ACCUEIL (Liste + Gantt)
        // ==========================================
        <div className="space-y-6">
          {/* Header Switcher */}
          <div className="flex items-center justify-between border-b border-brand-black/10 pb-4">
            <h2 className="text-xl font-bold text-brand-black tracking-tight">Projets</h2>
            
            <div className="flex items-center gap-4">
              <div className="flex gap-2 bg-brand-sable/30 p-1 rounded-xl border border-brand-black/5">
                <button
                  onClick={() => setProjectSubTab('liste')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    projectSubTab === 'liste'
                      ? 'bg-brand-orange text-white'
                      : 'text-brand-black/60 hover:text-brand-black'
                  }`}
                >
                  Liste
                </button>
                <button
                  onClick={() => setProjectSubTab('gantt')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    projectSubTab === 'gantt'
                      ? 'bg-brand-orange text-white'
                      : 'text-brand-black/60 hover:text-brand-black'
                  }`}
                >
                  Gantt
                </button>
              </div>
              
              <button
                onClick={() => setShowAddProject(!showAddProject)}
                className="bg-brand-orange text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-brand-orange/90 transition-all uppercase tracking-wider shadow-sm"
              >
                + Nouveau projet
              </button>
            </div>
          </div>

          {/* Add project form */}
          {showAddProject && (
            <form 
              onSubmit={handleCreateProject}
              className="bg-brand-sable border border-brand-black/10 p-6 rounded-2xl max-w-xl animate-slideDown space-y-4 shadow-sm"
            >
              <h3 className="font-bold text-brand-black text-xs uppercase tracking-wider text-brand-black/60 border-b border-brand-black/5 pb-2">Créer un nouveau projet</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-brand-black/50 uppercase tracking-widest">Nom du projet *</label>
                  <input
                    type="text"
                    required
                    value={newProjName}
                    onChange={(e) => setNewProjName(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-brand-black/10 rounded-lg px-4 py-2 text-sm text-brand-black focus:outline-none focus:border-brand-orange"
                    placeholder="ex: Refonte - Ménard"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-brand-black/50 uppercase tracking-widest">Nom du Client</label>
                  <input
                    type="text"
                    value={newProjClient}
                    onChange={(e) => setNewProjClient(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-brand-black/10 rounded-lg px-4 py-2 text-sm text-brand-black focus:outline-none focus:border-brand-orange"
                    placeholder="Ménard..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-brand-black/50 uppercase tracking-widest">Échéance</label>
                  <input
                    type="date"
                    value={newProjDeadline}
                    onChange={(e) => setNewProjDeadline(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-brand-black/10 rounded-lg px-4 py-2 text-sm text-brand-black focus:outline-none focus:border-brand-orange"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-brand-black/5">
                <button
                  type="button"
                  onClick={() => setShowAddProject(false)}
                  className="px-4 py-2 hover:bg-brand-black/5 text-brand-black/75 rounded-lg text-xs font-bold"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-brand-orange text-white rounded-lg text-xs font-bold hover:bg-brand-orange/95"
                >
                  Créer le projet
                </button>
              </div>
            </form>
          )}

          {projectSubTab === 'liste' ? (
            // ==========================================
            // SUB-TAB : LISTE + DISQUE D'AVANCEMENT
            // ==========================================
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Projects List column (2/3) */}
              <div className="lg:col-span-2 space-y-4">
                {loading && projects.length === 0 ? (
                  <div className="py-20 text-center text-sm font-semibold text-brand-black/45 bg-white border border-brand-black/10 rounded-2xl">
                    Chargement des projets...
                  </div>
                ) : projects.length > 0 ? (
                  projects.map(proj => {
                    const stats = projectStats[proj.id] || { percent: 0, total: 0, completed: 0, currentPhase: '', phasesCount: 0 };
                    return (
                      <div
                        key={proj.id}
                        onClick={() => handleSelectProject(proj)}
                        className="bg-white border border-brand-black/10 hover:border-brand-orange p-5 rounded-2xl cursor-pointer hover:shadow-sm transition-all duration-200 flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-4">
                          {/* Dotted/Border Progress Ring */}
                          <div className="relative w-12 h-12 flex items-center justify-center flex-shrink-0">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                              <circle cx="18" cy="18" r="15.915" className="fill-none stroke-brand-black/5" strokeWidth="2.5" />
                              <circle 
                                cx="18" 
                                cy="18" 
                                r="15.915" 
                                className="fill-none stroke-brand-orange transition-all duration-300" 
                                strokeWidth="2.5" 
                                strokeDasharray="100 100" 
                                strokeDashoffset={100 - stats.percent} 
                              />
                            </svg>
                            <span className="absolute text-[10px] font-black text-brand-black">{stats.percent}%</span>
                          </div>

                          <div>
                            <h3 className="font-extrabold text-sm text-brand-black tracking-tight group-hover:text-brand-orange transition-colors">
                              {proj.name}
                            </h3>
                            <p className="text-[10px] text-brand-black/45 font-bold uppercase tracking-wider">
                              {stats.phasesCount} étapes · {stats.total} tâches
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <button
                            onClick={(e) => handleDeleteProject(proj.id, e)}
                            className="text-brand-black/20 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <span className="text-xs font-semibold text-brand-black/60 group-hover:text-brand-orange transition-colors flex items-center gap-0.5">
                            Ouvrir
                            <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="py-20 text-center text-xs font-semibold text-brand-black/35 bg-white border border-brand-black/10 rounded-2xl">
                    Aucun projet créé
                  </div>
                )}
              </div>

              {/* Right column: global donut stats (1/3) */}
              {projects.length > 0 && (
                <div className="bg-brand-sable border border-brand-black/10 p-6 rounded-2xl shadow-sm space-y-6">
                  <h4 className="font-bold text-xs text-brand-black/45 uppercase tracking-widest border-b border-brand-black/10 pb-2">
                    Avancement
                  </h4>
                  
                  {/* SVG Donut Chart representing relative progress */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative w-40 h-40 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                        {/* Donut sectors */}
                        <circle cx="50" cy="50" r="35" className="fill-none stroke-brand-black" strokeWidth="15" strokeDasharray="60 220" strokeDashoffset="0" />
                        <circle cx="50" cy="50" r="35" className="fill-none stroke-brand-orange" strokeWidth="15" strokeDasharray="90 220" strokeDashoffset="-60" />
                        <circle cx="50" cy="50" r="35" className="fill-none stroke-brand-sable border border-brand-black/10" strokeWidth="15" strokeDasharray="70 220" strokeDashoffset="-150" />
                      </svg>
                      {/* Center label */}
                      <div className="absolute flex flex-col items-center">
                        <span className="text-2xl font-black text-brand-black">42%</span>
                        <span className="text-[8px] font-bold text-brand-black/40 uppercase tracking-wider">moyen</span>
                      </div>
                    </div>

                    {/* Donut Legend */}
                    <div className="w-full space-y-2 text-[11px] font-bold text-brand-black">
                      {projects.map((proj, idx) => {
                        const stats = projectStats[proj.id] || { percent: 0 };
                        const colors = ['bg-brand-orange', 'bg-brand-black', 'bg-brand-sable border border-brand-black/10'];
                        return (
                          <div key={proj.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className={`w-2.5 h-2.5 rounded-full ${colors[idx % colors.length]}`} />
                              <span className="text-brand-black/75">{proj.client || proj.name.split('-')[1]?.trim() || proj.name}</span>
                            </div>
                            <span>{stats.percent}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // ==========================================
            // SUB-TAB : GANTT CHART
            // ==========================================
            <div className="bg-white border border-brand-black/10 p-6 rounded-2xl shadow-sm space-y-6 overflow-x-auto">
              <div className="min-w-[650px] space-y-6">
                {/* Gantt Header Weeks */}
                <div className="grid grid-cols-12 border-b border-brand-black/5 pb-2 text-center text-[10px] font-black text-brand-black/35 uppercase tracking-widest">
                  <span>S1</span>
                  <span>S2</span>
                  <span>S3</span>
                  <span>S4</span>
                  <span>S5</span>
                  <span>S6</span>
                  <span>S7</span>
                  <span>S8</span>
                  <span>S9</span>
                  <span>S10</span>
                  <span>S11</span>
                  <span>S12</span>
                </div>

                {/* Projects timeline rows */}
                <div className="space-y-6 relative py-4">
                  {/* Today line */}
                  <div className="absolute left-[41.6%] top-0 bottom-0 border-l border-dashed border-brand-orange w-0 z-10 flex flex-col items-center">
                    <span className="bg-brand-orange text-white text-[8px] font-black px-1 rounded uppercase tracking-wider absolute -top-4">
                      auj
                    </span>
                  </div>

                  {projects.map((proj, idx) => {
                    const stats = projectStats[proj.id] || { percent: 0 };
                    
                    // Simple programmatic mapping for demo Gantt bars
                    let barStyle = { marginLeft: '0%', width: '100%' };
                    if (idx === 0) { // Ménard
                      barStyle = { marginLeft: '8.3%', width: '50%' }; // Terminé + en cours
                    } else if (idx === 1) { // Favre
                      barStyle = { marginLeft: '16.6%', width: '66.6%' }; // Terminé
                    } else { // Studio K
                      barStyle = { marginLeft: '33.3%', width: '41.6%' }; // Sable à venir
                    }

                    return (
                      <div key={proj.id} className="grid grid-cols-12 items-center gap-4">
                        {/* Name column */}
                        <div className="col-span-3 text-xs font-bold text-brand-black truncate">
                          {proj.name.split('-')[1]?.trim() || proj.name}
                        </div>

                        {/* Timeline bar (span 9 columns) */}
                        <div className="col-span-9 h-6 relative bg-brand-black/5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-300 ${
                              stats.percent === 100 
                                ? 'bg-brand-orange' 
                                : stats.percent > 0 
                                ? 'bg-brand-orange/60' 
                                : 'bg-brand-sable border border-brand-black/10'
                            }`}
                            style={barStyle}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Legend footer */}
                <div className="flex items-center gap-6 pt-4 border-t border-brand-black/5 text-[10px] font-bold text-brand-black/50 uppercase tracking-widest justify-center">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-orange" />
                    <span>orange = terminé</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-orange/60" />
                    <span>clair = en cours</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-sable border border-brand-black/10" />
                    <span>sable = à venir</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
