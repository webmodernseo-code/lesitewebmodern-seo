'use client';

import React, { useState } from 'react';
import { useAuth, Collaborator } from '@/context/AuthContext';
import { useUIFeedback } from '@/context/UIFeedbackContext';
import { UserPlus, Shield, Trash2, Users, Eye, EyeOff } from 'lucide-react';

export const TeamTab: React.FC = () => {
  const { user, collaborators, addCollaborator, removeCollaborator } = useAuth();
  const { confirm } = useUIFeedback();
  const [showAddModal, setShowAddModal] = useState(false);
  
  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'admin' | 'collaborator'>('collaborator');
  const [permissions, setPermissions] = useState<string[]>(['content', 'leads']);
  const [showPassword, setShowPassword] = useState(false);

  const AVAILABLE_TABS = [
    { key: 'content', label: 'Contenu (Blog/Pages)' },
    { key: 'calendar', label: 'Calendrier Éditorial' },
    { key: 'projects', label: 'Projets Clients' },
    { key: 'leads', label: 'Suivi des Prospects' },
    { key: 'crm', label: 'CRM Commercial' },
    { key: 'settings', label: 'Réglages Cockpit' }
  ];

  const handlePermissionChange = (tabKey: string) => {
    if (permissions.includes(tabKey)) {
      setPermissions(permissions.filter(p => p !== tabKey));
    } else {
      setPermissions([...permissions, tabKey]);
    }
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    const newCollab: Collaborator = {
      email: email.trim(),
      password: password.trim(),
      role,
      permissions
    };

    addCollaborator(newCollab);
    setShowAddModal(false);

    // Reset Form
    setEmail('');
    setPassword('');
    setRole('collaborator');
    setPermissions(['content', 'leads']);
  };

  const handleRemoveMember = async (memberEmail: string) => {
    const ok = await confirm(`${memberEmail} perdra immédiatement l'accès au Cockpit.`, {
      title: 'Supprimer ce collaborateur ?',
      danger: true,
      confirmLabel: 'Supprimer',
    });
    if (!ok) return;
    removeCollaborator(memberEmail);
  };

  const isSuperAdmin = user?.role === 'super_admin';

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-black/5 pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-brand-black flex items-center gap-2">
            <Users className="w-5 h-5 text-brand-orange" />
            Gestion des Collaborateurs
          </h1>
          <p className="text-xs text-brand-black/45 mt-0.5">Configurez les comptes de votre équipe et assignez des droits d&apos;accès sélectifs.</p>
        </div>
        {isSuperAdmin && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-[#ff4d00] hover:bg-[#ff4d00]/95 text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            Ajouter un membre
          </button>
        )}
      </div>

      {/* Règle Monopole Alert */}
      <div className="bg-brand-sable border border-[#0FAC71]/20 rounded-2xl p-4 flex gap-3 text-xs text-brand-black/80 font-medium">
        <Shield className="w-5 h-5 text-[#0FAC71] shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold text-[#0FAC71] uppercase tracking-wider block mb-0.5">Règle de Monopole</span>
          En tant que Super Administrateur fondateur (<span className="font-bold">webmodernseo@gmail.com</span>), vous seul détenez le contrôle global de l&apos;équipe. Personne ne peut modifier ou supprimer votre compte, même les autres administrateurs.
        </div>
      </div>

      {/* Collaborators Table */}
      <div className="bg-white border border-brand-black/10 rounded-3xl p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-brand-black/5 text-[10px] font-bold text-brand-black/45 uppercase tracking-wider">
              <th className="pb-3">Utilisateur</th>
              <th className="pb-3">Rôle & Privilèges</th>
              <th className="pb-3">Accès autorisés (Onglets)</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-black/5 text-xs">
            {collaborators.map((collab) => {
              const isFounder = collab.email === 'webmodernseo@gmail.com';
              return (
                <tr key={collab.email} className="group hover:bg-[#fdfbf7]/50 transition-colors">
                  <td className="py-4">
                    <div className="font-extrabold text-brand-black">{collab.email}</div>
                    <div className="text-[10px] text-brand-black/40 font-semibold">Créé localement</div>
                  </td>
                  <td className="py-4">
                    {collab.role === 'super_admin' ? (
                      <span className="inline-flex items-center gap-1 bg-[#0FAC71]/15 text-[#0FAC71] px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border border-[#0FAC71]/20">
                        👑 Super Admin
                      </span>
                    ) : collab.role === 'admin' ? (
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border border-amber-200">
                        🔑 Admin
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider">
                        👤 Collaborateur
                      </span>
                    )}
                  </td>
                  <td className="py-4">
                    <div className="flex flex-wrap gap-1">
                      {collab.role === 'super_admin' ? (
                        <span className="bg-[#0FAC71]/10 text-[#0FAC71] px-2 py-0.5 rounded text-[10px] font-bold">Tous les accès (Monopole)</span>
                      ) : collab.permissions.length === 0 ? (
                        <span className="text-brand-black/30 italic text-[10px]">Aucun droit assigné</span>
                      ) : (
                        collab.permissions.map(p => {
                          const label = AVAILABLE_TABS.find(t => t.key === p)?.label || p;
                          return (
                            <span key={p} className="bg-brand-sable border border-brand-black/5 text-brand-black/75 px-2 py-0.5 rounded text-[10px] font-semibold">
                              {label}
                            </span>
                          );
                        })
                      )}
                    </div>
                  </td>
                  <td className="py-4 text-right">
                    {isFounder ? (
                      <span className="text-[10px] font-bold text-[#0FAC71] uppercase tracking-wider select-none pr-3">Propriétaire</span>
                    ) : (
                      isSuperAdmin && (
                        <button
                          onClick={() => handleRemoveMember(collab.email)}
                          className="p-2 text-brand-black/30 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Supprimer le collaborateur"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-brand-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-brand-black/10 p-8 rounded-[32px] max-w-md w-full shadow-2xl space-y-5 animate-scaleUp">
            <h2 className="text-lg font-bold text-brand-black border-b border-brand-black/5 pb-3">Ajouter un membre d&apos;équipe</h2>
            
            <form onSubmit={handleAddMember} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-black/50 uppercase tracking-widest block">Adresse Email *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ex: collab@webmodernseo.co"
                  className="w-full px-4 py-2.5 bg-brand-sable border border-brand-black/10 rounded-xl text-xs focus:outline-none focus:border-brand-orange text-brand-black"
                />
              </div>

              <div className="space-y-1 relative">
                <label className="text-[10px] font-bold text-brand-black/50 uppercase tracking-widest block">Mot de passe provisoire *</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    className="w-full px-4 py-2.5 pr-10 bg-brand-sable border border-brand-black/10 rounded-xl text-xs focus:outline-none focus:border-brand-orange text-brand-black"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-black/35 hover:text-brand-black transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-black/50 uppercase tracking-widest block">Rôle assigné</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'admin' | 'collaborator')}
                  className="w-full px-4 py-2.5 bg-brand-sable border border-brand-black/10 rounded-xl text-xs focus:outline-none focus:border-brand-orange text-brand-black font-semibold"
                >
                  <option value="collaborator">Collaborateur simple</option>
                  <option value="admin">Administrateur secondaire</option>
                </select>
              </div>

              {/* Permissions selections */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-brand-black/50 uppercase tracking-widest block">Accès autorisés aux sections</label>
                <div className="grid grid-cols-1 gap-2 bg-brand-sable border border-brand-black/5 p-4 rounded-2xl max-h-[160px] overflow-y-auto">
                  {AVAILABLE_TABS.map(tab => (
                    <label key={tab.key} className="flex items-center gap-2 cursor-pointer select-none py-0.5">
                      <input
                        type="checkbox"
                        checked={permissions.includes(tab.key)}
                        onChange={() => handlePermissionChange(tab.key)}
                        className="rounded text-brand-orange focus:ring-0 w-4 h-4 border-brand-black/10"
                      />
                      <span className="text-[11px] font-semibold text-brand-black/85">{tab.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 bg-gray-50 border border-brand-black/10 text-brand-black/70 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider hover:bg-gray-100 transition-colors"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-[#ff4d00] hover:bg-[#ff4d00]/95 text-white py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all shadow-sm"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
