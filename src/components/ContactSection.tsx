'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Globe, Send, CheckCircle } from 'lucide-react';

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '5 000 € - 15 000 € / mois',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#050609] relative font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-widest mb-3">
            <Globe className="w-4 h-4" />
            <span>Portée Internationale WebModernSEO</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Propulsez <br />
            <span className="orange-gradient-text">Votre Marque</span>
          </h2>
          <p className="mt-4 text-zinc-300 text-base">
            Réservez une consultation stratégique confidentielle de 30 minutes avec notre équipe dirigeante.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Carte Impact Mondial (Gauche) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-dark rounded-3xl p-8 border border-zinc-800 space-y-6"
          >
            <div className="relative h-64 rounded-2xl overflow-hidden bg-zinc-950 flex items-center justify-center p-6 border border-zinc-800">
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"
                alt="Carte de Présence Mondiale WebModernSEO"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D0F17] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex justify-between text-xs font-semibold text-zinc-300 bg-black/75 p-3 rounded-xl backdrop-blur-md border border-white/10">
                <span>PARIS</span>
                <span>LONDRES</span>
                <span>NEW YORK</span>
                <span>SINGAPOUR</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 text-zinc-300 text-sm">
                <Mail className="w-5 h-5 text-orange-400 shrink-0" />
                <span>contact@webmodernseo.com</span>
              </div>
              <div className="flex items-center gap-4 text-zinc-300 text-sm">
                <Globe className="w-5 h-5 text-orange-400 shrink-0" />
                <span>Accompagnement de clients dans plus de 35 pays</span>
              </div>
            </div>
          </motion.div>

          {/* Formulaire de Contact (Droite) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-dark rounded-3xl p-8 border border-zinc-800"
          >
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle className="w-16 h-16 text-orange-400 mx-auto" />
                <h3 className="text-2xl font-bold text-white">Session Stratégique Confirmée !</h3>
                <p className="text-sm text-zinc-400 max-w-md mx-auto">
                  Merci ! Un de nos associés seniors en croissance vous recontactera sous 2 heures pour valider votre audit.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-zinc-800 text-zinc-300 text-xs font-semibold hover:bg-zinc-700"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Votre Nom Complet *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex. Sophie Martin"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Email Professionnel *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="sophie@entreprise.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      Nom de l'Entreprise
                    </label>
                    <input
                      type="text"
                      placeholder="ex. Acquia SaaS"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors font-sans"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Budget de Croissance Mensuel
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors font-sans"
                  >
                    <option value="5 000 € - 15 000 € / mois">5 000 € - 15 000 € / mois</option>
                    <option value="15 000 € - 50 000 € / mois">15 000 € - 50 000 € / mois</option>
                    <option value="50 000 €+ / mois">50 000 €+ / mois (Enterprise)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                    Objectifs de Croissance / Note
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Parlez-nous de vos objectifs de revenus actuels..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 text-black font-extrabold text-sm shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] transition-all flex items-center justify-center gap-2 font-sans"
                >
                  <span>Réserver la Session Stratégique x10</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
