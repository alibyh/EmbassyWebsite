'use client';

import { useEffect } from 'react';
import { useAuth } from '@/shared/lib/auth';
import { Container } from '@/shared/ui/Container';
import { Button } from '@/shared/ui/Button';
import { Header } from '@/widgets/Header';
import { Footer } from '@/widgets/Footer';
import styles from './Admin.module.css';

export default function AdminDashboard() {
  const { user, loading } = useAuth();

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

  return (
    <>
      <Header />
      <main className={styles.main}>
        <Container>
          <div className={styles.dashboard}>
            <h1 className={styles.title}>Admin Dashboard</h1>
            <p className={styles.subtitle}>Manage your embassy website content</p>

            <div className={styles.cards}>
              <div className={styles.card}>
                <div className={styles.cardIcon}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 20H5C3.89543 20 3 19.1046 3 18V6C3 4.89543 3.89543 4 5 4H9L11 6H19C20.1046 6 21 6.89543 21 8V18C21 19.1046 20.1046 20 19 20Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 13H15M9 9H15M9 17H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h2 className={styles.cardTitle}>Add News</h2>
                <p className={styles.cardDescription}>Create and publish news articles with photos, titles, and content</p>
                <Button
                  variant="primary"
                  onClick={() => window.location.href = '/EmbassyWebsite/admin/news/add/'}
                  className={styles.cardButton}
                >
                  Add News Article
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

