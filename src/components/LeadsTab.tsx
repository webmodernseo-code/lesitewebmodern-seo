'use client';

import React, { useState, useEffect } from 'react';
import { dbService, Lead } from '@/lib/leads-client';
import { Mail, Phone, Briefcase, Calendar, Check, MessageSquare, RefreshCw } from 'lucide-react';

export const LeadsTab: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'new' | 'contacted' | 'closed'>('all');

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const data = await dbService.getLeads();
      setLeads(data);
    } catch (err) {
      console.error('Error fetching leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleUpdateStatus = async (id: number, status: 'new' | 'contacted' | 'closed') => {
    try {
      await dbService.updateLeadStatus(id, status);
      // Mettre à jour localement
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const filteredLeads = leads.filter(l => {
    if (filter === 'all') return true;
    return l.status === filter;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-black/5 pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-brand-black">Prospects & Contacts</h1>
          <p className="text-xs text-brand-black/45 mt-0.5">Suivez et gérez les demandes de contact reçues depuis le site vitrine.</p>
        </div>
        <button
          onClick={fetchLeads}
          className="flex items-center gap-2 bg-white border border-brand-black/10 px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-brand-black/60 hover:text-brand-black hover:bg-brand-sable/20 transition-all shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Actualiser
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 bg-white border border-brand-black/10 p-1 rounded-xl w-fit shadow-sm">
        {(['all', 'new', 'contacted', 'closed'] as const).map(type => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all ${
              filter === type
                ? 'bg-brand-orange text-white shadow-sm'
                : 'text-brand-black/50 hover:text-brand-black'
            }`}
          >
            {type === 'all' && 'Tous'}
            {type === 'new' && 'Nouveaux'}
            {type === 'contacted' && 'Contactés'}
            {type === 'closed' && 'Traités'}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-20 flex justify-center">
          <RefreshCw className="w-6 h-6 text-brand-orange animate-spin" />
        </div>
      ) : filteredLeads.length === 0 ? (
        <div className="py-20 text-center bg-white border border-brand-black/5 rounded-2xl p-8 max-w-sm mx-auto shadow-sm">
          <MessageSquare className="w-10 h-10 text-brand-black/20 mx-auto mb-3" />
          <p className="text-xs text-brand-black/50 font-bold">Aucune demande trouvée</p>
          <p className="text-[10px] text-brand-black/30 mt-1">Les nouveaux prospects soumis sur la page de contact apparaîtront ici.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredLeads.map(lead => {
            const formattedDate = lead.created_at
              ? new Date(lead.created_at).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit'
                })
              : '';

            return (
              <div
                key={lead.id}
                className="bg-white border border-brand-black/10 rounded-2xl p-6 shadow-sm flex flex-col justify-between gap-4 group hover:border-brand-orange/20 transition-all duration-300"
              >
                {/* Header Lead */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2 border-b border-brand-black/5 pb-3">
                  <div>
                    <h3 className="text-sm font-extrabold text-brand-black">{lead.name}</h3>
                    <div className="flex items-center gap-1 text-[10px] text-brand-black/40 font-semibold mt-0.5">
                      <Calendar className="w-3.5 h-3.5" />
                      Reçu le {formattedDate}
                    </div>
                  </div>

                  {/* Badge statut */}
                  <div className="flex gap-1.5 items-center">
                    <span
                      className={`text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-lg ${
                        lead.status === 'new'
                          ? 'bg-[#ff4d00]/10 text-[#ff4d00]'
                          : lead.status === 'contacted'
                          ? 'bg-blue-50 text-blue-600 border border-blue-100'
                          : 'bg-[#0FAC71]/10 text-[#0FAC71]'
                      }`}
                    >
                      {lead.status === 'new' && 'Nouveau'}
                      {lead.status === 'contacted' && 'Contacté'}
                      {lead.status === 'closed' && 'Traité'}
                    </span>
                  </div>
                </div>

                {/* Coordonnées & Message */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-brand-black/70">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-brand-black/30" />
                      <a href={`mailto:${lead.email}`} className="hover:text-brand-orange hover:underline font-semibold">
                        {lead.email}
                      </a>
                    </div>
                    {lead.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-brand-black/30" />
                        <a href={`tel:${lead.phone}`} className="hover:text-brand-orange font-semibold">
                          {lead.phone}
                        </a>
                      </div>
                    )}
                    {lead.company && (
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5 text-brand-black/30" />
                        <span className="font-semibold">{lead.company}</span>
                      </div>
                    )}
                  </div>

                  {/* Message de demande */}
                  <div className="md:col-span-2 bg-[#fdfbf7] p-4 rounded-xl border border-brand-black/5 text-xs text-brand-black/80 whitespace-pre-line leading-relaxed italic">
                    &quot;{lead.message || 'Aucun message de description.'}&quot;
                  </div>
                </div>

                {/* Actions de changement de statut */}
                <div className="flex justify-end gap-2 border-t border-brand-black/5 pt-3 mt-1">
                  {lead.status === 'new' && (
                    <button
                      onClick={() => handleUpdateStatus(lead.id!, 'contacted')}
                      className="bg-blue-50 hover:bg-blue-100 text-blue-700 text-[10px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl transition-all"
                    >
                      Marquer comme Contacté
                    </button>
                  )}
                  {lead.status !== 'closed' && (
                    <button
                      onClick={() => handleUpdateStatus(lead.id!, 'closed')}
                      className="bg-[#0FAC71]/10 hover:bg-[#0FAC71]/15 text-[#0FAC71] text-[10px] font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all"
                    >
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      Marquer comme Traité
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
