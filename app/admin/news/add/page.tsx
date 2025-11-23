'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/shared/lib/auth';
import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import { getSupabaseClient, isSupabaseConfigured } from '@/shared/lib/supabase';
import styles from './AddNews.module.css';

export default function AddNewsPage() {
  const { user, loading } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    photo: null as File | null,
  });
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
        <p>Loading...</p>
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setUploading(true);

    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured()) {
        throw new Error('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.');
      }

      const supabaseClient = getSupabaseClient();
      if (!supabaseClient) {
        throw new Error('Supabase client is not available.');
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

      // Save news article to database
      const { error: dbError } = await supabaseClient
        .from('news')
        .insert([
          {
            title: formData.title,
            text: formData.text,
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
      setError(err.message || 'Failed to save news article');
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
                ← Back to Dashboard
              </Button>
              <h1 className={styles.title}>Add News Article</h1>
              <p className={styles.subtitle}>Create a new news article with photo, title, and content</p>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="photo" className={styles.label}>
                  Photo
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
                      <img src={preview} alt="Preview" />
                      <button
                        type="button"
                        onClick={() => {
                          setPreview(null);
                          setFormData({ ...formData, photo: null });
                        }}
                        className={styles.removePhoto}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <label htmlFor="photo" className={styles.uploadArea}>
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17 8L12 3L7 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M12 3V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span>Click to upload photo</span>
                      <span className={styles.uploadHint}>PNG, JPG, WEBP up to 10MB</span>
                    </label>
                  )}
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="title" className={styles.label}>
                  Title *
                </label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className={styles.input}
                  placeholder="Enter news article title"
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="text" className={styles.label}>
                  Content *
                </label>
                <textarea
                  id="text"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  className={styles.textarea}
                  placeholder="Enter news article content"
                  rows={10}
                  required
                />
              </div>

              {error && (
                <div className={styles.error} role="alert">
                  {error}
                </div>
              )}

              {success && (
                <div className={styles.success} role="alert">
                  News article created successfully! Redirecting...
                </div>
              )}

              <div className={styles.actions}>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.location.href = '/EmbassyWebsite/admin/'}
                  disabled={uploading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  disabled={uploading || success}
                >
                  {uploading ? 'Publishing...' : success ? 'Published!' : 'Publish Article'}
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

