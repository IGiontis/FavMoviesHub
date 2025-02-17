import { useQueries } from "@tanstack/react-query";
import { fetchUsername } from "../services/fetchUsername";

export const useFetchUsernames = (userIds = []) => {
  const queries = useQueries({
    queries: userIds.map((userId) => ({
      queryKey: ["username", userId],
      queryFn: () => fetchUsername(userId),
      staleTime: 1000 * 60 * 5, // Cache for 5 minutes
      enabled: !!userId, // Only fetch for valid userIds
    })),
  });

  return queries.map((query) => ({
    username: query.data || "Loading...",
    isLoading: query.isLoading,
  }));
};
