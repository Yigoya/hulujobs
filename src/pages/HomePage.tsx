import React from 'react';
import Hero from '../components/Hero';
import ServiceCards from '../components/ServiceCards';
import PopularCategories from '../components/PopularCategories';
import FeaturedJobs from '../components/FeaturedJobs';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <ServiceCards />
      <PopularCategories />
      <FeaturedJobs />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </>
  );
};

export default HomePage;