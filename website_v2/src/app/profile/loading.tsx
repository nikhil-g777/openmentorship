import {Experience} from "@/loaders/profileSettings/experience";
import {MentorshipPreferences} from "@/loaders/profileSettings/mentorship_preferences";
import {MoreAboutYou} from "@/loaders/profileSettings/more_about_you";
import {ProfileHeadlineBio} from "@/loaders/profileSettings/profile_headline_bio";
import {SkillsInterests} from "@/loaders/profileSettings/skills_interests";
import {SocialMedia} from "@/loaders/profileSettings/social_media";

const Loading = () => {
  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col gap-12 px-4">
      {/* Profile, Headline, and Bio */}
      <ProfileHeadlineBio />
      {/* More About You */}
      <MoreAboutYou />
      {/* Experience */}
      <Experience />
      {/* Skills & Interests */}
      <SkillsInterests />
      {/* Mentorship Preferences */}
      <MentorshipPreferences />
      {/* Social Media */}
      <SocialMedia />
      {/* Save Button */}
      <div className="w-full flex justify-center items-center mb-20 px-4">
        <div
          className="bg-base-300 animate-pulse rounded-full my-8"
          style={{width: "180px", height: "48px"}}
        ></div>
      </div>
    </div>
  );
};

export default Loading;
