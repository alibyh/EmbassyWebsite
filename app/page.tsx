'use client';

import { Header } from '@/widgets/Header';
import { Hero } from '@/widgets/Hero';
import { Announcements } from '@/widgets/Announcements';
import { ConsularServices } from '@/widgets/ConsularServices';
import { EmergencyContacts } from '@/widgets/EmergencyContacts';
import { About } from '@/widgets/About';
import { Crew } from '@/widgets/Crew';
import { Footer } from '@/widgets/Footer';
import { useEffect, useState } from 'react';

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // On mobile: show only Hero and Announcements
  // On desktop: show all sections
  if (isMobile) {
    return (
      <>
        <Header />
        <main>
          <Hero />
          <Announcements />
        </main>
        <Footer />
      </>
    );
  }

  // Desktop: show all sections
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Announcements />
        <ConsularServices />
        <EmergencyContacts />
        <About />
        <Crew />
      </main>
      <Footer />
    </>
  );
}
