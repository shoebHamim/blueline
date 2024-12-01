import { useState, useEffect } from "react";
import { toast } from "sonner";

const Support = () => {
  const [feedbackLoader, setFeedBackLoader] = useState(false);

  // FFEDBACK
  const handleFeedBackSubmit = (e) => {
    e.preventDefault();
    setFeedBackLoader(true);

    const data = {
      email: e.target.email.value,
      feedback: e.target.feedback.value,
    };

    fetch("http://localhost:5000/feedback", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Feedback sent!");
          setFeedBackLoader(false);
        } else {
          toast.error("Internal Server Error");
          setFeedBackLoader(false);
        }
      })
      .catch((err) => {
        toast.error(err.message);
        setFeedBackLoader(false);
      });
  };

  // State to manage which FAQ item is currently open
  const [activeIndex, setActiveIndex] = useState(null);

  // Function to toggle the visibility of FAQ items
  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  // FAQ data
  const faqData = [
    {
      question: "How can I book a bus ticket?",
      answer:
        "To book a bus ticket, you can visit our website or mobile app, enter your desired route, select your preferred bus, choose your seats, and proceed with the payment.",
    },
    {
      question: "What payment options are available?",
      answer:
        "We offer multiple payment options including credit/debit cards, net banking, and mobile wallets for your convenience.",
    },
    {
      question: "Can I cancel my bus ticket?",
      answer:
        "Yes, you can cancel your bus ticket. However, cancellation policies vary depending on the bus operator and timing of cancellation. Please refer to our cancellation policy or contact customer support for more details.",
    },
    {
      question: "How do I retrieve my booking history?",
      answer:
        "You can access your booking history by logging into your account on our website or mobile app. Your booking history will display all your past and upcoming trips.",
    },
    {
      question: "Is it possible to change the boarding point after booking?",
      answer:
        "In most cases, you can change your boarding point before the scheduled departure time, subject to availability and the policies of the bus operator. Please check with customer support for assistance.",
    },
    {
      question: "What if I miss my bus?",
      answer:
        "If you miss your bus, please contact customer support as soon as possible. Depending on availability and the policies of the bus operator, alternative arrangements may be possible.",
    },
    {
      question: "How can I provide feedback about my journey?",
      answer:
        "We welcome your feedback! You can provide feedback through our website, mobile app, or by contacting our customer support team. Your input helps us improve our services.",
    },
  ];

  return (
    <>
      <div className="min-h-screen container mx-auto">
        <div className="mb-6" data-aos="fade-up" data-aos-delay="50">
          <div className="grid grid-cols-2 gap-6 mt-16 mb-6">
            {/* Customer Support */}
            <div className="p-4 border-dotted border rounded-xl">
              <h2 className="text-3xl font-bold mb-2">
                Customer Support Hotlines
              </h2>
              <div className="mb-4">
                <p className="mb-1">
                  If you need assistance or have any inquiries, please feel free
                  to reach out to our dedicated customer support team. Our
                  representatives are available to assist you.
                </p>
              </div>
              <div className="mb-4">
                <p className="font-medium mb-1">Phone Hotlines:</p>
                <ul className="list-disc pl-5">
                  <li>
                    <span className="font-semibold">General Inquiries:</span>{" "}
                    Call:{" "}
                    <a
                      href="tel:+18001234567"
                      className="text-blue-500 hover:underline cursor-pointer"
                    >
                      +1-800-123-4567
                    </a>
                  </li>
                  <li>
                    <span className="font-bold mb-1">Booking Assistance:</span>{" "}
                    Call:{" "}
                    <a
                      href="tel:+18009876543"
                      className="text-blue-500 hover:underline cursor-pointer"
                    >
                      +1-800-987-6543
                    </a>
                  </li>
                  <li>
                    <span className="font-bold mb-1">
                      Feedback and Complaints:
                    </span>{" "}
                    Call:{" "}
                    <a
                      href="tel:+18005557890"
                      className="text-blue-500 hover:underline cursor-pointer"
                    >
                      +1-800-555-7890
                    </a>
                  </li>
                </ul>
              </div>
              <div className="mb-4">
                <p className="font-bold mb-1">Working Hours:</p>
                <p className="">
                  Our customer support team is available to assist you during
                  the following hours:
                </p>
                <p className="">
                  - Monday to Friday: 9:00 AM to 8:00 PM (Local Time)
                </p>
                <p className="">
                  - Saturday and Sunday: 10:00 AM to 6:00 PM (Local Time)
                </p>
              </div>
              <div className="mb-4">
                <p className="font-semibold">Email Support:</p>
                <p className="">
                  You can also reach us via email at{" "}
                  <a
                    href="mailto:support@example.com"
                    className="text-blue-500 hover:underline cursor-pointer"
                  >
                    support@example.com
                  </a>
                  . We strive to respond to all inquiries within 24 hours.
                </p>
              </div>
              <div>
                <p className="font-semibold">Emergency Support:</p>
                <p className="">
                  For urgent matters or emergencies, please dial our emergency
                  hotline at{" "}
                  <a
                    href="tel:+1800911911"
                    className="text-blue-500 hover:underline cursor-pointer"
                  >
                    +1-800-911-911
                  </a>
                  .
                </p>
              </div>
            </div>
            {/* FEEDBACK FORM */}
            <div className="bg-[#f2f3f8] rounded-xl p-4 flex flex-col h-full">
              <h2 className="text-3xl font-bold mb-2">Give us your review!</h2>
              <p className="mb-1">
                Please use the form below to send us your feedback. Your
                comments are invaluable to us and will be carefully reviewed by
                our team. We strive to provide the best possible experience for
                our users, and your input plays a crucial role in achieving that
                goal.
              </p>
              <hr className="my-2" />
              <form
                onSubmit={handleFeedBackSubmit}
                className="flex flex-col flex-1 gap-3"
              >
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered"
                  name="email"
                  required
                />
                <textarea
                  className="textarea textarea-bordered flex-1"
                  placeholder="Your Feedback"
                  name="feedback"
                  required
                ></textarea>
                <button
                  disabled={feedbackLoader}
                  className="btn bg-theme-color text-white border-theme-color hover:text-white hover:bg-theme-color hover:border-theme-color"
                >
                  {feedbackLoader ? (
                    <>
                      <span className="loading loading-spinner loading-md"></span>
                    </>
                  ) : (
                    "Submit Feedback"
                  )}
                </button>
              </form>
            </div>
          </div>
          {/* FAQ */}
          <div className="p-4 border-dotted border rounded-xl bg-[#f7f7f8]">
            <h1 className="text-3xl font-bold mb-10">
              Frequently Asked Questions
            </h1>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div className="border border-gray-100 rounded-lg" key={index}>
                  <div
                    className="flex justify-between items-center px-6 py-5 cursor-pointer"
                    onClick={() => toggleFAQ(index)}
                  >
                    <div>
                      <h1 className="font-bold">{faq.question}</h1>
                    </div>
                    <svg
                      className={`w-7 h-7 transition-transform ${
                        activeIndex === index ? "transform rotate-90" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  {activeIndex === index && (
                    <div className="px-6 py-4">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Support;
