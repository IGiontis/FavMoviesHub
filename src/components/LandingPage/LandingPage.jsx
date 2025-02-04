import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/api";
import { Col, Row, Input, FormGroup, Label, Form, Container, Spinner } from "reactstrap";
import SearchedMovies from "./SearchedMovies";

const LandingPage = () => {
  const [defaultMovies, setDefaultMovies] = useState([]); // Store initial movie list
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch default movies on mount
    const loadDefaultMovies = async () => {
      setLoading(true);
      try {
        const movies = await fetchMovies(""); // Pass empty string for default movies
        setDefaultMovies(movies);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDefaultMovies();
  }, []);

  useEffect(() => {
    if (searchTerm.length < 3) {
      setFilteredMovies([]); // Reset filtered movies
      return ;
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

  return (
    <Container fluid className="pt-4">
      <Row>
        <Col>
          <Form>
            <FormGroup style={{ position: "relative", display: "inline-block", maxWidth: "200px" }}>
              <Label for="searchTerm">Search for a Movie</Label>
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
            <SearchedMovies filteredMovies={searchTerm ? filteredMovies : defaultMovies} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
