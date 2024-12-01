import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home/Home";
import Root from "./pages/Root";
import About from "./pages/About/About";
import Support from "./pages/Support/Support";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import AuthProvider from "./Context/AuthProvider";
import Allbuses from "./pages/Allbuses/Allbuses";
import BusDetails from "./pages/BusDetails/BusDetails";
import PrivateRoute from "./Routes/PrivateRoute";
import Payment from "./pages/Payment/Payment";
import SearchResults from "./pages/SearchResults/SearchResults";
import UserProfile from "./pages/UserProfile/UserProfile";
import BookingDetails from "./pages/BookingDetails/BookingDetails";
import AllFeedback from "./pages/AllFeedback/AllFeedback";
import AllCancelTickets from "./pages/AllCancelTickets/AllCancelTickets";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/all-buses",
        element: <Allbuses></Allbuses>,
      },
      {
        path: "/search/:depart/:destination/:date",
        element: <SearchResults></SearchResults>,
      },
      {
        path: "/bus/:id",
        element: (
          <PrivateRoute>
            <BusDetails></BusDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/support",
        element: <Support></Support>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "/all-feedback",
        element: <AllFeedback></AllFeedback>,
        loader: () => fetch(`http://localhost:5000/feedback`),
      },
      {
        path: "/all-cancel-ticket",
        element: <AllCancelTickets></AllCancelTickets>,
        loader: () => fetch(`http://localhost:5000/cancel-ticket`),
      },
      {
        path: "/myprofile/:email",
        element: (
          <PrivateRoute>
            <UserProfile></UserProfile>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/user/info/${params.email}`),
      },
      {
        path: "/booking/:id",
        element: (
          <PrivateRoute>
            <BookingDetails></BookingDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5000/booking/info/${params.id}`),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
