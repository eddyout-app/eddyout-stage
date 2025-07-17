import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Auth from "../utils/auth";
import { login } from "../routes/authAPI";
import type { UserLogin } from "../types/user";

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
    <div className="trip-form">
      <form onSubmit={handleSubmit}>
        {errorMessage && (
          <p style={{ color: "red", fontWeight: "600", textAlign: "center" }}>
            {errorMessage}
          </p>
        )}

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            className="form-input"
            type="text"
            name="email"
            value={loginData.email || ""}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            id="password"
            className="form-input"
            type="password"
            name="password"
            value={loginData.password || ""}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
