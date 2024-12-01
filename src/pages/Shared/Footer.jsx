import { IoMailSharp } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { MdOutlineMessage } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
// import { sheild } from "react-icons/fa6";
const Footer = () => {
  return (
    <>
      <div className="w-full bg-theme-color flex items-center justify-center flex-col py-10">
        <div className="flex gap-8 text-white justify-center font-medium mb-10">
          <Link to={"/"} className="hover:link">
            Home
          </Link>
          <Link to={"/about"} className="hover:link">
            About
          </Link>
          <Link to={"/support"} className="hover:link">
            Support
          </Link>
          <Link to={"/register"} className="hover:link">
            Sign Up
          </Link>
          <Link to={"/login"} className="hover:link">
            Login
          </Link>
        </div>
        <div className="flex gap-10 justify-center text-secondary-color">
          <IoMailSharp size="2rem" />
          <SlCalender size="2rem" />
          <MdOutlineMessage size="2rem" />
          <FaClock size="2rem" />
        </div>
        <div className="mt-10">
          <h1 className="text-center text-xl font-bold text-white">Admin</h1>
          <div className="grid grid-cols-3 text-center text-secondary-color font-medium mt-2">
            <Link to={"/all-buses"} className="hover:link">
              All Buses
            </Link>
            <Link to={"/all-feedback"} className="hover:link">
              Feedbacks
            </Link>
            <Link to={"/all-cancel-ticket"} className="hover:link">
              Cancel Requests
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
