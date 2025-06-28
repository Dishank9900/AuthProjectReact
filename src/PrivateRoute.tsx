import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { checkUserValidity } from "./mocks/api/checkUserValidity";

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIfUserValid = async () => {
      try {
        const userToken = localStorage.getItem("token");
        if (!userToken)
          throw new Error("Failed to login! User token doesn't exist");
        const isUserValid = await checkUserValidity(userToken);
        if (!isUserValid)
          throw new Error("Failed to login! User doesn't exist");
        setLoading(false);
      } catch (error: any) {
        toast(error?.message || "Failed to login");
        navigate("/");
      }
    };
    checkIfUserValid();
  }, [navigate]);

  if (loading) {
    return (
      <div className='h-screen w-full flex items-center justify-center'>
        <span className='text-lg font-semibold'>
          Checking authentication...
        </span>
      </div>
    );
  }

  return <>{children}</>;
};
