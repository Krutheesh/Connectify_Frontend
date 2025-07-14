import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router';

const ProtectedRoute = ({ children, onboardingOnly = false }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const [ready, setReady] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading) {
      const isAuthenticated = !!user;
      const isOnboarded = user?.isOnboarded;

      if (!isAuthenticated) {
        navigate('/login', { replace: true, state: { from: location } });
      } else if (onboardingOnly && isOnboarded) {
        navigate('/', { replace: true });
      } else if (!onboardingOnly && !isOnboarded) {
        navigate('/onboard', { replace: true });
      } else {
        setReady(true);
      }
    }
  }, [loading, user, onboardingOnly, navigate, location]);

  if (!ready) return <div>Loading...</div>;

  return children;
};

export default ProtectedRoute;
