import Banner from "./Banner";
import TopScholarships from "./TopScholarships";
import Testimonials from "./Testimonials";
import StudyTips from "./StudyTips";
import FaqSection from "./FaqSection";
import WhyChooseUs from "./WhyChooseUs";
import LatestNews from "./LatestNews";
import ApplyNowCTA from "./ApplyNowCTA";

const Home = () => {
  return (
    <div>
      <Banner />
      <TopScholarships />
      <Testimonials/>
      <WhyChooseUs/>
      <LatestNews/>
      <ApplyNowCTA/>
      <StudyTips />
      <FaqSection/>
    </div>
  );
};

export default Home;
