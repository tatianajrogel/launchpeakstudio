import React from 'react';
import Header from './studio/Header';
import Hero from './studio/Hero';
import ClientFlow from './studio/ClientFlow';
import Services from './studio/Services';
import Work from './studio/Work';
import Process from './studio/Process';
import Reviews from './studio/Reviews';
import About from './studio/About';
import Faq from './studio/Faq';
import Contact from './studio/Contact';
import Footer from './studio/Footer';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen scroll-smooth bg-[#FFFBF5] font-sans text-[#2B211C] antialiased">
      <Header />
      <main>
        <Hero />
        <ClientFlow />
        <Services />
        <Work />
        <Process />
        <Reviews />
        <About />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
