import {useRegisterStore} from "@/zustand/store";

const AccountType = () => {
  const {userType, setUserType} = useRegisterStore();
  return (
    <div className="w-full mt-8">
      <p className="text-base md:text-lg">
        I am registering as a:{" "}
        <b>{userType === "mentee" ? "Mentee" : "Mentor"}</b>
      </p>
      <div className="btn-group mt-2">
        <button
          className={`btn ${userType === "mentee" ? "btn-active" : ""}`}
          onClick={() => setUserType("mentee")}
        >
          Mentee
        </button>
        <button
          className={`btn ${userType === "mentor" ? "btn-active" : ""}`}
          onClick={() => setUserType("mentor")}
        >
          Mentor
        </button>
      </div>
    </div>
  );
};

export {AccountType};
