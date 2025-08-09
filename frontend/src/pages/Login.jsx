import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { loginUser } = useAuth();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const inputHandller = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const submitHandller = () => {
    if (!/\S+@\S+\.\S+/.test(data.email)) {
      console.error("please write proper email");
      return;
    }
    loginUser(data);
  };
  return (
    <>
      <div className="bg-gray-300 h-screen w-screen flex justify-center items-center">
        <div className="bg-white rounded-2xl hover:shadow-2xl shadow-white h-1/2 w-1/3 p-4 flex flex-col items-center backdrop-opacity-100">
          <h1 className="m-3 text-xl font-bold  mb-10 text-shadow-2xl">
            Login
          </h1>
          <div className="flex flex-col m-5 w-full p-5 gap-3  ">
            <input
              type="text"
              className="py-1 px-2 focus:outline-none focus:ring-1 focus:ring-blue-500 rounded-md focus:text-blue-800 shadow-2xl shadow-blue-300 focus:shadow-blue-500"
              placeholder="Enter your Email"
              value={data.email}
              name="email"
              onChange={(e) => inputHandller(e)}
            />
            <input
              type="password"
              className="py-1 px-2 focus:outline-none focus:ring-1 rounded-md focus:ring-blue-500 focus:text-blue-800 shadow-2xl shadow-blue-300 focus:shadow-blue-500"
              placeholder="Enter Your Password"
              value={data.password}
              name="password"
              onChange={(e) => inputHandller(e)}
            />
          </div>
          <div className="flex flex-col m-2 mx-auto">
            <button
              className="bg-blue-600 hover:bg-blue-800 transition duration-300 text-white px-8 py-2 rounded shadow-2xl hover:scale-105 hover:shadow-blue-500"
              onClick={() => submitHandller()}
            >
              submit
            </button>
            <button
              className="text-blue-700 text-[80%] underline"
              onClick={() => navigate("/register")}
            >
              Register?
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
