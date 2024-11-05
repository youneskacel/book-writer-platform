import React, { useEffect, useState } from "react";
import { User } from "../../types/user";
import axios from "axios";
import { useNavigate } from "react-router-dom";
interface IContextProps {
  user: User | null;
  permissions: string[];
  isAuthor: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  loadUser: () => void;
}

const defaultValue = {
  user: null,
  permissions: [],
  isAuthor: false,
  login: (_: string, __: string) => {},
  logout: () => {},
  loadUser: () => {},
};
const AuthContext = React.createContext<IContextProps>(defaultValue);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  const getUser = async (userId: string) => {
    const { data } = await axios.get(`http://localhost:3001/users/${userId}`);
    return data;
  };

  const loadUser = async () => {
    const userfromStorage = localStorage.getItem("userData");
    if (userfromStorage) {
      const userParsed = JSON.parse(userfromStorage);
      const newUser = await getUser(userParsed.id);
      if (newUser) {
        localStorage.setItem("userData", JSON.stringify(newUser));
        setUser(newUser);
        navigate("/account");
      }
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data } = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });
      if (data?.user) {
        localStorage.setItem("userData", JSON.stringify(data.user));
        setUser(data.user);
      }
      navigate("/account");
    } catch (error) {}
  };

  const logout = () => {
    localStorage.removeItem("userData");
    navigate("/login");
  };

  useEffect(() => {
    loadUser();
  }, []);

  const value = React.useMemo<IContextProps>(
    () => ({
      user,
      permissions: [],
      isAuthor: user?.role === "author",
      login,
      logout,
      loadUser,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => React.useContext(AuthContext);
