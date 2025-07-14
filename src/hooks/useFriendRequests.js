import { useDispatch, useSelector } from 'react-redux';
import { getFriendRequests } from '../services/userService';
import { userStart, userFailure, setFriendRequests } from '../store/userSlice';

export const useFriendRequests = () => {
  const dispatch = useDispatch();
  const { friendRequests, loading, error } = useSelector((state) => state.user);

  const fetchFriendRequests = async () => {
    dispatch(userStart());
    try {
      const data = await getFriendRequests();
      dispatch(setFriendRequests(data));
    } catch (err) {
      dispatch(userFailure(err.message));
    }
  };

  return { friendRequests, loading, error, fetchFriendRequests };
};