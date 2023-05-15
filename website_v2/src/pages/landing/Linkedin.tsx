import { useState } from "react";
import { useLinkedIn } from "react-linkedin-login-oauth2";
// You can use provided image shipped by this package or using your own
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";
import SuccessModal from "../../components/modals/SuccessModal";

const Linkedin = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [heading, setHeading] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const { linkedInLogin } = useLinkedIn({
    clientId: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
    redirectUri: import.meta.env.VITE_LINKEDIN_REDIRECT_URI,
    onSuccess: (code) => {
      setIsModal(true);
      setHeading("Your LinkedIn auth code:");
      setMessage(code);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <>
      <img
        onClick={linkedInLogin}
        src={linkedin}
        alt="Sign in with Linked In"
        style={{ maxWidth: "180px", cursor: "pointer" }}
      />
      {/* Temporary Modal */}
      <SuccessModal
        heading={heading}
        message={message}
        isModal={isModal}
        setIsModal={setIsModal}
      />
    </>
  );
};

export default Linkedin;
