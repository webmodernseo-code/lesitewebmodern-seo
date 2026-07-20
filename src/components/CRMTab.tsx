'use client';

import React, { useState, useEffect } from 'react';
import { Briefcase, DollarSign, Target, Phone, Mail, Plus, Trash, CheckCircle2, TrendingUp, RefreshCw } from 'lucide-react';
import { useUIFeedback } from '@/context/UIFeedbackContext';
import { crmService, Deal } from '@/lib/crm-client';

export const CRMTab: React.FC = () => {
  const { toast, confirm } = useUIFeedback();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form states
  const [newName, setNewName] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newValue, setNewValue] = useState('');
  const [newStage, setNewStage] = useState<Deal['stage']>('lead');
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newNotes, setNewNotes] = useState('');

  const loadDeals = async () => {
    try {
      setLoading(true);
      const data = await crmService.getDeals();
      setDeals(data);
    } catch (err) {
      console.error(err);
      toast.error('Impossible de charger le pipeline.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDeals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddDeal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newCompany) return;

    try {
      await crmService.createDeal({
        name: newName,
        company: newCompany,
        value: parseFloat(newValue) || 0,
        stage: newStage,
        email: newEmail,
        phone: newPhone,
        notes: newNotes,
      });
      await loadDeals();
      setShowAddModal(false);
      toast.success('Opportunité ajoutée.');

      // Reset form
      setNewName('');
      setNewCompany('');
      setNewValue('');
      setNewStage('lead');
      setNewEmail('');
      setNewPhone('');
      setNewNotes('');
    } catch (err) {
      console.error(err);
      toast.error("L'ajout a échoué.");
    }
  };

  const handleUpdateStage = async (id: string, stage: Deal['stage']) => {
    const previous = deals;
    setDeals(deals.map(d => (d.id === id ? { ...d, stage } : d)));
    try {
      await crmService.updateDealStage(id, stage);
    } catch (err) {
      console.error(err);
      setDeals(previous);
      toast.error("La mise à jour a échoué.");
    }
  };

  const handleDeleteDeal = async (id: string) => {
    const ok = await confirm('Cette action est irréversible.', {
      title: 'Supprimer cette opportunité ?',
      danger: true,
      confirmLabel: 'Supprimer',
    });
    if (!ok) return;
    try {
      await crmService.deleteDeal(id);
      setDeals(deals.filter(d => d.id !== id));
      toast.success('Opportunité supprimée.');
    } catch (err) {
      console.error(err);
      toast.error("La suppression a échoué.");
    }
  };

  // Statics calculations
  const totalValue = deals.reduce((acc, d) => acc + (d.stage !== 'lost' ? d.value : 0), 0);
  const wonValue = deals.filter(d => d.stage === 'won').reduce((acc, d) => acc + d.value, 0);
  const activeDealsCount = deals.filter(d => d.stage !== 'won' && d.stage !== 'lost').length;
  const winRate = deals.length > 0 
    ? Math.round((deals.filter(d => d.stage === 'won').length / deals.filter(d => d.stage === 'won' || d.stage === 'lost').length || 0) * 100)
    : 0;

  const STAGES: { key: Deal['stage']; label: string; color: string }[] = [
    { key: 'lead', label: 'Prospect qualifié', color: 'bg-gray-100 text-gray-800' },
    { key: 'contact', label: 'Prise de contact', color: 'bg-blue-50 text-blue-700' },
    { key: 'proposal', label: 'Proposition envoyée', color: 'bg-[#ff4d00]/10 text-[#ff4d00]' },
    { key: 'negotiation', label: 'En négociation', color: 'bg-amber-50 text-amber-700' },
    { key: 'won', label: 'Contrat Gagné 🎉', color: 'bg-[#0FAC71]/10 text-[#0FAC71]' },
    { key: 'lost', label: 'Perdu', color: 'bg-red-50 text-red-700' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-black/5 pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-brand-black">Suivi Commercial CRM</h1>
          <p className="text-xs text-brand-black/45 mt-0.5">Gérez votre pipeline de vente et suivez vos objectifs de chiffre d&apos;affaires.</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange/95 text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Nouvelle Opportunité
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CA Prévisionnel */}
        <div className="bg-white border border-brand-black/10 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#ff4d00]/10 flex items-center justify-center text-[#ff4d00]">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-brand-black/40 uppercase tracking-wider block">CA Prévisionnel</span>
            <span className="text-lg font-black text-brand-black">{totalValue.toLocaleString('fr-FR')} €</span>
          </div>
        </div>

        {/* CA Sécurisé */}
        <div className="bg-white border border-brand-black/10 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#0FAC71]/10 flex items-center justify-center text-[#0FAC71]">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-brand-black/40 uppercase tracking-wider block">CA Sécurisé (Signé)</span>
            <span className="text-lg font-black text-[#0FAC71]">{wonValue.toLocaleString('fr-FR')} €</span>
          </div>
        </div>

        {/* Négociations en cours */}
        <div className="bg-white border border-brand-black/10 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-brand-black/40 uppercase tracking-wider block">Deals Actifs</span>
            <span className="text-lg font-black text-brand-black">{activeDealsCount} opportunités</span>
          </div>
        </div>

        {/* Taux de réussite */}
        <div className="bg-white border border-brand-black/10 rounded-2xl p-5 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-brand-black/40 uppercase tracking-wider block">Taux de Conversion</span>
            <span className="text-lg font-black text-brand-black">{winRate}%</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <RefreshCw className="w-6 h-6 text-brand-orange animate-spin" />
        </div>
      ) : deals.length === 0 ? (
        <div className="py-20 text-center bg-white border border-brand-black/5 rounded-2xl p-8 max-w-sm mx-auto shadow-sm">
          <Briefcase className="w-10 h-10 text-brand-black/20 mx-auto mb-3" />
          <p className="text-xs text-brand-black/50 font-bold">Aucune opportunité dans le pipeline</p>
          <p className="text-[10px] text-brand-black/30 mt-1">Cliquez sur le bouton pour ajouter votre premier prospect de vente.</p>
        </div>
      ) : (
        /* Kanban Pipeline Layout */
        <div className="bg-white border border-brand-black/10 rounded-3xl p-6 shadow-sm overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="border-b border-brand-black/5 text-[10px] font-bold text-brand-black/45 uppercase tracking-wider">
                <th className="pb-3">Opportunité / Client</th>
                <th className="pb-3">Entreprise</th>
                <th className="pb-3">Valeur Estimée</th>
                <th className="pb-3">Étape du Deal</th>
                <th className="pb-3">Contact</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-black/5 text-xs">
              {deals.map(deal => (
                <tr key={deal.id} className="group hover:bg-[#fdfbf7]/50 transition-colors">
                  <td className="py-4 font-extrabold text-brand-black">{deal.name}</td>
                  <td className="py-4 text-brand-black/80 font-semibold">{deal.company}</td>
                  <td className="py-4 font-black text-[#ff4d00]">{deal.value.toLocaleString('fr-FR')} €</td>
                  <td className="py-4">
                    <select
                      value={deal.stage}
                      onChange={(e) => handleUpdateStage(deal.id, e.target.value as Deal['stage'])}
                      className="bg-brand-sable border border-brand-black/10 px-2 py-1.5 rounded-lg font-bold text-[10px] uppercase tracking-wider focus:outline-none focus:border-brand-orange text-brand-black"
                    >
                      {STAGES.map(s => (
                        <option key={s.key} value={s.key}>{s.label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-4 space-y-1 text-[10px] text-brand-black/60 font-semibold">
                    <div className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-brand-black/35" />
                      {deal.email}
                    </div>
                    {deal.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-brand-black/35" />
                        {deal.phone}
                      </div>
                    )}
                  </td>
                  <td className="py-4 text-right">
                    <button
                      onClick={() => handleDeleteDeal(deal.id)}
                      className="p-2 text-brand-black/30 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Supprimer"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Deal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-brand-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-brand-black/10 p-8 rounded-3xl max-w-md w-full shadow-2xl space-y-5 animate-scaleUp">
            <h2 className="text-lg font-bold text-brand-black border-b border-brand-black/5 pb-3">Nouvelle opportunité commerciale</h2>
            
            <form onSubmit={handleAddDeal} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-black/50 uppercase tracking-widest block">Nom complet du contact *</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Ex: Marc Aurel"
                  className="w-full px-4 py-2.5 bg-brand-sable border border-brand-black/10 rounded-xl text-xs focus:outline-none focus:border-brand-orange text-brand-black"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-black/50 uppercase tracking-widest block">Nom de l&apos;entreprise *</label>
                <input
                  type="text"
                  required
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  placeholder="Ex: Empire Corp"
                  className="w-full px-4 py-2.5 bg-brand-sable border border-brand-black/10 rounded-xl text-xs focus:outline-none focus:border-brand-orange text-brand-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-brand-black/50 uppercase tracking-widest block">Valeur du deal (€) *</label>
                  <input
                    type="number"
                    required
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    placeholder="Ex: 5000"
                    className="w-full px-4 py-2.5 bg-brand-sable border border-brand-black/10 rounded-xl text-xs focus:outline-none focus:border-brand-orange text-brand-black"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-brand-black/50 uppercase tracking-widest block">Étape actuelle</label>
                  <select
                    value={newStage}
                    onChange={(e) => setNewStage(e.target.value as Deal['stage'])}
                    className="w-full px-4 py-2.5 bg-brand-sable border border-brand-black/10 rounded-xl text-xs focus:outline-none focus:border-brand-orange text-brand-black font-semibold"
                  >
                    {STAGES.map(s => (
                      <option key={s.key} value={s.key}>{s.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-black/50 uppercase tracking-widest block">Adresse e-mail</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="client@entreprise.com"
                  className="w-full px-4 py-2.5 bg-brand-sable border border-brand-black/10 rounded-xl text-xs focus:outline-none focus:border-brand-orange text-brand-black"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-black/50 uppercase tracking-widest block">Téléphone</label>
                <input
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="06 12 34 56 78"
                  className="w-full px-4 py-2.5 bg-brand-sable border border-brand-black/10 rounded-xl text-xs focus:outline-none focus:border-brand-orange text-brand-black"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-black/50 uppercase tracking-widest block">Notes complémentaires</label>
                <textarea
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Spécificités techniques, besoins particuliers..."
                  rows={2}
                  className="w-full px-4 py-2.5 bg-brand-sable border border-brand-black/10 rounded-xl text-xs focus:outline-none focus:border-brand-orange text-brand-black resize-none"
                />
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
