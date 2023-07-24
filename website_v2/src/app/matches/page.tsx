import {Tabs} from "@/components/tabs/tabs_main";
import {getServerSession} from "next-auth";
import React from "react";
import {authOptions} from "@/helpers/auth_options";
import {redirect} from "next/navigation";
import {getUserMatches} from "@/endpoints/matches";
import {Listing} from "@/components/listing/listing_main";
import {NoResult} from "@/components/noResult/no_result";
import {checkNoResult} from "@/helpers/matches";
import {StoreInitializer} from "@/components/matches/store_initializer";
import {ProfileCardModal} from "@/components/modals/profile_card_modal";
import {ConfirmationModal} from "@/components/modals/confirmation_modal";

type Props = {
  searchParams: {
    [key: string]: string;
  };
};

const Page = async ({searchParams}: Props) => {
  // Session
  const session = await getServerSession(authOptions);

  // Redirect to landing page if user not found
  if (!session?.user) {
    redirect("/");
  }

  //   Current Tab
  const currentTab = searchParams["tab"];

  //   Get User Matches
  const data = await getUserMatches(session.user.token);

  //   Filtered data & Heading text
  let filteredData;
  let headingText;
  if (currentTab === "active" || currentTab === "" || !currentTab) {
    filteredData = data.matches["active"];
    headingText = "Your Active Connections";
  } else if (currentTab === "pending") {
    filteredData = data.matches["pending"];
    headingText = "Your Pending Connections";
  } else {
    filteredData = data.matches["closed"];
    headingText = "Your Past Connections";
  }

  // No Result
  const isResult = checkNoResult(session?.user?.user?.userType, filteredData);

  return (
    <div className="w-full">
      <StoreInitializer
        heading={headingText}
        currentTab={currentTab}
        userType={session?.user?.user?.userType}
        data={data}
        filteredData={filteredData}
      />
      <Tabs />
      <Listing />
      {/* No Result */}
      {isResult ? <NoResult message="Sorry! No Result Found" /> : null}

      {/* Profile Card Modal */}
      <ProfileCardModal />
      {/* Confirmation Modal */}
      <ConfirmationModal />
    </div>
  );
};

export default Page;
