import React from "react";
import { useAuth } from "../../context/auth/AuthContext";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();

  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  const handleLogin = () => {
    login(email, password);
  };
  return (
    <div className="w-full h-full flex items-center justify-center bg-white ">
      <div className="w-[30%] h-[60%] rounded-lg shadow-lg bg-gray-50 flex flex-col items-center justify-between py-4 px-2">
        <h1 className="text-xl font-bold">Login</h1>

        <div className="flex flex-col items-start w-4/5 gap-1">
          <p className="text-sm">Email:</p>
          <input
            type="text"
            className="p-2 shadow rounded w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start w-4/5 gap-1">
          <p className="text-sm">Password:</p>
          <input
            type="password"
            className="p-2 shadow rounded w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="text-lg text-medium w-4/5 rounded shadow bg-gray-100 hover:bg-gray-200 p-4"
          disabled={email === "" || password === ""}
          onClick={handleLogin}
        >
          Login
        </button>

        <p>
          Don't have an account? <span className="font-medium">
            <Link to={'/register'}>
          Register</Link>
            </span> 
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
