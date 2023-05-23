import profile from "../../assets/icons/profile.svg";

type Props = {};
const Profile = (props: Props) => {
  return (
    <div className="flex flex-col">
      <img
        src={profile}
        alt="random-user"
        className="w-full h-auto min-w-[150px] max-w-sm rounded-md mx-auto object-cover"
      />
      <button className="w-full max-w-sm btn btn-accent rounded-full mt-4 mx-auto">
        Send
      </button>
    </div>
  );
};
export default Profile;
