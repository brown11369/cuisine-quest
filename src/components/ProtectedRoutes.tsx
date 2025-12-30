import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const isAuthenticated = false;
  useEffect(() => {
    if (!isAuthenticated) navigate("/authentication");
  }, [isAuthenticated, navigate]);

  return children;
};
export default ProtectedRoutes;
