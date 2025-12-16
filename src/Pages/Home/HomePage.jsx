import React from 'react';
import HeroSection from './Components/HeroSection';
import FAQ from './Components/FAQ';
import NewsletterSection from './Components/NewsletterSection';
import StatsSection from './Components/StatsSection';

const HomePage = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <StatsSection></StatsSection>
            <FAQ></FAQ>
            <NewsletterSection></NewsletterSection>
        </div>
    );
};

export default HomePage;