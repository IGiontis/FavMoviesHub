import { useSelector } from "react-redux";
import { useLikedMovies} from "../../hooks/useFetchLikedMovies"
import MoviesGallery from "../../components/MovieCard/MoviesGallery";

const FavMovies = () => {
  const user = useSelector((state) => state.auth.user);
  const { likedMovies = [] } = useLikedMovies(user?.uid);
  return (
    <div className="mt-4">
      <MoviesGallery filteredMovies={likedMovies} colSizes={{ xs: 12, sm: 6, md: 6, lg: 5, xl: 4, xxl: 3 }} />
    </div>
  );
};

export default FavMovies;
