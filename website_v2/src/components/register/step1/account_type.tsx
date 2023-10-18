import {USER_TYPE} from "@/constants/common";
import {useProfileSettingsStore, useRegisterStore} from "@/zustand/store";

const AccountType = () => {
  const {userType, setUserType} = useRegisterStore();
  const {isProfilePage} = useProfileSettingsStore();

  return (
    <div className={isProfilePage ? "w-full" : "w-full mt-8"}>
      <p className="text-base md:text-lg">
        {isProfilePage ? "Account Type: " : "I am registering as a: "}
        <b>{userType === USER_TYPE.MENTEE ? "Mentee" : "Mentor"}</b>
      </p>
      <div className="btn-group mt-2">
        <button
          className={`btn ${userType === USER_TYPE.MENTEE ? "btn-active" : ""}`}
          onClick={() => setUserType(USER_TYPE.MENTEE)}
          disabled={isProfilePage}
        >
          Mentee
        </button>
        <button
          className={`btn ${userType === USER_TYPE.MENTOR ? "btn-active" : ""}`}
          onClick={() => setUserType(USER_TYPE.MENTOR)}
          disabled={isProfilePage}
        >
          Mentor
        </button>
      </div>
    </div>
  );
};

export {AccountType};
