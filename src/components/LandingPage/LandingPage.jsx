import { useEffect, useState } from "react";
import { fetchMovies } from "../../services/api";
import { Col, Row, Input, FormGroup, Label, Form, Container, Spinner } from "reactstrap";
import SearchedMovies from "./SearchedMovies";

const LandingPage = () => {
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchTerm.length < 3) {
      setFilteredMovies([]);
      return () => {};
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
    <>
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
        <SearchedMovies filteredMovies={filteredMovies} />
      )}
    </>
  );
};

export default LandingPage;
