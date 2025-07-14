import { useDispatch, useSelector } from "react-redux";
import { authStart, authSuccess, authFailure } from "../store/authSlice";
import { signupUser } from "../services/authService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";

const useSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const signup = async (formData) => {
    dispatch(authStart());
    try {
      
      const user = await signupUser(formData);
      dispatch(authSuccess(user));
     
      navigate("/onboard");
    } catch (err) {
      const message = err.response?.data?.message || err.message;
      console.log(err.response?.data?.message,err.message)
      dispatch(authFailure(message));
      
    }
  };

  return { signup, loading, error };
};

export default useSignup;
