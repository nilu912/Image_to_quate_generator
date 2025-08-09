import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import axios from "axios";

export const Home = () => {
  const { logout } = useAuth();
  const [image, setImage] = useState(null);

  const onFileSelect = (e) => {
    setImage(e.target.files[0]);
  };
  const onSubmitHandller = async () => {
    const form = new FormData();
    form.append("image", image);

    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/quate`,
      form,
      {
        headers: {
          "Content-Type": "multitype/form-data",
          Authorization: localStorage.getItem("userToken"),
        },
      }
    );
    console.log(response);

    console.log(image);
    console.log(form);
  };
  return (
    <>
      <div className="h-screen w-screen bg-gray-100">
        <header className="w-full bg-blue-100 p-2 flex justify-between items-center px-10 shadow-2xl shadow-gray-500">
          <h1>HomePage</h1>
          <button
            className="bg-red-400 text-white text-shadow-lg px-4 py-1 rounded hover:bg-red-600 transition duration-300 hover:shadow-2xl hover:shadow-red"
            onClick={() => logout()}
          >
            logout
          </button>
        </header>
        <div className="m-6 flex flex-col gap-4">
          <input
            type="file"
            onChange={(e) => onFileSelect(e)}
            className="w-80 px-4 py-2 bg-green-100 rounded shadow-2xl"
          />
          <button
            onClick={() => onSubmitHandller()}
            className="w-40 bg-blue-400 text-white text-shadow-lg px-4 py-1 rounded hover:bg-green-500 transition duration-300 hover:shadow-2xl hover:shadow-green"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};
