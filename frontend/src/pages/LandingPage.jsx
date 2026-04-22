import React from 'react';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';
import LogoMarquee from '../components/LogoMarquee.jsx';

import Hero from '../sections/Hero.jsx';
import Features from '../sections/Features.jsx';
import Testimonials from '../sections/Testimonials.jsx';
import Pricing from '../sections/Pricing.jsx';

import FAQ from '../sections/FAQ.jsx';

export default function LandingPage({ isDark, setIsDark }) {
  return (
    <div className="relative z-10">
      <Navbar isDark={isDark} setIsDark={setIsDark} />

      <div className="relative pt-25 md:pt-28">
        <Hero />
      </div>
      
      <LogoMarquee />
      <Features />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}
