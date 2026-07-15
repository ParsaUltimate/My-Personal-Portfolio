import { CustomCursor } from '@/components/portfolio/CustomCursor';
import { Navigation } from '@/components/portfolio/Navigation';
import { Footer } from '@/components/portfolio/Footer';
import { ScrollProgress } from '@/components/portfolio/ScrollProgress';
import { Downloads } from '@/components/portfolio/Downloads';

const DownloadsPage = () => {
  return (
    <main className="min-h-screen bg-[#050506] particle-bg">
      <CustomCursor />
      <ScrollProgress />
      <Navigation />

      <div className="pt-24 sm:pt-32">
        <Downloads />
      </div>

      <Footer />
    </main>
  );
};

export default DownloadsPage;
