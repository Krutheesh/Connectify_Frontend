import { useDispatch, useSelector } from 'react-redux';
import { getRecommendations } from '../services/userServices';
import { userStart, userFailure, setRecommendedUsers } from '../store/userSlice';

export const useRecommendedUsers = () => {
  const dispatch = useDispatch();
  const { recommendedUsers, loading, error } = useSelector((state) => state.user);

  const fetchRecommendedUsers = async () => {
    dispatch(userStart());
    try {
      const data = await getRecommendations();
      dispatch(setRecommendedUsers(data));
    } catch (err) {
      dispatch(userFailure(err.message));
    }
  };

  return { recommendedUsers, loading, error, fetchRecommendedUsers };
};