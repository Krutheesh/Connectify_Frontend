import { useDispatch, useSelector } from 'react-redux';
import { authStart, authSuccess, authFailure } from '../store/authSlice';
import { onboardUser } from '../services/authService';
import { toast } from 'react-hot-toast';

const useOnboard = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const onboard = async (formData) => {
    dispatch(authStart());
    try {
      const user = await onboardUser(formData);
      dispatch(authSuccess(user));
      toast.success('Onboarding complete');
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      dispatch(authFailure(message));
      toast.error(message);
    }
  };

  return { onboard, loading, error };
};

export default useOnboard;