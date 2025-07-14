import { useDispatch, useSelector } from 'react-redux';
import { getOutgoingRequests } from '../services/userServices';
import { userStart, userFailure, setOutgoingRequests } from '../store/userSlice';

export const useOutgoingRequests = () => {
  const dispatch = useDispatch();
  const { outgoingRequests, loading, error } = useSelector((state) => state.user);

  const fetchOutgoingRequests = async () => {
    dispatch(userStart());
    try {
      const data = await getOutgoingRequests();
      dispatch(setOutgoingRequests(data));
    } catch (err) {
      dispatch(userFailure(err.message));
    }
  };

  return { outgoingRequests, loading, error, fetchOutgoingRequests };
};