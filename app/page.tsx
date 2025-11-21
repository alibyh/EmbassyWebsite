import { Header } from '@/widgets/Header';
import { Hero } from '@/widgets/Hero';
import { Announcements } from '@/widgets/Announcements';
import { ConsularServices } from '@/widgets/ConsularServices';
import { EmergencyContacts } from '@/widgets/EmergencyContacts';
import { About } from '@/widgets/About';
import { Crew } from '@/widgets/Crew';
import { Footer } from '@/widgets/Footer';

export default function Home() {
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
