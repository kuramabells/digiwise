import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { HeroSection } from '../components/about/HeroSection';
import { MissionVisionSection } from '../components/about/MissionVisionSection';
import { RiskLevelsSection } from '../components/about/RiskLevelsSection';
import { TeamSection } from '../components/about/TeamSection';
export const AboutPage = () => {
  return <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <MissionVisionSection />
        <RiskLevelsSection />
        <TeamSection />
      </main>
      <Footer />
    </div>;
};