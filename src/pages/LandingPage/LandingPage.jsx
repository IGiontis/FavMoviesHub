import { useState, useCallback, useMemo } from "react";
import { Col, Row, Form, Container, Spinner } from "reactstrap";
import MoviesGallery from "./MoviesGallery";
import { useMovies } from "@/hooks/useMovies";
import { useDebounce } from "../../hooks/useDebounce";

import SearchInput from "../../components/FormInputs/SearchInput";

const LandingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Use useMemo to avoid unnecessary calculations
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // ✅ Avoid API calls unless necessary (empty search should not fetch)
  const shouldFetchMovies = useMemo(() => debouncedSearchTerm.trim().length >= 3, [debouncedSearchTerm]);
  const { data: movies = [], isLoading, error } = useMovies(shouldFetchMovies ? debouncedSearchTerm : "");

  // ✅ Prevent unnecessary re-renders
  const handleSearchChange = useCallback((e) => setSearchTerm(e.target.value), []);
  const clearSearch = useCallback(() => setSearchTerm(""), []);

  return (
    <Container fluid className="pt-4">
      <Row>
        <Col>
          <h2 className="text-center">Welcome to Fav Movies Share</h2>
          <Form className="mb-4">
            <SearchInput
              id="search-input" // ✅ Changed ID to lowercase for consistency
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              clearSearch={clearSearch}
              placeholder="Search a movie..."
            />
          </Form>

          {isLoading && (
            <div className="text-center">
              <p>Loading...</p>
              <Spinner />
            </div>
          )}

          {error && <p className="text-danger">Error loading movies.</p>}

          {!isLoading && !error && movies.length > 0 && (
            <MoviesGallery
              filteredMovies={movies}
              colSizes={{ xs: 12, sm: 6, md: 6, lg: 5, xl: 4, xxl: 3 }}
            />
          )}

          {!isLoading && !error && movies.length === 0 && shouldFetchMovies && (
            <p className="text-muted text-center">No movies found 😞</p>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default LandingPage;
