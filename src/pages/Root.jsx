import { Outlet } from "react-router-dom";
import Navbar from "./Shared/Navbar";
import Footer from "./Shared/Footer";
import { Toaster } from "sonner";

const Root = () => {
  return (
    <>
      <Toaster richColors></Toaster>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default Root;
