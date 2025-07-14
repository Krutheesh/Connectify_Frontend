// 🔹 useFriendActions.js
import { useDispatch } from 'react-redux';
import {
  sendRequest,
  acceptRequest,
  rejectRequest,
  getFriendRequests,
  getFriends,
  getOutgoingRequests,
} from '../services/userServices';
import { userStart, userFailure, setFriendRequests, setFriends, setOutgoingRequests } from '../store/userSlice';
import { toast } from 'react-hot-toast';

export const useFriendActions = () => {
  const dispatch = useDispatch();

  const handleSendRequest = async (userId) => {
    dispatch(userStart());
    try {
      await sendRequest(userId);
      toast.success('Request Sent');
      const updated = await getOutgoingRequests();
      dispatch(setOutgoingRequests(updated));
    } catch (err) {
      dispatch(userFailure(err.message));
      toast.error(err.message);
    }
  };

  const handleAcceptRequest = async (requestId) => {
    dispatch(userStart());
    try {
      await acceptRequest(requestId);
      toast.success('Request Accepted');
      dispatch(setFriendRequests(await getFriendRequests()));
      dispatch(setFriends(await getFriends()));
    } catch (err) {
      dispatch(userFailure(err.message));
      toast.error(err.message);
    }
  };

  const handleRejectRequest = async (requestId) => {
    dispatch(userStart());
    try {
      await rejectFriendRequest(requestId);
      toast.success('Request Rejected');
      dispatch(setFriendRequests(await getFriendRequests()));
    } catch (err) {
      dispatch(userFailure(err.message));
      toast.error(err.message);
    }
  };

  return { handleSendRequest, handleAcceptRequest, handleRejectRequest };
};