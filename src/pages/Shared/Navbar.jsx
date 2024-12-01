import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";
import useAuth from "../../hooks/useAuth";
import { CiUser } from "react-icons/ci";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  return (
    <>
      <div className="container mx-auto navbar py-10">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/about"}>About</Link>
              </li>
              <li>
                <Link to={"/support"}>Support</Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-4">
            <img className="h-16" src="/logo.png" />
            <p
              className={`${styles.glow} font-iceland text-3xl font-bold text-theme-color`}
            >
              Blue Line
            </p>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex justify-center gap-12 text-lg px-1">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/about"}>About</Link>
            </li>
            <li>
              <Link to={"/support"}>Support</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <div className="flex items-center gap-4">
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle hover:bg-transparent hover:shadow-2xl"
                  >
                    <div className="rounded-full">
                      <div className="border-theme-color border text-theme-color rounded-full p-1 shadow-lg">
                        <CiUser className="text-3xl"></CiUser>
                      </div>
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content mt-3 flex flex-col gap-1 z-50 p-1 font-semibold shadow bg-base-100 rounded-lg w-fit"
                  >
                    <div className="flex flex-col items-center justify-center my-4 px-2">
                      <CiUser className="text-3xl text-gray-500"></CiUser>
                      <h1 className="text-xs text-center font-bold text-gray-500">
                        {user.email}
                      </h1>
                    </div>
                    <Link
                      className="text-theme-color w-full btn border-theme-color bg-transparent hover:bg-theme-color hover:text-white hover:border-theme-color shadow-none"
                      to={`/myprofile/${user.email}`}
                    >
                      My Account
                    </Link>
                    <button
                      className="text-[#e8483c] w-full btn border-[#e8483c] bg-transparent hover:bg-[#e8483c] shadow-none hover:text-white hover:border-[#e8483c]"
                      onClick={() => logOut()}
                    >
                      Logout
                    </button>
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="btn bg-theme-color font-bold text-white border-none hover:bg-theme-color hover:shadow-xl"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
