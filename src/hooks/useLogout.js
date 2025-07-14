import { useDispatch } from 'react-redux';
import { logoutUser } from '../store/authSlice';
import { logout } from '../services/authService';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router';
const useLogout = () => {
  const dispatch = useDispatch();
const navigate = useNavigate()
  const handleLogout = async () => {
    await logout();
    dispatch(logoutUser());
    navigate('/login');
    toast.success('Logged out');
  };

  return { handleLogout };
};

export default useLogout;