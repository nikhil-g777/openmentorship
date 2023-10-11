"use client";

import {AuthenticationErrorModal} from "@/components/modals/authentication_error_modal";
import {StoreInitializer} from "@/components/signIn/store_initializer";
import {AuthenticationLoader} from "@/loaders/authentication_loader";
import {useSession} from "next-auth/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {redirect} from "next/navigation";
const LinkedIn = dynamic<{}>(
  () => import("../../components/signIn/linkedin").then(mod => mod.LinkedIn),
  {ssr: false}
);

const Page = () => {
  const session = useSession();
  const token = session?.data?.user?.token;

  //   Redirect to landing page if token exists
  if (token) redirect("/");

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-20">
      <StoreInitializer />
      <AuthenticationLoader />
      <div className="card lg:card-side bg-base-100 border border-base-300 max-w-3xl min-h-[400px] mx-auto p-8">
        <Image
          src="/assets/images/welcome.svg"
          alt="Sign In"
          width={300}
          height={300}
          className="object-contain mx-auto"
        />
        <div className="card-body justify-center">
          <h2 className="card-title justify-center text-2xl">Sign In</h2>
          <p className="text-center flex-grow-0">
            Connect with LinkedIn to start mentoring or being mentored.
          </p>
          <div className="card-actions justify-center mt-4">
            {/* LinkedIn */}
            <LinkedIn />
          </div>
        </div>
      </div>
      {/* Error Modal */}
      <AuthenticationErrorModal />
    </div>
  );
};

export default Page;
