import {DreamCareerLoading} from "./dream_career_loading";
import {FAQLoader} from "./faq_loader";
import {HeroLoading} from "./hero_loading";
import {HowItWorksLoading} from "./how_it_works_loading";
import {WhyOpenMentorshipLoading} from "./why_open_mentorship_loading";

const LandingLoadingWrapper = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <HeroLoading />
      <HowItWorksLoading />
      <WhyOpenMentorshipLoading />
      <DreamCareerLoading />
      <FAQLoader />
    </div>
  );
};

export {LandingLoadingWrapper};
