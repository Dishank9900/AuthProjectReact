import { createContext, useState, useEffect } from "react";
import { useContext } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (phone: string) => void;
  logout: () => void;
  user: { phone: string; UserId: string } | null;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  user: null,
});

function createMockJWT(phone: string): string {
  const payload = {
    phone,
    UserId: `user-${Date.now()}`,
  };
  return btoa(JSON.stringify(payload));
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<{ phone: string; UserId: string } | null>(
    null
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token));
        if (payload.phone && payload.UserId) {
          setIsLoggedIn(true);
          setUser({ phone: payload.phone, UserId: payload.UserId });
        }
      } catch {
        setIsLoggedIn(false);
        setUser(null);
      }
    }
  }, []);

  const login = (phone: string) => {
    setIsLoggedIn(true);
    const token = createMockJWT(phone);
    localStorage.setItem("token", token);
    const payload = JSON.parse(atob(token));
    setUser({ phone: payload.phone, UserId: payload.UserId });
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  return context;
};
