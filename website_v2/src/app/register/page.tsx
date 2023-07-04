import {MainScreen} from "@/components/register/main/main_screen";
import {Step1} from "@/components/register/step1/step_1";
import {Step2} from "@/components/register/step2/step_2";
import {Step3} from "@/components/register/step_3";
import {Step4} from "@/components/register/step_4";
import {Step5} from "@/components/register/step_5";
import {PostRegistration} from "@/components/register/post_registration";
import {StepsDots} from "@/components/register/steps_dots";

const Page = () => {
  return (
    <div className="w-full">
      <MainScreen />
      <Step1 />
      <Step2 />
      <Step3 />
      <Step4 />
      <Step5 />
      <PostRegistration />
      <StepsDots />
    </div>
  );
};

export default Page;
