import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../services/fetchUsers";

export const useSearchUsers = (searchTerm) => {
    return useQuery({
        queryKey: ["users", searchTerm],
        queryFn: () => fetchUsers(searchTerm),
        enabled: !!searchTerm.trim(), // Prevents queries for empty strings
        staleTime: 1000 * 60 * 5, // Cache results for 5 minutes to reduce API calls
    });
};
