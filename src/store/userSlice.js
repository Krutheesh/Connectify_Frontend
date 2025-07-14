// ✅ userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  friends: [],
  recommendedUsers: [],
  outgoingRequests: [],
  friendRequests: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    userFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setFriends: (state, action) => {
      state.loading = false;
      state.friends = action.payload;
    },
    setRecommendedUsers: (state, action) => {
      state.loading = false;
      state.recommendedUsers = action.payload;
    },
    setOutgoingRequests: (state, action) => {
      state.loading = false;
      state.outgoingRequests = action.payload;
    },
    setFriendRequests: (state, action) => {
      state.loading = false;
      state.friendRequests = action.payload;
    },
  },
});

export const {
  userStart,
  userFailure,
  setFriends,
  setRecommendedUsers,
  setOutgoingRequests,
  setFriendRequests,
} = userSlice.actions;

export default userSlice.reducer;
