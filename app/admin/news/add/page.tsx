'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/shared/lib/auth';
import { useI18n } from '@/shared/lib/i18n';
import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { getSupabaseClient, isSupabaseConfigured } from '@/shared/lib/supabase';
import { translateToAllLanguages, TranslateLanguage } from '@/shared/lib/translate/yandex';
import { locales } from '@/shared/lib/i18n/types';
import styles from './AddNews.module.css';

interface Translations {
  en: string;
  ru: string;
  ar: string;
  fr: string;
}

export default function AddNewsPage() {
  const { user, loading } = useAuth();
  const { t } = useI18n();
  const [sourceLanguage, setSourceLanguage] = useState<TranslateLanguage>('en');
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    photo: null as File | null,
  });
  const [translations, setTranslations] = useState<{
    title: Translations;
    text: Translations;
  }>({
    title: { en: '', ru: '', ar: '', fr: '' },
    text: { en: '', ru: '', ar: '', fr: '' },
  });
  const [showTranslations, setShowTranslations] = useState(false);
  const [translating, setTranslating] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/EmbassyWebsite/';
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <p>{t.common.loading}</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTranslate = async () => {
    if (!formData.title.trim() && !formData.text.trim()) {
      setError(t.admin.addNews.errors.translateFirst);
      return;
    }

    setTranslating(true);
    setError(null);

    try {
      const titleTranslations = formData.title.trim()
        ? await translateToAllLanguages(formData.title, sourceLanguage)
        : { en: '', ru: '', ar: '', fr: '' };

      const textTranslations = formData.text.trim()
        ? await translateToAllLanguages(formData.text, sourceLanguage)
        : { en: '', ru: '', ar: '', fr: '' };

      setTranslations({
        title: titleTranslations,
        text: textTranslations,
      });
      setShowTranslations(true);
    } catch (err: any) {
      setError(`Translation failed: ${err.message || 'Unknown error'}`);
    } finally {
      setTranslating(false);
    }
  };

  const handleTranslationChange = (
    field: 'title' | 'text',
    language: TranslateLanguage,
    value: string
  ) => {
    setTranslations((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [language]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setUploading(true);

    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured()) {
        throw new Error(t.admin.addNews.errors.supabaseNotConfigured);
      }

      const supabaseClient = getSupabaseClient();
      if (!supabaseClient) {
        throw new Error(t.admin.addNews.errors.supabaseUnavailable);
      }

      // Validate translations
      if (!showTranslations) {
        throw new Error(t.admin.addNews.errors.translateFirst);
      }

      const hasTitle = translations.title.en || translations.title.ru || translations.title.ar || translations.title.fr;
      const hasText = translations.text.en || translations.text.ru || translations.text.ar || translations.text.fr;

      if (!hasTitle || !hasText) {
        throw new Error(t.admin.addNews.errors.fillAll);
      }

      let photoUrl = '';

      // Upload photo if provided
      if (formData.photo) {
        const fileExt = formData.photo.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `news/${fileName}`;

        const { error: uploadError } = await supabaseClient.storage
          .from('news-photos')
          .upload(filePath, formData.photo);

        if (uploadError) {
          throw uploadError;
        }

        const { data: { publicUrl } } = supabaseClient.storage
          .from('news-photos')
          .getPublicUrl(filePath);

        photoUrl = publicUrl;
      }

      // Save news article to database with translations
      const { error: dbError } = await supabaseClient
        .from('news')
        .insert([
          {
            title_en: translations.title.en,
            title_ru: translations.title.ru,
            title_ar: translations.title.ar,
            title_fr: translations.title.fr,
            text_en: translations.text.en,
            text_ru: translations.text.ru,
            text_ar: translations.text.ar,
            text_fr: translations.text.fr,
            photo_url: photoUrl,
            created_at: new Date().toISOString(),
            created_by: user.id,
          },
        ]);

      if (dbError) {
        throw dbError;
      }

      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/EmbassyWebsite/admin/';
      }, 2000);
    } catch (err: any) {
      setError(err.message || t.admin.addNews.errors.saveFailed);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Container>
          <div className={styles.page}>
            <div className={styles.header}>
              <Button
                variant="ghost"
                onClick={() => window.location.href = '/EmbassyWebsite/admin/'}
                className={styles.backButton}
              >
                {t.admin.addNews.backButton}
              </Button>
              <h1 className={styles.title}>{t.admin.addNews.title}</h1>
              <p className={styles.subtitle}>{t.admin.addNews.subtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Language Selection */}
              <div className={styles.field}>
                <label htmlFor="sourceLanguage" className={styles.label}>
                  {t.admin.addNews.sourceLanguage.label}
                </label>
                <select
                  id="sourceLanguage"
                  value={sourceLanguage}
                  onChange={(e) => {
                    setSourceLanguage(e.target.value as TranslateLanguage);
                    setShowTranslations(false);
                    setTranslations({
                      title: { en: '', ru: '', ar: '', fr: '' },
                      text: { en: '', ru: '', ar: '', fr: '' },
                    });
                  }}
                  className={styles.select}
                  required
                >
                  {locales.map((locale) => (
                    <option key={locale.code} value={locale.code}>
                      {locale.name}
                    </option>
                  ))}
                </select>
                <p className={styles.hint}>
                  {t.admin.addNews.sourceLanguage.hint}
                </p>
              </div>

              {/* Photo Upload */}
              <div className={styles.field}>
                <label htmlFor="photo" className={styles.label}>
                  {t.admin.addNews.photo.label}
                </label>
                <div className={styles.photoUpload}>
                  <input
                    id="photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className={styles.fileInput}
                  />
                  {preview ? (
                    <div className={styles.preview}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={preview} alt="Preview" />
                      <button
                        type="button"
                        onClick={() => {
                          setPreview(null);
                          setFormData({ ...formData, photo: null });
                        }}
                        className={styles.removePhoto}
                      >
                        {t.admin.addNews.photo.remove}
                      </button>
                    </div>
                  ) : (
                    <label htmlFor="photo" className={styles.uploadArea}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>{t.admin.addNews.photo.uploadArea}</span>
                      <span className={styles.uploadHint}>{t.admin.addNews.photo.uploadHint}</span>
                    </label>
                  )}
                </div>
              </div>

              {/* Title Input */}
              <div className={styles.field}>
                <label htmlFor="title" className={styles.label}>
                  {t.admin.addNews.titleLabel} ({locales.find(l => l.code === sourceLanguage)?.name}) *
                </label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={styles.input}
                  placeholder={`${t.admin.addNews.titlePlaceholder} ${locales.find(l => l.code === sourceLanguage)?.name}`}
                  required
                />
              </div>

              {/* Content Input */}
              <div className={styles.field}>
                <label htmlFor="text" className={styles.label}>
                  {t.admin.addNews.contentLabel} ({locales.find(l => l.code === sourceLanguage)?.name}) *
                </label>
                <textarea
                  id="text"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  className={styles.textarea}
                  placeholder={`${t.admin.addNews.contentPlaceholder} ${locales.find(l => l.code === sourceLanguage)?.name}`}
                  rows={10}
                  required
                />
              </div>

              {/* Translate Button */}
              {!showTranslations && (
                <div className={styles.field}>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleTranslate}
                    disabled={translating || !formData.title.trim() || !formData.text.trim()}
                    className={styles.translateButton}
                  >
                    {translating ? t.admin.addNews.translate.translating : t.admin.addNews.translate.button}
                  </Button>
                  {translating && (
                    <p className={styles.hint}>{t.admin.addNews.translate.hint}</p>
                  )}
                </div>
              )}

              {/* Translations Preview/Edit */}
              {showTranslations && (
                <div className={styles.translationsSection}>
                  <h3 className={styles.translationsTitle}>{t.admin.addNews.translations.title}</h3>
                  <p className={styles.translationsHint}>
                    {t.admin.addNews.translations.hint}
                  </p>

                  {locales.map((locale) => (
                    <div key={locale.code} className={styles.translationBlock}>
                      <div className={styles.translationHeader}>
                        <h4 className={styles.translationLanguage}>
                          {locale.name} ({locale.code.toUpperCase()})
                        </h4>
                      </div>

                      <div className={styles.translationFields}>
                        <div className={styles.translationField}>
                          <label className={styles.translationLabel}>{t.admin.addNews.translations.titleLabel}</label>
                          <input
                            type="text"
                            value={translations.title[locale.code as TranslateLanguage]}
                            onChange={(e) =>
                              handleTranslationChange('title', locale.code as TranslateLanguage, e.target.value)
                            }
                            className={styles.input}
                            required
                          />
                        </div>

                        <div className={styles.translationField}>
                          <label className={styles.translationLabel}>{t.admin.addNews.translations.contentLabel}</label>
                          <textarea
                            value={translations.text[locale.code as TranslateLanguage]}
                            onChange={(e) =>
                              handleTranslationChange('text', locale.code as TranslateLanguage, e.target.value)
                            }
                            className={styles.textarea}
                            rows={8}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  <div className={styles.field}>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setShowTranslations(false);
                        setFormData({ title: '', text: '', photo: formData.photo });
                      }}
                    >
                      {t.admin.addNews.actions.startOver}
                    </Button>
                  </div>
                </div>
              )}

              {error && (
                <div className={styles.error} role="alert">
                  {error}
                </div>
              )}

              {success && (
                <div className={styles.success} role="alert">
                  {t.admin.addNews.success}
                </div>
              )}

              <div className={styles.actions}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.location.href = '/EmbassyWebsite/admin/'}
                  disabled={uploading}
                >
                  {t.admin.addNews.actions.cancel}
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={uploading || success || !showTranslations}
                >
                  {uploading ? t.admin.addNews.actions.publishing : success ? t.admin.addNews.actions.published : t.admin.addNews.actions.publish}
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
