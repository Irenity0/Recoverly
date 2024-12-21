import Faq from "../Components/FAQ";
import Hero from "../Components/Hero";
import HowItWorks from "../Components/HowItWorks";

const HomePage = () => {
    return (
        <div className="space-y-8">
        <Hero/>
        <HowItWorks/>
        <Faq/>
        </div>
    );
};

export default HomePage;