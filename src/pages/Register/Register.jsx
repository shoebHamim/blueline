import { useState } from "react";
import { MdEmail, MdOutlinePhoneAndroid } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import "./style.css";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../../Firebase/firebase.init";
import { toast } from "sonner";
const auth = getAuth(app);
const Register = () => {
  const navigate = useNavigate();
  // Form data
  const [seePassword, setSeePassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const OnSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;
    const phone = form.phone.value;
    const name = form.name.value;

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters or longer");
      return;
    } else if (!/[A-Z]/.test(password)) {
      toast.error("Password must have an upper case letter");
      return;
    } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password)) {
      toast.error("Password must have a special character");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((firebaseResult) => {
        const userDetails = {
          email: firebaseResult.user.email,
          phone,
          name,
        };
        fetch("http://localhost:5000/user/register", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userDetails),
        }).then((res) => {
          console.log(res);
          if (res.status === 200) {
            toast.success("You have been registered!");
            setTimeout(() => navigate("/"), 500);
          }
        });
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
          onSubmit={OnSubmit}
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
          {/* Name INPUT */}
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name
          </label>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <CgProfile />
            </div>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5"
              placeholder="Your Name"
              required
            ></input>
          </div>
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
          {/* Phone INPUT */}
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Phone
          </label>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
              <MdOutlinePhoneAndroid />
            </div>
            <input
              type="number"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full ps-10 p-2.5 no-arrows"
              placeholder="Your Phone"
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
            Register
          </button>
          <p className="text-center mt-6 text-xs font-bold">
            {`Already Registered? `}
            <Link to={"/login"} className="link text-theme-color">
              Login Here
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
