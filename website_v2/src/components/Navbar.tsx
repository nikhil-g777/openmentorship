
// assets
import logo from "../assets/logo.png";
import user from "../assets/icons/user.svg";

type Props = {};

const Navbar = (props: Props) => {
  return (
    // Wrapper
    <div className="w-full shadow">
      {/* Container */}
      <div className="navbar bg-base-100 max-w-6xl mx-auto sm:py-5">
        {/* Matches and Chat */}
        <div className="hidden sm:block">
          <a className="btn btn-ghost normal-case text-base">Matches</a>
          <a className="btn btn-ghost normal-case text-base">Chat</a>
        </div>
        {/* Logo */}
        <div className="absolute left-2/4 -translate-x-2/4">
          <img
            src={logo}
            alt="Open Mentorship"
            className="btn sm:btn-lg btn-ghost btn-circle"
          />
        </div>
        {/* User Profile */}
        <div className="dropdown dropdown-end ml-auto">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img src={user} alt="user" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a>About</a>
            </li>
            <li>
              <a>FAQ</a>
            </li>
            <li>
              <a>Login</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
