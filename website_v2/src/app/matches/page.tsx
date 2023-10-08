import {Tabs} from "@/components/tabs/tabs_main";
import {getServerSession} from "next-auth";
import React from "react";
import {authOptions} from "@/helpers/auth_options";
import {getUserMatches} from "@/endpoints/matches";
import {Listing} from "@/components/listing/listing_main";
import {NoResult} from "@/components/noResult/no_result";
import {checkNoResult} from "@/helpers/matches";
import {StoreInitializer} from "@/components/matches/store_initializer";
import {ProfileCardModal} from "@/components/modals/profile_card_modal";
import {ConfirmationModal} from "@/components/modals/confirmation/confirmation_modal";
import {TABS} from "@/constants/common";

type Props = {
  searchParams: {
    [key: string]: string;
  };
};

const Page = async ({searchParams}: Props) => {
  // Session
  const session = await getServerSession(authOptions);
  const token = session?.user?.token;

  // Current Tab
  const currentTab = searchParams["tab"];

  // Get User Matches
  const data = await getUserMatches(token || "");

  // Filtered data & Heading text
  let filteredData = [];
  let headingText = "";

  if (data.success && data.matches) {
    if (
      currentTab === TABS.MATCHES.ACTIVE ||
      currentTab === "" ||
      !currentTab
    ) {
      filteredData = data.matches[TABS.MATCHES.ACTIVE];
      headingText = "Your Active Connections";
    } else if (currentTab === TABS.MATCHES.PENDING) {
      filteredData = data.matches[TABS.MATCHES.PENDING];
      headingText = "Your Pending Connections";
    } else {
      filteredData = data.matches[TABS.MATCHES.CLOSED];
      headingText = "Your Past Connections";
    }
  }

  // No Result
  const isResult = checkNoResult(
    session?.user?.user?.userType || "",
    filteredData
  );

  return (
    <div className="w-full mb-20">
      <StoreInitializer
        token={token}
        heading={headingText}
        currentTab={currentTab}
        userType={session?.user?.user?.userType || ""}
        data={data}
        filteredData={filteredData}
      />
      <Tabs />
      <Listing />
      {/* No Result */}
      {data.success && isResult ? (
        <NoResult message="Sorry! No Result Found" />
      ) : null}

      {/* Profile Card Modal */}
      <ProfileCardModal />
      {/* Confirmation Modal */}
      <ConfirmationModal />
    </div>
  );
};

export default Page;
