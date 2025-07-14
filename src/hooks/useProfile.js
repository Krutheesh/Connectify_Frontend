import { useDispatch, useSelector } from 'react-redux';
import { authStart, authSuccess, authFailure } from '../store/authSlice';
import { getProfile } from '../services/authService';
import { useNavigate } from 'react-router';
const useProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);

  const fetchProfile = async () => {
    dispatch(authStart());
    try {
      console.log("Fetching user profile...");
      const user = await getProfile();
      dispatch(authSuccess(user));
       // Redirect to home or dashboard after fetching profile
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      dispatch(authFailure(null));
    }
  };

  return {  user,fetchProfile, loading, error };
};

export default useProfile;