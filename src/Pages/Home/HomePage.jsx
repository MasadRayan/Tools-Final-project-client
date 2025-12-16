import React from 'react';
import HeroSection from './Components/HeroSection';
import FAQ from './Components/FAQ';
import NewsletterSection from './Components/NewsletterSection';
import StatsSection from './Components/StatsSection';
import BrandMarquee from './Components/BrandMarquee';

const HomePage = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <BrandMarquee></BrandMarquee>
            <StatsSection></StatsSection>
            <FAQ></FAQ>
            <NewsletterSection></NewsletterSection>
        </div>
    );
};

export default HomePage;