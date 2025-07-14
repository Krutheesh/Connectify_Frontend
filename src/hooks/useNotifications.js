import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  getFriendRequests,
  acceptRequest,
} from '../services/userServices';
import { userStart, userFailure, setFriendRequests } from '../store/userSlice';
import toast from 'react-hot-toast';

const useNotifications = () => {
  const dispatch = useDispatch();
  const { friendRequests, loading, error } = useSelector((state) => state.user);

  const fetchRequests = async () => {
    dispatch(userStart());
    try {
      const requests = await getFriendRequests();
      console.log('-----------')
      dispatch(setFriendRequests(requests));
    } catch (err) {
      dispatch(userFailure(err.message));
    }
  };
  useEffect(() => {
    fetchRequests();  
  }, [dispatch]);

  const handleAcceptRequest = async (requestId) => {
    dispatch(userStart());
    try {
      await acceptRequest(requestId);
      toast.success('Friend request accepted');
      await fetchRequests();
    } catch (err) {
      dispatch(userFailure(err.message));
      toast.error(err.message);
    }
  };

  const incomingRequests = friendRequests?.incomingReqs || [];
  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return {
    loading,
    error,
    incomingRequests,
    acceptedRequests,
    fetchRequests,
    handleAcceptRequest,
  };
};

export default useNotifications;
