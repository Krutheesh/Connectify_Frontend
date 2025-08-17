import api from './api';

// Centralized error handler (optional but helpful)
const handleError = (error) => {
  const message = error.response?.data?.message || error.message || 'Something went wrong';
  console.log(error.response?.data?.message,error.message)
  throw new Error(message);
};

export const signupUser = async (formData) => {
  try {
    const res = await api.post('/api/auth/signup', formData);
    // console.log('User signed up:', res.data);
    return res.data.user;
  } catch (error) {
    // console.error('Signup error:', error);
    handleError(error);
  }
};

export const loginUser = async (formData) => {
  try {
    const res = await api.post('/api/auth/signin', formData);
    // console.log('User logged in:', res.data);
    return res.data.user;
  } catch (error) {

    handleError(error);
  }
};

export const logout = async () => {
  try {
    await api.post('/api/auth/logout');
  } catch (error) {
    handleError(error);
  }
};

export const getProfile = async () => {
  try {
    const res = await api.get('/api/auth/me');
    // console.log('User profile fetched:', res.data.user);
    return res.data.user;
  } catch (error) {
    handleError(error);
  }
};

export const onboardUser = async (formData) => {
  try {
    const res = await api.post('/api/auth/onboard', formData);
    return res.data.user;
  } catch (error) {
    handleError(error);
  }
};
