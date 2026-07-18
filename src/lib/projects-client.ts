import { Project, ProjectPhase, ProjectTask } from '@/types';

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
}

async function patchJson<T>(url: string, body: unknown): Promise<T> {
  const res = await fetch(url, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
}

export const dbService = {
  async getProjects(): Promise<Project[]> {
    const res = await fetch('/api/projects');
    if (!res.ok) return [];
    const data = await res.json();
    return data.projects || [];
  },

  async getProjectById(id: string): Promise<Project | null> {
    const res = await fetch(`/api/projects/${id}`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.project || null;
  },

  async createProject(project: Partial<Project>): Promise<Project> {
    const data = await postJson<{ project: Project }>('/api/projects', project);
    return data.project;
  },

  async deleteProject(id: string): Promise<void> {
    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
  },

  async createProjectPhase(phase: Partial<ProjectPhase>): Promise<ProjectPhase> {
    const data = await postJson<{ phase: ProjectPhase }>(`/api/projects/${phase.project_id}/phases`, phase);
    return data.phase;
  },

  async updateProjectPhase(id: string, phase: Partial<ProjectPhase>): Promise<ProjectPhase> {
    const data = await patchJson<{ phase: ProjectPhase }>(`/api/phases/${id}`, phase);
    return data.phase;
  },

  async deleteProjectPhase(id: string): Promise<void> {
    await fetch(`/api/phases/${id}`, { method: 'DELETE' });
  },

  async createProjectTask(task: Partial<ProjectTask>): Promise<ProjectTask> {
    const data = await postJson<{ task: ProjectTask }>(`/api/phases/${task.phase_id}/tasks`, task);
    return data.task;
  },

  async updateProjectTask(id: string, task: Partial<ProjectTask>): Promise<ProjectTask> {
    const data = await patchJson<{ task: ProjectTask }>(`/api/tasks/${id}`, task);
    return data.task;
  },
};
