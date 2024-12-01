import { useLoaderData, useNavigate } from "react-router-dom";
import { CiUser } from "react-icons/ci";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { getBusStatus } from "../../utils/getBusStatus";
import useAuth from "../../hooks/useAuth";
import { toast } from "sonner";

const UserProfile = () => {
  const data = useLoaderData();
  const { resetPassword, user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [previousBookings, setPreviousBookings] = useState([]);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/bookings/user/${data.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const previous = bookings.filter(
      (booking) =>
        getBusStatus(booking.arrival_time, booking.departure_time) ===
          "On Route" ||
        getBusStatus(booking.arrival_time, booking.departure_time) ===
          "Completed"
    );
    const upcoming = bookings.filter(
      (booking) =>
        getBusStatus(booking.arrival_time, booking.departure_time) ===
        "Upcoming"
    );
    setPreviousBookings(previous);
    setUpcomingBookings(upcoming);
  }, [bookings]);

  const handlePasswordReset = () => {
    resetPassword(user?.email)
      .then(() => toast.success("Password Reset Email Sent!"))
      .catch((err) => toast.error(err.message));
  };

  const handleCancel = (e, booking_id) => {
    e.preventDefault();
    const reason = e.target.reason.value;
    const email = user?.email;

    if (reason === "") {
      toast.error("Please Give Reason");
      return;
    }

    const data = {
      email,
      reason,
      ticketId: booking_id,
      status: "Awaiting Approval",
    };

    fetch("http://localhost:5000/cancel-ticket", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          document.getElementById(`cancel-${booking_id}`).close();
          toast.success("Ticket Cancellation Request Sent!");
        }
      });
  };

  return (
    <div className="p-8 mb-24 mt-10 container mx-auto">
      <div className="flex justify-center text-[100px]">
        <CiUser></CiUser>
      </div>
      <div className="mt-5 flex justify-center"></div>
      <div className="text-center pt-5">
        <h1 className="text-4xl font-medium text-gray-700">{data.name}</h1>
        <p className="font-light text-gray-600 mt-3">{data.email}</p>
        <p className="font-light text-gray-600 mt-3">{data.phone}</p>
      </div>
      <div className="flex justify-center my-4 mb-16">
        <button
          className="btn w-[200px] border-red-400 text-red-400 bg-transparent hover:border-red-500 hover:bg-red-500 hover:text-white"
          onClick={() => handlePasswordReset()}
        >
          Reset Password
        </button>
      </div>
      <div className="grid grid-cols-2 gap-5">
        {/* PAST BOOKINGS */}
        <div>
          <h1 className="text-center border-b-2 font-semibold text-xl p-2 rounded-full px-4 border-theme-color">
            Previous Bookings
          </h1>
          {loading ? (
            <>
              <div className="flex justify-center items-center pt-24">
                <span className="loading loading-bars loading-lg"></span>
              </div>
            </>
          ) : (
            <>
              {previousBookings.length > 0 ? (
                <>
                  <div className="flex flex-col gap-4 mt-4 w-[75%] mx-auto">
                    {previousBookings.map((booking) => (
                      <div
                        key={booking._id}
                        className="border border-dotted p-4 rounded-lg"
                      >
                        <div>
                          <h1 className="font-semibold text-gray-500 flex items-center gap-1">
                            {booking.idnumber}{" "}
                            <span
                              className={`badge badge-sm border-none text-white ${
                                getBusStatus(
                                  booking.arrival_time,
                                  booking.departure_time
                                ) === "Completed"
                                  ? "bg-green-500"
                                  : ""
                              } ${
                                getBusStatus(
                                  booking.arrival_time,
                                  booking.departure_time
                                ) === "On Route"
                                  ? "bg-yellow-600"
                                  : ""
                              } ${
                                getBusStatus(
                                  booking.arrival_time,
                                  booking.departure_time
                                ) === "Upcoming"
                                  ? "bg-green-600"
                                  : ""
                              }`}
                            >
                              {getBusStatus(
                                booking.arrival_time,
                                booking.departure_time
                              )}
                            </span>
                          </h1>
                        </div>
                        <hr className="my-1" />
                        <div className="flex gap-5 justify-between items-center">
                          <div>
                            <h1 className="text-sm font-bold">
                              {booking.departure_location}
                            </h1>
                            <div className="whitespace-nowrap flex-1">
                              <h1 className="text-gray-700 font-medium text-xs">
                                {booking.departure_time.split("T")[1]}
                              </h1>
                              <h1 className="text-gray-700 font-medium text-xs">
                                {booking.departure_time.split("T")[0]}
                              </h1>
                            </div>
                          </div>
                          <FaArrowRightLong className="text-xl"></FaArrowRightLong>
                          <div className="text-right">
                            <h1 className="text-sm font-bold">
                              {booking.destination_location}
                            </h1>
                            <div className="whitespace-nowrap flex-1">
                              <h1 className="text-gray-700 font-medium text-xs">
                                {booking.arrival_time.split("T")[1]}
                              </h1>
                              <h1 className="text-gray-700 font-medium text-xs">
                                {booking.arrival_time.split("T")[0]}
                              </h1>
                            </div>
                          </div>
                        </div>
                        <hr className="my-1" />
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => {
                              navigate(`/booking/${booking._id}`);
                            }}
                            className="btn rounded-sm bg-transparent border-theme-color text-theme-color hover:bg-theme-color hover:text-white hover:border-theme-color"
                          >
                            Ticket Details
                          </button>
                          <button
                            onClick={() => {
                              navigate(`/bus/${booking.bus_id}`);
                            }}
                            className="btn rounded-sm bg-transparent border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white hover:border-orange-600"
                          >
                            Bus Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h1 className="pt-28 text-center font-bold text-red-400">
                    None Found
                  </h1>
                </>
              )}
            </>
          )}
        </div>
        {/* UPCOMING BOOKINGS */}
        <div>
          <h1 className="text-center border-b-2 font-semibold text-xl p-2 rounded-full px-4 border-secondary-color">
            Upcoming Bookings
          </h1>
          {loading ? (
            <>
              <div className="flex justify-center items-center pt-24">
                <span className="loading loading-bars loading-lg"></span>
              </div>
            </>
          ) : (
            <>
              {upcomingBookings.length > 0 ? (
                <>
                  <div className="flex flex-col gap-4 mt-4 w-[75%] mx-auto">
                    {upcomingBookings.map((booking) => (
                      <div
                        key={booking._id}
                        className="border border-dotted p-4 rounded-lg"
                      >
                        <div className="flex justify-between items-center">
                          <h1 className="font-semibold text-gray-500 flex items-center gap-1">
                            {booking.idnumber}{" "}
                            <span
                              className={`badge badge-sm border-none text-white ${
                                getBusStatus(
                                  booking.arrival_time,
                                  booking.departure_time
                                ) === "Completed"
                                  ? "bg-green-500"
                                  : ""
                              } ${
                                getBusStatus(
                                  booking.arrival_time,
                                  booking.departure_time
                                ) === "On Route"
                                  ? "bg-yellow-600"
                                  : ""
                              } ${
                                getBusStatus(
                                  booking.arrival_time,
                                  booking.departure_time
                                ) === "Upcoming"
                                  ? "bg-theme-color"
                                  : ""
                              }`}
                            >
                              {getBusStatus(
                                booking.arrival_time,
                                booking.departure_time
                              )}
                            </span>
                          </h1>
                          <div>
                            {getBusStatus(
                              booking.arrival_time,
                              booking.departure_time
                            ) === "Upcoming" ? (
                              <>
                                <button
                                  onClick={() =>
                                    document
                                      .getElementById(`cancel-${booking._id}`)
                                      .showModal()
                                  }
                                  className="btn btn-xs bg-red-500 text-white border-red-500 hover:bg-red-600 hover:border-red-600"
                                >
                                  Cancel Booking
                                </button>
                                <dialog
                                  id={`cancel-${booking._id}`}
                                  className="modal"
                                >
                                  <div className="modal-box">
                                    <h1 className="text-center font-bold text-red-500">
                                      Ticket Cancellation Form
                                    </h1>
                                    <h1 className="text-center font-bold text-gray-600">
                                      Ticket Id: ({booking._id})
                                    </h1>
                                    <hr className="border-dotted my-2" />
                                    <form
                                      onSubmit={(e) =>
                                        handleCancel(e, booking._id)
                                      }
                                    >
                                      <label className="form-control w-full">
                                        <div className="label">
                                          <span className="label-text">
                                            Your Email
                                          </span>
                                        </div>
                                        <input
                                          type="text"
                                          placeholder="01..."
                                          value={user.email}
                                          disabled
                                          className="input input-bordered w-full"
                                        />
                                      </label>
                                      <label className="form-control">
                                        <div className="label">
                                          <span className="label-text">
                                            Reason
                                          </span>
                                        </div>
                                        <textarea
                                          className="textarea textarea-bordered h-24"
                                          placeholder="Reason for cancellation for ticket"
                                          name="reason"
                                        ></textarea>
                                      </label>
                                      <div className="grid grid-cols-2 gap-2 mt-3">
                                        <button className="btn bg-green-400 hover:bg-green-500 text-white border-green-400 hover:border-green-500">
                                          Submit
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() =>
                                            document
                                              .getElementById(
                                                `cancel-${booking._id}`
                                              )
                                              .close()
                                          }
                                          className="btn bg-transparent border-red-400 text-red-400 hover:bg-red-400 hover:border-red-400 hover:text-white"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </form>
                                    {/* <div className="modal-action">
                                      <form method="dialog">
                                      
                                        <button className="btn">Close</button>
                                      </form>
                                    </div> */}
                                  </div>
                                </dialog>
                              </>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        <hr className="my-1" />
                        <div className="flex gap-5 justify-between items-center">
                          <div>
                            <h1 className="text-sm font-bold">
                              {booking.departure_location}
                            </h1>
                            <div className="whitespace-nowrap flex-1">
                              <h1 className="text-gray-700 font-medium text-xs">
                                {booking.departure_time.split("T")[1]}
                              </h1>
                              <h1 className="text-gray-700 font-medium text-xs">
                                {booking.departure_time.split("T")[0]}
                              </h1>
                            </div>
                          </div>
                          <FaArrowRightLong className="text-xl"></FaArrowRightLong>
                          <div className="text-right">
                            <h1 className="text-sm font-bold">
                              {booking.destination_location}
                            </h1>
                            <div className="whitespace-nowrap flex-1">
                              <h1 className="text-gray-700 font-medium text-xs">
                                {booking.arrival_time.split("T")[1]}
                              </h1>
                              <h1 className="text-gray-700 font-medium text-xs">
                                {booking.arrival_time.split("T")[0]}
                              </h1>
                            </div>
                          </div>
                        </div>
                        <hr className="my-1" />
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => {
                              navigate(`/booking/${booking._id}`);
                            }}
                            className="btn rounded-sm bg-transparent border-theme-color text-theme-color hover:bg-theme-color hover:text-white hover:border-theme-color"
                          >
                            Ticket Details
                          </button>
                          <button
                            onClick={() => {
                              navigate(`/bus/${booking.bus_id}`);
                            }}
                            className="btn rounded-sm bg-transparent border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white hover:border-orange-600"
                          >
                            Bus Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h1 className="pt-28 text-center font-bold text-red-400">
                    None Found
                  </h1>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
