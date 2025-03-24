import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest } from "../services/acceptFriendRequest";
import { toast } from "react-toastify";

export const useHandleFriendRequest = (currentUserId) => {
  const queryClient = useQueryClient(); //  Hook is at the top level
  const [loadingRequests, setLoadingRequests] = useState({});

  const handleAcceptRequest = async (request) => {
    setLoadingRequests((prev) => ({ ...prev, [request.senderId]: true }));

    try {
      await acceptFriendRequest(request, () => {
        queryClient.invalidateQueries(["friendRequests"]); //  No issues here
        queryClient.invalidateQueries(["friends", currentUserId]);
      });

      toast.success("Friend request accepted!");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Failed to accept friend request. Please try again.");
    } finally {
      setLoadingRequests((prev) => ({ ...prev, [request.senderId]: false }));
    }
  };

  return { handleAcceptRequest, loadingRequests };
};
