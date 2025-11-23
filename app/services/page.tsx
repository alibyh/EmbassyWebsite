import { Header } from '@/widgets/Header';
import { ConsularServices } from '@/widgets/ConsularServices';
import { Footer } from '@/widgets/Footer';

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <ConsularServices />
      </main>
      <Footer />
    </>
  );
}

