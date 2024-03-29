import {MainScreen} from "@/components/register/main/main_screen";
import {Step1} from "@/components/register/step1/step_1";
import {Step2} from "@/components/register/step2/step_2";
import {Step3} from "@/components/register/step3/step_3";
import {Step4} from "@/components/register/step4/step_4";
import {Step5} from "@/components/register/step5/step_5";
import {PostRegistration} from "@/components/register/postRegistration/post_registration";
import {StepsDots} from "@/components/register/steps_dots";
import {StoreInitializer} from "@/components/register/store_initializer";
import {getServerSession} from "next-auth";
import {authOptions} from "@/helpers/auth_options";
import {redirect} from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const token = session?.user?.token;

  if (token) redirect("/");

  return (
    <div className="w-full">
      <StoreInitializer />
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
