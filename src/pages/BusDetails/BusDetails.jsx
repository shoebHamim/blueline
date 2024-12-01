import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { MdOutlineEventSeat } from "react-icons/md";
import { PiSteeringWheel } from "react-icons/pi";
import { toast } from "sonner";
import useAuth from "../../hooks/useAuth";
import { getBusStatus } from "../../utils/getBusStatus";
const BusDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { user } = useAuth();
  const [allowBooking, setAllowBooking] = useState(false);

  // FETCHING USER DETAILS
  useEffect(() => {
    fetch(`http://localhost:5000/user/info/${user.email}`)
      .then((res) => res.json())
      .then((data) => setUserDetails(data));
  }, [user]);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/bus/get/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
        if (
          getBusStatus(data.arrival_time, data.departure_time) === "Upcoming"
        ) {
          setAllowBooking(true);
        }
        setLoading(false);
      });
  }, [params]);

  const selectSeat = (seatNumber) => {
    if (!selectedSeats.includes(seatNumber)) {
      if (selectedSeats.length < 4) {
        setSelectedSeats([...selectedSeats, seatNumber]);
      } else {
        toast.error("Select Upto 4 Seats.");
      }
    } else {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));
    }
  };

  return (
    <div className="min-h-screen mx-auto container">
      {loading ? (
        <>
          <div className="flex justify-center items-center pt-40">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between gap-16 border-t-2 border-theme-color py-16 px-10 rounded-[10%] bg-[#fdfdfd]">
            <div className="h-fit flex-1">
              <div className="flex justify-between">
                <div>
                  <h1 className="font-semibold text-3xl flex items-center gap-4">
                    {details.company}{" "}
                    <span
                      className={`badge badge-sm border-none text-white ${
                        getBusStatus(
                          details.arrival_time,
                          details.departure_time
                        ) === "Completed"
                          ? "bg-green-500"
                          : ""
                      } ${
                        getBusStatus(
                          details.arrival_time,
                          details.departure_time
                        ) === "On Route"
                          ? "bg-yellow-600"
                          : ""
                      } ${
                        getBusStatus(
                          details.arrival_time,
                          details.departure_time
                        ) === "Upcoming"
                          ? "bg-theme-color"
                          : ""
                      }`}
                    >
                      {getBusStatus(
                        details.arrival_time,
                        details.departure_time
                      )}
                    </span>
                  </h1>
                  <h1 className="font-semibold text-gray-500">
                    {details.idnumber}
                  </h1>
                  <h1 className="font-semibold text-gray-500 mb-4">
                    {details.type}
                  </h1>
                </div>
                <div className="flex items-center justify-center">
                  <p className="text-3xl font-medium">{details.price} ৳</p>
                </div>
              </div>
              <hr className="border-dotted"></hr>
              <div className="flex justify-between my-4">
                <h1 className="text-sm flex items-center gap-2 font-bold text-[#828489]">
                  <MdOutlineEventSeat className="text-3xl"></MdOutlineEventSeat>
                  Available
                </h1>
                <h1 className="text-sm flex items-center gap-2 font-bold text-red-400">
                  <MdOutlineEventSeat className="text-3xl"></MdOutlineEventSeat>
                  Booked
                </h1>
                <h1 className="text-sm flex items-center gap-2 font-bold text-green-700">
                  <MdOutlineEventSeat className="text-3xl"></MdOutlineEventSeat>
                  Your Bookings
                </h1>
                <h1 className="text-sm flex items-center gap-2 font-bold text-theme-color">
                  <MdOutlineEventSeat className="text-3xl"></MdOutlineEventSeat>
                  Selected
                </h1>
              </div>
              <hr className="border-dotted"></hr>
              <div className="mt-4">
                <div className="flex justify-end">
                  <button className="btn w-24 border-none btn-disabled">
                    <PiSteeringWheel className="text-3xl text-black" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-x-6 gap-y-3 mt-3">
                {details.seats.map((seat, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      seat.seat_number[1] === "1" ? "justify-start" : ""
                    } ${seat.seat_number[1] === "2" ? "justify-start" : ""} ${
                      seat.seat_number[1] === "3" ? "justify-end" : ""
                    } ${seat.seat_number[1] === "4" ? "justify-end" : ""}`}
                  >
                    {/* bg-[#f1f1f1] hover:bg-[#e4e4e4] */}
                    <button
                      className={`btn border-none w-24 ${
                        selectedSeats.includes(seat.seat_number)
                          ? "bg-theme-color hover:bg-[#4355b8] text-white"
                          : seat.status === "booked" &&
                            seat?.booked === user.email
                          ? "bg-green-700 hover:bg-green-800 text-white"
                          : seat.status === "booked" &&
                            seat?.booked !== user.email
                          ? "bg-red-500 hover:bg-red-600 text-white"
                          : "bg-[#f1f1f1] hover:bg-[#e4e4e4]"
                      } `}
                      onClick={() => {
                        if (allowBooking) {
                          if (seat.status === "available") {
                            selectSeat(seat.seat_number);
                          } else {
                            if (seat.booked === user?.email) {
                              toast.error("Seat is already booked by you");
                            } else {
                              toast.error("Seat is not available");
                            }
                          }
                        } else {
                          toast.error(
                            "Bus journey is already on route or completed."
                          );
                        }
                      }}
                    >
                      {seat.seat_number}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="divider lg:divider-horizontal m-0 p-0"></div>
            <div className="w-full flex-1">
              <h1 className="font-semibold text-2xl mb-4">
                Your Selected Seats
              </h1>
              <hr className="border-dotted mb-4"></hr>
              <div className="bg-[#F7F8F8] p-5 rounded-xl">
                <div className="grid grid-cols-2 gap-16">
                  <h1 className="flex items-center gap-1 font-bold whitespace-nowrap">
                    Seats
                    <span className="bg-theme-color badge badge-lg text-white">
                      {selectedSeats.length}
                    </span>
                  </h1>
                  <h1 className="font-bold flex justify-end">Price</h1>
                </div>
                <hr className="my-1 border-dotted"></hr>
                <div className="grid grid-cols-1 gap-x-16 gap-y-2">
                  {selectedSeats.map((seat, index) => (
                    <div key={index} className="grid grid-cols-2">
                      <div className="font-medium">{seat}</div>
                      <div className="text-right">{details.price}</div>
                    </div>
                  ))}
                </div>
                <hr className="mb-5"></hr>
                <div className="flex justify-between my-1">
                  <h1 className="font-bold">Total Price</h1>
                  <h1 className="font-semibold">
                    BDT{" "}
                    <span id="total-price">
                      {selectedSeats.length * details.price}
                    </span>
                  </h1>
                </div>
                <hr className="my-5" />
                <div className="mb-2">
                  <h1 className="font-bold">
                    Email: <span className="font-normal">{user.email}</span>
                  </h1>
                </div>
                <div className="mb-2">
                  <h1 className="font-bold">
                    Name:{" "}
                    <span className="font-normal">{userDetails.name}</span>
                  </h1>
                </div>
                <div className="mb-2">
                  <h1 className="font-bold">
                    Phone Number:{" "}
                    <span className="font-normal">{userDetails.phone}</span>
                  </h1>
                </div>
                <button
                  className="btn w-full bg-theme-color text-white border-theme-color hover:bg-theme-color hover:border-theme-color"
                  onClick={() => {
                    if (selectedSeats.length === 0) {
                      toast.error("No Seats Selected");
                    } else {
                      navigate("/payment", {
                        state: {
                          seatInfo: {
                            busDetails: details,
                            email: user?.email,
                            selectedSeats,
                            amount: selectedSeats.length * details.price,
                          },

                          location: location.pathname,
                        },
                      });
                    }
                  }}
                >
                  Proceed
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default BusDetails;
