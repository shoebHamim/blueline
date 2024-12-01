import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

const CheckoutForm = ({ info, handleStateClear }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [clientSecret, setClientSecret] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState({});

  // FETCHING USER DETAILS
  useEffect(() => {
    fetch(`http://localhost:5000/user/info/${user.email}`)
      .then((res) => res.json())
      .then((data) => setUserDetails(data));
  }, [user]);

  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info?.seatInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
      });
  }, []);

  const handleSubmit = async (event) => {
    setIsProcessing(true);
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast.error(error.message);
      setIsProcessing(false);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: userDetails?.email || user?.email,
            name: userDetails?.name || "N/A",
            phone: userDetails?.phone || "N/A",
          },
        },
      });

    if (confirmError) {
      toast.error(confirmError.message);
      setIsProcessing(false);
      return;
    } else {
      if (paymentIntent.status === "succeeded") {
        console.log(paymentIntent);
        const bookingInfo = {
          email: userDetails?.email || user?.email,
          name: userDetails?.name || "N/A",
          phone: userDetails?.phone || "N/A",
          amount: info.seatInfo.amount,
          bus_id: info.seatInfo.busDetails._id,
          selectedSeats: info.seatInfo.selectedSeats,
          transaction_id: paymentIntent.id,
          departure_location: info.seatInfo.busDetails.departure_location,
          departure_time: info.seatInfo.busDetails.departure_time,
          destination_location: info.seatInfo.busDetails.destination_location,
          arrival_time: info.seatInfo.busDetails.arrival_time,
          company: info.seatInfo.busDetails.company,
          idnumber: info.seatInfo.busDetails.idnumber,
        };

        // UPDATE SEAT STATUS API
        fetch("http://localhost:5000/update-seat-status", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingInfo),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.modifiedCount > 0) {
              fetch("http://localhost:5000/create-booking-info", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(bookingInfo),
              })
                .then((res) => res.json())
                .then((data) => {
                  console.log(data);
                  if (data.insertedId) {
                    handleStateClear();
                    navigate(`/booking/${data.insertedId}`);
                  }
                  // EMAILING
                  emailjs.init(import.meta.env.VITE_emailJSPublicKey);
                  emailjs
                    .send(
                      import.meta.env.VITE_emailJSServiceID,
                      import.meta.env.VITE_emailJSTemplateID,
                      {
                        name: userDetails?.name,
                        depart: info.seatInfo.busDetails.departure_location,
                        destination:
                          info.seatInfo.busDetails.destination_location,
                        time: info.seatInfo.busDetails.departure_time,
                        recipient: user?.email,
                        id: data.insertedId,
                      }
                    )
                    .then((res) => {
                      console.log(res);
                      toast.success("Seat has been booked. Check your email.");
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                });
            }
          });
      }
    }
    setIsProcessing(false);
  };

  return (
    <form
      id="payment-form"
      onSubmit={handleSubmit}
      className="border border-dotted rounded-lg p-4"
    >
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "18px",
              color: "#424770",
              letterSpacing: "0.025em",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      ></CardElement>

      <button
        className="btn w-full mt-3 bg-theme-color text-white border-theme-color hover:bg-theme-color hover:border-theme-color disabled:bg-transparent disabled:border-theme-color disabled:text-theme-color"
        disabled={!stripe || !clientSecret || isProcessing}
      >
        {!stripe || !clientSecret || isProcessing ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          "Pay"
        )}
      </button>
    </form>
  );
};

export default CheckoutForm;
