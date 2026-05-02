import { CustomCursor } from '@/components/portfolio/CustomCursor';
import { Navigation } from '@/components/portfolio/Navigation';
import { Hero } from '@/components/portfolio/Hero';
import { FeaturedBlogs } from '@/components/portfolio/FeaturedBlogs';
import { Projects } from '@/components/portfolio/Projects';
import { LearningJourney } from '@/components/portfolio/LearningJourney';
import { About } from '@/components/portfolio/About';
import { Contact } from '@/components/portfolio/Contact';
import { Footer } from '@/components/portfolio/Footer';
import { ScrollProgress } from '@/components/portfolio/ScrollProgress';

const Index = () => {
  return (
    <main className="min-h-screen bg-gray-950 particle-bg">
      <CustomCursor />
      <ScrollProgress />
      <Navigation />

      {/* Hero Section */}
      <section id="hero">
        <Hero />
      </section>

      {/* 1) Projects */}
      <Projects />

      {/* 2) Journey */}
      <LearningJourney />

      {/* 3) About */}
      <About />

      {/* 4) Featured Blogs */}
      <FeaturedBlogs />

      {/* 5) Contact */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Index;
