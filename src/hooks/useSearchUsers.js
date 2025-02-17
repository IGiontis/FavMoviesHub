import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../services/fetchUsers";

export const useSearchUsers = (searchTerm, currentUserId) => {
  return useQuery({
    queryKey: ["users", searchTerm, currentUserId], // ✅ Include userId in cache key
    queryFn: () => fetchUsers(searchTerm, currentUserId),
    enabled: !!searchTerm.trim(),
    staleTime: 1000 * 60 * 5,
  });
};
