// About.jsx
import React, { lazy, Suspense, useMemo, useEffect, startTransition } from 'react';
import AboutHero from '../components/AboutHero';
import Feature from '../components/Feature';
import FAQ from '../components/FAQ';
import Information from '../components/Information';
import Services from '../components/Services';
import Testimonials from '../components/TestimonialItem';

const InstagramSection = lazy(() => import('../components/Instagram'));
const Footer = lazy(() => import('../components/Footer'));

const MemoizedAboutHero = React.memo(AboutHero);
const MemoizedFeature = React.memo(Feature);
const MemoizedFAQ = React.memo(FAQ);
const MemoizedInformation = React.memo(Information);
const MemoizedServices = React.memo(Services);
const MemoizedTestimonials = React.memo(Testimonials);

const About = () => {
  const memoizedValue = useMemo(() => "Some memoized value", []);

  useEffect(() => {
    startTransition(() => {
      console.log("Component mounted or updated");
    });
  }, []);

  return (
    <div>
      <MemoizedAboutHero />
      <MemoizedFeature />
      <MemoizedInformation />
      <MemoizedServices />
      <MemoizedFAQ />
      <MemoizedTestimonials />
      <Suspense fallback={<div>Loading...</div>}>
        <InstagramSection />
        <Footer />
      </Suspense>
    </div>
  );
};

export default About;
