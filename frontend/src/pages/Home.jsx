import React, { Suspense, lazy } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Hero = lazy(() => import('../components/Hero'));
const FeatureCard = lazy(() => import('../components/FeatureCard'));
const ProductCard = lazy(() => import('../components/Products'));
const MiniAbout = lazy(() => import('../components/MiniAbout'));
const TestimonialItem = lazy(() => import('../components/TestimonialItem'));
const NewsSection = lazy(() => import('../components/NewsSection'));
const InstagramSection = lazy(() => import('../components/Instagram'));
const Footer = lazy(() => import('../components/Footer'));

const Home = () => {
    return (
        <>
            <Suspense fallback={<div>Loading...</div>}>
                <Hero />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
                <FeatureCard />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
                <ProductCard />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
                <MiniAbout />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
                <TestimonialItem />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
                <NewsSection />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
                <InstagramSection />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
                <Footer />
            </Suspense>
        </>
    );
};

export default Home;
