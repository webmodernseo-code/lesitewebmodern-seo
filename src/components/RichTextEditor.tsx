'use client';

import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  Quote,
  Undo2,
  Redo2,
  Link as LinkIcon,
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (html: string) => void;
}

const COLORS = ['#000000', '#ff4d00', '#5c5c64', '#0FAC71', '#8b5cf6'];

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      TextStyle,
      Color,
      Underline,
      Link.configure({ openOnClick: false }),
      Placeholder.configure({ placeholder: 'Rédigez votre article ici, ou générez-le avec Claude IA...' }),
    ],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'wms-richtext-content focus:outline-none min-h-[280px] text-sm',
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Garde l'éditeur synchronisé si le contenu externe change (ex: génération IA)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  if (!editor) return null;

  const btnClass = (active: boolean) =>
    `p-1.5 rounded-lg transition-colors ${
      active ? 'bg-brand-orange text-white' : 'text-brand-black/50 hover:bg-brand-sable/50 hover:text-brand-black'
    }`;

  return (
    <div className="border border-brand-black/10 rounded-xl overflow-hidden">
      {/* Barre d'outils */}
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-brand-black/10 bg-brand-sable/10">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive('bold'))} title="Gras">
          <Bold className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive('italic'))} title="Italique">
          <Italic className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleUnderline().run()} className={btnClass(editor.isActive('underline'))} title="Souligné">
          <UnderlineIcon className="w-3.5 h-3.5" />
        </button>

        <span className="w-px h-5 bg-brand-black/10 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={`${btnClass(editor.isActive('heading', { level: 1 }))} text-[11px] font-black px-2`}
          title="Titre 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`${btnClass(editor.isActive('heading', { level: 2 }))} text-[11px] font-black px-2`}
          title="Titre 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`${btnClass(editor.isActive('heading', { level: 3 }))} text-[11px] font-black px-2`}
          title="Titre 3"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`${btnClass(editor.isActive('paragraph'))} text-[11px] font-bold px-2`}
          title="Paragraphe"
        >
          P
        </button>

        <span className="w-px h-5 bg-brand-black/10 mx-1" />

        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive('bulletList'))} title="Liste à puces">
          <List className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive('orderedList'))} title="Liste numérotée">
          <ListOrdered className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btnClass(editor.isActive('blockquote'))} title="Citation">
          <Quote className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt('URL du lien :', editor.getAttributes('link').href || '');
            if (url === null) return;
            if (url === '') {
              editor.chain().focus().extendMarkRange('link').unsetLink().run();
            } else {
              editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
            }
          }}
          className={btnClass(editor.isActive('link'))}
          title="Lien"
        >
          <LinkIcon className="w-3.5 h-3.5" />
        </button>

        <span className="w-px h-5 bg-brand-black/10 mx-1" />

        {/* Couleur du texte */}
        <div className="flex items-center gap-1">
          {COLORS.map((color) => (
            <button
              key={color}
              type="button"
              onClick={() => editor.chain().focus().setColor(color).run()}
              className="w-4 h-4 rounded-full border border-black/10 shrink-0"
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetColor().run()}
            className="text-[9px] font-bold text-brand-black/40 hover:text-brand-black px-1"
            title="Retirer la couleur"
          >
            ✕
          </button>
        </div>

        <span className="flex-1" />

        <button type="button" onClick={() => editor.chain().focus().undo().run()} className={btnClass(false)} title="Annuler">
          <Undo2 className="w-3.5 h-3.5" />
        </button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className={btnClass(false)} title="Rétablir">
          <Redo2 className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Zone d'édition */}
      <div className="p-4 max-h-[420px] overflow-y-auto">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
