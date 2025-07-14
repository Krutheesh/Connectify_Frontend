import { useDispatch, useSelector } from 'react-redux';
import { getFriends } from '../services/userServices';
import { userStart, userFailure, setFriends } from '../store/userSlice';

export const useFriends = () => {
  const dispatch = useDispatch();
  const { friends, loading, error } = useSelector((state) => state.user);

  const fetchFriends = async () => {
    dispatch(userStart());
    try {
      const data = await getFriends();
      dispatch(setFriends(data));
    } catch (err) {
      dispatch(userFailure(err.message));
    }
  };

  return { friends, loading, error, fetchFriends };
};