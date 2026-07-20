import React, { useEffect, useState } from 'react';
import { Shield, Key, Sliders, CheckCircle, Lock, RefreshCw, AlertCircle, X, Share2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useUIFeedback } from '@/context/UIFeedbackContext';

type Provider = 'claude' | 'openai';

interface IntegrationConnection {
  provider: Provider | 'linkedin';
  masked_key: string;
  status: string;
  connected_at: string;
}

interface ProviderMeta {
  key: Provider;
  name: string;
  subtitle: string;
  icon: React.ReactNode;
}

const PROVIDERS: ProviderMeta[] = [
  {
    key: 'claude',
    name: 'Claude API - rédaction',
    subtitle: 'génère réellement le texte des articles',
    icon: <Key className="w-5 h-5" />,
  },
  {
    key: 'openai',
    name: 'OpenAI - images',
    subtitle: 'génère réellement les visuels (DALL-E 3)',
    icon: <Shield className="w-5 h-5" />,
  },
];

export const SettingsTab: React.FC = () => {
  const { updatePassword } = useAuth();
  const { toast, confirm } = useUIFeedback();

  const [connections, setConnections] = useState<Record<string, IntegrationConnection>>({});
  const [loadingConnections, setLoadingConnections] = useState(true);
  const [openForm, setOpenForm] = useState<Provider | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [connecting, setConnecting] = useState(false);

  const [linkedinClientId, setLinkedinClientId] = useState('');
  const [linkedinClientSecret, setLinkedinClientSecret] = useState('');
  const [savingLinkedinCreds, setSavingLinkedinCreds] = useState(false);
  const [editingLinkedinCreds, setEditingLinkedinCreds] = useState(false);

  const [blogThreshold, setBlogThreshold] = useState(95);
  const [linkedinThreshold, setLinkedinThreshold] = useState(90);
  const [isEditingThresholds, setIsEditingThresholds] = useState(false);

  // Password change states
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadConnections = async () => {
    try {
      setLoadingConnections(true);
      const res = await fetch('/api/integrations');
      if (res.ok) {
        const data = await res.json();
        const map: Record<string, IntegrationConnection> = {};
        (data.connections || []).forEach((c: IntegrationConnection) => {
          map[c.provider] = c;
        });
        setConnections(map);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingConnections(false);
    }
  };

  useEffect(() => {
    loadConnections();
  }, []);

  const handleOpenConnect = (provider: Provider) => {
    setOpenForm(provider);
    setApiKeyInput('');
  };

  const handleConnect = async (provider: Provider) => {
    if (!apiKeyInput.trim()) return;
    try {
      setConnecting(true);
      const res = await fetch(`/api/integrations/${provider}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ apiKey: apiKeyInput.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'La connexion a échoué.');
        return;
      }
      toast.success('Connecté avec succès.');
      setOpenForm(null);
      setApiKeyInput('');
      await loadConnections();
    } catch (err) {
      console.error(err);
      toast.error('La connexion a échoué.');
    } finally {
      setConnecting(false);
    }
  };

  const handleDisconnect = async (provider: Provider, name: string) => {
    const ok = await confirm(`Les fonctionnalités liées à ${name} redeviendront indisponibles.`, {
      title: 'Déconnecter cet outil ?',
      danger: true,
      confirmLabel: 'Déconnecter',
    });
    if (!ok) return;
    try {
      const res = await fetch(`/api/integrations/${provider}`, { method: 'DELETE' });
      if (res.ok) {
        toast.success('Outil déconnecté.');
        await loadConnections();
      } else {
        toast.error('La déconnexion a échoué.');
      }
    } catch (err) {
      console.error(err);
      toast.error('La déconnexion a échoué.');
    }
  };

  const handleSaveLinkedinCredentials = async () => {
    if (!linkedinClientId.trim() || !linkedinClientSecret.trim()) return;
    try {
      setSavingLinkedinCreds(true);
      const res = await fetch('/api/integrations/linkedin/credentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clientId: linkedinClientId.trim(), clientSecret: linkedinClientSecret.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "L'enregistrement a échoué.");
        return;
      }
      toast.success('Identifiants enregistrés. Cliquez sur "Connecter avec LinkedIn" pour autoriser la page.');
      setEditingLinkedinCreds(false);
      setLinkedinClientId('');
      setLinkedinClientSecret('');
      await loadConnections();
    } catch (err) {
      console.error(err);
      toast.error("L'enregistrement a échoué.");
    } finally {
      setSavingLinkedinCreds(false);
    }
  };

  const handleDisconnectLinkedin = async () => {
    const ok = await confirm('La publication automatique sur votre page LinkedIn sera désactivée.', {
      title: 'Déconnecter LinkedIn ?',
      danger: true,
      confirmLabel: 'Déconnecter',
    });
    if (!ok) return;
    try {
      const res = await fetch('/api/integrations/linkedin', { method: 'DELETE' });
      if (res.ok) {
        toast.success('LinkedIn déconnecté.');
        await loadConnections();
      } else {
        toast.error('La déconnexion a échoué.');
      }
    } catch (err) {
      console.error(err);
      toast.error('La déconnexion a échoué.');
    }
  };

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
        <p className="text-xs text-brand-black/50 font-medium">Configurez vos connexions aux APIs de rédaction et de génération d&apos;images.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Left main settings (2/3) */}
        <div className="md:col-span-2 bg-white border border-brand-black/10 rounded-2xl p-8 space-y-6 shadow-sm">
          <h3 className="font-bold text-xs text-brand-black/40 uppercase tracking-widest border-b border-brand-black/5 pb-2">Connexions & seuils</h3>

          {PROVIDERS.map((meta) => {
            const connection = connections[meta.key];
            const isConnected = !loadingConnections && !!connection;
            const isOpen = openForm === meta.key;

            return (
              <div key={meta.key} className="border border-brand-black/5 rounded-xl bg-brand-sable/5 transition-all">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-black/5 flex items-center justify-center text-brand-black">
                      {meta.icon}
                    </div>
                    <div>
                      <span className="font-bold text-brand-black text-sm block">{meta.name}</span>
                      <span className="text-[10px] text-brand-black/40 font-semibold tracking-wider uppercase">
                        {isConnected ? connection.masked_key : meta.subtitle}
                      </span>
                    </div>
                  </div>

                  {loadingConnections ? (
                    <RefreshCw className="w-4 h-4 text-brand-black/20 animate-spin" />
                  ) : isConnected ? (
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-xs font-bold flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" />
                        connecté
                      </span>
                      <button
                        onClick={() => handleDisconnect(meta.key, meta.name)}
                        className="text-[10px] font-bold text-brand-black/40 hover:text-red-500 uppercase tracking-wider transition-colors"
                      >
                        déconnecter
                      </button>
                    </div>
                  ) : isOpen ? (
                    <button
                      onClick={() => setOpenForm(null)}
                      className="p-2 text-brand-black/40 hover:text-brand-black transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleOpenConnect(meta.key)}
                      className="px-3 py-1 border border-brand-black/10 rounded-lg text-xs font-bold text-brand-black hover:bg-brand-sable transition-all"
                    >
                      Connecter
                    </button>
                  )}
                </div>

                {isOpen && !isConnected && (
                  <div className="px-4 pb-4 flex items-center gap-2 animate-fadeIn">
                    <input
                      type="password"
                      autoFocus
                      value={apiKeyInput}
                      onChange={(e) => setApiKeyInput(e.target.value)}
                      placeholder="Collez votre clé API..."
                      className="flex-1 bg-white border border-brand-black/10 rounded-lg px-3 py-2 text-xs text-brand-black focus:outline-none focus:border-brand-orange"
                    />
                    <button
                      onClick={() => handleConnect(meta.key)}
                      disabled={connecting || !apiKeyInput.trim()}
                      className="px-3 py-2 bg-brand-orange text-white rounded-lg text-xs font-bold hover:bg-brand-orange/90 transition-all disabled:opacity-40 flex items-center gap-1.5 whitespace-nowrap"
                    >
                      {connecting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Tester et connecter'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {/* LinkedIn - OAuth (page entreprise) */}
          {(() => {
            const linkedin = connections['linkedin'];
            const status = loadingConnections ? 'loading' : linkedin?.status || 'none';

            return (
              <div className="border border-brand-black/5 rounded-xl bg-brand-sable/5 transition-all">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-black/5 flex items-center justify-center text-brand-black">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-brand-black text-sm block">LinkedIn - page entreprise</span>
                      <span className="text-[10px] text-brand-black/40 font-semibold tracking-wider uppercase">
                        {status === 'connected' || status === 'pending' ? linkedin!.masked_key : 'publication automatique de posts'}
                      </span>
                    </div>
                  </div>

                  {status === 'loading' ? (
                    <RefreshCw className="w-4 h-4 text-brand-black/20 animate-spin" />
                  ) : status === 'connected' ? (
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-xs font-bold flex items-center gap-1.5">
                        <CheckCircle className="w-3.5 h-3.5" />
                        connecté
                      </span>
                      <button
                        onClick={handleDisconnectLinkedin}
                        className="text-[10px] font-bold text-brand-black/40 hover:text-red-500 uppercase tracking-wider transition-colors"
                      >
                        déconnecter
                      </button>
                    </div>
                  ) : status === 'pending' ? (
                    <a
                      href="/api/auth/linkedin/start"
                      className="px-3 py-1 bg-brand-orange text-white rounded-lg text-xs font-bold hover:bg-brand-orange/90 transition-all"
                    >
                      Connecter avec LinkedIn
                    </a>
                  ) : editingLinkedinCreds ? (
                    <button
                      onClick={() => setEditingLinkedinCreds(false)}
                      className="p-2 text-brand-black/40 hover:text-brand-black transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setEditingLinkedinCreds(true)}
                      className="px-3 py-1 border border-brand-black/10 rounded-lg text-xs font-bold text-brand-black hover:bg-brand-sable transition-all"
                    >
                      Configurer
                    </button>
                  )}
                </div>

                {status === 'none' && editingLinkedinCreds && (
                  <div className="px-4 pb-4 space-y-2 animate-fadeIn">
                    <input
                      type="text"
                      autoFocus
                      value={linkedinClientId}
                      onChange={(e) => setLinkedinClientId(e.target.value)}
                      placeholder="Client ID de l'app LinkedIn..."
                      className="w-full bg-white border border-brand-black/10 rounded-lg px-3 py-2 text-xs text-brand-black focus:outline-none focus:border-brand-orange"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="password"
                        value={linkedinClientSecret}
                        onChange={(e) => setLinkedinClientSecret(e.target.value)}
                        placeholder="Client Secret..."
                        className="flex-1 bg-white border border-brand-black/10 rounded-lg px-3 py-2 text-xs text-brand-black focus:outline-none focus:border-brand-orange"
                      />
                      <button
                        onClick={handleSaveLinkedinCredentials}
                        disabled={savingLinkedinCreds || !linkedinClientId.trim() || !linkedinClientSecret.trim()}
                        className="px-3 py-2 bg-brand-orange text-white rounded-lg text-xs font-bold hover:bg-brand-orange/90 transition-all disabled:opacity-40 flex items-center gap-1.5 whitespace-nowrap"
                      >
                        {savingLinkedinCreds ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Enregistrer'}
                      </button>
                    </div>
                    <p className="text-[10px] text-brand-black/35 leading-relaxed">
                      Depuis votre app sur linkedin.com/developers/apps, une fois le produit &quot;Community Management API&quot; approuvé.
                    </p>
                  </div>
                )}
              </div>
            );
          })()}

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
    </div>
  );
};
