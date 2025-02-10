import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../services/api";

export const useMovies = (searchTerm) => {
  return useQuery({
    queryKey: ["movies", searchTerm],
    queryFn: () => fetchMovies(searchTerm),
    enabled: searchTerm.length >= 3 || searchTerm === "",
    staleTime: 100 * 50 * 5,
  });
};
