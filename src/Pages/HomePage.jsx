import { useLoaderData } from "react-router-dom";
import Faq from "../Components/FAQ";
import Hero from "../Components/Hero";
import HowItWorks from "../Components/HowItWorks";
import LatestPostsSection from "../Components/LatestPostsSection";

const HomePage = () => {

    const posts = useLoaderData();

    return (
        <div className="space-y-8">
        <Hero/>
        <HowItWorks/>
        {/* <LatestPostsSection posts={posts}><LatestPostsSection/> */}
        <LatestPostsSection posts={posts}></LatestPostsSection>
        <Faq/>
        </div>
    );
};

export default HomePage;