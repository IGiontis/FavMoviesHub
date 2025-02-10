import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useQuery } from "@tanstack/react-query";

 const fetchLikedMovies = async (userID) => {
  if (!userID) throw new Error("No user ID provided");
  const moviesRef = collection(db,"users",userID,"likedMovies");
  const snapshot = await getDocs(moviesRef);
  return snapshot.docs.map((doc)=>({id:doc.id,...doc.data()}))
};
  
 
export const useLikedMovies = (userID)=>{
  return useQuery({
    queryKey:["likedMovies",userID],
    queryFn:()=>fetchLikedMovies(userID),
    enabled: !!userID,
  })
}