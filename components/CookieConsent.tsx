import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Cookie, Settings2, ShieldCheck, X } from 'lucide-react';
import { Language } from '../types';

interface CookieConsentProps {
  lang: Language;
  onAccept: () => void;
  onDecline: () => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ lang, onAccept, onDecline }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferenceStorage, setPreferenceStorage] = useState(true);

  useEffect(() => {
    setIsVisible(true);

    const savedPreference = localStorage.getItem('pbp_cookie_pref_settings');
    if (savedPreference !== null) {
      setPreferenceStorage(savedPreference === 'true');
    }
  }, []);

  const t = lang === 'EN'
    ? {
        title: 'Your privacy choices',
        description: 'We use browser storage to remember your cookie choice and, if you allow it, your language and display theme.',
        necessary: 'Necessary storage',
        necessaryDescription: 'Remembers your privacy choice so this notice does not appear again.',
        preferences: 'Language and theme',
        preferencesDescription: 'Saves your selected language and light or dark display theme on this device.',
        alwaysOn: 'Always on',
        manage: 'Cookie settings',
        reject: 'Reject optional',
        accept: 'Allow preferences',
        save: 'Save choices',
        back: 'Back',
        dialogTitle: 'Cookie settings',
        sectionLabel: 'Privacy',
        close: 'Close cookie settings',
      }
    : {
        title: 'Pilihan privasi Anda',
        description: 'Kami menggunakan penyimpanan browser untuk mengingat pilihan cookie dan, jika Anda setuju, bahasa serta tema tampilan.',
        necessary: 'Penyimpanan wajib',
        necessaryDescription: 'Mengingat pilihan privasi Anda agar pemberitahuan ini tidak muncul kembali.',
        preferences: 'Bahasa dan tema',
        preferencesDescription: 'Menyimpan pilihan bahasa serta tema terang atau gelap di perangkat ini.',
        alwaysOn: 'Selalu aktif',
        manage: 'Atur cookie',
        reject: 'Tolak opsional',
        accept: 'Izinkan preferensi',
        save: 'Simpan pilihan',
        back: 'Kembali',
        dialogTitle: 'Pengaturan cookie',
        sectionLabel: 'Privasi',
        close: 'Tutup pengaturan cookie',
      };

  const savePreferences = () => {
    localStorage.setItem('pbp_cookie_pref_functional', 'true');
    localStorage.setItem('pbp_cookie_pref_settings', String(preferenceStorage));
    localStorage.removeItem('pbp_cookie_pref_analytics');

    if (preferenceStorage) {
      onAccept();
    } else {
      onDecline();
    }
  };

  const declineOptional = () => {
    localStorage.setItem('pbp_cookie_pref_functional', 'true');
    localStorage.setItem('pbp_cookie_pref_settings', 'false');
    localStorage.removeItem('pbp_cookie_pref_analytics');
    onDecline();
  };

  const acceptPreferences = () => {
    localStorage.setItem('pbp_cookie_pref_functional', 'true');
    localStorage.setItem('pbp_cookie_pref_settings', 'true');
    localStorage.removeItem('pbp_cookie_pref_analytics');
    onAccept();
  };

  return (
    <AnimatePresence>
      {isVisible && !showPreferences && (
        <motion.aside
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="fixed bottom-3 left-3 right-3 z-[100] sm:bottom-4 sm:left-auto sm:right-6 sm:w-full sm:max-w-md"
          id="cookie-consent-container"
          aria-label={t.title}
        >
          <div className="rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-900 shadow-[0_12px_40px_rgba(15,23,42,0.16)] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 sm:p-6">
            <div className="flex items-start gap-3.5">
              <Cookie size={20} strokeWidth={1.7} className="mt-0.5 shrink-0 text-brand-600 dark:text-brand-400" aria-hidden="true" />
              <div className="min-w-0">
                <h2 className="text-sm font-bold tracking-tight">{t.title}</h2>
                <p className="mt-1.5 text-xs leading-5 text-zinc-600 dark:text-zinc-300">{t.description}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 border-t border-zinc-200 pt-3 dark:border-zinc-700 sm:mt-5 sm:flex sm:items-center sm:justify-between sm:pt-4">
              <button
                onClick={() => setShowPreferences(true)}
                className="col-span-2 inline-flex min-h-10 items-center justify-center gap-2 border border-zinc-300 px-3 text-xs font-semibold text-zinc-700 transition-colors hover:border-zinc-500 hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 dark:border-zinc-600 dark:text-zinc-200 dark:hover:border-zinc-400 dark:hover:text-white sm:col-span-1"
                id="btn-open-cookie-settings"
              >
                <Settings2 size={14} aria-hidden="true" />
                {t.manage}
              </button>
              <div className="col-span-2 grid grid-cols-2 gap-2 sm:col-span-1">
                <button
                  onClick={declineOptional}
                  className="min-h-10 border border-zinc-300 px-3 text-xs font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
                  id="btn-decline-all-cookies"
                >
                  {t.reject}
                </button>
                <button
                  onClick={acceptPreferences}
                  className="min-h-10 bg-brand-700 px-3 text-xs font-semibold text-white transition-colors hover:bg-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  id="btn-accept-all-cookies"
                >
                  {t.accept}
                </button>
              </div>
            </div>
          </div>
        </motion.aside>
      )}

      {isVisible && showPreferences && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-zinc-950/55 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowPreferences(false);
          }}
        >
          <motion.section
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-settings-title"
            className="w-full max-w-lg border border-zinc-200 bg-white text-zinc-900 shadow-2xl dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
          >
            <header className="flex items-start justify-between border-b border-zinc-200 px-5 py-5 dark:border-zinc-700 sm:px-7">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-700 dark:text-brand-400">{t.sectionLabel}</p>
                <h2 id="cookie-settings-title" className="mt-1 text-lg font-bold tracking-tight">{t.dialogTitle}</h2>
              </div>
              <button
                onClick={() => setShowPreferences(false)}
                className="inline-flex h-9 w-9 items-center justify-center text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 dark:hover:bg-zinc-800 dark:hover:text-white"
                id="btn-close-cookie-preferences"
                aria-label={t.close}
              >
                <X size={18} aria-hidden="true" />
              </button>
            </header>

            <div className="px-5 py-5 sm:px-7">
              <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-300">{t.description}</p>

              <div className="mt-5 divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-700 dark:border-zinc-700">
                <div className="flex items-start gap-3 py-4">
                  <ShieldCheck size={18} strokeWidth={1.7} className="mt-0.5 shrink-0 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-sm font-semibold">{t.necessary}</h3>
                      <span className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{t.alwaysOn}</span>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-zinc-600 dark:text-zinc-300">{t.necessaryDescription}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 py-4">
                  <Settings2 size={18} strokeWidth={1.7} className="mt-0.5 shrink-0 text-zinc-500 dark:text-zinc-400" aria-hidden="true" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-sm font-semibold">{t.preferences}</h3>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={preferenceStorage}
                        aria-label={t.preferences}
                        onClick={() => setPreferenceStorage((enabled) => !enabled)}
                        className={`relative h-6 w-11 shrink-0 border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 ${
                          preferenceStorage
                            ? 'border-brand-700 bg-brand-700 dark:border-brand-500 dark:bg-brand-500'
                            : 'border-zinc-400 bg-zinc-200 dark:border-zinc-500 dark:bg-zinc-700'
                        }`}
                        id="toggle-pref-cookies"
                      >
                        <span
                          className={`absolute top-0.5 h-4 w-4 bg-white transition-transform ${
                            preferenceStorage ? 'translate-x-[1.25rem]' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>
                    <p className="mt-1 text-xs leading-5 text-zinc-600 dark:text-zinc-300">{t.preferencesDescription}</p>
                  </div>
                </div>
              </div>

              <footer className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
                <button
                  onClick={() => setShowPreferences(false)}
                  className="min-h-10 px-4 text-xs font-semibold text-zinc-600 transition-colors hover:text-zinc-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-600 dark:text-zinc-300 dark:hover:text-white"
                  id="btn-back-to-consent"
                >
                  {t.back}
                </button>
                <button
                  onClick={savePreferences}
                  className="inline-flex min-h-10 items-center justify-center gap-2 bg-brand-700 px-5 text-xs font-semibold text-white transition-colors hover:bg-brand-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  id="btn-confirm-selected-preferences"
                >
                  <Check size={14} aria-hidden="true" />
                  {t.save}
                </button>
              </footer>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
