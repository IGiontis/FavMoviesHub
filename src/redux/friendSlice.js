import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddFriendOpen: false,
  friends: [],
};

const friendSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    toggleAddFriend: (state) => {
      state.isAddFriendOpen = !state.isAddFriendOpen;
    },
  },
});

export const {toggleAddFriend} = friendSlice.actions;
export default friendSlice.reducer