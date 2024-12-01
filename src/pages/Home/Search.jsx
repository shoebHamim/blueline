import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Search = () => {
  const navigate = useNavigate();
  const searchFunction = (e) => {
    e.preventDefault();
    const depart = e.target.depart.value;
    const destination = e.target.destination.value;
    const date = e.target.date.value;

    if (depart === destination) {
      toast.error("Please select different locations!");
      return;
    }

    if (depart === "Select Departing Location") {
      toast.error("Select departing location!");
      return;
    }
    if (destination === "Select Destination") {
      toast.error("Select destination!");
      return;
    }
    if (date === "") {
      toast.error("Select a date!");
      return;
    }
    navigate(`/search/${depart}/${destination}/${date}`);
  };

  return (
    <>
      <div className="flex items-center">
        <div className="flex justify-end items-center gap-10">
          <div
            className="flex-1 flex justify-center"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <img src="banner-pic.png" className="w-[70%] p-2 bobbing-div" />
          </div>
          <div className="flex-1" data-aos="fade-up" data-aos-delay="50">
            <h1 className="font-bold text-3xl">Online Ticketing Made Easy!</h1>
            <hr className="border-black mt-2 mb-3" />
            <form className="space-y-3" onSubmit={searchFunction}>
              {/* LEAVING FROM */}
              <h2 className="text-theme-color font-semibold text-2xl">
                Leaving From
              </h2>
              <select
                className="select w-full bg-[#A89CFF] bg-opacity-20 font-bold"
                name="depart"
                required
              >
                <option defaultValue>Select Departing Location</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Khulna">Khulna</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Barisal">Barisal</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Mymensingh">Mymensingh</option>
              </select>

              {/* GOING TO */}
              <h2 className="text-theme-color font-semibold text-2xl">
                Going To
              </h2>
              <select
                className="select w-full bg-[#A89CFF] bg-opacity-20 font-bold"
                name="destination"
                required
              >
                <option defaultValue>Select Destination</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Khulna">Khulna</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Barisal">Barisal</option>
                <option value="Sylhet">Sylhet</option>
                <option value="Rangpur">Rangpur</option>
                <option value="Mymensingh">Mymensingh</option>
              </select>

              {/* DEPARTING DATE */}
              <h2 className="text-theme-color font-semibold text-2xl">
                Departing On
              </h2>
              <div className="relative">
                <input
                  type="date"
                  className="select w-full bg-[#A89CFF] bg-opacity-20 font-bold"
                  name="date"
                />
              </div>
              {/* SUBMIT BUTTON */}
              <button className="btn border-none bg-secondary-color font-bold w-full hover:bg-yellow-500">
                SEARCH
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;
