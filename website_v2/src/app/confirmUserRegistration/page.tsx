import {StoreInitializer} from "@/components/confirmUserRegistration/store_initializer";
import {UserConfirmationModal} from "@/components/modals/user_confirmation_modal";
import {confirmRegistration} from "@/endpoints/user";
import React from "react";

type Props = {
  searchParams: {
    confirmationToken: string;
  };
};

const Page = async ({searchParams}: Props) => {
  const confirmationToken = searchParams.confirmationToken || "";

  // Confirmation data
  const data = await confirmRegistration(confirmationToken);

  console.log(data);

  return (
    <div>
      <StoreInitializer data={data} />
      <UserConfirmationModal />
    </div>
  );
};

export default Page;
