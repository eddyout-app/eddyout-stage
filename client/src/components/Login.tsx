import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import { login } from "../api/authAPI";
import type { UserLogin } from "../interfaces/UserLogin";

const Login = () => {
  const [loginData, setLoginData] = useState<UserLogin>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const data = await login(loginData);
      Auth.login(data.token);
      navigate("/dashboard");
    } catch (err) {
      const error = err as Error;
      console.error("Failed to login", err);
      setErrorMessage(
        error.message || "Incorrect username or password. Please try again"
      );
    }
  };

  return (
    <div className="form-container">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>

        {errorMessage && (
          <div className="text-red-600 font-semibold text-sm text-center">
            {errorMessage}
          </div>
        )}
        <div className="flex flex-col">
          <label
            htmlFor="email"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="email"
            value={loginData.email || ""}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="password"
            className="mb-1 text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            name="password"
            value={loginData.password || ""}
            onChange={handleChange}
          />
        </div>

        <button className="btn-dark" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
