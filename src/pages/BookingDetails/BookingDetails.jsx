import { useLoaderData } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { getBusStatus } from "../../utils/getBusStatus";
const BookingDetails = () => {
  const data = useLoaderData();

  return (
    <div className="min-h-[65vh] container mx-auto">
      <div className="border-t-2 border-theme-color py-10 px-10 rounded-[10%] bg-[#fdfdfd]">
        <div className="border max-w-xl mx-auto border-dotted p-8 rounded-md">
          <h1 className="text-center text-2xl font-bold mb-2 text-theme-color">
            Ticket Details
          </h1>
          <span
            className={`badge border-none font-bold text-white w-full mb-2 ${
              getBusStatus(data.arrival_time, data.departure_time) ===
              "Completed"
                ? "bg-green-500"
                : ""
            } ${
              getBusStatus(data.arrival_time, data.departure_time) ===
              "On Route"
                ? "bg-yellow-600"
                : ""
            } ${
              getBusStatus(data.arrival_time, data.departure_time) ===
              "Upcoming"
                ? "bg-theme-color"
                : ""
            }`}
          >
            {getBusStatus(data.arrival_time, data.departure_time)}
          </span>

          <h1 className="text-center text-2xl text-gray-500 font-semibold">
            {data.idnumber}
          </h1>
          <div className="flex justify-between max-w-xl items-center mx-auto mt-4">
            <div>
              <h1 className="text-xl font-bold">{data.departure_location}</h1>
              <div className="whitespace-nowrap flex-1">
                <h1 className="text-gray-700 font-medium text-lg">
                  {data.departure_time.split("T")[1]}
                </h1>
                <h1 className="text-gray-700 font-medium text-lg">
                  {data.departure_time.split("T")[0]}
                </h1>
              </div>
            </div>
            <FaArrowRightLong className="text-3xl"></FaArrowRightLong>
            <div className="text-right">
              <h1 className="text-xl font-bold">{data.destination_location}</h1>
              <div className="whitespace-nowrap flex-1">
                <h1 className="text-gray-700 font-medium text-lg">
                  {data.arrival_time.split("T")[1]}
                </h1>
                <h1 className="text-gray-700 font-medium text-lg">
                  {data.arrival_time.split("T")[0]}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="border max-w-xl mx-auto border-dotted p-8 rounded-md mt-1 flex flex-col items-center justify-center">
          <div className="grid grid-cols-2 gap-2 whitespace-nowrap">
            <h1 className="text-gray-700 font-medium">
              <span className="font-semibold text-theme-color">Name: </span>
              {data.name}
            </h1>
            <h1 className="text-gray-700 font-medium">
              <span className="font-semibold text-theme-color">Email: </span>
              {data.email}
            </h1>
            <h1 className="text-gray-700 font-medium">
              <span className="font-semibold text-theme-color">Phone: </span>
              {data.phone}
            </h1>
            <h1 className="text-gray-700 font-medium">
              <span className="font-semibold text-theme-color">Price: </span>
              {data.amount} ৳
            </h1>
          </div>
        </div>
        <div className="border max-w-xl mx-auto border-dotted p-8 rounded-md mt-1 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 ">
            <h1 className="font-semibold text-theme-color">Selected Seats: </h1>
            <div className="flex gap-2">
              {data.selectedSeats.map((seat, index) => (
                <div
                  key={index}
                  className="bg-theme-color text-white p-2 aspect-square rounded-md font-semibold"
                >
                  {seat}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
