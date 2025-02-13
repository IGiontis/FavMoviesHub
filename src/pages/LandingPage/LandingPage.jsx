import { useState } from "react";
import { Col, Row, Input, FormGroup, Form, Container, Spinner } from "reactstrap";
import MoviesGallery from "./MoviesGallery";
import { useMovies } from "@/hooks/useMovies";
import { useDebounce } from "../../hooks/useDebounce";

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // ✅ Use debounced value

  // Debounce Effect: Update debouncedSearchTerm only after 500ms of inactivity

  const { data: movies = [], isLoading, error } = useMovies(debouncedSearchTerm);

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const clearSearch = () => setSearchTerm("");

  return (
    <Container fluid className="pt-4">
      <Row>
        <Col>
          <h2 className="text-center">Welcome to Fav Movies Share</h2>
          <Form>
            <FormGroup style={{ position: "relative", display: "inline-block", maxWidth: "200px" }}>
              <div style={{ position: "relative" }}>
                <Input
                  type="text"
                  id="searchTerm"
                  placeholder="Type movie name..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{ paddingRight: "30px", position: "relative" }}
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

          {isLoading ? (
            <Container fluid>
              <Row>
                <Col>
                  <p>Loading...</p>
                  <Spinner />
                </Col>
              </Row>
            </Container>
          ) : error ? (
            <p>Error loading movies.</p>
          ) : (
            <MoviesGallery filteredMovies={movies} colSizes={{ xs: 12, sm: 6, md: 6, lg: 5, xl: 4, xxl: 3 }} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
