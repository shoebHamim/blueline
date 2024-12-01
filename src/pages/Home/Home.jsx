import Banner from "./Banner";
import Features from "./Features";
import Search from "./Search";

const Home = () => {
  return (
    <div className="container mx-auto">
      <div className="my-28">
        <Search></Search>
      </div>
      <div className="mb-28">
        <Features></Features>
      </div>
      <div className="mb-28">
        <Banner></Banner>
      </div>
    </div>
  );
};

export default Home;
