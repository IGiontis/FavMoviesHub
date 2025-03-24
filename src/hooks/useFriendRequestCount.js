import { useReceivedFriendRequests } from "./useReceivedFriendRequests";

export const  useFriendRequestCount = (userID) => {
    const {data:receivedRequests = []} = useReceivedFriendRequests(userID);

    return receivedRequests.length;
};

