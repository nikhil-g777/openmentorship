import {HeadingBio} from "@/components/profileSettings/heading_bio";
import {StoreInitializer} from "@/components/profileSettings/store_initializer";
import {Step1} from "@/components/register/step1/step_1";
import {Step2} from "@/components/register/step2/step_2";
import {Step3} from "@/components/register/step3/step_3";
import {Step4} from "@/components/register/step4/step_4";
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
      <StoreInitializer data={data} />
      <HeadingBio />
      <Step1 />
      <Step2 />
      <Step3 />
      <Step4 />
    </div>
  );
};

export default page;
