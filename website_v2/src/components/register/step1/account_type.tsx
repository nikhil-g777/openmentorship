import {useProfileSettingsStore, useRegisterStore} from "@/zustand/store";

const AccountType = () => {
  const {userType, setUserType} = useRegisterStore();
  const {isProfilePage, isEditable} = useProfileSettingsStore();

  return (
    <div className={isProfilePage ? "w-full" : "w-full mt-8"}>
      <p className="text-base md:text-lg">
        {isProfilePage ? "Account Type: " : "I am registering as a: "}
        <b>{userType === "mentee" ? "Mentee" : "Mentor"}</b>
      </p>
      <div className="btn-group mt-2">
        <button
          className={`btn ${userType === "mentee" ? "btn-active" : ""}`}
          onClick={() => setUserType("mentee")}
          disabled={!isEditable}
        >
          Mentee
        </button>
        <button
          className={`btn ${userType === "mentor" ? "btn-active" : ""}`}
          onClick={() => setUserType("mentor")}
          disabled={!isEditable}
        >
          Mentor
        </button>
      </div>
    </div>
  );
};

export {AccountType};
