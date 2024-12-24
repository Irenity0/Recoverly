import Faq from "../Components/FAQ";
import Hero from "../Components/Hero";
import HowItWorks from "../Components/HowItWorks";
import LatestPostsSection from "../Components/LatestPostsSection";

const HomePage = () => {
    return (
        <div className="space-y-8">
        <Hero/>
        <HowItWorks/>
        <LatestPostsSection/>
        <Faq/>
        </div>
    );
};

export default HomePage;