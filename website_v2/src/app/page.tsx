import FAQ from "@/components/collapse/FAQ";
import DreamCareer from "@/components/pages/landing/DreamCareer";
import Hero from "@/components/pages/landing/Hero";
import HowItWorks from "@/components/pages/landing/HowItWorks";
import WhyOpenMentorship from "@/components/pages/landing/WhyOpenMentorship";

const list = [
  {
    id: "1",
    heading:
      "This is the most frequent question asked about this experience. does this help?",
    description:
      "This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq.",
  },
  {
    id: "2",
    heading:
      "This is the most frequent question asked about this experience. does this help?",
    description:
      "This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq.",
  },
  {
    id: "3",
    heading:
      "This is the most frequent question asked about this experience. does this help?",
    description:
      "This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq.",
  },
  {
    id: "4",
    heading:
      "This is the most frequent question asked about this experience. does this help?",
    description:
      "This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq.",
  },
  {
    id: "5",
    heading:
      "This is the most frequent question asked about this experience. does this help?",
    description:
      "This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq. This is the sample response to the to the faq.",
  },
];

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <HowItWorks />
      <WhyOpenMentorship />
      <DreamCareer />
      <FAQ list={list} />
    </main>
  );
}
