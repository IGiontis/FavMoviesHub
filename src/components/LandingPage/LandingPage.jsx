import { useEffect } from "react";
import { fetchMovies } from "../../utils/api";

const LandingPage = () => {
  useEffect(() => {
    const getMovies = async () => {
      const movies = await fetchMovies("");
      console.log(movies); // You can log or set state with the fetched movies
    };
    getMovies();
  }, []); // Empty dependency array means it will run once when the component mounts

  return <div>landingPage</div>;
};

export default LandingPage;
