import React from "react";
import { useAuth } from "../../../context/auth/AuthContext";

const Header = () => {
  const { user } = useAuth();
  return (
    <div className="w-full h-full flex items-center justify-end border-b px-4">
      {user && <p className="text-xl font-bold">{user.name}</p>}
    </div>
  );
};

export default Header;
