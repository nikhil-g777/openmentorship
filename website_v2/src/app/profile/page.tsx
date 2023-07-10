import {HeadingBio} from "@/components/profileSettings/heading_bio";
import {StoreInitializer} from "@/components/profileSettings/store_initializer";
import {Step1} from "@/components/register/step1/step_1";
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
    </div>
  );
};

export default page;
