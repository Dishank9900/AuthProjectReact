import { useAuth } from "../store/AuthContext";
import { Navigate } from "react-router-dom";
import type { ComponentType } from "react";

const withAuth =
  <P extends object>(Component: ComponentType<P>) =>
  (props: P) => {
    const { isLoggedIn } = useAuth();

    if (!isLoggedIn) {
      return <Navigate to='/' />;
    }

    return <Component {...props} />;
  };

export default withAuth;
