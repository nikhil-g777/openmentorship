import { useState } from "react";
import { useLinkedIn } from "react-linkedin-login-oauth2";
// You can use provided image shipped by this package or using your own
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";
import SuccessModal from "../../components/modals/SuccessModal";
import { useLoginUserMutation } from "../../redux/apis/userApi";

const Linkedin = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [heading, setHeading] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [loginUser, result] = useLoginUserMutation();

  const { linkedInLogin } = useLinkedIn({
    clientId: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
    redirectUri: import.meta.env.VITE_LINKEDIN_REDIRECT_URI,
    scope: "r_emailaddress r_liteprofile",
    onSuccess: (code) => {
      setIsModal(true);
      setHeading("Your LinkedIn auth code:");
      setMessage(code);
      loginUser({ authCode: code, isLocal: true });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  console.log(result);

  return (
    <>
      <button type="button" onClick={linkedInLogin}>
        <img
          src={linkedin}
          alt="Sign in with Linked In"
          style={{ maxWidth: "180px", cursor: "pointer" }}
        />
      </button>
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
