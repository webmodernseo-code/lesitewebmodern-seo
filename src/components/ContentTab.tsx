import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Trash2,
  Sparkles,
  Image as ImageIcon,
  ArrowLeft,
  ChevronRight,
  RefreshCw,
  Lock,
  Check,
  X
} from 'lucide-react';
import { dbService } from '@/lib/content-client';
import { ContentItem, ContentType } from '@/types';
import { useUIFeedback } from '@/context/UIFeedbackContext';

// Chargé à la demande : Tiptap (@tiptap/*) est lourd et n'est nécessaire
// que lorsqu'un article est réellement ouvert en édition.
const RichTextEditor = dynamic(
  () => import('@/components/RichTextEditor').then((mod) => mod.RichTextEditor),
  { ssr: false }
);

interface ContentTabProps {
  newTrigger?: number;
}

export const ContentTab: React.FC<ContentTabProps> = ({ newTrigger }) => {
  const { toast, confirm } = useUIFeedback();
  const [items, setItems] = useState<ContentItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSubTab, setActiveSubTab] = useState<ContentType>('blog');

  // UI state for creation/editing
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editType, setEditType] = useState<ContentType>('blog');
  const [editBrief, setEditBrief] = useState('');
  const [editKeyword, setEditKeyword] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editMetaDesc, setEditMetaDesc] = useState('');
  const [editImage, setEditImage] = useState('');
  const [imageSource, setImageSource] = useState<'generated' | 'uploaded' | ''>('');
  const [editSchedule, setEditSchedule] = useState('');
  const [editScore, setEditScore] = useState(0);

  // État IA
  const [generating, setGenerating] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadItems();
  }, []);

  // Listen to sidebar "+ Nouveau" clicks
  useEffect(() => {
    if (newTrigger && newTrigger > 0) {
      handleStartNew();
    }
  }, [newTrigger]);

  const loadItems = async () => {
    try {
      setLoading(true);
      const allItems = await dbService.getContentItems();
      setItems(allItems);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectItem = (item: ContentItem) => {
    setSelectedItem(item);
    setEditTitle(item.title);
    setEditType(item.type);
    setEditBrief(item.brief || '');
    setEditKeyword(item.focus_keyword || '');
    setEditContent(item.content || '');
    setEditMetaDesc(item.meta_description || '');
    setEditImage(item.featured_image || '');
    setImageSource((item.image_source as 'generated' | 'uploaded') || '');
    setEditSchedule(item.scheduled_at ? item.scheduled_at.substring(0, 16) : '');
    setEditScore(item.type === 'blog' ? item.seo_score : item.channel_score);
    setIsEditing(true);
  };

  // Structure éditoriale type pour un nouvel article de blog : le titre (H1) et l'image
  // à la une sont déjà gérés par des champs dédiés (editTitle / editImage) plus bas dans
  // le formulaire, ce template ne couvre que le corps de l'article (intro + sections H2).
  const BLOG_ARTICLE_TEMPLATE = `<p>[Introduction — 2 à 3 phrases : le problème ou le sujet que rencontre le lecteur, et ce qu'il va apprendre dans cet article.]</p>

<h2>[Sous-titre 1 — contexte ou définition]</h2>
<p>[Développement...]</p>

<h2>[Sous-titre 2 — premier point clé]</h2>
<p>[Développement...]</p>

<h2>[Sous-titre 3 — deuxième point clé]</h2>
<p>[Développement...]</p>

<h2>Conclusion</h2>
<p>[Résumé des points clés et appel à l'action, ex : contactez-nous pour un audit gratuit.]</p>`;

  const handleStartNew = () => {
    setSelectedItem(null);
    setEditTitle('');
    setEditType(activeSubTab); // inherit the active sub tab (Blog/LinkedIn)
    setEditBrief('');
    setEditKeyword('');
    setEditContent(activeSubTab === 'blog' ? BLOG_ARTICLE_TEMPLATE : '');
    setEditMetaDesc('');
    setEditImage('');
    setImageSource('');
    setEditSchedule('');
    setEditScore(0);
    setIsEditing(true);
  };

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const ok = await confirm('Cette action est irréversible.', {
      title: 'Supprimer ce contenu ?',
      danger: true,
      confirmLabel: 'Supprimer',
    });
    if (!ok) return;
    try {
      await dbService.deleteContentItem(id);
      if (selectedItem?.id === id) {
        setIsEditing(false);
        setSelectedItem(null);
      }
      await loadItems();
      toast.success('Contenu supprimé.');
    } catch (err) {
      console.error(err);
      toast.error("La suppression a échoué.");
    }
  };

  // AI Content generation (Claude API réelle)
  const handleGenerateAI = async () => {
    if (!editTitle.trim()) {
      toast.error('Veuillez entrer un titre avant de lancer la génération.');
      return;
    }

    try {
      setGenerating(true);
      const res = await fetch('/api/ai/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: editType,
          title: editTitle,
          brief: editBrief,
          focusKeyword: editKeyword,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "La génération a échoué.");
        return;
      }

      setEditContent(data.content);

      // Seed initial score (sub-optimal to show feedback loop)
      const initialScore = editType === 'blog' ? 87 : 81;
      setEditScore(initialScore);

      if (editType === 'blog') {
        setEditMetaDesc(`Découvrez notre guide complet sur ${editTitle}.`);
      }
    } catch (err) {
      console.error(err);
      toast.error("La génération a échoué.");
    } finally {
      setGenerating(false);
    }
  };

  // AI Optimization loop simulation
  const handleOptimizeAI = async () => {
    try {
      setOptimizing(true);
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Score increases above threshold
      const optimizedScore = editType === 'blog' ? 98 : 94;
      setEditScore(optimizedScore);
    } catch (err) {
      console.error(err);
    } finally {
      setOptimizing(false);
    }
  };

  // Génération d'image réelle (OpenAI DALL-E, une fois connecté dans Réglages)
  const handleGenerateImage = async () => {
    if (!editTitle.trim()) {
      toast.error('Veuillez entrer un titre avant de générer une image.');
      return;
    }
    try {
      setGeneratingImage(true);
      const prompt = `Image professionnelle et moderne illustrant un article de blog sur : "${editTitle}"${editKeyword ? ` (thème : ${editKeyword})` : ''}. Style photographique réaliste, épuré, adapté à une agence web premium.`;
      const res = await fetch('/api/ai/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "La génération d'image a échoué.");
        return;
      }
      setEditImage(data.url);
      setImageSource('generated');
    } catch (err) {
      console.error(err);
      toast.error("La génération d'image a échoué.");
    } finally {
      setGeneratingImage(false);
    }
  };

  // Upload réel d'un fichier image (Vercel Blob)
  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "L'upload a échoué.");
        return;
      }
      setEditImage(data.url);
      setImageSource('uploaded');
    } catch (err) {
      console.error(err);
      toast.error("L'upload a échoué.");
    } finally {
      setUploadingImage(false);
    }
  };

  // Save content
  const handleSave = async () => {
    if (!editTitle.trim()) {
      toast.error('Le titre est obligatoire.');
      return;
    }

    try {
      const payload: Partial<ContentItem> = {
        title: editTitle,
        type: editType,
        brief: editBrief,
        focus_keyword: editKeyword,
        content: editContent,
        meta_description: editMetaDesc,
        featured_image: editImage,
        image_source: imageSource || undefined,
        scheduled_at: editSchedule || undefined,
        seo_score: editType === 'blog' ? editScore : 0,
        channel_score: editType === 'linkedin' ? editScore : 0,
        status: editSchedule ? 'scheduled' : 'published',
        published_at: editSchedule ? undefined : new Date().toISOString(),
      };

      if (selectedItem) {
        await dbService.updateContentItem(selectedItem.id, payload);
      } else {
        await dbService.createContentItem(payload);
      }

      setIsEditing(false);
      setSelectedItem(null);
      await loadItems();
      toast.success('Contenu enregistré.');

      if (editType === 'linkedin' && !editSchedule) {
        await handlePublishToLinkedin();
      }
    } catch (err) {
      console.error(err);
      toast.error("L'enregistrement a échoué.");
    }
  };

  const handlePublishToLinkedin = async () => {
    try {
      const res = await fetch('/api/linkedin/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editContent }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || 'La publication sur LinkedIn a échoué.');
        return;
      }
      toast.success('Publié sur votre page LinkedIn.');
    } catch (err) {
      console.error(err);
      toast.error('La publication sur LinkedIn a échoué.');
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(editContent);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  // Stats calculation
  const getStats = () => {
    const typeItems = items.filter(item => item.type === activeSubTab);
    const drafts = typeItems.filter(item => item.status === 'draft').length;
    const scheduled = typeItems.filter(item => item.status === 'scheduled').length;
    const published = typeItems.filter(item => item.status === 'published').length;
    return { drafts, scheduled, published };
  };

  const stats = getStats();
  const filteredItems = items.filter(item => item.type === activeSubTab);

  return (
    <div className="space-y-8 animate-fadeIn">
      {isEditing ? (
        // ==========================================
        // ÉCRAN 2 : CRÉATION / ÉDITION (3 Colonnes)
        // ==========================================
        <div className="space-y-6">
          {/* Topbar navigation */}
          <div className="flex items-center justify-between border-b border-brand-black/10 pb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setSelectedItem(null);
                }}
                className="flex items-center gap-2 text-brand-black/60 hover:text-brand-black font-semibold text-sm transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Contenus /
              </button>
              <h3 className="font-bold text-brand-black text-sm uppercase tracking-wide">
                Nouveau ({editType === 'blog' ? 'Blog' : 'LinkedIn'})
              </h3>
            </div>
            
            <div className="flex items-center gap-3 text-xs font-semibold text-brand-black/40">
              <span className="flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                enregistré
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Colonne 1 : Paramètres (Brief, mot-clé, image) */}
            <div className="bg-white border border-brand-black/10 p-6 rounded-2xl space-y-4 shadow-sm">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-black/50 uppercase tracking-widest">Titre du contenu</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-brand-black/10 rounded-lg px-4 py-2.5 text-sm text-brand-black focus:outline-none focus:border-brand-orange"
                  placeholder="Titre de l'article..."
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-black/50 uppercase tracking-widest">Brief</label>
                <textarea
                  rows={4}
                  value={editBrief}
                  onChange={(e) => setEditBrief(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-brand-black/10 rounded-lg px-4 py-3 text-sm text-brand-black focus:outline-none focus:border-brand-orange placeholder:text-brand-black/30"
                  placeholder="Instructions pour Claude..."
                />
              </div>

              {editType === 'blog' && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-brand-black/50 uppercase tracking-widest">Mot-clé</label>
                  <input
                    type="text"
                    value={editKeyword}
                    onChange={(e) => setEditKeyword(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-brand-black/10 rounded-lg px-4 py-2.5 text-sm text-brand-black focus:outline-none focus:border-brand-orange"
                    placeholder="Mot-clé principal..."
                  />
                </div>
              )}

              {/* Generate Button */}
              <button
                type="button"
                onClick={handleGenerateAI}
                disabled={generating}
                className="w-full bg-brand-orange text-white py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-brand-orange/95 transition-all shadow-sm disabled:bg-brand-orange/50 uppercase tracking-wider"
              >
                {generating ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                Générer IA
              </button>

              {/* Image Zone */}
              <div className="space-y-1 pt-2">
                <label className="text-[10px] font-bold text-brand-black/50 uppercase tracking-widest">Image</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={handleUploadImage}
                  className="hidden"
                />
                {editImage ? (
                  <div className="border border-brand-black/10 rounded-xl overflow-hidden relative h-32 flex items-center justify-center bg-brand-sable/10 group">
                    <img src={editImage} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      onClick={() => { setEditImage(''); setImageSource(''); }}
                      className="absolute top-2 right-2 bg-brand-black/80 hover:bg-brand-black text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingImage || generatingImage}
                      className="h-24 border border-dashed border-brand-black/20 hover:border-brand-orange rounded-xl flex flex-col items-center justify-center gap-1.5 text-xs text-brand-black/40 hover:text-brand-orange transition-colors bg-[#FDFBF7] disabled:opacity-50"
                    >
                      {uploadingImage ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      ) : (
                        <ImageIcon className="w-5 h-5" />
                      )}
                      <span className="font-semibold text-[10px] tracking-wider uppercase">
                        {uploadingImage ? 'envoi...' : 'uploader'}
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={handleGenerateImage}
                      disabled={uploadingImage || generatingImage}
                      className="h-24 border border-dashed border-brand-black/20 hover:border-brand-orange rounded-xl flex flex-col items-center justify-center gap-1.5 text-xs text-brand-black/40 hover:text-brand-orange transition-colors bg-[#FDFBF7] disabled:opacity-50"
                    >
                      {generatingImage ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      ) : (
                        <Sparkles className="w-5 h-5" />
                      )}
                      <span className="font-semibold text-[10px] tracking-wider uppercase">
                        {generatingImage ? 'génération...' : 'générer IA'}
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* Schedule Inline */}
              <div className="space-y-1 pt-2">
                <label className="text-[10px] font-bold text-brand-black/50 uppercase tracking-widest">Planifier</label>
                <input
                  type="datetime-local"
                  value={editSchedule}
                  onChange={(e) => setEditSchedule(e.target.value)}
                  className="w-full bg-[#FDFBF7] border border-brand-black/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand-orange"
                />
              </div>
            </div>

            {/* Colonne 2 : Éditeur de contenu */}
            <div className="bg-white border border-brand-black/10 p-6 rounded-2xl space-y-4 shadow-sm min-h-[450px] flex flex-col justify-between">
              <div className="space-y-2 flex-1">
                <h4 className="font-bold text-xs text-brand-black/40 uppercase tracking-widest border-b border-brand-black/5 pb-2">
                  Contenu
                </h4>

                {editType === 'blog' ? (
                  <RichTextEditor content={editContent} onChange={setEditContent} />
                ) : (
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={14}
                    placeholder="Le contenu généré s'affichera ici, ou rédigez-le directement..."
                    className="w-full font-mono text-xs p-4 bg-brand-sable/10 rounded-xl border border-brand-black/5 text-brand-black leading-relaxed focus:outline-none focus:border-brand-orange resize-none"
                  />
                )}
              </div>

              {editType === 'linkedin' && editContent && (
                <button
                  onClick={handleCopyToClipboard}
                  className="w-full bg-brand-black text-white hover:bg-brand-black/90 py-2.5 px-4 rounded-xl text-xs font-bold transition-all uppercase tracking-wider"
                >
                  {copySuccess ? 'Copié !' : 'Copier LinkedIn'}
                </button>
              )}
            </div>

            {/* Colonne 3 : Score & Amélioration */}
            <div className="bg-white border border-brand-black/10 p-6 rounded-2xl space-y-6 shadow-sm">
              <div className="space-y-1">
                <h4 className="font-bold text-xs text-brand-black/40 uppercase tracking-widest border-b border-brand-black/5 pb-2">
                  Score
                </h4>
                
                <div className="flex flex-col items-center py-4 space-y-4">
                  {/* Gauge */}
                  <div className="relative w-28 h-28 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        className="stroke-brand-black/5 fill-none"
                        strokeWidth="7"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        className={`fill-none transition-all duration-300 ${
                          editScore >= (editType === 'blog' ? 95 : 90)
                            ? 'stroke-emerald-500'
                            : 'stroke-red-500'
                        }`}
                        strokeWidth="7"
                        strokeDasharray={263.8}
                        strokeDashoffset={263.8 - (263.8 * editScore) / 100}
                      />
                    </svg>
                    <span className="absolute text-2xl font-extrabold text-brand-black">{editScore}</span>
                  </div>

                  {/* Checklist criteria */}
                  {editScore > 0 && (
                    <div className="w-full space-y-2 text-xs font-semibold pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-brand-black/60">Titre optimisé</span>
                        <span className="flex items-center text-emerald-600">
                          <Check className="w-3.5 h-3.5" />
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-brand-black/60">Meta description</span>
                        {editScore >= 90 ? (
                          <span className="flex items-center text-emerald-600">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="flex items-center text-red-500">
                            <X className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-brand-black/60">Liens internes</span>
                        {editScore >= 95 ? (
                          <span className="flex items-center text-emerald-600">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="flex items-center text-red-500">
                            <X className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Améliorer Outlined Button */}
                  {editScore > 0 && editScore < (editType === 'blog' ? 95 : 90) && (
                    <button
                      onClick={handleOptimizeAI}
                      disabled={optimizing}
                      className="w-full border border-brand-orange text-brand-orange hover:bg-brand-sable/30 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all uppercase tracking-wider"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${optimizing ? 'animate-spin' : ''}`} />
                      Améliorer
                    </button>
                  )}
                </div>
              </div>

              {/* Bottom Publish Lock button */}
              <div className="pt-4 border-t border-brand-black/5">
                <button
                  onClick={handleSave}
                  disabled={editScore < (editType === 'blog' ? 95 : 90)}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-bold text-white shadow-sm flex items-center justify-center gap-2 transition-all uppercase tracking-wider ${
                    editScore >= (editType === 'blog' ? 95 : 90)
                      ? 'bg-brand-orange hover:bg-brand-orange/95'
                      : 'bg-brand-black/25 cursor-not-allowed text-brand-black/40'
                  }`}
                >
                  Publier
                  {editScore < (editType === 'blog' ? 95 : 90) && (
                    <Lock className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // ==========================================
        // ÉCRAN 1 : ACCUEIL DES CONTENUS (Brouillons, planifiés, publiés)
        // ==========================================
        <div className="space-y-6">
          {/* Sub Header tabs */}
          <div className="flex items-center justify-between border-b border-brand-black/10 pb-4">
            <h2 className="text-xl font-bold text-brand-black tracking-tight">Contenus</h2>
            <div className="flex gap-2 bg-brand-sable/30 p-1 rounded-xl border border-brand-black/5">
              <button
                onClick={() => setActiveSubTab('blog')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeSubTab === 'blog'
                    ? 'bg-brand-orange text-white'
                    : 'text-brand-black/60 hover:text-brand-black'
                }`}
              >
                Blog
              </button>
              <button
                onClick={() => setActiveSubTab('linkedin')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeSubTab === 'linkedin'
                    ? 'bg-brand-orange text-white'
                    : 'text-brand-black/60 hover:text-brand-black'
                }`}
              >
                LinkedIn
              </button>
            </div>
          </div>

          {/* Stat boxes at top */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-brand-sable border border-brand-black/10 p-6 rounded-2xl shadow-sm text-center">
              <span className="text-2xl font-black text-brand-black block mb-0.5">{stats.drafts}</span>
              <span className="text-[10px] font-bold text-brand-black/40 uppercase tracking-widest">brouillons</span>
            </div>
            <div className="bg-brand-sable border border-brand-black/10 p-6 rounded-2xl shadow-sm text-center">
              <span className="text-2xl font-black text-brand-black block mb-0.5">{stats.scheduled}</span>
              <span className="text-[10px] font-bold text-brand-black/40 uppercase tracking-widest">planifiés</span>
            </div>
            <div className="bg-brand-sable border border-brand-black/10 p-6 rounded-2xl shadow-sm text-center">
              <span className="text-2xl font-black text-brand-black block mb-0.5">{stats.published}</span>
              <span className="text-[10px] font-bold text-brand-black/40 uppercase tracking-widest">publiés</span>
            </div>
          </div>

          {/* Listing Rows (Instead of cards to match wireframe Écran 1) */}
          <div className="space-y-3 pt-4">
            {loading && items.length === 0 ? (
              <div className="space-y-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="bg-white border border-brand-black/10 p-5 rounded-2xl flex items-center justify-between gap-4 animate-pulse">
                    <div className="space-y-2 flex-1">
                      <div className="h-3 w-1/3 bg-brand-black/10 rounded" />
                      <div className="h-2.5 w-16 bg-brand-black/5 rounded" />
                    </div>
                    <div className="h-2 w-40 bg-brand-black/5 rounded-full" />
                  </div>
                ))}
              </div>
            ) : filteredItems.length > 0 ? (
              filteredItems.map(item => {
                const score = item.type === 'blog' ? item.seo_score : item.channel_score;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectItem(item)}
                    className="bg-white border border-brand-black/10 hover:border-brand-orange p-5 rounded-2xl cursor-pointer hover:shadow-sm transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                  >
                    <div className="space-y-1 flex-1">
                      <span className="text-xs font-semibold text-brand-black">
                        {item.title}
                      </span>
                      <span className="text-[10px] text-brand-black/40 font-bold uppercase tracking-wider ml-2 bg-brand-sable/50 border border-brand-black/5 px-2 py-0.5 rounded">
                        {item.status === 'scheduled' ? 'planifié' : item.status === 'published' ? 'publié' : 'brouillon'}
                      </span>
                    </div>

                    <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end flex-shrink-0">
                      {/* Horizontal progress bar for score */}
                      <div className="flex items-center gap-2.5 min-w-[140px] sm:min-w-[180px]">
                        <div className="flex-1 h-2 bg-brand-black/5 rounded-full overflow-hidden border border-brand-black/5">
                          <div 
                            className={`h-full transition-all duration-300 ${
                              score >= (item.type === 'blog' ? 95 : 90)
                                ? 'bg-emerald-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${score}%` }}
                          />
                        </div>
                        <span className="text-xs font-extrabold text-brand-black w-8 text-right">
                          {score} %
                        </span>
                      </div>

                      {/* Suppression */}
                      <button
                        type="button"
                        onClick={(e) => handleDelete(item.id, e)}
                        aria-label="Supprimer ce contenu"
                        className="p-1.5 rounded-lg text-brand-black/40 hover:text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      {/* Edit link */}
                      <span className="text-xs font-semibold text-brand-black/60 group-hover:text-brand-orange transition-colors flex items-center gap-0.5">
                        Éditer
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="h-60 flex flex-col items-center justify-center border border-dashed border-brand-black/15 bg-white rounded-2xl gap-4">
                <p className="text-xs font-semibold text-brand-black/40">Aucun contenu disponible pour le moment</p>
                <button
                  onClick={handleStartNew}
                  className="bg-brand-sable text-brand-black border border-brand-black/10 px-4 py-2 rounded-xl text-xs font-bold hover:bg-brand-sable/80 transition-all uppercase tracking-wider"
                >
                  Rédiger mon premier post
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
