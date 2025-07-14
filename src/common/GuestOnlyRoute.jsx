import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const GuestOnlyRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  if (user?.isOnboarded) return <Navigate to="/" />;
  if (user && !user.isOnboarded) return <Navigate to="/onboard" />;

  return children;
};

export default GuestOnlyRoute;
