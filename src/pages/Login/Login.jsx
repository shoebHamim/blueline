import { useContext, useState } from "react";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../../Context/AuthProvider";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../Firebase/firebase.init";
import { toast } from "sonner";
const auth = getAuth(app);

const Login = () => {
  const [seePassword, setSeePassword] = useState(false);
  // form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { role } = useContext(AuthContext);
  const navigate = useNavigate();
  const onSubmit = (event) => {
    console.log(email, password);
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Logged In!");
        setTimeout(() => navigate("/"), 500);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-[600px] py-20">
        <form
          className="bg-background rounded-xl px-5 py-8 w-full max-w-2xl"
          data-aos="fade-up"
          onSubmit={onSubmit}
        >
          <div className="flex justify-center flex-col items-center gap-2">
            <div className="flex items-center gap-4">
              <div className="h-16">
                <img className="h-full" src="logo.png" alt="" />
              </div>
              <p className={`font-iceland text-3xl font-bold text-theme-color`}>
                Blue Line
              </p>
            </div>
          </div>
          <hr className="my-4" />
          {/* EMAIL INPUT */}
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Email
          </label>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <MdEmail />
            </div>
            <input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
              placeholder="Your Email"
              required
            ></input>
          </div>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password
          </label>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <RiLockPasswordFill />
            </div>
            <input
              type={seePassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
              placeholder="Your Password"
              required
            ></input>
            <button
              type="button"
              className="absolute right-3 inset-y-0 text-xl text-gray-600"
              onClick={() => {
                setSeePassword(!seePassword);
              }}
            >
              {seePassword ? (
                <AiFillEyeInvisible></AiFillEyeInvisible>
              ) : (
                <AiFillEye></AiFillEye>
              )}
            </button>
          </div>
          <button className="btn bg-theme-color hover:bg-primary hover:shadow-xl text-white w-full">
            Log In
          </button>
          <p className="text-center mt-6 text-xs font-bold">
            {`Don't have an account? `}
            <Link to={"/register"} className="link text-theme-color">
              Sign Up Here
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
