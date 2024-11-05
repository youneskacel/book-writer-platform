import React from "react";
import axios from "axios";
import { useAuth } from "../../context/auth/AuthContext";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const { loadUser } = useAuth();

  const [userType, setUserType] = React.useState<"collaborator" | "author">(
    "collaborator"
  );

  const [credentials, setCredentials] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (key: string, value: string) => {
    setCredentials((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const register = async (credentials: any) => {
    const { data } = await axios.post(
      "http://localhost:3001/register",
      credentials
    );
    if (data?.user) {
      localStorage.setItem("userData", JSON.stringify(data?.user));
    }
    loadUser()
  };

  const handleSubmit = () => {
    if (Object.values(credentials).some((value) => value === "")) return;

    register({...credentials,
      role: userType
    });

  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-white ">
      <div className="w-[30%] h-[60%] rounded-lg shadow-lg bg-gray-50 flex flex-col items-center justify-between py-4 px-2">
        <h1 className="text-xl font-bold">Register</h1>

        <div className="flex justify-center items-center w-4/5 gap-1">
          <div
            className={`border p-3 w-[140px] text-center cursor-pointer text-md
             bg-gray-100 ${
               userType === "collaborator"
                 ? "border-[2px] border-[#000000] font-bold bg-gray-300"
                 : ""
             } `}
            onClick={() => setUserType("collaborator")}
          >
            Collaborator
          </div>
          <div
            className={`border p-3 w-[140px] cursor-pointer text-center text-md
             bg-gray-100 ${
               userType === "author"
                 ? "border-[2px] border-[#000000] font-bold bg-gray-300"
                 : ""
             } `}
            onClick={() => setUserType("author")}
          >
            Author
          </div>
        </div>
        <div className="flex flex-col items-start w-4/5 gap-1">
          <p className="text-sm">Name:</p>
          <input
            type="text"
            className="p-2 shadow rounded w-full"
            placeholder="Name..."
            value={credentials.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start w-4/5 gap-1">
          <p className="text-sm">Email:</p>
          <input
            type="text"
            className="p-2 shadow rounded w-full"
            placeholder="Email@domain.com"
            value={credentials.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start w-4/5 gap-1">
          <p className="text-sm">Password:</p>
          <input
            type="password"
            className="p-2 shadow rounded w-full"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>

        <button
          className="text-lg text-medium w-4/5 rounded shadow bg-gray-100 hover:bg-gray-200 p-4"
          onClick={handleSubmit}
        >
          Register
        </button>
        <p>
          Already have an account? <span className="font-medium">
            <Link to={'/login'}>
          Login</Link>
            </span> 
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
