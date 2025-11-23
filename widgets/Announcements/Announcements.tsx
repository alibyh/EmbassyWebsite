'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Container } from '@/shared/ui/Container';
import { useI18n } from '@/shared/lib/i18n';
import { getSupabaseClient, isSupabaseConfigured } from '@/shared/lib/supabase';
import styles from './Announcements.module.css';

interface NewsItem {
  id: string;
  title: string;
  text: string;
  photo_url: string | null;
  created_at: string;
}

export const Announcements: React.FC = () => {
  const { t } = useI18n();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      // Check if Supabase is properly configured
      if (!isSupabaseConfigured()) {
        // Use mock data if Supabase is not configured
        const mockNews: NewsItem[] = t.announcementsList.map((item, index) => ({
          id: `news-${index}`,
          title: item.title,
          text: item.excerpt,
          photo_url: null,
          created_at: new Date().toISOString(),
        }));
        setNews(mockNews);
        setLoading(false);
        return;
      }

      // Get Supabase client (will only return client if configured)
      const supabaseClient = getSupabaseClient();
      
      if (!supabaseClient) {
        // Fallback to mock data
        const mockNews: NewsItem[] = t.announcementsList.map((item, index) => ({
          id: `news-${index}`,
          title: item.title,
          text: item.excerpt,
          photo_url: null,
          created_at: new Date().toISOString(),
        }));
        setNews(mockNews);
        setLoading(false);
        return;
      }

      const { data, error } = await supabaseClient
        .from('news')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching news:', error);
        // Fallback to mock data if Supabase fails
        const mockNews: NewsItem[] = t.announcementsList.map((item, index) => ({
          id: `news-${index}`,
          title: item.title,
          text: item.excerpt,
          photo_url: null,
          created_at: new Date().toISOString(),
        }));
        setNews(mockNews);
      } else {
        setNews(data || []);
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      // Fallback to mock data if Supabase fails
      const mockNews: NewsItem[] = t.announcementsList.map((item, index) => ({
        id: `news-${index}`,
        title: item.title,
        text: item.excerpt,
        photo_url: null,
        created_at: new Date().toISOString(),
      }));
      setNews(mockNews);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % news.length);
  }, [news.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
  }, [news.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || news.length === 0) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide, news.length]);

  if (loading) {
    return (
      <section className={styles.section} id="announcements">
        <Container>
          <div className={styles.loading}>{t.common.loading || 'Loading...'}</div>
        </Container>
      </section>
    );
  }

  if (news.length === 0) {
    return (
      <section className={styles.section} id="announcements">
        <Container>
          <div className={styles.header}>
            <div className={styles.sectionBadge}>{t.announcements.badge}</div>
            <h2 className={styles.title}>{t.announcements.title}</h2>
            <p className={styles.description}>
              {t.announcements.description}
            </p>
          </div>
          <div className={styles.empty}>{t.announcements.empty || 'No announcements available at this time.'}</div>
        </Container>
      </section>
    );
  }

  const currentNews = news[currentIndex];

  return (
    <section className={styles.section} id="announcements">
      <Container>
        <div className={styles.header}>
          <div className={styles.sectionBadge}>{t.announcements.badge}</div>
          <h2 className={styles.title}>{t.announcements.title}</h2>
          <p className={styles.description}>
            {t.announcements.description}
          </p>
        </div>

        <div className={styles.slideshow}>
          <div className={styles.slideContainer}>
            {news.map((item, index) => (
              <div
                key={item.id}
                className={`${styles.slide} ${index === currentIndex ? styles.active : ''}`}
              >
                <div className={styles.slideContent}>
                  {item.photo_url && (
                    <div className={styles.slideImage}>
                      <img src={item.photo_url} alt={item.title} />
                    </div>
                  )}
                  <div className={styles.slideText}>
                    <div className={styles.slideDate}>
                      {new Date(item.created_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                    <h3 className={styles.slideTitle}>{item.title}</h3>
                    <p className={styles.slideDescription}>{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {news.length > 1 && (
            <>
              <button
                className={styles.navButton}
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                className={`${styles.navButton} ${styles.navButtonNext}`}
                onClick={nextSlide}
                aria-label="Next slide"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <div className={styles.dots}>
                {news.map((_, index) => (
                  <button
                    key={index}
                    className={`${styles.dot} ${index === currentIndex ? styles.active : ''}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </Container>
    </section>
  );
};
