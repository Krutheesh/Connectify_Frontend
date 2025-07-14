import api from './api';

// Centralized error handler
const handleError = (error) => {
  const message = error.response?.data?.message || error.message || 'Something went wrong';
  console.log(error.response?.data?.message, error.message);
  throw new Error(message);
};

export const getFriends = async () => {
  try {
    const res = await api.get('/api/users/friends');
    return res.data.friends;
  } catch (error) {
    handleError(error);
  }
};

export const getRecommendations = async () => {
  try {
    const res = await api.get('/api/users');
    return res.data.recommendedUsers;
  } catch (error) {
    handleError(error);
  }
};

export const getOutgoingRequests = async () => {
  try {
    const res = await api.get('/api/users/outgoing-friend-requests');
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const sendRequest = async (id) => {
  try {
    const res = await api.post(`/api/users/friend-request/${id}`);
    console.log(res.data)
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const acceptRequest = async (id) => {
  try {
    const res = await api.put(`/api/users/friend-request/${id}/accept`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const rejectRequest = async (id) => {
  try {
    const res = await api.put(`/api/users/friend-request/${id}/reject`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const getFriendRequests = async () => {
  try {
    const res = await api.get('/api/users/friend-requests');
    console.log(res.data);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};
