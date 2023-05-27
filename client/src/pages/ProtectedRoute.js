import { Navigate } from "react-router";
import { useAppContext } from "../context/appContext.js";
import { Loading } from "../components/index.js";

const ProtectedRoute = ({ children }) => {
  const { user, userLoading } = useAppContext();
  // userLoading is false on logoutUser
  //
  if (userLoading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to="/landing" />;
  }
  return children;
};
export default ProtectedRoute;
