import type { ReactNode } from "react";
import { useAppSelector } from "@/redux/hooks";
import { Navigate } from "react-router-dom";

interface ProtectedProps {
  children: ReactNode;
}

const Protected = ({ children }: ProtectedProps) => {
  const userInfo = useAppSelector((store) => store.user.userInfo);

  const persist = JSON.parse(localStorage.getItem("persist") || "false");

  if (!persist && !userInfo?.accessToken) {
    return <Navigate to="/" />;
  }

  return children;
};

export default Protected;
