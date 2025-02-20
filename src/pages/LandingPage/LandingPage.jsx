import { useState, useCallback } from "react";
import { Col, Row, Input, FormGroup, Form, Container, Spinner } from "reactstrap";
import MoviesGallery from "./MoviesGallery";
import { useMovies } from "@/hooks/useMovies";
import { useDebounce } from "../../hooks/useDebounce";
import "./LandingPage.css"; // ✅ Import the CSS file

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: movies = [], isLoading, error } = useMovies(debouncedSearchTerm);

  // Optimize functions to prevent unnecessary re-renders
  const handleSearchChange = useCallback((e) => setSearchTerm(e.target.value), []);
  const clearSearch = useCallback(() => setSearchTerm(""), []);

  return (
    <Container fluid className="pt-4">
      <Row>
        <Col>
          <h2 className="text-center">Welcome to Fav Movies Share</h2>
          <Form>
            <FormGroup className="search-form">
              <div>
                <Input
                  type="text"
                  id="searchTerm"
                  placeholder="Type movie name..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="search-input"
                />
                {searchTerm && (
                  <span onClick={clearSearch} className="clear-search">
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
