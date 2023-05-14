import { useState } from "react";
import { useLinkedIn } from "react-linkedin-login-oauth2";
// You can use provided image shipped by this package or using your own
import linkedin from "react-linkedin-login-oauth2/assets/linkedin.png";
import SuccessModal from "../../components/modals/SuccessModal";

const Linkedin = () => {
  const [checked, setChecked] = useState<boolean>(false);

  const { linkedInLogin } = useLinkedIn({
    clientId: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
    redirectUri: import.meta.env.VITE_LINKEDIN_REDIRECT_URI,
    onSuccess: (code) => {
      setChecked(true);
      console.log(code);
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
        heading="Success"
        message="We got your linkedin code..."
        checked={checked}
        setChecked={setChecked}
      />
    </>
  );
};

export default Linkedin;
