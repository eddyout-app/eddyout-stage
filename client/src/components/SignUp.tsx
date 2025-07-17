import { useState, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../routes/authAPI";
import Auth from "../utils/auth";
import Footer from "./Footer";

export default function Signup() {
  const Navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const passwordRequirements =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (!passwordRequirements.test(formData.password)) {
        setErrorMessage(
          "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
        );
        return;
      }

      const response = await signup(formData);
      Auth.login(response.token);
      Navigate("/dashboard");
    } catch (err) {
      const error = err as Error;
      console.error("Signup failed. Please try again.", error);
      setErrorMessage(
        error.message ||
          "Email already in use. Please try again with a different email."
      );
    }
  };
  const formatLabel = (text: string) => {
    return text
      .replace(/([A-Z])/g, " $1") // insert space before capital letters
      .replace(/^./, (str) => str.toUpperCase()); // capitalize first letter
  };

  return (
    <div className="app-layout">
      <main className="signup-container">
        {/* Left: Logo */}
        <div className="signup-logo-section">
          <img
            src="/Logo_whitenobg_EddyOut.png"
            alt="Eddy Out Logo"
            style={{ width: "400px", height: "auto" }}
          />
        </div>

        {/* Right: Form */}
        <div className="signup-form-section">
          <form onSubmit={handleSubmit} className="signup-form-box">
            <h2>Create Account</h2>

            {errorMessage && (
              <div className="form-error-message">{errorMessage}</div>
            )}

            {(Object.keys(formData) as Array<keyof typeof formData>).map(
              (field) => (
                <div key={field} className="form-group">
                  <label htmlFor={field} className="form-label">
                    {formatLabel(field)}
                  </label>
                  <input
                    type={field === "password" ? "password" : "text"}
                    name={field}
                    id={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>
              )
            )}

            <button type="submit">Sign Up</button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
