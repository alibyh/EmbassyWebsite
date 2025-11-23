import { Header } from '@/widgets/Header';
import { EmergencyContacts } from '@/widgets/EmergencyContacts';
import { Footer } from '@/widgets/Footer';

export default function EmergencyPage() {
  return (
    <>
      <Header />
      <main>
        <EmergencyContacts />
      </main>
      <Footer />
    </>
  );
}

