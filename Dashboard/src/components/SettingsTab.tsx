import React, { useState } from 'react';
import { Settings, Shield, Key, Sliders, CheckCircle, Lock, RefreshCw, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const SettingsTab: React.FC = () => {
  const { updatePassword } = useAuth();
  const [blogThreshold, setBlogThreshold] = useState(95);
  const [linkedinThreshold, setLinkedinThreshold] = useState(90);
  const [isEditingThresholds, setIsEditingThresholds] = useState(false);

  // Password change states
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword.trim()) return;

    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    try {
      setUpdating(true);
      setError('');
      setMessage('');
      
      const success = await updatePassword(newPassword);
      if (success) {
        setMessage('Votre mot de passe a été mis à jour avec succès.');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setError('Impossible de mettre à jour le mot de passe.');
      }
    } catch (err) {
      console.error(err);
      setError('Une erreur est survenue lors de la mise à jour.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8 space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-xl font-bold text-brand-black tracking-tight">Réglages</h2>
        <p className="text-xs text-brand-black/50 font-medium">Configurez vos connexions aux APIs de rédaction, publication et scoring.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Left main settings (2/3) */}
        <div className="md:col-span-2 bg-white border border-brand-black/10 rounded-2xl p-8 space-y-6 shadow-sm">
          <h3 className="font-bold text-xs text-brand-black/40 uppercase tracking-widest border-b border-brand-black/5 pb-2">Connexions & seuils</h3>
          
          {/* WordPress API */}
          <div className="flex items-center justify-between p-4 border border-brand-black/5 rounded-xl hover:border-brand-black/15 bg-brand-sable/5 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-black/5 flex items-center justify-center text-brand-black">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-brand-black text-sm block">WordPress - API REST</span>
                <span className="text-[10px] text-brand-black/40 font-semibold tracking-wider uppercase">tonagence.com/blog</span>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-xs font-bold flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              connecté
            </span>
          </div>

          {/* Claude API */}
          <div className="flex items-center justify-between p-4 border border-brand-black/5 rounded-xl hover:border-brand-black/15 bg-brand-sable/5 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-black/5 flex items-center justify-center text-brand-black">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-brand-black text-sm block">Claude API - rédaction</span>
                <span className="text-[10px] text-brand-black/40 font-semibold tracking-wider uppercase">claude-3-5-sonnet-20241022</span>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-xs font-bold flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              connecté
            </span>
          </div>

          {/* OpenAI API */}
          <div className="flex items-center justify-between p-4 border border-brand-black/5 rounded-xl hover:border-brand-black/15 bg-brand-sable/5 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-black/5 flex items-center justify-center text-brand-black">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-brand-black text-sm block">OpenAI - images</span>
                <span className="text-[10px] text-brand-black/40 font-semibold tracking-wider uppercase">dall-e-3</span>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-xs font-bold flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              connecté
            </span>
          </div>

          {/* LinkedIn API */}
          <div className="flex items-center justify-between p-4 border border-brand-black/5 rounded-xl hover:border-brand-black/15 bg-brand-sable/5 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-black/5 flex items-center justify-center text-brand-black">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-brand-black text-sm block">LinkedIn</span>
                <span className="text-[10px] text-brand-black/40 font-semibold tracking-wider uppercase">publication de posts</span>
              </div>
            </div>
            <span className="px-3 py-1 bg-brand-sable text-brand-black border border-brand-black/10 rounded-lg text-xs font-bold">
              mode assisté
            </span>
          </div>

          {/* Quality Thresholds */}
          <div className="flex items-center justify-between p-4 border border-brand-black/5 rounded-xl hover:border-brand-black/15 bg-brand-sable/5 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-brand-black/5 flex items-center justify-center text-brand-black">
                <Sliders className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-brand-black text-sm block">Seuils de publication</span>
                <span className="text-[10px] text-brand-black/40 font-semibold tracking-wider uppercase">
                  blog &ge; {blogThreshold} · linkedin &ge; {linkedinThreshold}
                </span>
              </div>
            </div>
            
            {isEditingThresholds ? (
              <div className="flex items-center gap-3 bg-white p-2 rounded-lg border border-brand-black/10">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-brand-black">Blog:</span>
                  <input
                    type="number"
                    value={blogThreshold}
                    onChange={(e) => setBlogThreshold(Number(e.target.value))}
                    className="w-12 border border-brand-black/10 rounded px-1.5 py-0.5 text-xs font-bold"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-brand-black">LinkedIn:</span>
                  <input
                    type="number"
                    value={linkedinThreshold}
                    onChange={(e) => setLinkedinThreshold(Number(e.target.value))}
                    className="w-12 border border-brand-black/10 rounded px-1.5 py-0.5 text-xs font-bold"
                  />
                </div>
                <button
                  onClick={() => setIsEditingThresholds(false)}
                  className="text-xs font-bold text-brand-orange hover:underline px-1.5"
                >
                  OK
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditingThresholds(true)}
                className="px-3 py-1 border border-brand-black/10 rounded-lg text-xs font-bold text-brand-black hover:bg-brand-sable transition-all"
              >
                modifier
              </button>
            )}
          </div>
        </div>

        {/* Right password modification panel (1/3) */}
        <div className="bg-white border border-brand-black/10 p-6 rounded-2xl shadow-sm space-y-4">
          <h3 className="font-bold text-xs text-brand-black/40 uppercase tracking-widest border-b border-brand-black/5 pb-2">
            Sécurité & Accès
          </h3>

          {message && (
            <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-700 text-[11px] font-semibold rounded-xl flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
              {message}
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-[11px] font-semibold rounded-xl flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-brand-black/50 uppercase tracking-widest block">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-brand-black/35">
                  <Lock className="w-3.5 h-3.5" />
                </span>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-brand-black/10 rounded-xl pl-9 pr-3 py-2 text-xs text-brand-black focus:outline-none focus:border-brand-orange"
                  placeholder="Nouveau..."
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-brand-black/50 uppercase tracking-widest block">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-brand-black/35">
                  <Lock className="w-3.5 h-3.5" />
                </span>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-brand-black/10 rounded-xl pl-9 pr-3 py-2 text-xs text-brand-black focus:outline-none focus:border-brand-orange"
                  placeholder="Confirmer..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={updating}
              className="w-full bg-brand-black text-white hover:bg-brand-black/90 py-2.5 px-4 rounded-xl text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm disabled:bg-brand-black/50"
            >
              {updating ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                'Modifier le mot de passe'
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="text-center pt-4">
        <p className="text-[10px] text-brand-black/35 font-semibold tracking-wider uppercase">
          écran de service, sobre — pas d'action orange ici
        </p>
      </div>
    </div>
  );
};
