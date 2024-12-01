import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PiSmileySadLight } from "react-icons/pi";
import { getBusStatus } from "../../utils/getBusStatus";

const SearchResults = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/all-buses")
      .then((res) => res.json())
      .then((data) => {
        setBuses(
          data.filter(
            (bus) =>
              bus.departure_location === params.depart &&
              bus.destination_location === params.destination &&
              bus.departure_time.includes(params.date)
          )
        );
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-[65vh] mx-auto container border-t-2 rounded-t-[10%] border-theme-color py-10">
      <h1 className="text-center text-2xl font-medium">
        Bus routes for{" "}
        <span className="text-theme-color font-semibold">{params.depart}</span>{" "}
        to{" "}
        <span className="text-theme-color font-semibold">
          {params.destination}
        </span>{" "}
        on <span className="text-gray-600 font-semibold">{params.date}</span>
      </h1>
      <hr className="border-dotted my-5" />
      {loading ? (
        <>
          <div className="flex justify-center items-center pt-56">
            <span className="loading loading-bars loading-lg"></span>
          </div>
        </>
      ) : (
        <>
          {buses.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-5">
                {buses.map((bus) => (
                  <div
                    key={bus._id}
                    className="border rounded-xl flex justify-between items-start p-4"
                  >
                    <div className="whitespace-nowrap flex-1">
                      <h1 className="text-2xl font-medium flex items-center gap-2">
                        {bus.company}{" "}
                        <span
                          className={`badge badge-sm border-none text-white font-bold ${
                            getBusStatus(
                              bus.arrival_time,
                              bus.departure_time
                            ) === "Completed"
                              ? "bg-green-500"
                              : ""
                          } ${
                            getBusStatus(
                              bus.arrival_time,
                              bus.departure_time
                            ) === "On Route"
                              ? "bg-yellow-600"
                              : ""
                          } ${
                            getBusStatus(
                              bus.arrival_time,
                              bus.departure_time
                            ) === "Upcoming"
                              ? "bg-theme-color"
                              : ""
                          }`}
                        >
                          {getBusStatus(bus.arrival_time, bus.departure_time)}
                        </span>
                      </h1>
                      <h1 className="text-gray-700">
                        {bus.departure_location} to {bus.destination_location}
                      </h1>
                      <p className="text-gray-500 text-sm">{bus.type}</p>
                      <p className="text-gray-500 text-sm">{bus.idnumber}</p>
                    </div>
                    <div className="whitespace-nowrap flex-1">
                      <h1 className="text-gray-700 font-medium text-lg">
                        {bus.departure_time.split("T")[1]}
                      </h1>
                      <h1 className="text-gray-700 font-medium text-lg">
                        {bus.departure_time.split("T")[0]}
                      </h1>
                    </div>
                    <div className="whitespace-nowrap flex-1 flex flex-col h-full justify-between items-end gap-2">
                      <p className="text-3xl font-medium">{bus.price} ৳</p>
                      <button
                        className="btn btn-sm border-none bg-theme-color text-white hover:bg-theme-color"
                        onClick={() => navigate(`/bus/${bus._id}`)}
                      >
                        View Seats
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center flex-col justify-center py-40 text-2xl gap-4 font-bold">
                <h1>No Routes Found</h1>
                <PiSmileySadLight className="text-4xl"></PiSmileySadLight>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
