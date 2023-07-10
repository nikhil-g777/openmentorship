import {HeadingBio} from "@/components/profileSettings/heading_bio";
import {SaveDetails} from "@/components/profileSettings/save_details";
import {StoreInitializer} from "@/components/profileSettings/store_initializer";
import {Step1} from "@/components/register/step1/step_1";
import {Step2} from "@/components/register/step2/step_2";
import {Step3} from "@/components/register/step3/step_3";
import {Step4} from "@/components/register/step4/step_4";
import {Step5} from "@/components/register/step5/step_5";
import {getUserInfo} from "@/endpoints/user";
import {authOptions} from "@/helpers/auth_options";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";

const page = async () => {
  const session = await getServerSession(authOptions);
  const token = session?.user?.token;

  // Get User Info
  const data = await getUserInfo(token || "");

  // Redirect to Landing page if request fails
  if (!data.success) {
    redirect("/");
  }

  return (
    <div className="w-full px-4">
      <StoreInitializer data={data} token={token} />
      <div className="w-full max-w-4xl mx-auto flex flex-col gap-12">
        <HeadingBio />
        <Step1 />
        <Step2 />
        <Step3 />
        <Step4 />
        <Step5 />
        <SaveDetails isTopPosition={false} />
      </div>
    </div>
  );
};

export default page;
