import React, { useEffect, useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Sparkles, 
  Image as ImageIcon, 
  ArrowLeft,
  BookOpen,
  MessageSquare,
  Copy,
  ChevronRight,
  RefreshCw,
  AlertTriangle,
  Lock,
  Check,
  X
} from 'lucide-react';
import { dbService } from '@/lib/content-client';
import { ContentItem, ContentType, ContentStatus } from '@/types';

interface ContentTabProps {
  newTrigger?: number;
}

// Mock content generation matching design guidelines
const generateMockContent = (type: ContentType, title: string, focusKeyword: string) => {
  if (type === 'blog') {
    return `
      <h2 style="color:#000000; border-bottom:2px solid #ff4d00; padding-bottom:8px; margin-top:24px; font-weight:700;">H2 orange</h2>
      <p style="margin:16px 0; line-height:1.7; color:#000000;">Découvrez comment optimiser votre référencement grâce à nos conseils d'experts. Le mot-clé <strong>${focusKeyword || 'stratégie SEO'}</strong> doit être intégré de manière fluide dans vos paragraphes pour maximiser la pertinence.</p>
      
      <div style="background:#F5E6D3; border-left:4px solid #ff4d00; padding:20px; border-radius:8px; margin:24px 0; color:#000000;">
        <strong>À retenir :</strong> L'expérience utilisateur (SXO) prime sur la sur-optimisation sémantique.
      </div>
      
      <p style="margin:16px 0; line-height:1.7; color:#000000;">Assurez-vous de structurer votre contenu avec des titres clairs et d'insérer des liens internes pertinents pour guider vos lecteurs.</p>
      
      <a href="#" style="display:inline-block; background:#ff4d00; color:#FFFFFF; padding:14px 28px; border-radius:8px; font-weight:600; text-decoration:none; margin:16px 0;">CTA</a>
    `;
  } else {
    return `Formule LinkedIn performante 📈

Voici comment capter l'attention en 3 étapes :
- Un Hook de 3 lignes intriguant.
- Une leçon métier claire tirée de votre expérience.
- Une question ouverte à la fin pour susciter les commentaires.

Donnez de la valeur brute, sans détours.

#copywriting #linkedin`;
  }
};

export const ContentTab: React.FC<ContentTabProps> = ({ newTrigger }) => {
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
  const [editSchedule, setEditSchedule] = useState('');
  const [editScore, setEditScore] = useState(0);

  // IA State simulation
  const [generating, setGenerating] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

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
    setEditSchedule(item.scheduled_at ? item.scheduled_at.substring(0, 16) : '');
    setEditScore(item.type === 'blog' ? item.seo_score : item.channel_score);
    setIsEditing(true);
  };

  const handleStartNew = () => {
    setSelectedItem(null);
    setEditTitle('');
    setEditType(activeSubTab); // inherit the active sub tab (Blog/LinkedIn)
    setEditBrief('');
    setEditKeyword('');
    setEditContent('');
    setEditMetaDesc('');
    setEditImage('');
    setEditSchedule('');
    setEditScore(0);
    setIsEditing(true);
  };

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Voulez-vous supprimer ce contenu ?')) return;
    try {
      await dbService.deleteContentItem(id);
      if (selectedItem?.id === id) {
        setIsEditing(false);
        setSelectedItem(null);
      }
      await loadItems();
    } catch (err) {
      console.error(err);
    }
  };

  // AI Content generation simulation
  const handleGenerateAI = async () => {
    if (!editTitle.trim()) return alert('Veuillez entrer un titre avant de lancer la génération.');
    
    try {
      setGenerating(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const generated = generateMockContent(editType, editTitle, editKeyword);
      setEditContent(generated);
      
      // Seed initial score (sub-optimal to show feedback loop)
      const initialScore = editType === 'blog' ? 87 : 81;
      setEditScore(initialScore);
      
      if (editType === 'blog') {
        setEditMetaDesc(`Découvrez notre guide complet sur ${editTitle}.`);
      }
    } catch (err) {
      console.error(err);
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

  // Image upload mock
  const handleTriggerUpload = () => {
    setEditImage('https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60');
  };

  // Save content
  const handleSave = async () => {
    if (!editTitle.trim()) return alert('Titre obligatoire');
    
    try {
      const payload: Partial<ContentItem> = {
        title: editTitle,
        type: editType,
        brief: editBrief,
        focus_keyword: editKeyword,
        content: editContent,
        meta_description: editMetaDesc,
        featured_image: editImage,
        scheduled_at: editSchedule || undefined,
        seo_score: editType === 'blog' ? editScore : 0,
        channel_score: editType === 'linkedin' ? editScore : 0,
        status: editSchedule ? 'scheduled' : (selectedItem?.status || 'draft')
      };

      if (selectedItem) {
        await dbService.updateContentItem(selectedItem.id, payload);
      } else {
        await dbService.createContentItem(payload);
      }

      setIsEditing(false);
      setSelectedItem(null);
      await loadItems();
    } catch (err) {
      console.error(err);
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
                {editImage ? (
                  <div className="border border-brand-black/10 rounded-xl overflow-hidden relative h-32 flex items-center justify-center bg-brand-sable/10 group">
                    <img src={editImage} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setEditImage('')}
                      className="absolute top-2 right-2 bg-brand-black/80 hover:bg-brand-black text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleTriggerUpload}
                    className="w-full h-24 border border-dashed border-brand-black/20 hover:border-brand-orange rounded-xl flex flex-col items-center justify-center gap-1.5 text-xs text-brand-black/40 hover:text-brand-orange transition-colors bg-[#FDFBF7]"
                  >
                    <ImageIcon className="w-5 h-5" />
                    <span className="font-semibold text-[10px] tracking-wider uppercase">gén. / upload</span>
                  </button>
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

            {/* Colonne 2 : Aperçu Stylé */}
            <div className="bg-white border border-brand-black/10 p-6 rounded-2xl space-y-4 shadow-sm min-h-[450px] flex flex-col justify-between">
              <div className="space-y-2">
                <h4 className="font-bold text-xs text-brand-black/40 uppercase tracking-widest border-b border-brand-black/5 pb-2">
                  Aperçu Stylé
                </h4>
                
                {editContent ? (
                  editType === 'blog' ? (
                    <div 
                      className="prose prose-sm max-w-none text-brand-black font-sans leading-relaxed text-sm select-text"
                      dangerouslySetInnerHTML={{ __html: editContent }}
                    />
                  ) : (
                    <div className="whitespace-pre-wrap font-mono text-xs p-4 bg-brand-sable/10 rounded-xl border border-brand-black/5 text-brand-black leading-relaxed">
                      {editContent}
                    </div>
                  )
                ) : (
                  <div className="py-20 text-center text-xs font-semibold text-brand-black/30">
                    Le contenu généré s'affichera ici.
                  </div>
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
              <div className="py-20 text-center text-sm font-semibold text-brand-black/45 bg-white border border-brand-black/10 rounded-2xl">
                Chargement des contenus...
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
