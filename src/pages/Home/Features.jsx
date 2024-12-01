import { IoSearchSharp } from "react-icons/io5";
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";

const Features = () => {
  return (
    <>
      <div className="font-primary text-lg flex flex-col justify-center items-center">
        <h1 className="text-center text-4xl font-bold mb-12">
          Easy Steps to an Easy Journey
        </h1>
        <div className="container mx-auto grid grid-cols-3 gap-10">
          <div
            data-aos="fade-up"
            data-aos-delay="50"
            className="flex-1 rounded-lg shadow-xl border flex flex-col justify-start px-5 py-8"
          >
            <div className="bg-secondary-color aspect-square rounded-full w-16 shadow-2xl flex justify-center items-center">
              <IoSearchSharp className="text-white text-3xl"></IoSearchSharp>
            </div>
            <h4 className="text-xl my-4 font-medium text-gray-500">
              Search Destination!
            </h4>
            <hr className="mb-4 border-secondary-color border-2 shadow-xl rounded-full w-[30%]" />
            <ul className="list-disc space-y-2 max-h-48 overflow-hidden">
              <li className="text-gray-500 overflow-hidden">
                • Go to BlueLine Website
              </li>
              <li className="text-gray-500 overflow-hidden">
                • Select your departing location
              </li>
              <li className="text-gray-500 overflow-hidden">
                • Select your destination and date of your journey
              </li>
              <li className="text-gray-500 overflow-hidden">• Press search</li>
            </ul>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="flex-1 rounded-lg shadow-xl border flex flex-col justify-start px-5 py-8"
          >
            <div className="bg-theme-color aspect-square rounded-full w-16 shadow-2xl flex justify-center items-center">
              <MdOutlineAirlineSeatReclineExtra className="text-white text-3xl"></MdOutlineAirlineSeatReclineExtra>
            </div>
            <h4 className="text-xl my-4 font-medium text-gray-500">
              Select your seat!
            </h4>
            <hr className="mb-4 border-theme-color border-2 shadow-xl rounded-full w-[30%]" />
            <ul className="list-disc space-y-2 max-h-48 overflow-hidden">
              <li className="text-gray-500 overflow-hidden">
                • Select your desired seats from the options
              </li>
              <li className="text-gray-500 overflow-hidden">
                • Review your selection
              </li>
              <li className="text-gray-500 overflow-hidden">• Click Next</li>
            </ul>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="150"
            className="flex-1 rounded-lg shadow-xl border flex flex-col justify-start px-5 py-8"
          >
            <div className="bg-green-600 aspect-square rounded-full w-16 shadow-2xl flex justify-center items-center">
              <MdOutlinePayment className="text-white text-3xl"></MdOutlinePayment>
            </div>
            <h4 className="text-xl my-4 font-medium text-gray-500">
              Confirm your Journey!
            </h4>
            <hr className="mb-4 border-green-600 border-2 shadow-xl rounded-full w-[30%]" />
            <ul className="list-disc space-y-2 max-h-48 overflow-hidden">
              <li className="text-gray-500 overflow-hidden">
                • Confirm your seat selections
              </li>
              <li className="text-gray-500 overflow-hidden">
                • Pay using variety of options
              </li>
              <li className="text-gray-500 overflow-hidden">
                • Get your tickets mailed to you
              </li>
              <li className="text-gray-500 overflow-hidden">
                • Enjoy your journey
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
