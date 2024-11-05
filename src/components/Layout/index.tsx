import React, { useEffect } from "react";
import Sidebar from "./sidebar";
import Header from "./Header";
import { useAuth } from "../../context/auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);
  return (
    <div className="w-full h-full flex">
      <div className="w-[15%] h-full">
        <Sidebar />
      </div>

      <div className="flex-1 w-max flex flex-col justify-start">
        <div className="w-full h-[10%]">
          <Header />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
