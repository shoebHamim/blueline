import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
import { useLocation } from "react-router-dom";

const Payment = () => {
  const location = useLocation();

  const handleStateClear = () => {
    window.history.replaceState({}, "");
  };

  return (
    <>
      <div className="pb-16 pt-12 flex flex-col items-center container mx-auto px-96 min-h-[600px]">
        {location.state ? (
          <>
            <div className="w-full">
              <div className="flex justify-between">
                <div>
                  <h1 className="font-semibold text-3xl">
                    {location.state?.seatInfo?.busDetails?.company}
                  </h1>
                  <h1 className="font-semibold text-gray-500">
                    {location.state?.seatInfo?.busDetails?.idnumber}
                  </h1>
                  <h1 className="font-semibold text-gray-500 mb-4">
                    {location.state?.seatInfo?.busDetails?.type}
                  </h1>
                </div>
                <div className="flex flex-col items-start justify-start">
                  <p className="text-xl font-medium">
                    {location.state?.seatInfo?.busDetails?.departure_location}{" "}
                    to{" "}
                    {location.state?.seatInfo?.busDetails?.destination_location}{" "}
                  </p>
                  <div className="whitespace-nowrap flex gap-2">
                    <h1 className="text-gray-500 font-medium text-lg">
                      {
                        location.state?.seatInfo?.busDetails?.departure_time.split(
                          "T"
                        )[1]
                      }
                    </h1>
                    <h1 className="text-gray-500 font-medium text-lg">
                      {
                        location.state?.seatInfo?.busDetails?.departure_time.split(
                          "T"
                        )[0]
                      }
                    </h1>
                  </div>
                </div>
              </div>
              <hr className="border-dotted my-2"></hr>
              <div className="grid grid-cols-2 mb-1 text-gray-600">
                <h1 className="font-semibold text-lg">Selected Seats</h1>
                <h1 className="font-semibold text-lg text-right">
                  Total Price
                </h1>
              </div>
              <div className="flex justify-between">
                <div className="flex gap-4">
                  {location.state?.seatInfo?.selectedSeats?.map(
                    (seat, index) => (
                      <h1
                        key={index}
                        className="font-bold text-theme-color border border-theme-color aspect-square p-2 rounded-lg"
                      >
                        {seat}
                      </h1>
                    )
                  )}
                </div>
                <div>
                  <p className="text-3xl font-medium">
                    {location.state?.seatInfo?.amount} ৳
                  </p>
                </div>
              </div>
              <hr className="border-dotted my-2"></hr>
            </div>
            <div className="w-full">
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  info={location?.state}
                  handleStateClear={handleStateClear}
                ></CheckoutForm>
              </Elements>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Payment;
