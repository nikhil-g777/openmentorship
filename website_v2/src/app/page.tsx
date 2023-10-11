import {FAQ} from "@/components/collapse/faq_main";
import {DreamCareer} from "@/components/landing/dream_career";
import {Hero} from "@/components/landing/hero_main";
import {HowItWorks} from "@/components/landing/how_it_works";
import {StoreInitializer} from "@/components/landing/store_initializer";
import {WhyOpenMentorship} from "@/components/landing/why_open_mentorship";
import {list} from "@/helpers/landing";

export default function Home() {
  return (
    <main className="w-full">
      <StoreInitializer />
      <Hero />
      <HowItWorks />
      <WhyOpenMentorship />
      <DreamCareer />
      <FAQ list={list} />
    </main>
  );
}
