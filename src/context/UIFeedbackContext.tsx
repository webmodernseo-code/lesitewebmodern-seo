'use client';

import React, { createContext, useCallback, useContext, useState } from 'react';
import { Check, AlertTriangle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

interface ConfirmOptions {
  title?: string;
  danger?: boolean;
  confirmLabel?: string;
  cancelLabel?: string;
}

interface ConfirmState extends ConfirmOptions {
  message: string;
  resolve: (value: boolean) => void;
}

interface PromptOptions {
  title?: string;
  placeholder?: string;
  confirmLabel?: string;
  cancelLabel?: string;
}

interface PromptState extends PromptOptions {
  defaultValue: string;
  resolve: (value: string | null) => void;
}

interface UIFeedbackContextType {
  toast: {
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
  };
  confirm: (message: string, options?: ConfirmOptions) => Promise<boolean>;
  promptText: (defaultValue: string, options?: PromptOptions) => Promise<string | null>;
}

const UIFeedbackContext = createContext<UIFeedbackContextType | undefined>(undefined);

export const UIFeedbackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const [confirmState, setConfirmState] = useState<ConfirmState | null>(null);
  const [promptState, setPromptState] = useState<PromptState | null>(null);
  const [promptValue, setPromptValue] = useState('');

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const pushToast = useCallback((type: ToastType, message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => dismissToast(id), 3800);
  }, [dismissToast]);

  const toast = {
    success: (message: string) => pushToast('success', message),
    error: (message: string) => pushToast('error', message),
    info: (message: string) => pushToast('info', message),
  };

  const confirm = useCallback((message: string, options?: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setConfirmState({ message, resolve, ...options });
    });
  }, []);

  const handleConfirm = (value: boolean) => {
    confirmState?.resolve(value);
    setConfirmState(null);
  };

  const promptText = useCallback((defaultValue: string, options?: PromptOptions) => {
    return new Promise<string | null>((resolve) => {
      setPromptValue(defaultValue);
      setPromptState({ defaultValue, resolve, ...options });
    });
  }, []);

  const handlePrompt = (value: string | null) => {
    promptState?.resolve(value);
    setPromptState(null);
  };

  return (
    <UIFeedbackContext.Provider value={{ toast, confirm, promptText }}>
      {children}

      {/* Toast stack */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-2.5 w-[calc(100%-3rem)] max-w-sm pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto animate-toastIn flex items-start gap-3 bg-white border rounded-xl shadow-lg px-4 py-3.5 ${
              t.type === 'success' ? 'border-emerald-200' : t.type === 'error' ? 'border-red-200' : 'border-brand-black/10'
            }`}
          >
            <div
              className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                t.type === 'success'
                  ? 'bg-emerald-50 text-emerald-600'
                  : t.type === 'error'
                  ? 'bg-red-50 text-red-500'
                  : 'bg-brand-sable text-brand-orange'
              }`}
            >
              {t.type === 'success' ? (
                <Check className="w-3.5 h-3.5" />
              ) : t.type === 'error' ? (
                <AlertTriangle className="w-3.5 h-3.5" />
              ) : (
                <Info className="w-3.5 h-3.5" />
              )}
            </div>
            <p className="text-xs font-semibold text-brand-black leading-snug flex-1 pt-0.5">{t.message}</p>
            <button
              onClick={() => dismissToast(t.id)}
              className="text-brand-black/30 hover:text-brand-black transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Confirm dialog */}
      {confirmState && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 animate-fadeIn"
          onClick={() => handleConfirm(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-5 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-brand-black">{confirmState.title || "Confirmer l'action"}</h3>
              <p className="text-xs text-brand-black/60 leading-relaxed">{confirmState.message}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => handleConfirm(false)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold border border-brand-black/10 text-brand-black/70 hover:bg-brand-sable/30 transition-colors"
              >
                {confirmState.cancelLabel || 'Annuler'}
              </button>
              <button
                onClick={() => handleConfirm(true)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold text-white transition-colors ${
                  confirmState.danger ? 'bg-red-500 hover:bg-red-600' : 'bg-brand-orange hover:bg-brand-orange/90'
                }`}
              >
                {confirmState.confirmLabel || 'Confirmer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Prompt dialog */}
      {promptState && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 animate-fadeIn"
          onClick={() => handlePrompt(null)}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault();
              if (promptValue.trim()) handlePrompt(promptValue.trim());
            }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 space-y-4 animate-scaleIn"
          >
            <h3 className="text-sm font-bold text-brand-black">{promptState.title || 'Renseignez une valeur'}</h3>
            <input
              autoFocus
              type="text"
              value={promptValue}
              onChange={(e) => setPromptValue(e.target.value)}
              placeholder={promptState.placeholder}
              className="w-full bg-[#FDFBF7] border border-brand-black/10 rounded-lg px-4 py-2.5 text-sm text-brand-black focus:outline-none focus:border-brand-orange"
            />
            <div className="flex gap-3 pt-1">
              <button
                type="button"
                onClick={() => handlePrompt(null)}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold border border-brand-black/10 text-brand-black/70 hover:bg-brand-sable/30 transition-colors"
              >
                {promptState.cancelLabel || 'Annuler'}
              </button>
              <button
                type="submit"
                disabled={!promptValue.trim()}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-brand-orange hover:bg-brand-orange/90 text-white transition-colors disabled:opacity-40"
              >
                {promptState.confirmLabel || 'Valider'}
              </button>
            </div>
          </form>
        </div>
      )}
    </UIFeedbackContext.Provider>
  );
};

export const useUIFeedback = () => {
  const context = useContext(UIFeedbackContext);
  if (context === undefined) {
    throw new Error('useUIFeedback must be used within a UIFeedbackProvider');
  }
  return context;
};
