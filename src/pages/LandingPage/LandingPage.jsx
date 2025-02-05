import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/api";
import { Col, Row, Input, FormGroup, Form, Container, Spinner } from "reactstrap";
import SearchedMovies from "./SearchedMovies";
import { useSelector } from "react-redux";
import { debounce } from "lodash";
import { toggleFavorite } from "../../firebase/firebaseServices";

const LandingPage = () => {
  const [defaultMovies, setDefaultMovies] = useState([]); // Store initial movie list
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [localLikedMovies, setLocalLikedMovies] = useState([]); // Track locally liked movies
  const user = useSelector((state) => state.auth.user); // Get user from redux store

  // Fetch default movies when component mounts
  useEffect(() => {
    const loadDefaultMovies = async () => {
      setLoading(true);
      try {
        const movies = await fetchMovies(""); // Fetch default movies
        setDefaultMovies(movies);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDefaultMovies();
  }, []);

  // Handle movie search with debounced input
  useEffect(() => {
    if (searchTerm.length < 3) {
      setFilteredMovies([]); // Reset filtered movies
      return undefined;
    }

    const delaySearch = setTimeout(async () => {
      setLoading(true);
      try {
        const fetchedMovies = await fetchMovies(searchTerm);
        setFilteredMovies(fetchedMovies);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(delaySearch);
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setFilteredMovies([]);
  };

  // Debounced save function to minimize backend calls
  // const debouncedSaveFavorites = debounce(async (movieID) => {
  //   console.log("debouncedSaveFavorites")
  //   if (user && user.uid) {
  //     console.log("enters")
  //     await toggleFavorite(user.uid, movieID); // Call backend to update the liked movies in Firestore
  //   }
  // }, 500); // 500ms debounce time

  // const handleMovieLike = (movieID) => {
  //   setLocalLikedMovies((prev) => {
  //     if (prev.includes(movieID)) {
  //       return prev.filter((id) => id !== movieID); // Remove the movie from local state
  //     } else {
  //       return [...prev, movieID]; // Add the movie to local state
  //     }
  //   });

  //   debouncedSaveFavorites(movieID); // Call debounced function to update Firestore
  // };

  return (
    <Container fluid className="pt-4">
      <Row>
        <Col>
          <h2 className="text-center">Welcome to Fav Movies Hub </h2>
          <Form>
            <FormGroup style={{ position: "relative", display: "inline-block", maxWidth: "200px" }}>
              <div style={{ position: "relative" }}>
                <Input
                  type="text"
                  id="searchTerm"
                  placeholder="Type movie name..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{
                    paddingRight: "30px",
                    position: "relative",
                  }}
                />
                {searchTerm && (
                  <span
                    onClick={clearSearch}
                    style={{
                      position: "absolute",
                      top: "50%",
                      right: "10px",
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "16px",
                      color: "#999",
                      backgroundColor: "transparent",
                      padding: "2px",
                    }}
                  >
                    ✖
                  </span>
                )}
              </div>
            </FormGroup>
          </Form>

          {loading ? (
            <Container fluid>
              <Row>
                <Col>
                  <p>Loading...</p>
                  <Spinner />
                </Col>
              </Row>
            </Container>
          ) : (
            <SearchedMovies
            user={user}
              filteredMovies={searchTerm ? filteredMovies : defaultMovies}
              localLikedMovies={localLikedMovies} // Pass the liked movies to the child component
              // handleMovieLike={handleMovieLike} // Pass the like handler to the child component
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
