import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "./authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(registerUser(form));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-md space-y-4">
        <h2 className="text-xl font-bold">Register</h2>
        <input name="name" placeholder="Name" onChange={handleChange} className="border p-2 w-full" />
        <input name="email" placeholder="Email" onChange={handleChange} className="border p-2 w-full" />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  );
};
export default Register;