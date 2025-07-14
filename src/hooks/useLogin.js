import { useDispatch, useSelector } from 'react-redux';
import { authStart, authSuccess, authFailure } from '../store/authSlice';
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router';

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const login = async (formData) => {
    dispatch(authStart());
    try {
      const user = await loginUser(formData);
      dispatch(authSuccess(user));
     navigate('/')
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      dispatch(authFailure(message));
     
    }
  };

  return { login, loading, error };
};

export default useLogin;